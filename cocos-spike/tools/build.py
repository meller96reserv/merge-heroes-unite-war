"""Export the isolated Cocos project, then compile/sign its standalone Android APK."""
from pathlib import Path
import os, subprocess, sys, shutil, json

P=Path(__file__).resolve().parents[1]; R=P.parent; WINDOWS=os.name=='nt'; DEBUG='--debug' in sys.argv
RELEASE=json.loads((P/'release.json').read_text()); VERSION=RELEASE['version']; BUILD=RELEASE['build']
JAVA=Path(os.environ.get('JAVA_HOME','/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home'))
SDK=Path(os.environ.get('ANDROID_HOME',str(Path.home()/'Library/Android/sdk')))
NDK=Path(os.environ.get('NDK_ROOT',os.environ.get('ANDROID_NDK_HOME',str(SDK/'ndk/24.0.8215888') if WINDOWS else str(R/'.tools/android-ndk-r24'))))
if WINDOWS:
    CREATOR_BIN=Path(os.environ.get('COCOS_CREATOR_EXE','C:/Program Files/CocosCreator/3.8.8/CocosCreator.exe'))
else:
    CREATOR_BIN=Path(os.environ.get('COCOS_CREATOR_APP',str(R/'.tools/cocos-3.8.8/CocosCreator.app')))/'Contents/MacOS/CocosCreator'
env=os.environ.copy(); env.pop('ELECTRON_RUN_AS_NODE',None)
env['NODE_TLS_REJECT_UNAUTHORIZED']='1'
env.update(JAVA_HOME=str(JAVA),ANDROID_HOME=str(SDK),ANDROID_SDK_ROOT=str(SDK),NDK_ROOT=str(NDK),GRADLE_USER_HOME=os.environ.get('GRADLE_USER_HOME',str(R/'.tools/gradle-cache')))
node_bin=Path(os.environ.get('NODE22_HOME','C:/Users/pksto/AppData/Local/Programs/node-v22.23.2-win-x64')) if WINDOWS else R/'.tools/node-v22.23.2-darwin-arm64/bin'
env['PATH']=os.pathsep.join(map(str,[node_bin,JAVA/'bin',SDK/'cmake/3.22.1/bin',SDK/'platform-tools']))+os.pathsep+env['PATH']
def run(args,cwd,log,success=(0,)):
    print('Running',args[0],flush=True)
    with (P/'benchmark'/log).open('w') as f: code=subprocess.call(list(map(str,args)),cwd=cwd,env=env,stdout=f,stderr=subprocess.STDOUT)
    if code not in success:
        print((P/'benchmark'/log).read_text(errors='replace')[-7000:]); raise SystemExit(code)
    print('Completed',log,flush=True)
(P/'benchmark').mkdir(exist_ok=True)
subprocess.run([sys.executable,P/'tools/prepare-services.py'],check=True)
if '--export-only' not in sys.argv and not DEBUG:
    subprocess.run([sys.executable,P/'tools/prepare-signing.py'],check=True)
if '--gradle-only' not in sys.argv:
    if not CREATOR_BIN.is_file():raise SystemExit(f'Cocos Creator 3.8.8 executable not found: {CREATOR_BIN}. Set COCOS_CREATOR_EXE.')
    profile=json.loads((P/'build-profile.json').read_text());profile['debug']=DEBUG;profile['packages']['android']['useDebugKeystore']=DEBUG
    profile['packages']['android'].update(sdkPath=str(SDK),ndkPath=str(NDK),javaHome=str(JAVA),javaPath=str(JAVA/'bin/java'))
    config=P/'benchmark/android-build-profile.local.json';config.write_text(json.dumps(profile))
    run([CREATOR_BIN,'--project',P,'--build',f'configPath={config};logDest={P}/benchmark/creator-build.log'],P,'creator-console.log',(0,36))
# The engine exposes this setting; remove the default timed Cocos splash from
# every export, including editor exports used for later incremental builds.
settings=P/'build/android/data/src/settings.json'
if settings.exists():
    value=json.loads(settings.read_text())
    value['splashScreen']={'totalTime':0,'logo':{'type':'none'},'background':{'type':'color','color':{'x':0.03,'y':0.08,'z':0.13,'w':1}}}
    settings.write_text(json.dumps(value,separators=(',',':')))
if '--export-only' in sys.argv: raise SystemExit(0)
native=P/'native/engine/android'
strings=P/'build/android/proj/res/values/strings.xml'
if strings.exists():
    import re
    value=strings.read_text(); value=re.sub(r'(<string name="app_name"[^>]*>).*?(</string>)',r'\1Merge Heroes Unite War\2',value); strings.write_text(value)
manifest=native/'app/AndroidManifest.xml'
if manifest.exists():
    import re
    value=manifest.read_text()
    value=re.sub(r'\s*<uses-permission[^>]+(?:android.permission.(?:INTERNET|ACCESS_NETWORK_STATE|ACCESS_WIFI_STATE|POST_NOTIFICATIONS)|com.android.vending.BILLING)[^>]*/>', '', value)
    if 'xmlns:tools=' not in value:value=value.replace('<manifest ', '<manifest xmlns:tools="http://schemas.android.com/tools" ',1)
    value=value.replace('<application', '\n'.join('<uses-permission android:name="'+p+'"/>' for p in ['android.permission.INTERNET','android.permission.ACCESS_NETWORK_STATE','android.permission.POST_NOTIFICATIONS'])+'\n<uses-permission android:name="com.android.vending.BILLING" tools:node="remove"/>\n<application',1)
    if 'com.cocos.game.GameReminder' not in value:value=value.replace('</application>','<receiver android:name="com.cocos.game.GameReminder" android:exported="false"/></application>')
    if 'StartAppInitProvider' not in value:value=value.replace('</application>','<provider android:name="com.startapp.sdk.adsbase.StartAppInitProvider" android:authorities="${applicationId}.startappinitprovider" tools:node="remove"/></application>')
    value=value.replace('android:usesCleartextTraffic="true"','android:usesCleartextTraffic="false"')
    value=value.replace('android:theme="@android:style/Theme.NoTitleBar.Fullscreen"','android:theme="@style/GameTheme"')
    if 'android:roundIcon=' not in value:value=value.replace('android:icon="@mipmap/ic_launcher"','android:icon="@mipmap/ic_launcher" android:roundIcon="@mipmap/ic_launcher_round"')
    manifest.write_text(value)
proj=P/'build/android/proj'
# Reuse the production app's existing launcher exports at their native densities.
for root in [native/'res',native/'app/res']:
    for default in root.glob('mipmap-*/ic_launcher.*'):default.unlink()
icon_source=P/'branding/android'
assert icon_source.is_dir(), 'Missing tracked branding/android icons'
for source in icon_source.glob('mipmap-*/ic_launcher.webp'):
    target=proj/'res'/source.parent.name
    target.mkdir(parents=True,exist_ok=True)
    for prior in target.glob('ic_launcher.*'): prior.unlink()
    shutil.copy2(source,target/'ic_launcher_art.webp')
res=proj/'res'
def resource(path,text):
    target=res/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(text)
(res/'drawable-nodpi').mkdir(parents=True,exist_ok=True)
logo=P/'branding/game-logo.png'
assert logo.is_file(), 'Missing tracked branding/game-logo.png'
shutil.copy2(logo,res/'drawable-nodpi/game_logo.png')
adaptive_foreground=icon_source/'adaptive/ic_launcher_foreground.png'
assert adaptive_foreground.is_file(), 'Missing tracked adaptive icon foreground'
shutil.copy2(adaptive_foreground,res/'drawable-nodpi/ic_launcher_foreground.png')
resource('values/game_branding.xml','''<resources><color name="game_icon_background">#082D46</color>
<style name="GameTheme" parent="android:style/Theme.NoTitleBar.Fullscreen"><item name="android:windowBackground">@color/game_icon_background</item></style></resources>''')
resource('drawable/game_icon_foreground.xml','''<layer-list xmlns:android="http://schemas.android.com/apk/res/android"><item android:width="44dp" android:height="34dp" android:gravity="center" android:drawable="@drawable/game_logo"/></layer-list>''')
legacy='''<layer-list xmlns:android="http://schemas.android.com/apk/res/android"><item android:drawable="@color/game_icon_background"/><item android:drawable="@mipmap/ic_launcher_art"/></layer-list>'''
for name in ['ic_launcher','ic_launcher_round']:resource('mipmap-anydpi/'+name+'.xml',legacy)
adaptive='''<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/game_icon_background"/><foreground android:drawable="@drawable/ic_launcher_foreground"/></adaptive-icon>'''
for name in ['ic_launcher','ic_launcher_round']:resource('mipmap-anydpi-v26/'+name+'.xml',adaptive)
resource('values-v31/game_branding.xml','''<resources><style name="GameTheme" parent="android:style/Theme.NoTitleBar.Fullscreen">
<item name="android:windowBackground">@color/game_icon_background</item><item name="android:windowSplashScreenBackground">@color/game_icon_background</item><item name="android:windowSplashScreenAnimatedIcon">@drawable/game_icon_foreground</item><item name="android:windowSplashScreenAnimationDuration">0</item></style></resources>''')
app_gradle=native/'app/build.gradle'
if app_gradle.exists():
    import re
    value=app_gradle.read_text()
    value=re.sub(r'versionCode \d+', f'versionCode {BUILD}', value)
    value=re.sub(r'versionName "[^"]+"', f'versionName "{VERSION}"', value)
    app_gradle.write_text(value)
# The new production identity uses its own persistent release certificate.
props=proj/'gradle.properties'
props.write_text('\n'.join(line for line in props.read_text().splitlines() if not line.startswith('RELEASE_'))+'\n')
if DEBUG:tasks=['assembleDebug']
else:
    credentials=json.loads((P/'private/android-signing.json').read_text())
    for k,v in {'RELEASE_STORE_FILE':str(P/'private/com.mergeheroes.unitewar.jks'),'RELEASE_STORE_PASSWORD':credentials['storePassword'],'RELEASE_KEY_ALIAS':credentials['alias'],'RELEASE_KEY_PASSWORD':credentials['keyPassword']}.items():env['ORG_GRADLE_PROJECT_'+k]=v
    tasks=['assembleRelease']+(['bundleRelease'] if '--bundle' in sys.argv else [])
gradle=[proj/('gradlew.bat' if WINDOWS else 'gradlew')] if WINDOWS else ['bash',proj/'gradlew']
run([*gradle,*tasks,'--max-workers=4','-PPROP_MIN_SDK_VERSION=24','-PPROP_TARGET_SDK_VERSION=36'],proj,'gradle-debug.log' if DEBUG else 'gradle-release.log')
out=P/'build/android'/('merge-heroes-cocos-spike-debug.apk' if DEBUG else 'merge-heroes-cocos-spike.apk')
friendly=P/'build/android'/('merge-heroes-unite-war-debug.apk' if DEBUG else 'merge-heroes-unite-war.apk')
apks=[p for p in (P/'build/android').rglob('*-debug.apk' if DEBUG else '*-release.apk') if p.resolve() not in {out.resolve(),friendly.resolve()}]
if not apks: raise SystemExit('Missing debug APK' if DEBUG else 'Missing signed release APK')
shutil.copy2(apks[0],out)
if not DEBUG:shutil.copy2(out,P/f'build/android/merge-heroes-unite-war-{VERSION}.apk')
shutil.copy2(out,friendly)
print(friendly, friendly.stat().st_size, 'bytes',flush=True)
