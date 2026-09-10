#!/usr/bin/env python3
"""Build the Cocos probe or integrated RN host with the pinned toolchain."""
import argparse
import json
import plistlib
from pathlib import Path
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('probe', choices=['cocos', 'rn'])
    parser.add_argument('platform', choices=['android', 'ios'])
    parser.add_argument('--skip-export', action='store_true', help='Reuse an existing Cocos native export')
    parser.add_argument('--jobs', type=int, default=2)
    args = parser.parse_args()
    if args.jobs < 1:
        parser.error('--jobs must be positive')
    spike = Path(__file__).resolve().parent
    root = spike.parents[1]
    project = spike / f'{args.probe}-probe'
    runner = [sys.executable, str(spike / 'run.py')]
    lock = json.loads((spike / 'toolchain.json').read_text())
    logs = spike / 'logs'
    logs.mkdir(exist_ok=True)
    if args.probe == 'cocos' and not args.skip_export:
        command = runner + ['cocos', '--project', str(project), '--build',
                            f'configPath={project / "build-profiles" / (args.platform + ".json")};'
                            f'logDest={logs / ("cocos-probe-" + args.platform + "-export.log")}']
        with (logs / f'cocos-{args.platform}-export-console.log').open('w') as output:
            result = subprocess.run(command, cwd=root, stdout=output, stderr=subprocess.STDOUT)
        if result.returncode:
            print(f'Cocos export failed; see {logs}', file=sys.stderr)
            return result.returncode
    if args.platform == 'android':
        if args.probe == 'rn':
            keystore = project / 'android/app/debug.keystore'
            if not keystore.exists():
                # Public development defaults only; no release signing key is generated here.
                subprocess.run([str(Path(lock['java']['home']) / 'bin/keytool'), '-genkeypair',
                    '-keystore', str(keystore), '-storepass', 'android', '-keypass', 'android',
                    '-alias', 'androiddebugkey', '-keyalg', 'RSA', '-keysize', '2048',
                    '-validity', '10000', '-dname', 'CN=Android Debug,O=Android,C=US'], check=True)
            subprocess.run([sys.executable, str(spike / 'prepare_android_host.py')], check=True, cwd=root)
        cwd = project / ('build/android/proj' if args.probe == 'cocos' else 'android')
        command = runner + ['gradle', 'assembleDebug', f'--max-workers={args.jobs}']
        if args.probe == 'cocos':
            command += [f'-PPROP_MIN_SDK_VERSION={lock["android"]["minSdk"]}',
                        f'-PPROP_TARGET_SDK_VERSION={lock["android"]["targetSdk"]}']
    else:
        if args.probe == 'rn':
            subprocess.run([sys.executable, str(spike / 'prepare_ios_host.py')], check=True, cwd=root)
        cwd = project / ('build/ios/proj' if args.probe == 'cocos' else 'ios')
        if args.probe == 'cocos':
            creator = root / lock['cocos']['path']
            cmake = creator.parents[1] / 'Resources/tools/cmake/bin/cmake'
            configure = [str(cmake), '-S', str(project / 'native/engine/ios'), '-B', str(cwd),
                         '-G', 'Xcode', f'-DRES_DIR={project / "build/ios"}',
                         f'-DNODE_EXECUTABLE={root / lock["node"]["path"]}',
                         '-DCMAKE_OSX_SYSROOT=iphonesimulator', '-DCMAKE_OSX_ARCHITECTURES=arm64',
                         '-DKISEL_APPLE_SILICON_SIMULATOR=ON']
            with (logs / 'cocos-ios-configure.log').open('w') as output:
                result = subprocess.run(configure, cwd=root, stdout=output, stderr=subprocess.STDOUT)
            if result.returncode:
                print(f'Cocos simulator configure failed; see {logs}', file=sys.stderr)
                return result.returncode
        target = ['-project', 'KiselCocosProbe.xcodeproj', '-scheme', 'KiselCocosProbe-mobile'] \
            if args.probe == 'cocos' else ['-workspace', 'KiselNativeProbe.xcworkspace', '-scheme', 'KiselNativeProbe']
        command = ['xcodebuild'] + target + ['-configuration', 'Debug', '-sdk', 'iphonesimulator', 'ARCHS=arm64',
                   '-destination', 'generic/platform=iOS Simulator', '-derivedDataPath',
                   str(root / '.tools' / f'{args.probe}-ios-derived'), '-jobs', str(args.jobs), 'build']
        if args.probe == 'cocos':
            command += ['EXCLUDED_ARCHS=', 'VALID_ARCHS=arm64']
    log = logs / (f'{args.platform}-host-build.log' if args.probe == 'rn' else f'cocos-{args.platform}-build.log')
    print(f'Building {args.probe} {args.platform}; log: {log}', flush=True)
    with log.open('w') as output:
        result = subprocess.run(command, cwd=cwd, stdout=output, stderr=subprocess.STDOUT)
    if result.returncode == 0 and args.platform == 'ios':
        app = cwd / 'Debug-iphonesimulator/KiselCocosProbe-mobile.app' if args.probe == 'cocos' else \
            root / '.tools/rn-ios-derived/Build/Products/Debug-iphonesimulator/KiselNativeProbe.app'
        info = plistlib.loads((app / 'Info.plist').read_bytes())
        binary = app / info['CFBundleExecutable']
        if not binary.is_file():
            print(f'Build produced no executable: {binary}', file=sys.stderr)
            return 1
        architecture = subprocess.run(['lipo', str(binary), '-verify_arch', 'arm64'])
        if architecture.returncode:
            return architecture.returncode
    print(f'Build exit: {result.returncode}. Runtime checks remain separate.')
    return result.returncode


if __name__ == '__main__':
    sys.exit(main())
