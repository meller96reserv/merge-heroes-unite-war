"""Package Cocos source or the private Android/iOS delivery (includes signing keys)."""
from pathlib import Path
import argparse, hashlib, json, os, shutil, subprocess, zipfile

P = Path(__file__).resolve().parents[1]
release=json.loads((P/'release.json').read_text());version=release['version'];build=release['build']
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-only', action='store_true', help='Package committed source inputs without native builds or private keys')
parser.add_argument('--review', action='store_true', help='Package current debug APK/AAB and source without private signing or iOS claims')
parser.add_argument('--android-release', action='store_true', help='Package signed Android APK/AAB, source and private signing material')
parser.add_argument('--output', type=Path, help='Source-only destination ZIP')
parser.add_argument('--evidence', type=Path, help='Actual verification JSON for these exact artifacts; omitted means NOT_RUN')
args=parser.parse_args()
if args.output and not args.source_only: parser.error('--output requires --source-only')
if sum(bool(x) for x in (args.review,args.source_only,args.android_release)) > 1:
    parser.error('--review, --source-only and --android-release are mutually exclusive')
verification={'status':'NOT_RUN','note':'No verification record supplied for these artifacts.'}
if args.evidence:
    verification=json.loads(args.evidence.read_text())
    if (verification.get('version'),verification.get('build')) != (version,build):
        parser.error('Evidence version/build does not match release.json')
out = P/f'build/delivery/{version}-{build}'
stem = 'com.mergeheroes.unitewar'
sourcezip = args.output if args.source_only and args.output else out/f'{stem}.zip'
sourcezip.parent.mkdir(parents=True,exist_ok=True)
# Explicit source inputs: no private credentials, editor caches, raw audio or logs.
roots = ['assets', 'settings', 'native', 'branding', 'audio-licenses', 'legal', 'releases']
files = [P/name for name in ['README.md', 'HANDOFF.md', 'DEVELOPMENT.md', 'package.json', 'package-lock.json', 'tsconfig.json',
                            'build-profile.json', 'build-profile-ios.json', 'release.json', 'app-services.json', 'PLAN-1.8.md',
                            'tools/prepare-services.py','tools/prepare-signing.py','tools/publish-legal.py','tools/check-port.cjs',
                            'tools/build.py', 'tools/build-ios.py', 'tools/package-builds.py', 'tools/import-licensed-audio.py']]
excluded={'build','.cxx','.gradle','node_modules','Pods','__pycache__','private'}
for name in roots:
    files.extend(p for p in (P/name).rglob('*') if p.is_file() and not any(x in excluded for x in p.relative_to(P).parts))
with zipfile.ZipFile(sourcezip, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for path in sorted(files):
        if path.name.startswith('.') or path.name=='local.properties' or path.suffix in {'.log', '.jks', '.keystore', '.apk', '.aab', '.pyc'}:
            continue
        z.write(path, 'MergeHeroesUniteWar/'+str(path.relative_to(P)))
if args.source_only:
    print(sourcezip,sourcezip.stat().st_size,'bytes');raise SystemExit(0)
if args.review:
    apk=P/'build/android/merge-heroes-unite-war-debug.apk'
    aab=next((P/'build/android/proj').rglob('*-debug.aab'),None)
    if not apk.is_file() or aab is None: raise SystemExit('Current debug APK/AAB are required')
    artifacts={'projectSource':sourcezip}
    for key,source in [('apk',apk),('aab',aab)]:
        dest=out/f'{stem}.{key}';shutil.copy2(source,dest);artifacts[key]=dest
    shutil.copy2(P/'HANDOFF.md',out/'README.md')
    def digest(path):
        with path.open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
    manifest={'name':'Merge Heroes Unite War','version':version,'build':build,'package':stem,
        'engine':'Cocos Creator 3.8.8 native','purpose':'Android review build',
        'artifacts':{k:{'file':v.name,'bytes':v.stat().st_size,'sha256':digest(v)} for k,v in artifacts.items()},
        'signing':'Android debug signing; not a store submission package',
        'ios':'NOT_BUILT: iOS Simulator requires macOS and Xcode','verification':verification}
    (out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    checks=[*artifacts.values(),out/'README.md',out/'manifest.json']
    (out/'SHA256SUMS').write_text(''.join(f'{digest(p)}  {p.name}\n' for p in checks))
    complete=out.parent/f'merge-heroes-unite-war-{version}-{build}-android-review.zip'
    with zipfile.ZipFile(complete,'w',compression=zipfile.ZIP_STORED) as z:
        for path in sorted(out.iterdir()):
            if path.is_file():z.write(path,out.name+'/'+path.name)
    print(complete,complete.stat().st_size,'bytes')
    for key,path in artifacts.items():print(key,path.name,path.stat().st_size)
    raise SystemExit(0)
if args.android_release:
    out = P/f'build/delivery/{version}-{build}-android-release'
    out.mkdir(parents=True,exist_ok=True)
    sourcezip = out/f'{stem}.zip'
    with zipfile.ZipFile(sourcezip,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
        for path in sorted(files):
            if path.name.startswith('.') or path.name=='local.properties' or path.suffix in {'.log','.jks','.keystore','.apk','.aab','.pyc'}: continue
            z.write(path,'MergeHeroesUniteWar/'+str(path.relative_to(P)))
    apk=P/f'build/android/merge-heroes-unite-war-{version}.apk'
    aab=next((P/'build/android/proj/build/MergeHeroesUniteWar/outputs/bundle/release').glob('*-release.aab'),None)
    if not apk.is_file() or aab is None: raise SystemExit('Current signed release APK/AAB are required')
    artifacts={'projectSource':sourcezip}
    for key,source in [('apk',apk),('aab',aab)]:
        dest=out/f'{stem}.{key}';shutil.copy2(source,dest);artifacts[key]=dest
    shutil.copy2(P/'HANDOFF.md',out/'README.md')
    settings=json.loads((P/'app-services.json').read_text())
    settings.update(version=version,build=build,appleTeamId=None,androidSigning=json.loads((P/'private/android-signing.json').read_text()))
    key=out/f'{stem}.jks';shutil.copy2(P/'private'/key.name,key);os.chmod(key,0o600);artifacts['androidKeystore']=key
    private=out/'project-settings.private.json';private.write_text(json.dumps(settings,indent=2)+'\n');os.chmod(private,0o600)
    submission=out/'SUBMISSION.txt'
    submission.write_text(f'''Merge Heroes Unite War
com.mergeheroes.unitewar
v {version} (build {build})

start.io
Android ID: NOT PROVIDED
iOS ID: NOT PROVIDED

appmetrica
com.mergeheroes.unitewar
69728c63-1c5c-4239-976f-cdfca334fb55

дизайн:
https://www.figma.com/design/Yc3y8PHv9qJdh1fXUzLl1S/Merge-Heroes-Unite-War?node-id=0-1

ID Products:
нет

Платных продуктов и встроенных покупок нет.
''',encoding='utf-8')
    def digest(path):
        with path.open('rb') as f:return hashlib.file_digest(f,'sha256').hexdigest()
    manifest={'name':'Merge Heroes Unite War','version':version,'build':build,'package':stem,'engine':'Cocos Creator 3.8.8 native','purpose':'Private Android store submission package','artifacts':{k:{'file':v.name,'bytes':v.stat().st_size,'sha256':digest(v)} for k,v in artifacts.items()},'signing':'New persistent release RSA 3072 identity; credentials are in project-settings.private.json','services':{'startIo':'NOT PROVIDED','appMetricaApiKey':'69728c63-1c5c-4239-976f-cdfca334fb55'},'iapProducts':[],'ios':'NOT_BUILT: physical iOS build requires macOS, Xcode and Apple signing','verification':verification}
    (out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    checks=[*artifacts.values(),out/'README.md',private,submission,out/'manifest.json']
    (out/'SHA256SUMS').write_text(''.join(f'{digest(p)}  {p.name}\n' for p in checks))
    complete=out.parent/f'merge-heroes-unite-war-{version}-{build}-android-release-private.zip'
    with zipfile.ZipFile(complete,'w',compression=zipfile.ZIP_STORED) as z:
        for path in sorted(out.iterdir()):
            if path.is_file():z.write(path,out.name+'/'+path.name)
    os.chmod(complete,0o600)
    print(complete,complete.stat().st_size,'bytes')
    for key,path in artifacts.items():print(key,path.name,path.stat().st_size)
    raise SystemExit(0)
out.mkdir(parents=True, exist_ok=True)
artifacts = {'projectSource':sourcezip}
for key, source in [('apk', P/f'build/android/merge-heroes-unite-war-{version}.apk'),
                    ('aab', next((P/'build/android').rglob('*-release.aab')))]:
    dest = out/f'{stem}.{key}'
    shutil.copy2(source, dest)
    artifacts[key] = dest
app = P/'build/ios/derived-simulator/Build/Products/Release-iphonesimulator/MergeHeroesUniteWar-mobile.app'
assert (app/'MergeHeroesUniteWar-mobile').is_file()
sim = out/f'{stem}.ios-simulator.zip'
subprocess.run(['ditto', '-c', '-k', '--sequesterRsrc', '--keepParent', str(app), str(sim)], check=True)
artifacts['iosSimulator'] = sim
shutil.copy2(P/'HANDOFF.md', out/'README.md')

settings=json.loads((P/'app-services.json').read_text())
settings.update(version=version,build=build,appleTeamId=None,androidSigning=json.loads((P/'private/android-signing.json').read_text()))
key=out/f'{stem}.jks';shutil.copy2(P/'private'/key.name,key);os.chmod(key,0o600);artifacts['androidKeystore']=key
private = out/'project-settings.private.json'
fd = os.open(private, os.O_WRONLY|os.O_CREAT|os.O_TRUNC, 0o600)
with os.fdopen(fd, 'w') as f: json.dump(settings, f, indent=2)
os.chmod(private, 0o600)

def digest(path):
    with path.open('rb') as f: return hashlib.file_digest(f, 'sha256').hexdigest()
manifest = {'name': 'Merge Heroes Unite War', 'version': version, 'build': build,
    'engine': 'Cocos Creator 3.8.8 native; no React Native or WebView',
    'package': 'com.mergeheroes.unitewar',
    'source': 'Current Cocos working tree, bundled in projectSource',
    'signing': {'android': 'Release; dedicated persistent RSA 3072 certificate supplied privately',
                'ios': 'Unsigned arm64 Simulator; not installable on physical iPhone'},
    'artifacts': {k: {'file': v.name, 'bytes': v.stat().st_size, 'sha256': digest(v)} for k,v in artifacts.items()},
    'projectSettings': private.name,
    'releaseLimitations': ['Physical iPhone/TestFlight needs owner Apple signing and an iphoneos build.',
                           'Live rewarded inventory needs owner Start.io Android/iOS App IDs.',
                           'GitLab publication needs target repository/access; AppMetrica dashboard delivery needs owner verification.'],
    'verification': verification,
    'deliveryComplete': False}
(out/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
checks = [*artifacts.values(), out/'README.md', private, out/'manifest.json']
(out/'SHA256SUMS').write_text(''.join(f'{digest(p)}  {p.name}\n' for p in checks))
print(out)
for key, path in artifacts.items(): print(key, path.name, path.stat().st_size)
complete = out.parent/f'merge-heroes-unite-war-{version}-{build}.zip'
with zipfile.ZipFile(complete, 'w', compression=zipfile.ZIP_STORED) as z:
    for path in sorted(out.iterdir()):
        if path.is_file(): z.write(path, out.name+'/'+path.name)
os.chmod(complete,0o600)
print('Complete package (contains private signing material)', complete, complete.stat().st_size)
