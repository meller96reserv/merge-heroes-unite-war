#!/usr/bin/env python3
"""Stage the actual standalone arm64 Cocos binary for the RN native-host probe."""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile

SPIKE = Path(__file__).resolve().parent
ROOT = SPIKE.parents[1]
apk = SPIKE / 'cocos-probe/build/android/proj/build/KiselCocosProbe/outputs/apk/debug/KiselCocosProbe-debug.apk'
destination = ROOT / '.tools/cocos-android-host/jniLibs/arm64-v8a/libcocos.so'
destination.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(apk) as archive:
    data = archive.read('lib/arm64-v8a/libcocos.so')
assert data[:4] == b'\x7fELF'
assert int.from_bytes(data[18:20], 'little') == 183, 'Expected AArch64 ELF'
destination.write_bytes(data)
record = {'sourceApk': str(apk.relative_to(ROOT)),
          'sourceApkSha256': hashlib.sha256(apk.read_bytes()).hexdigest(),
          'nativeLibrarySha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data),
          'stagedFile': str(destination.relative_to(ROOT)), 'architecture': 'arm64-v8a'}
(SPIKE / 'evidence/android-host-native-input.json').write_text(json.dumps(record, indent=2) + '\n')
print(json.dumps(record, indent=2))
