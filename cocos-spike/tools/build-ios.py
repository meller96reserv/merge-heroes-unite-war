"""Build the existing Cocos game for Apple Silicon Simulator or unsigned iPhone.

Run from any directory; Creator itself runs with cwd=project.
"""
from pathlib import Path
import argparse, json, os, plistlib, re, shutil, subprocess, sys

P = Path(__file__).resolve().parents[1]
R = P.parent
release = json.loads((P/'release.json').read_text())
args = argparse.ArgumentParser()
args.add_argument('--skip-export', action='store_true')
args.add_argument('--device', action='store_true')
opts = args.parse_args()
creator = Path(os.environ.get('COCOS_CREATOR_APP', str(R/'.tools/cocos-3.8.8/CocosCreator.app')))/'Contents'
engine = creator/'Resources/resources/3d/engine'
env = os.environ.copy()
env.pop('ELECTRON_RUN_AS_NODE', None)
env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
node = R/'.tools/node-v22.23.2-darwin-arm64/bin'
if node.exists(): env['PATH'] = str(node)+os.pathsep+env['PATH']
(P/'benchmark').mkdir(exist_ok=True)

def run(command, name, allowed=(0,)):
    print('Running', name, flush=True)
    with (P/'benchmark'/name).open('w') as log:
        code = subprocess.call(list(map(str, command)), cwd=P, env=env, stdout=log, stderr=subprocess.STDOUT)
    if code not in allowed:
        print('Failed; see', P/'benchmark'/name, flush=True)
        raise SystemExit(code)
    print('Completed', name, flush=True)

subprocess.run([sys.executable,P/'tools/prepare-services.py'],check=True)
if not opts.skip_export:
    run([creator/'MacOS/CocosCreator', '--project', P, '--build',
         f'configPath={P}/build-profile-ios.json;logDest={P}/benchmark/creator-ios-build.log'],
        'creator-ios-console.log', (0, 36))
export = P/'build/ios'
settings = export/'data/src/settings.json'
value = json.loads(settings.read_text())
value['splashScreen'] = {'totalTime': 0, 'logo': {'type': 'none'},
    'background': {'type': 'color', 'color': {'x': .03, 'y': .08, 'z': .13, 'w': 1}}}
settings.write_text(json.dumps(value, separators=(',', ':')))

# Apple's native audio loader does not decode the Android Ogg effects. Package
# short effects as lossless PCM on iOS; retain their UUIDs and original duration.
audio_root = export/'data/assets/resources'
for source in (audio_root/'native').rglob('*.ogg'):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(source),
                    '-c:a', 'pcm_s16le', str(source.with_suffix('.wav'))], check=True)
    source.unlink()
for metadata in (audio_root/'import').rglob('*.json'):
    data = metadata.read_text()
    if '".ogg"' in data: metadata.write_text(data.replace('".ogg"', '".wav"'))

native = P/'native/engine/ios'
info = plistlib.loads((native/'Info.plist').read_bytes())
info.update(CFBundleDisplayName='Merge Heroes Unite War', CFBundleName='Merge Heroes Unite War',
            CFBundleShortVersionString=release['version'], CFBundleVersion=str(release['build']),
            UISupportedInterfaceOrientations=['UIInterfaceOrientationPortrait'],
            UIRequiredDeviceCapabilities=['arm64', 'metal'])
info.pop('NSAppTransportSecurity', None)
(native/'Info.plist').write_bytes(plistlib.dumps(info))

# Existing tracked game artwork only.
branding = P/'branding'
for name in ['app-icon.png', 'game-logo.png']:
    assert (branding/name).is_file(), 'Missing tracked branding/'+name
icons = native/'Images.xcassets/AppIcon.appiconset'
entries = []
sizes = set()
for idiom, points, scales in [('iphone', [20,29,40,60], [2,3]), ('ipad', [20,29,40,76], [1,2]), ('ipad', [83.5], [2]), ('ios-marketing', [1024], [1])]:
    for point in points:
        for scale in scales:
            pixels = round(point*scale); sizes.add(pixels)
            entries.append({'idiom': idiom, 'size': f'{point}x{point}', 'scale': f'{scale}x', 'filename': f'game-{pixels}.png'})
for pixels in sorted(sizes):
    subprocess.run(['sips', '-z', str(pixels), str(pixels), str(branding/'app-icon.png'), '--out', str(icons/f'game-{pixels}.png')], check=True, stdout=subprocess.DEVNULL)
(icons/'Contents.json').write_text(json.dumps({'images': entries, 'info': {'version':1,'author':'xcode'}}, indent=2))
shutil.copy2(branding/'game-logo.png', native/'LaunchScreenBackground.png')
story = native/'Base.lproj/LaunchScreen.storyboard'
story.write_text('''<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="13196" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" colorMatched="YES" initialViewController="launch-controller">
<device id="retina6_12" orientation="portrait" appearance="light"/>
<dependencies><plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="13173"/><capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/></dependencies>
<scenes><scene sceneID="launch-scene"><objects><viewController id="launch-controller" sceneMemberID="viewController"><view key="view" contentMode="scaleToFill" id="launch-view"><rect key="frame" x="0" y="0" width="390" height="844"/><autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/><subviews><imageView opaque="NO" contentMode="scaleAspectFit" image="LaunchScreenBackground.png" translatesAutoresizingMaskIntoConstraints="NO" id="game-logo"><rect key="frame" x="55" y="317" width="280" height="210"/><constraints><constraint firstAttribute="width" constant="280" id="logo-width"/><constraint firstAttribute="height" constant="210" id="logo-height"/></constraints></imageView></subviews><color key="backgroundColor" red="0.031" green="0.176" blue="0.275" alpha="1" colorSpace="custom" customColorSpace="sRGB"/><constraints><constraint firstItem="game-logo" firstAttribute="centerX" secondItem="launch-view" secondAttribute="centerX" id="logo-x"/><constraint firstItem="game-logo" firstAttribute="centerY" secondItem="launch-view" secondAttribute="centerY" id="logo-y"/></constraints></view></viewController><placeholder placeholderIdentifier="IBFirstResponder" id="first-responder" sceneMemberID="firstResponder"/></objects></scene></scenes><resources><image name="LaunchScreenBackground.png" width="1448" height="1086"/></resources></document>
''')

sdk = 'iphoneos' if opts.device else 'iphonesimulator'
target = 'device' if opts.device else 'simulator'
proj = export/f'xcode-{target}'
run([creator/'Resources/tools/cmake/bin/cmake', '-S', native, '-B', proj, '-G', 'Xcode',
     '-DCMAKE_SYSTEM_NAME=iOS', f'-DCMAKE_OSX_SYSROOT={sdk}', '-DCMAKE_OSX_ARCHITECTURES=arm64',
     '-DCMAKE_SUPPRESS_REGENERATION=ON', '-DCMAKE_OSX_DEPLOYMENT_TARGET=16.4', f'-DRES_DIR={export}', '-DAPP_NAME=MergeHeroesUniteWar',
     '-DLAUNCH_TYPE=Release', '-DCMAKE_XCODE_ATTRIBUTE_CODE_SIGNING_ALLOWED=NO'], f'ios-{target}-configure.log')
project = proj/'MergeHeroesUniteWar.xcodeproj'
if not opts.device:
    # Creator 3.8.8 defaults to x86 Simulator libraries. It ships separate M1
    # binaries; switch generated references only, leaving the installed engine intact.
    for pbx in proj.rglob('project.pbxproj'):
        text = pbx.read_text().replace('/external/ios/', '/external/ios-m1-simulator/')
        pbx.write_text(text)
# Native SDKs only; CocoaPods does not bring React Native into this target.
podfile=proj/'Podfile'
podfile.write_text("platform :ios, '16.4'\nproject 'MergeHeroesUniteWar.xcodeproj'\nuse_frameworks! :linkage => :static\ntarget 'MergeHeroesUniteWar-mobile' do\n  pod 'StartAppSDK', '4.14.0'\n  pod 'AppMetricaAnalytics', '6.6.0'\nend\n")
run(['pod','install','--project-directory='+str(proj)],'ios-'+target+'-pods.log')
run(['xcodebuild', '-workspace', proj/'MergeHeroesUniteWar.xcworkspace', '-scheme', 'MergeHeroesUniteWar-mobile',
     '-configuration', 'Release', '-sdk', sdk, '-destination',
     'generic/platform=iOS' if opts.device else 'generic/platform=iOS Simulator',
     '-derivedDataPath', export/f'derived-{target}', '-jobs', '4',
     'ARCHS=arm64', 'VALID_ARCHS=arm64', 'EXCLUDED_ARCHS=', 'CODE_SIGNING_ALLOWED=NO',
     'CODE_SIGNING_REQUIRED=NO', 'build'], f'ios-{target}-release.log')
app = export/f'derived-{target}/Build/Products/Release-{sdk}/MergeHeroesUniteWar-mobile.app'
assert (app/'MergeHeroesUniteWar-mobile').is_file()
print(app, flush=True)
