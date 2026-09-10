#!/usr/bin/env python3
"""Consume the verified arm64 simulator Cocos export in the RN iOS debug host."""
import hashlib
import json
import os
from pathlib import Path
import subprocess

SPIKE = Path(__file__).resolve().parent
ROOT = SPIKE.parents[1]
project = SPIKE / 'cocos-probe/build/ios/proj'
objects = json.loads(subprocess.check_output(['plutil', '-convert', 'json', '-o', '-',
    str(project / 'KiselCocosProbe.xcodeproj/project.pbxproj')]))['objects']
target = next(v for v in objects.values() if v.get('isa') == 'PBXNativeTarget' and v.get('name') == 'KiselCocosProbe-mobile')
configs = objects[target['buildConfigurationList']]['buildConfigurations']
settings = next(objects[c]['buildSettings'] for c in configs if objects[c]['name'] == 'Debug')
stage = ROOT / '.tools/cocos-ios-host'
stage.mkdir(parents=True, exist_ok=True)
game = project / 'KiselCocosProbe.build/Debug-iphonesimulator/KiselCocosProbe-mobile.build/Objects-normal/arm64/Game.o'
subprocess.run(['xcrun', 'libtool', '-static', '-o', str(stage / 'libKiselProbeGame.a'), str(game)], check=True)
ldflags = [v for v in settings['OTHER_LDFLAGS'] if v != '$(inherited)']
ldflags += [str(stage / 'libKiselProbeGame.a')]
archives = [Path(value) for value in ldflags if value.endswith('.a')]
for archive in archives:
    assert archive.is_file(), archive
    subprocess.run(['lipo', str(archive), '-verify_arch', 'arm64'], check=True, stdout=subprocess.DEVNULL)
record = {'taskId': 'TASK-0041', 'target': 'arm64 iOS simulator Debug only',
    'sourceSettings': str(project.relative_to(ROOT) / 'KiselCocosProbe.xcodeproj/project.pbxproj'),
    'archives': [{'file': str(p.relative_to(ROOT)), 'bytes': p.stat().st_size,
                  'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in archives],
    'gameObjectSha256': hashlib.sha256(game.read_bytes()).hexdigest()}
(SPIKE / 'evidence/ios-host-native-input.json').write_text(json.dumps(record, indent=2) + '\n')
config = {'headers': settings['HEADER_SEARCH_PATHS'], 'ldflags': ldflags,
          'definitions': [v.strip("'") for v in settings['GCC_PREPROCESSOR_DEFINITIONS']
                          if v.strip("'").startswith(('CC_', 'SCRIPT_ENGINE_TYPE='))]}
(stage / 'settings.json').write_text(json.dumps(config, indent=2) + '\n')
lock = json.loads((SPIKE / 'toolchain.json').read_text())
env = os.environ.copy()
env['GEM_HOME'] = lock['ios']['cocoaPodsGemHome']
subprocess.run([lock['ios']['rubyPath'], str(SPIKE / 'configure_ios_host.rb')], check=True, cwd=ROOT, env=env)
print(f'Configured RN iOS debug host with {len(archives)} verified arm64 libraries.')
