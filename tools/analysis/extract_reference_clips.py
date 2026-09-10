"""Review clips/frame sheets from our own silent browser recording; no game resource extraction."""
from plan_common import *
import subprocess,hashlib
from PIL import Image,ImageDraw
source=ROOT/'analysis/reference/videos/page@e53d5a960afc8843e2ed1ed07de0b312.webm'
segments=[('manual_merge',312,7),('first_deploy',381,15),('redeploy_combat',672,18),('hold_full_board',1098,8),('settings_continuity',1684,13),('reserve_merges',2381,10),('boss_retry_win',2860,30),('auto_activation',3775,14),('auto_cascade',3807,14),('account_level_unlock',3834,4),('offline_return',4045,12)]
out=ROOT/'analysis/reference/clips';out.mkdir(exist_ok=True)
rows=[]
for name,start,duration in segments:
 target=out/(name+'.mp4')
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(duration),'-vf','crop=540:954:450:0','-an','-c:v','libx264','-preset','veryfast','-crf','20',str(target)],check=True)
 rows.append({'clipId':name,'source':str(source.relative_to(ROOT)),'sourceStartPtsSeconds':start,'durationSeconds':duration,'clip':str(target.relative_to(ROOT)),'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'audio':'none','notes':'Cropped game viewport; original silent25fps recording retained. Command timestamps are monotonic observations, not exact frame PTS.'})
for name,start,count,step,crop in [('merge_frames',313.5,24,.1,'crop=540:570:450:330'),('auto_frames',3808.0,30,.2,'crop=540:570:450:330'),('boss_frames',2862,30,.5,'crop=540:450:450:0')]:
 frame_dir=ROOT/'analysis/reference/frames'/name;frame_dir.mkdir(parents=True,exist_ok=True)
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(source),'-vf',f'fps={1/step},{crop},scale=216:-1','-frames:v',str(count),str(frame_dir/'%03d.jpg')],check=True)
 frames=sorted(frame_dir.glob('*.jpg'));w=216;h=Image.open(frames[0]).height+24;cols=6
 sheet=Image.new('RGB',(cols*w,((len(frames)+cols-1)//cols)*h),'#222222');d=ImageDraw.Draw(sheet)
 for i,p in enumerate(frames):
  im=Image.open(p);x=(i%cols)*w;y=(i//cols)*h;sheet.paste(im,(x,y+24));d.text((x+4,y+5),f'{start+i*step:.2f}s nominal',fill='white')
 sheet.save(ROOT/'analysis/reference/frames'/(name+'.jpg'),quality=90)
dump('analysis/reference/video_clips.json',rows)
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=index,codec_name,r_frame_rate,time_base','-of','json',str(source)]))
probe.update({'source':str(source.relative_to(ROOT)),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'captureMode':'Playwright page video; silent;25fps; tool command timestamps approximate source PTS within scheduling offset; measure frame PTS for exact timing'})
dump('analysis/reference/video_metadata.json',probe)
print('clips',len(rows),'frame sheets',3)
