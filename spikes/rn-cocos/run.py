#!/usr/bin/env python3
"""Run a pinned spike tool with task-local environment settings."""
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
LOCK = json.loads((Path(__file__).parent / 'toolchain.json').read_text())


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in {'cocos', 'rn', 'node', 'npm', 'pod', 'gradle', 'maestro'}:
        print('Usage: python3 spikes/rn-cocos/run.py {cocos|rn|node|npm|pod|gradle|maestro} [arguments...]')
        return 2
    tool, *args = sys.argv[1:]
    if tool == 'cocos' and '--build' in args:
        index = args.index('--build') + 1
        options = dict(part.split('=', 1) for part in args[index].split(';') if '=' in part)
        if 'configPath' in options:
            config = json.loads(Path(options['configPath']).read_text())
            if config.get('platform') == 'android':
                android = config.setdefault('packages', {}).setdefault('android', {})
                android.update(sdkPath=LOCK['android']['sdk'],
                               ndkPath=str(ROOT / LOCK['android']['cocosNdkPath']),
                               javaHome=LOCK['java']['home'],
                               javaPath=str(Path(LOCK['java']['home']) / 'bin/java'))
                resolved = ROOT / '.tools' / f'cocos-android-{os.getpid()}.json'
                resolved.write_text(json.dumps(config, indent=2))
                options['configPath'] = str(resolved)
                args[index] = ';'.join(f'{k}={v}' for k, v in options.items())
    env = os.environ.copy()
    env.pop('ELECTRON_RUN_AS_NODE', None)
    node = ROOT / LOCK['node']['path']
    env.update(NODE_TLS_REJECT_UNAUTHORIZED='1',
               JAVA_HOME=LOCK['java']['home'],
               ANDROID_HOME=LOCK['android']['sdk'],
               ANDROID_SDK_ROOT=LOCK['android']['sdk'],
               NDK_ROOT=str(ROOT / LOCK['android']['cocosNdkPath']),
               GRADLE_USER_HOME=str(ROOT / '.tools/gradle-cache'),
               NPM_CONFIG_CACHE=str(ROOT / '.tools/npm-cache'),
               MAESTRO_CLI_NO_ANALYTICS='true',
               MAESTRO_CLI_ANALYSIS_NOTIFICATION_DISABLED='true',
               MAESTRO_DISABLE_UPDATE_CHECK='true')
    env['PATH'] = os.pathsep.join([str(node.parent), str(Path(LOCK['ios']['rubyPath']).parent),
                                  str(Path(LOCK['android']['cmakePath']).parent), env.get('PATH', '')])
    commands = {'cocos': [str(ROOT / LOCK['cocos']['path'])],
                'rn': [str(node), str(ROOT / LOCK['reactNative']['cliPath'])],
                'node': [str(node)], 'npm': [str(node.parent / 'npm')],
                'pod': [LOCK['ios']['cocoaPodsPath']], 'gradle': ['./gradlew'],
                'maestro': [str(ROOT / '.tools/maestro-2.10.0/maestro/bin/maestro')]}
    result = subprocess.run(commands[tool] + args, env=env)
    if tool == 'cocos' and result.returncode == 36:
        print('Cocos build succeeded (native editor exit code 36).')
        return 0
    return result.returncode


if __name__ == '__main__':
    sys.exit(main())
