"""Original project sound design. No downloaded samples or reference recordings.
Reproduce: /tmp/kisel-planning-venv/bin/python tooling/audio/synthesize-sfx.py
Requires NumPy/SciPy. PCM WAV is both the lossless master and runtime SFX.
"""
import csv, hashlib, json
from pathlib import Path
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

ROOT=Path(__file__).resolve().parents[2]
RATE=44100
OUT=ROOT/'app/assets/audio/sfx'
OUT.mkdir(parents=True,exist_ok=True)

def t(duration):return np.arange(round(duration*RATE))/RATE
def envelope(time,attack=.003,decay=.12):return (1-np.exp(-time/attack))*np.exp(-time/decay)
def tone(duration,freq,decay=.1,metal=.0):
    time=t(duration)
    return sum(a*np.sin(2*np.pi*freq*ratio*time)*envelope(time,.002,decay/(1+i*.55)) for i,(ratio,a) in enumerate([(1,1),(2.003,.28),(3.99,.1),(5.41,metal)]))
def air(duration,rng,low=300,high=6500,decay=.08):
    time=t(duration)
    noise=sosfilt(butter(2,[low,high],btype='bandpass',fs=RATE,output='sos'),rng.normal(0,1,len(time)))
    return noise*envelope(time,.002,decay)
def sweep(duration,start,end,decay=.08):
    time=t(duration);k=np.log(end/start)/duration
    phase=2*np.pi*start*(np.exp(time*k)-1)/k
    return np.sin(phase)*envelope(time,.002,decay)
def place(dst,src,at,gain=1):
    start=round(at*RATE);count=min(len(src),len(dst)-start)
    if count>0:dst[start:start+count]+=src[:count]*gain
def flourish(duration,notes,rng,body=False):
    out=np.zeros(len(t(duration)))
    for i,note in enumerate(notes):place(out,tone(duration-i*.075,note,decay=.15,metal=.15),i*.075,.19)
    if body:place(out,sweep(.18,160,68,.04),0,.27)
    place(out,air(duration,rng,1800,7000,duration/5),0,.06)
    # Discrete soft early reflections; not a canned external reverb sample.
    for delay,gain in [(.031,.12),(.067,.06)]:
        shifted=round(delay*RATE);out[shifted:]+=out[:-shifted].copy()*gain
    return out

def design(event,variant):
    seed=int.from_bytes(hashlib.sha256(f'original-sfx-v1:{event}:{variant}'.encode()).digest()[:8],'big')
    rng=np.random.default_rng(seed);pitch=2**(rng.uniform(-.35,.35)/12)
    if event in ('ui.soft','ui.primary','ui.tab','wheel.tick','economy.goldSpend'):
        duration={'ui.soft':.065,'ui.primary':.095,'ui.tab':.085,'wheel.tick':.035,'economy.goldSpend':.085}[event]
        freq={'ui.soft':440,'ui.primary':660,'ui.tab':530,'wheel.tick':1300,'economy.goldSpend':810}[event]*pitch
        out=tone(duration,freq,.01 if event=='wheel.tick' else .023,.18)*.34+air(duration,rng,650,5400,.008)*.1
        if event=='ui.primary':out+=tone(duration,990*pitch,.028,.1)*.14
    elif event in ('ui.popupOpen','ui.popupClose','hero.spawn','combat.melee','combat.ranged','combat.magic'):
        duration={'ui.popupOpen':.2,'ui.popupClose':.14,'hero.spawn':.18,'combat.melee':.14,'combat.ranged':.12,'combat.magic':.2}[event]
        out=air(duration,rng,350,5100,duration*.2)*(.45 if event=='combat.melee' else .24)
        out+=sweep(duration,300*pitch,100 if event in ('ui.popupClose','hero.spawn','combat.melee') else 780, duration*.22)*.19
        if event in ('combat.ranged','combat.magic'):out+=tone(duration,(760 if event=='combat.ranged' else 1046)*pitch,.045,.15)*.23
    elif event in ('combat.hit','combat.crit','enemy.deathSmall','enemy.deathLarge','boss.intro','boss.death','equipment.equip'):
        duration={'combat.hit':.09,'combat.crit':.17,'enemy.deathSmall':.23,'enemy.deathLarge':.34,'boss.intro':.85,'boss.death':1.05,'equipment.equip':.17}[event]
        large=event in ('enemy.deathLarge','boss.intro','boss.death')
        out=sweep(duration,(160 if large else 310)*pitch,52 if large else 105,duration*.22)*.5
        out+=air(duration,rng,120 if large else 700,3600,duration*.17)*.2
        if event=='combat.crit':out+=tone(duration,1568*pitch,.025,.13)*.18
        if event=='equipment.equip':out+=tone(duration,720*pitch,.035,.2)*.2
        if event=='boss.death':place(out,flourish(.65,[523,659,784,1046],rng),.3,.85)
        if event=='boss.intro':place(out,air(.65,rng,220,2100,.14),.18,.15)
    elif event=='ui.error':
        out=np.zeros(len(t(.14)));place(out,tone(.07,330,.014),0,.25);place(out,tone(.07,294,.014),.07,.22)
    elif event=='wheel.result' and variant==2:
        # Neutral empty-result cue is selected explicitly, never random success.
        out=np.zeros(len(t(.24)));place(out,tone(.18,523,.04),0,.2);place(out,tone(.16,440,.03),.08,.16)
    else:
        duration,notes={
          'economy.goldGain':(.18,[1318,1976]),'economy.gemGain':(.3,[1568,2093]),
          'merge.low':(.43,[523,659,784]),'merge.mid':(.55,[523,659,784,1046]),
          'merge.high':(.8,[392,523,659,784,1046]),'merge.cascade':(.4,[523,659,784,1046][variant:variant+1]),
          'progress.stageClear':(.5,[659,784,1046]),'progress.unlock':(.7,[392,523,659,1046]),
          'wheel.result':(.65,[659,784,1046,1318]),'reward.daily':(.6,[784,988,1175]),
          'reward.chest':(.65,[392,587,784,1175]),'equipment.upgrade':(.5,[440,659,880]),
        }[event]
        out=flourish(duration,[n*pitch for n in notes],rng,event.startswith('merge'))
    # DC removal, tiny boundary fades and deliberate headroom. Do not normalize
    # quiet clicks and broad reward chords to an identical perceived loudness.
    out=sosfilt(butter(2,35,btype='highpass',fs=RATE,output='sos'),out)
    out=np.tanh(out*1.15)*.8
    fade=min(round(.003*RATE),len(out)//2)
    out[:fade]*=np.linspace(0,1,fade);out[-fade:]*=np.linspace(1,0,fade)
    return out

def main():
    rows=list(csv.DictReader((ROOT/'docs/audio/audio_event_matrix.csv').open()))
    records=[]
    for row in rows:
        if row['category'] not in ('ui','sfx') or row['eventId']=='reward.offline':continue
        files=[]
        for variant in range(int(row['variants'])):
            samples=design(row['eventId'],variant)
            path=OUT/f"{row['eventId'].replace('.','_')}_{variant+1}.wav"
            pcm=np.round(samples*32767).astype(np.int16);wavfile.write(path,RATE,pcm)
            files.append({'path':path.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'durationMs':round(len(samples)*1000/RATE,3),'sampleRate':RATE,'channels':1,'peakDbFS':round(float(20*np.log10(max(np.max(np.abs(samples)),1e-9))),2)})
        records.append({'id':row['eventId'],'bus':row['category'],'brief':row['brief'],'status':'PROJECT_ORIGINAL','files':files,'neutralVariant':2 if row['eventId']=='wheel.result' else None,'gainDb':float(row['gainDb']),'cooldownMs':int(row['cooldownMs']),'maxConcurrent':int(row['maxConcurrent']),'pitchRange':float(row['pitchRandomPlusMinus']),'duckMusicDb':float(row['duckMusicDb'])})
        row['sourceStatus']='generated'
    manifest={'version':'original-sfx-v1','creator':'Project / Codex-assisted original synthesis','provenance':'app/assets/audio/PROVENANCE.md','source':'tooling/audio/synthesize-sfx.py','events':records}
    (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    with (ROOT/'docs/audio/audio_event_matrix.csv').open('w',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
    ledger=list(csv.DictReader((ROOT/'analysis/figma/audio_asset_ownership.csv').open()))
    for row in ledger:
        if any(record['id']==row['eventId'] for record in records):
            row.update(status='acquired-original',creator=manifest['creator'],license='PROJECT_ORIGINAL',sourceFile='app/assets/audio/sfx/manifest.json#'+row['eventId'],distributionProof='app/assets/audio/PROVENANCE.md',blocksRelease='no')
        elif row['eventId']=='reward.offline':row.update(status='DEFERRED_POST_DELIVERY',blocksRelease='no')
    with (ROOT/'analysis/figma/audio_asset_ownership.csv').open('w',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(ledger[0]));writer.writeheader();writer.writerows(ledger)
    print(json.dumps({'events':len(records),'files':sum(len(r['files']) for r in records),'bytes':sum((ROOT/f['path']).stat().st_size for r in records for f in r['files'])}))
if __name__=='__main__':main()
