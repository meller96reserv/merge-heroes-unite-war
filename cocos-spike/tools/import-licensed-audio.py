"""Prepare CC0 audio for the Cocos candidate; preserve existing resource UUIDs."""
from pathlib import Path
import array, hashlib, json, math, shutil, subprocess, tempfile, uuid

P=Path(__file__).resolve().parents[1]
S=P/'audio-sources'; O=P/'assets/resources/audio'; L=P/'audio-licenses'
L.mkdir(exist_ok=True)
# Runtime ID -> original file, maximum duration. Ordinary actions stay brief.
cues={
 'ui_soft_1':('interface/Audio/click_003.ogg',.12),
 'ui_primary_1':('interface/Audio/pluck_001.ogg',.23),
 'ui_error_1':('interface/Audio/back_002.ogg',.25),
 'ui_tab_1':('interface/Audio/select_004.ogg',.16),
 'ui_open_1':('interface/Audio/open_002.ogg',.22),
 'ui_close_1':('interface/Audio/close_002.ogg',.20),
 'ui_toggle_1':('interface/Audio/switch_003.ogg',.16),
 'ui_tick_1':('interface/Audio/tick_001.ogg',.09),
 'hero_spawn_1':('interface/Audio/confirmation_002.ogg',.38),
 'hero_drop_1':('interface/Audio/drop_002.ogg',.18),
 'combat_melee_1':('rpg/Audio/knifeSlice.ogg',.22),
 'combat_ranged_1':('rpg/Audio/knifeSlice2.ogg',.24),
 'combat_magic_1':('interface/Audio/glass_003.ogg',.30),
 'combat_hit_1':('rpg/Audio/chop.ogg',.13),
 'combat_crit_1':('interface/Audio/glass_002.ogg',.23),
 'enemy_deathSmall_1':('interface/Audio/drop_004.ogg',.25),
 'economy_goldGain_1':('rpg/Audio/handleCoins2.ogg',.42),
 'economy_gemGain_1':('interface/Audio/glass_005.ogg',.45),
 'merge_low_1':('interface/Audio/confirmation_001.ogg',.55),
 'merge_high_1':('interface/Audio/confirmation_004.ogg',.75),
 'reward_claim_1':('jingles/Audio/Pizzicato jingles/jingles_PIZZI00.ogg',2.5),
 'upgrade_1':('interface/Audio/maximize_004.ogg',.55),
 'equipment_1':('rpg/Audio/metalClick.ogg',.23),
 'wheel_stop_1':('interface/Audio/confirmation_003.ogg',.65),
}
pages={'interface':'https://kenney.nl/assets/interface-sounds',
       'rpg':'https://kenney.nl/assets/rpg-audio',
       'jingles':'https://kenney.nl/assets/music-jingles',
       'town':'https://opengameart.org/content/town-theme-rpg'}
def run(*args):return subprocess.check_output(['ffmpeg','-v','error',*map(str,args)])
def pcm(path):
 a=array.array('f');a.frombytes(run('-i',path,'-f','f32le','-ar','44100','-ac','1','-'));return a
def db(x):return round(20*math.log10(max(1e-12,x)),2)
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
records=[]
with tempfile.TemporaryDirectory(prefix='mergeheroes-licensed-') as tmp:
 tmp=Path(tmp)
 for name,(file,limit) in cues.items():
  source=S/file; cut=tmp/(name+'.wav');dest=O/(name+'.ogg')
  run('-y','-i',source,'-af',f'silenceremove=start_periods=1:start_duration=0.002:start_threshold=-50dB,atrim=duration={limit},asetpts=N/SR/TB,highpass=f=70,lowpass=f=7600','-ar','44100','-ac','1',cut)
  samples=pcm(cut);duration=len(samples)/44100;peak=max(map(abs,samples));gain=10**(-5/20)/max(peak,1e-9)
  run('-y','-i',cut,'-af',f'volume={gain},afade=t=in:d=0.003,afade=t=out:st={max(0,duration-.016)}:d=0.016','-c:a','libvorbis','-q:a','6',dest)
  meta=O/(name+'.ogg.meta')
  if not meta.exists():meta.write_text(json.dumps({'ver':'1.0.0','importer':'audio-clip','imported':True,'uuid':str(uuid.uuid5(uuid.NAMESPACE_URL,'mergeheroes/cc0/'+name)),'files':['.json','.ogg'],'subMetas':{},'userData':{'downloadMode':0}},indent=2))
  actual=pcm(dest);rms=math.sqrt(sum(x*x for x in actual)/len(actual))
  records.append({'id':name,'sourceFile':file,'sourcePage':pages[file.split('/')[0]],'license':'CC0-1.0','sourceSha256':sha(source),'runtimeSha256':sha(dest),'durationMs':round(duration*1000),'peakDbFS':db(max(map(abs,actual))),'rmsDbFS':db(rms)})
 # Genuine composed fantasy music, quiet enough to leave room for interactions.
 # Keep the existing UUID; only the contents of the legacy ambience resource change.
 music=O/'ambience.mp3'
 run('-y','-i',S/'town.mp3','-af','loudnorm=I=-22:TP=-3:LRA=9','-ar','44100','-c:a','libmp3lame','-b:a','160k','-write_xing','1',music)
 report={'version':'1.7','license':'CC0-1.0','licenseUrl':'https://creativecommons.org/publicdomain/zero/1.0/',
  'music':{'title':'Town Theme RPG','author':'cynicmusic','sourcePage':pages['town'],'sourceFile':'TownTheme.mp3','sourceSha256':sha(S/'town.mp3'),'runtimeSha256':sha(music),'processing':'Loudness normalized to -22 LUFS; quiet runtime music mix'},
  'effects':records,'changes':'Trimmed long tails, gentle edge fades, bounded high end, effects normalized to approximately -5 dBFS peak. No reference-game audio.'}
 (L/'manifest.json').write_text(json.dumps(report,indent=2)+'\n')
 (P/'benchmark/audio-1.7.json').write_text(json.dumps(report,indent=2)+'\n')
for name in ['interface','rpg','jingles']:shutil.copy2(S/name/'License.txt',L/(name+'-CC0.txt'))
(L/'CREDITS.md').write_text('''# Audio credits — Merge Heroes Unite War

Music: **Town Theme RPG** by **cynicmusic** — https://opengameart.org/content/town-theme-rpg
Author: https://cynicmusic.com / https://pixelsphere.org

Sound effects: **Interface Sounds**, **RPG Audio**, **Music Jingles** by **Kenney**.
https://kenney.nl/assets/interface-sounds
https://kenney.nl/assets/rpg-audio
https://kenney.nl/assets/music-jingles

All selected sources are published under **CC0 1.0**. The author's music page explicitly identifies this track as CC0. Kenney's license notices are preserved alongside this file. Credits are retained voluntarily; no reference-game files or advertising IDs are reused.
License: https://creativecommons.org/publicdomain/zero/1.0/

`manifest.json` records selected originals, source URLs, transformations and hashes. Source downloads are outside runtime resources in `audio-sources/`; only the prepared cues and music ship in the app.
''')
print('Prepared',len(records),'CC0 effects and Town Theme RPG')
