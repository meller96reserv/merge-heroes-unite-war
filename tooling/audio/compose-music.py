"""Original small-ensemble fantasy score; all instruments are synthesized here.
No reference melodies, recordings or sample libraries. Lossless masters stay in
/tmp/kisel-audio-masters; committed source and deterministic score reproduce them.
"""
import csv,hashlib,json,subprocess
from pathlib import Path
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter,sosfilt

ROOT=Path(__file__).resolve().parents[2];RATE=32000;BPM=96;BEAT=60/BPM
OUT=ROOT/'app/assets/audio/music';OUT.mkdir(parents=True,exist_ok=True)
MASTERS=Path('/tmp/kisel-audio-masters');MASTERS.mkdir(exist_ok=True)
def hz(note):return 440*2**((note-69)/12)
def instrument(note,duration,kind,rng):
    time=np.arange(round((duration+.65)*RATE))/RATE;freq=hz(note)
    tail=np.clip((time[-1]-time)/.08,0,1)
    if kind=='pad':
        env=np.minimum(1,time/.18)*np.minimum(1,np.maximum(0,duration+.65-time)/.8)
        wave=sum(amp*np.sin(2*np.pi*freq*h*time+.006*freq/h*np.sin(2*np.pi*4.1*time)) for h,amp in [(1,1),(2,.26),(3,.12),(4,.045)])
        return wave*env*tail*.16
    if kind=='flute':
        env=(1-np.exp(-time/.035))*np.exp(-time/(duration*.9))*np.minimum(1,np.maximum(0,duration+.65-time)/.3)
        phase=2*np.pi*freq*time+.15*np.sin(2*np.pi*4.7*time)
        return (np.sin(phase)+.07*np.sin(phase*3))*env*tail*.25
    decay=.25 if kind=='pluck' else .48 if kind=='celesta' else .36
    env=(1-np.exp(-time/.003))*np.exp(-time/decay)
    ratios=[(1,1),(2.003,.26),(3.02,.13),(4.19,.065)] if kind=='celesta' else [(1,1),(2,.31),(3,.13),(4,.05)]
    wave=sum(amp*np.sin(2*np.pi*freq*ratio*time)*np.exp(-time*i*.8) for i,(ratio,amp) in enumerate(ratios))
    if kind=='bass':wave=np.sin(2*np.pi*freq*time)+.22*np.sin(4*np.pi*freq*time)
    return wave*env*tail*(.34 if kind=='bass' else .27)

def render(kind):
    bars=40 if kind=='main' else 24;duration=bars*4*BEAT
    count=round(duration*RATE);mix=np.zeros((count,2),np.float64);rng=np.random.default_rng(178 if kind=='main' else 179)
    main_chords=[[55,59,62,64],[54,57,62,64],[52,55,59,62],[48,52,55,59],[45,48,52,55],[50,55,57,62],[50,54,57,64],[43,50,59,64]]
    boss_chords=[[52,55,59,62],[48,52,55,59],[43,50,55,59],[50,54,57,62],[45,52,55,59],[48,55,59,62],[47,52,54,59],[47,54,59,62]]
    # Eight original call/answer cells, embellished by phrase, never a copied tune.
    melody=[[(.25,74,.75),(1.5,71,.5),(2.25,69,.5),(3.25,67,.65)],[(.5,69,.75),(2,66,.5),(3,64,.7)],[(0,67,.5),(1.25,71,.65),(2.5,74,.5),(3.25,71,.6)],[(.5,76,.75),(2,74,.5),(3,71,.65)],[(.25,72,.75),(1.5,71,.5),(2.25,69,.8)],[(.5,67,.65),(1.5,69,.5),(3,74,.7)],[(0,73,.5),(1,74,.5),(2.5,69,.9)],[(.5,71,.6),(1.5,69,.5),(2.5,67,1.1)]]
    def add(sound,seconds,gain=1,pan=0):
        indices=(np.arange(len(sound))+round(seconds*RATE))%count
        # Equal-power static stereo positioning, no distracting orbiting effects.
        mix[indices,0]+=sound*gain*np.sqrt((1-pan)/2)
        mix[indices,1]+=sound*gain*np.sqrt((1+pan)/2)
    def note(n,beat,dur,voice,gain=1,pan=0):add(instrument(n,dur*BEAT,voice,rng),beat*BEAT,gain,pan)
    for bar in range(bars):
        phrase=bar//8;chord=(main_chords if kind=='main' else boss_chords)[bar%8];base=bar*4
        # Breathing orchestration: quiet phrases leave space for frequent SFX.
        intensity=[.85,1,.72,.94,1][phrase] if kind=='main' else [.83,.96,1][phrase]
        for i,n in enumerate(chord):note(n,base,4,'pad',.2*intensity,(-.36,.2,-.15,.4)[i])
        note(chord[0]-12,base,1.6,'bass',.55*intensity,-.04)
        note(chord[0]-12,base+2.5,1.1,'bass',.38*intensity,.04)
        pattern=[0,2,1,3,2,1] if kind=='main' else [0,2,1,2,3,2,1,2]
        for i,degree in enumerate(pattern):
            beat=(i*.5 if kind=='boss' else [.0,.75,1.5,2.25,3,3.5][i])
            note(chord[degree]+12,base+beat,.42,'pluck',.42*intensity,-.23 if i%2 else .26)
        if kind=='main':
            for beat,n,dur in melody[bar%8]:
                voice='flute' if phrase in (1,3) else 'celesta'
                note(n+(12 if phrase==4 and bar%8 in (2,6) else 0),base+beat,dur,voice,.57*intensity,.13)
        else:
            for beat,degree in [(0,2),(1.5,1),(3,3)]:note(chord[degree]+12,base+beat,.8,'flute',.38*intensity,.12)
        # Soft hand drum, brushed shaker and occasional wooden rim; no sample kit.
        for beat in ([0,2] if kind=='main' else [0,1.5,2,3.25]):
            tt=np.arange(round(.24*RATE))/RATE
            drum=np.sin(2*np.pi*(62*tt+3.1*(1-np.exp(-tt*30))))*np.exp(-tt*19)*(1-np.exp(-tt*900))*np.clip((tt[-1]-tt)/.035,0,1)
            add(drum,(base+beat)*BEAT,.11*intensity)
        for half in range(8):
            tt=np.arange(round(.07*RATE))/RATE
            brush=sosfilt(butter(2,[1800,6500],btype='bandpass',fs=RATE,output='sos'),rng.normal(0,1,len(tt)))*np.exp(-tt*70)*(1-np.exp(-tt*900))*np.clip((tt[-1]-tt)/.015,0,1)
            add(brush,(base+half*.5)*BEAT,.035 if half%2 else .023,.3)
        if bar%8==7:note(chord[3]+24,base+3,.45,'celesta',.18,-.2)
    # Periodic room response carries tails over the score boundary exactly.
    dry=mix.copy()
    for seconds,gain in [(.043,.13),(.089,.095),(.151,.06),(.277,.045)]:
        mix+=np.roll(dry,round(seconds*RATE),axis=0)[:,::-1]*gain
    mix-=mix.mean(axis=0);mix=np.tanh(mix*1.7)
    mix*=.84/np.max(np.abs(mix));mix-=mix.mean(axis=0)
    return mix

def main():
    tracks=[]
    for kind in ['main','boss']:
        samples=render(kind);master=MASTERS/f'music_{kind}.wav'
        wavfile.write(master,RATE,np.round(samples*32767).astype(np.int16))
        runtime=OUT/f'music_{kind}.mp3'
        subprocess.run(['/opt/homebrew/bin/ffmpeg','-v','error','-y','-i',str(master),'-codec:a','libmp3lame','-b:a','128k','-ar',str(RATE),'-write_xing','1',str(runtime)],check=True)
        tracks.append({'id':f'music.{kind}','path':runtime.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(runtime.read_bytes()).hexdigest(),'masterSha256':hashlib.sha256(master.read_bytes()).hexdigest(),'durationMs':len(samples)*1000/RATE,'sampleRate':RATE,'channels':2,'bpm':BPM,'bars':40 if kind=='main' else 24,'loop':True,'loopStartFrame':0,'loopEndFrame':len(samples),'boundaryDelta':round(float(np.max(np.abs(samples[0]-samples[-1]))),8),'peakDbFS':round(float(20*np.log10(np.max(np.abs(samples)))),2),'gainDb':-16 if kind=='main' else -14,'status':'PROJECT_ORIGINAL'})
    (OUT/'manifest.json').write_text(json.dumps({'version':'original-score-v1','creator':'Project / Codex-assisted original composition and synthesis','source':'tooling/audio/compose-music.py','provenance':'app/assets/audio/PROVENANCE.md','tracks':tracks},indent=2)+'\n')
    for rel in ['docs/audio/audio_event_matrix.csv','analysis/figma/audio_asset_ownership.csv']:
        path=ROOT/rel;rows=list(csv.DictReader(path.open()))
        for row in rows:
            if row['eventId'] in ('music.main','music.boss'):
                if 'sourceStatus' in row:row['sourceStatus']='generated'
                else:row.update(status='acquired-original',creator='Project / Codex-assisted original composition and synthesis',license='PROJECT_ORIGINAL',sourceFile='app/assets/audio/music/manifest.json#'+row['eventId'],distributionProof='app/assets/audio/PROVENANCE.md',blocksRelease='no')
        with path.open('w',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
    print(json.dumps({'tracks':len(tracks),'seconds':[v['durationMs']/1000 for v in tracks],'boundaryDelta':[v['boundaryDelta'] for v in tracks],'runtimeBytes':sum((ROOT/v['path']).stat().st_size for v in tracks)}))
if __name__=='__main__':main()
