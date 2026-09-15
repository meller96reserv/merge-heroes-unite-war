#!/usr/bin/env python3
"""One bounded external Android sample. Frame metrics are labelled by producer."""
import argparse,datetime,json,pathlib,re,subprocess,time,statistics,os
from android import ROOT,PACKAGE,COMPONENT,MODE,adb
p=argparse.ArgumentParser();p.add_argument('--seconds',type=int,default=90);p.add_argument('--warmup',type=int,default=15);p.add_argument('--scenario',default='reference-active-battle');args=p.parse_args()
if not 10<=args.seconds<=120:raise SystemExit('Use a 10–120 second representative run.')
run=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ');folder=ROOT/'benchmark/results'/run;raw=folder/'raw';raw.mkdir(parents=True,exist_ok=True)
def save(name,text): (raw/name).write_text(text);return text
def shell(*a):return adb('shell',*a,check=False)
def engine_state():
    expression='JSON.stringify({timeMs:performance.now(),frames:window.cc?.director?.getTotalFrames?.(),scene:window.cc?.director?.getScene()?.name})'
    try:
        r=subprocess.run(['node',str(ROOT/'benchmark/scripts/webview.mjs'),expression],cwd=ROOT,env={**os.environ,'REFERENCE_PACKAGE':PACKAGE},capture_output=True,text=True,timeout=15)
        return json.loads(r.stdout) if r.returncode==0 else {'unavailable':True}
    except Exception:return {'unavailable':True}
def mem(label):
    text=save('meminfo-'+label+'.txt',shell('dumpsys','meminfo',PACKAGE))
    values={}
    for key,pat in [('totalPssKb',r'TOTAL PSS:\s*(\d+)'),('totalRssKb',r'TOTAL RSS:\s*(\d+)'),('javaHeapPssKb',r'Java Heap:\s*(\d+)'),('nativeHeapPssKb',r'Native Heap:\s*(\d+)'),('graphicsPssKb',r'Graphics:\s*(\d+)')]:
        m=re.search(pat,text);values[key]=int(m[1]) if m else None
    values['scope']='Host app process; WebView renderer may be separate. Raw system process snapshot included.'
    return values
meta={'serial':os.environ.get('ANDROID_SERIAL','adb default single device'),'model':shell('getprop','ro.product.model').strip(),'android':shell('getprop','ro.build.version.release').strip(),'sdk':shell('getprop','ro.build.version.sdk').strip(),'screen':shell('wm','size').strip(),'density':shell('wm','density').strip(),'webview':save('webview.txt',shell('dumpsys','webviewupdate')),'scenario':args.scenario,'referenceVersion':'LIVE_CRAZY 3.16.2 / public build 51','durationSeconds':args.seconds}
shell('am','force-stop',PACKAGE)
meta['runtimeMode']=MODE
started=time.monotonic();startup=save('startup.txt',shell('am','start','-W','-n',COMPONENT));wall=round((time.monotonic()-started)*1000)
startupValues={k:int(v) for k,v in re.findall(r'(?m)^(ThisTime|TotalTime|WaitTime):\s*(\d+)',startup)}
startupValues.update({'adbWallMs':wall,'scope':'Process cold Activity launch, retained guest save and warm OS caches; not game-interactive time.'})
launch=mem('launch');print('App launched. Resume active battle if a popup is present.',flush=True)
time.sleep(args.warmup);warm=mem('warmup');shell('dumpsys','gfxinfo',PACKAGE,'reset')
layers=save('surface-layers.txt',shell('dumpsys','SurfaceFlinger','--list')).splitlines()
layer=next((l for l in layers if PACKAGE in l and 'SurfaceView' in l),None) # No guessed Android 16 layer names; gfxinfo + engine counter remain available.
engineStart=engine_state();frames=set();surfaceRaw=[];samples=[];start=time.monotonic();pid=shell('pidof',PACKAGE).strip().split();initialPid=pid
while time.monotonic()-start<args.seconds:
    elapsed=round(time.monotonic()-start,2)
    if layer:
        latency=shell('dumpsys','SurfaceFlinger','--latency',layer);surfaceRaw.append({'elapsedSeconds':elapsed,'text':latency})
        for line in latency.splitlines()[1:]:
            parts=line.split()
            if len(parts)==3 and all(x.isdigit() for x in parts):
                # SurfaceFlinger actualPresentTime is the second nanosecond column.
                t=int(parts[1])
                if 0<t<9223372036854775807:frames.add(t)
    if not samples or elapsed-samples[-1]['elapsedSeconds']>=15:
        samples.append({'elapsedSeconds':elapsed,'memory':mem(f'sample-{len(samples)}'),'pid':shell('pidof',PACKAGE).strip()})
    time.sleep(min(1,max(0,args.seconds-(time.monotonic()-start))))
actual=time.monotonic()-start;engineEnd=engine_state();end=mem('end');gfx=save('gfxinfo.txt',shell('dumpsys','gfxinfo',PACKAGE,'framestats'));save('cpuinfo.txt',shell('dumpsys','cpuinfo'));save('processes.txt',shell('ps','-A','-o','PID,PPID,RSS,NAME,ARGS'));save('surface-latency.json',json.dumps(surfaceRaw))
# Read only relevant app crash/error tags; no request headers or full system log.
log=adb('logcat','-d','-v','brief','-t','300','ReferenceBenchmark:E','AndroidRuntime:E','*:S',check=False)
log=re.sub(r'(?i)(token|authorization|password|cookie)\s*[:=]\s*[^\s,;]+',r'\1=REDACTED',log);save('errors-sanitized.txt',log)
gfxMetrics={}
for name,pat in [('frames',r'Total frames rendered:\s*(\d+)'),('jankyFrames',r'Janky frames:\s*(\d+)'),('p50Ms',r'50th percentile:\s*(\d+)ms'),('p90Ms',r'90th percentile:\s*(\d+)ms'),('p95Ms',r'95th percentile:\s*(\d+)ms'),('p99Ms',r'99th percentile:\s*(\d+)ms')]:
    m=re.search(pat,gfx);gfxMetrics[name]=int(m[1]) if m else None
ordered=sorted(frames);intervals=[(b-a)/1e6 for a,b in zip(ordered,ordered[1:])]
surface={'layer':layer,'uniquePresentations':len(ordered),'fps':round((len(ordered)-1)*1e9/(ordered[-1]-ordered[0]),2) if len(ordered)>2 else None,'medianIntervalMs':round(statistics.median(intervals),2) if intervals else None,'scope':'Selected Android compositor surface presentations, not engine simulation FPS; null means unavailable.'}
engine={'start':engineStart,'end':engineEnd,'fps':round((engineEnd['frames']-engineStart['frames'])*1000/(engineEnd['timeMs']-engineStart['timeMs']),2) if all('frames' in v and 'timeMs' in v for v in [engineStart,engineEnd]) and engineEnd['timeMs']>engineStart['timeMs'] else None,'scope':'Cocos director frame-counter delta from two read-only CDP snapshots; engine loop FPS, not physical display presentations. No per-frame profiling injected.'}
result={'run':run,'device':meta,'startup':startupValues,'memory':{'launch':launch,'warmup':warm,'end':end,'samples':samples},'frames':{'engine':engine,'surfaceFlinger':surface,'gfxinfo':gfxMetrics,'gfxinfoScope':'Android HWUI/window frame metrics; WebGL compositor workload may be excluded. Do not equate HWUI jank with game FPS.'},'actualSampleSeconds':round(actual,2),'stability':{'initialPids':initialPid,'finalPid':shell('pidof',PACKAGE).strip(),'errors':log[-4000:],'longSoak':'NOT_RUN: user-authorized 1–2 minute sample only','audio':'Audible output not assessed by this script'},'rawDirectory':str(raw.relative_to(ROOT))}
(folder/'result.json').write_text(json.dumps(result,indent=2));(ROOT/'benchmark/results/latest.json').write_text(json.dumps(result,indent=2))
md=f'''# Reference benchmark — {run}

Device: {meta['model']}, Android {meta['android']}, {meta['screen']}. Scenario: {args.scenario}; {actual:.1f}s sample after {args.warmup}s warmup.

- Activity startup: {startupValues}; time to interactive gameplay is not measured by this script.
- Host PSS KiB launch / warm / end: {launch['totalPssKb']} / {warm['totalPssKb']} / {end['totalPssKb']}. Renderer process can be separate.
- Engine loop FPS: {engine['fps']}, measured using two read-only frame-counter snapshots.
- SurfaceFlinger: {surface}.
- Android HWUI: {gfxMetrics}. These are window statistics, not necessarily WebGL gameplay frames.
- Raw diagnostics: {raw.relative_to(ROOT)}. No long soak or repeated benchmarks.

See latest.json and capture/reports/ANDROID_VERIFICATION.md for gameplay/audio scope and limitations.
'''
(folder/'result.md').write_text(md);(ROOT/'benchmark/results/latest.md').write_text(md)
print(json.dumps({'result':str(folder.relative_to(ROOT)),'activityStartup':startupValues,'memoryPssKb':end['totalPssKb'],'surface':surface,'engineFps':engine['fps'],'gfxinfo':gfxMetrics}),flush=True)
