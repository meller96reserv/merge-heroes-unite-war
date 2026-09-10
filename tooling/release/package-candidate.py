#!/usr/bin/env python3
"""Package accepted native outputs plus committed production source; never secrets/logs."""
from pathlib import Path
import subprocess,shutil,tarfile,zipfile,io,json,hashlib,os,re
root=Path(__file__).resolve().parents[2]
config=json.loads((root/'app.json').read_text())['expo']
version=config['version'];build=config['android']['versionCode']
assert str(build)==config['ios']['buildNumber'],'Native build numbers must match'
out=root/f'.tools/delivery/{version}-{build}';out.mkdir(parents=True,exist_ok=True)
package='com.mergeheroes.unitewar'
artifacts={}
for suffix,source in [('apk','android/app/build/outputs/apk/release/app-release.apk'),('aab','android/app/build/outputs/bundle/release/app-release.aab')]:
 dest=out/f'{package}.{suffix}';shutil.copyfile(root/source,dest);artifacts[suffix]=dest
sim=root/'.tools/rn-production-ios/Build/Products/Release-iphonesimulator/MergeHeroesUniteWar.app'
assert (sim/'main.jsbundle').is_file(),'Simulator must have embedded release JS'
# ditto preserves the application bundle layout and symlinks.
simzip=out/f'{package}.ios-simulator.zip'
subprocess.run(['ditto','-c','-k','--sequesterRsrc','--keepParent',str(sim),str(simzip)],check=True)
artifacts['iosSimulator']=simzip
commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
sourcezip=out/f'{package}.zip'
proc=subprocess.Popen(['git','archive','--format=tar',commit],cwd=root,stdout=subprocess.PIPE)
excluded=('analysis/figma/raw/','analysis/reference/clips/','spikes/')
with tarfile.open(fileobj=proc.stdout,mode='r|') as tar,zipfile.ZipFile(sourcezip,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for entry in tar:
  if not entry.isfile() or entry.name.startswith(excluded) or entry.name.endswith('.log'):continue
  assert not entry.name.endswith(('.keystore','.jks','.apk','.aab'))
  assert Path(entry.name).name=='.env.example' or not Path(entry.name).name.startswith('.env')
  z.writestr(entry.name,tar.extractfile(entry).read())
assert proc.wait()==0
artifacts['projectSource']=sourcezip
manifest={'package':package,'version':version,'build':build,'sourceCommit':commit,'sourceArchiveExcludes':'historical spikes, raw Figma research copies, reference clips and logs; runtime assets and semantic mappings retained','signing':{'android':'local development certificate / Release variant, candidate only','ios':'unsigned arm64 Simulator'},'artifacts':{key:{'path':str(path.relative_to(root)),'bytes':path.stat().st_size,'sha256':hashlib.file_digest(path.open('rb'),'sha256').hexdigest()} for key,path in artifacts.items()},'externalInputs':['owner Start.io Android/iOS application IDs and live completion acceptance','owner-approved Terms/Privacy HTTPS URLs','owner distribution accounts/signing and GitLab publication where required'],'deliveryComplete':False}
# App-specific identifier handoff stays local and is never printed or committed.
source=(root/'docs/tz/Merge Heroes Unite War тз на разработку.md').read_text()
match=re.search(r'[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}',source,re.I)
settings={'package':package,'appmetricaApiKey':os.environ.get('EXPO_PUBLIC_APPMETRICA_API_KEY') or (match[0] if match else None),'startioAndroidAppId':os.environ.get('EXPO_PUBLIC_STARTIO_ANDROID_APP_ID') or None,'startioIosAppId':os.environ.get('EXPO_PUBLIC_STARTIO_IOS_APP_ID') or None}
settingsPath=out/'project-settings.private.json'
fd=os.open(settingsPath,os.O_WRONLY|os.O_CREAT|os.O_TRUNC,0o600)
with os.fdopen(fd,'w') as f:json.dump(settings,f,indent=2)
os.chmod(settingsPath,0o600)
manifest['projectSettings']='project-settings.private.json (owner handoff; never log contents)'
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(out/'SHA256SUMS').write_text(''.join(v['sha256']+'  '+Path(v['path']).name+'\n' for v in manifest['artifacts'].values()))
print(json.dumps({'sourceCommit':commit,'artifacts':{k:v['path'] for k,v in manifest['artifacts'].items()}},indent=2))
