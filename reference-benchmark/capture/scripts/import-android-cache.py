#!/usr/bin/env python3
"""Archive exact public bytes delivered by the isolated Android WebView fallback."""
import tarfile,pathlib,json,hashlib,mimetypes,datetime,base64
ROOT=pathlib.Path(__file__).resolve().parents[2];p=ROOT/'capture/reports/resource-index.json';d=json.loads(p.read_text());known={(r['url'],r.get('sha256')) for r in d['resources']};rows=[]
base='https://files.crazygames.com/heroes-unite/51/'
with tarfile.open(ROOT/'capture/android-fallback.tar') as tf:
 for member in tf.getmembers():
  name=member.name.removeprefix('./')
  if not member.isfile() or not name.startswith('assets/') or '..' in pathlib.PurePosixPath(name).parts or name.endswith('.part'):continue
  body=tf.extractfile(member).read();h=hashlib.sha256(body).hexdigest();url=base+name
  if (url,h) in known:continue
  dest=f'capture/responses/sha256/{h[:2]}/{h}';out=ROOT/dest;out.parent.mkdir(parents=True,exist_ok=True)
  if not out.exists():out.write_bytes(body)
  r={'url':url,'hostname':'files.crazygames.com','pathname':'/heroes-unite/51/'+name,'method':'GET','status':200,'mime':mimetypes.guess_type(name)[0] or 'application/octet-stream','mimeSource':'inferred from extension; original header not retained by Android cache','resourceType':'other','category':'game-android-webview-fallback','timestamp':datetime.datetime.fromtimestamp(member.mtime,datetime.timezone.utc).isoformat(),'size':len(body),'sha256':h,'capturedPath':dest,'headers':{},'captureSource':'Actual HTTP 200 bytes delivered to Android WebView by pinned public asset fallback; cache exported with adb run-as. No game/guest state exported.'};d['resources'].append(r);rows.append(r);known.add((url,h))
for k in ['requests','successfulResponses','resourcesCaptured']:d[k]+=len(rows)
unique={r['sha256']:r['size'] for r in d['resources'] if r.get('sha256')};d['uniqueBodies']=len(unique);d['uniqueBytes']=sum(unique.values());d['androidCacheImport']={'resources':len(rows),'bytes':sum(r['size'] for r in rows)};p.write_text(json.dumps(d,indent=2));(ROOT/'capture/reports/android-cache-import.json').write_text(json.dumps({'summary':d['androidCacheImport'],'resources':rows},indent=2));print(json.dumps(d['androidCacheImport']))
