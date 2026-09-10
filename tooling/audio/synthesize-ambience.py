"""Original periodic wind, leaves and sparse synthesized bird details.
No recorded location or third-party audio. Reproducible 90-second mono loops.
"""
import csv,hashlib,json,subprocess
from pathlib import Path
import numpy as np
from scipy.io import wavfile
ROOT=Path(__file__).resolve().parents[2];RATE=32000;DURATION=90;N=RATE*DURATION
OUT=ROOT/'app/assets/audio/ambience';OUT.mkdir(parents=True,exist_ok=True)
MASTERS=Path('/tmp/kisel-audio-masters');MASTERS.mkdir(exist_ok=True)
def render(variant):
    rng=np.random.default_rng(17900+variant);time=np.arange(N)/RATE;freq=np.fft.rfftfreq(N,1/RATE)
    def noise(low,high):
        spectrum=np.fft.rfft(rng.normal(size=N));shape=(freq/(low+freq))**3/(1+(freq/high)**4)
        shape[0]=0;value=np.fft.irfft(spectrum*shape/np.sqrt(np.maximum(freq,1)),N)
        return value/max(np.std(value),1e-9)
    wind=noise(90,1400);leaves=noise(1400,5000)
    # Integer cycles preserve continuity without a recognizable rhythmic pulse.
    breathing=.32+.12*np.sin(2*np.pi*time/DURATION+variant)+.045*np.sin(2*np.pi*3*time/DURATION+.7)
    out=wind*breathing+leaves*(.035+.018*np.sin(2*np.pi*2*time/DURATION+1.4))
    for at in [5,23,41,66,82]:
        at+=rng.uniform(-2,2)
        for chirp in range(2):
            tt=np.arange(round(.19*RATE))/RATE
            phase=2*np.pi*((1900+variant*170)*tt+220/.19*tt**2)
            sound=(np.sin(phase)+.035*np.sin(phase*2))*np.sin(np.pi*tt/.19)**2*.1
            indices=(np.arange(len(tt))+round((at+chirp*.23)*RATE))%N
            out[indices]+=sound
    out-=out.mean();out*=.6/np.max(np.abs(out))
    return out
def main():
    files=[]
    for variant in range(2):
        samples=render(variant);master=MASTERS/f'ambience_main_{variant+1}.wav';runtime=OUT/f'ambience_main_{variant+1}.mp3'
        wavfile.write(master,RATE,np.round(samples*32767).astype(np.int16))
        subprocess.run(['/opt/homebrew/bin/ffmpeg','-v','error','-y','-i',str(master),'-codec:a','libmp3lame','-b:a','96k','-ar',str(RATE),'-write_xing','1',str(runtime)],check=True)
        files.append({'path':runtime.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(runtime.read_bytes()).hexdigest(),'masterSha256':hashlib.sha256(master.read_bytes()).hexdigest(),'durationMs':DURATION*1000,'sampleRate':RATE,'channels':1,'loop':True,'loopStartFrame':0,'loopEndFrame':N,'peakDbFS':round(float(20*np.log10(np.max(np.abs(samples)))),2),'status':'PROJECT_ORIGINAL'})
    (OUT/'manifest.json').write_text(json.dumps({'version':'original-ambience-v1','id':'ambience.main','source':'tooling/audio/synthesize-ambience.py','provenance':'app/assets/audio/PROVENANCE.md','creator':'Project / Codex-assisted original synthesis','gainDb':-30,'files':files},indent=2)+'\n')
    for rel in ['docs/audio/audio_event_matrix.csv','analysis/figma/audio_asset_ownership.csv']:
        path=ROOT/rel;rows=list(csv.DictReader(path.open()))
        for row in rows:
            if row['eventId']=='ambience.main':
                if 'sourceStatus' in row:row['sourceStatus']='generated'
                else:row.update(status='acquired-original',creator='Project / Codex-assisted original synthesis',license='PROJECT_ORIGINAL',sourceFile='app/assets/audio/ambience/manifest.json',distributionProof='app/assets/audio/PROVENANCE.md',blocksRelease='no')
        with path.open('w',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)
    print(json.dumps({'loops':len(files),'secondsEach':DURATION,'runtimeBytes':sum((ROOT/f['path']).stat().st_size for f in files)}))
if __name__=='__main__':main()
