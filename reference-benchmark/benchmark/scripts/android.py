#!/usr/bin/env python3
"""Standalone Android build/install/launch; all outputs stay in this workspace."""
import os, sys, subprocess, shutil, pathlib, json, hashlib, time
ROOT=pathlib.Path(__file__).resolve().parents[2]
MODE='online' if '--online' in sys.argv else os.environ.get('REFERENCE_MODE','offline')
if MODE not in ('online','offline'):raise SystemExit('REFERENCE_MODE must be online or offline')
PACKAGE='com.kisel.referencebenchmark'+('.offline' if MODE=='offline' else '')
COMPONENT=PACKAGE+'/com.kisel.referencebenchmark.MainActivity'
APK=ROOT/'build/apk/heroes-unite-reference-benchmark.apk'
def sdk():
    candidates=[os.environ.get('ANDROID_HOME'),os.environ.get('ANDROID_SDK_ROOT'),str(pathlib.Path.home()/'Library/Android/sdk'),str(pathlib.Path.home()/'Android/Sdk')]
    for p in candidates:
        if p and (pathlib.Path(p)/'platform-tools/adb').exists():return pathlib.Path(p)
    raise SystemExit('Android SDK not found; install Android Studio SDK with platform 36 and build-tools 36.0.0, then set ANDROID_HOME.')
def adb(*args,check=True):
    cmd=[str(sdk()/'platform-tools/adb')]
    if os.environ.get('ANDROID_SERIAL'):cmd+=['-s',os.environ['ANDROID_SERIAL']]
    result=subprocess.run(cmd+list(args),capture_output=True,text=True)
    if check and result.returncode:raise SystemExit((result.stderr or result.stdout).strip())
    return result.stdout if result.returncode==0 else result.stdout+result.stderr
if __name__=='__main__':
    action=sys.argv[1] if len(sys.argv)>1 else 'build'
    if action=='build':
        if not (ROOT/'runtime/local/index.html').exists():raise SystemExit('Run npm run capture:prepare first.')
        if MODE=='offline':subprocess.run([sys.executable,str(ROOT/'capture/scripts/prepare-offline.py')],check=True)
        env=os.environ.copy();env['GRADLE_USER_HOME']=str(ROOT/'android/.gradle-home');env['ANDROID_USER_HOME']=str(ROOT/'android/.android-home');env['ANDROID_HOME']=str(sdk())
        if not env.get('JAVA_HOME'):
            java=shutil.which('java')
            if java:env['JAVA_HOME']=str(pathlib.Path(java).resolve().parents[1])
        (ROOT/'android/local.properties').write_text('sdk.dir='+str(sdk())+'\n')
        key=ROOT/'build/reference-debug.keystore'
        if not key.exists():subprocess.run([str(pathlib.Path(env['JAVA_HOME'])/'bin/keytool'),'-genkeypair','-keystore',str(key),'-storepass','android','-alias','androiddebugkey','-keypass','android','-dname','CN=Reference Benchmark Debug,O=Local,C=US','-keyalg','RSA','-keysize','2048','-validity','10000'],check=True,capture_output=True)
        log=ROOT/'capture/reports/android-build.log';started=time.time()
        task=':app:assemble'+MODE.capitalize()+'Debug'
        with log.open('w') as f:r=subprocess.run([str(ROOT/'android/gradlew'),'-p',str(ROOT/'android'),task,'--console=plain'],env=env,stdout=f,stderr=subprocess.STDOUT)
        if r.returncode:print('\n'.join(log.read_text().splitlines()[-35:]));raise SystemExit(r.returncode)
        APK.parent.mkdir(parents=True,exist_ok=True)
        # Preserve the delivered online artifact before making offline the default.
        old=ROOT/'capture/reports/android-build.json'
        if APK.exists() and old.exists():
            prior=json.loads(old.read_text())
            if prior.get('package')=='com.kisel.referencebenchmark':
                backup=APK.with_name('heroes-unite-reference-online.apk')
                if not backup.exists():shutil.copy2(APK,backup)
                shutil.copy2(old,old.with_name('android-build-online.json'))
        shutil.copy2(ROOT/f'android/app/build/outputs/apk/{MODE}/debug/app-{MODE}-debug.apk',APK)
        named=APK.with_name('heroes-unite-reference-'+MODE+'.apk');shutil.copy2(APK,named)
        report={'status':'SUCCESS','mode':MODE,'apk':str(APK.relative_to(ROOT)),'namedApk':str(named.relative_to(ROOT)),'bytes':APK.stat().st_size,'sha256':hashlib.sha256(APK.read_bytes()).hexdigest(),'buildSeconds':round(time.time()-started,2),'package':PACKAGE}
        (ROOT/'capture/reports/android-build.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
    elif action=='install':
        selected=APK.with_name('heroes-unite-reference-'+MODE+'.apk')
        if not selected.exists():raise SystemExit('Build the '+MODE+' variant before installing it')
        print(adb('install','-r',str(selected)))
    elif action=='run': print(adb('shell','am','start','-W','-n',COMPONENT))
    else:raise SystemExit('Use build, install or run')
