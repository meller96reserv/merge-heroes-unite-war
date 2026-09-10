#!/usr/bin/env python3
"""Prepare a build-local Cocos Java variant with one RN-host audio-focus owner.

The installed editor and its copyright/license headers remain unchanged.
Only the pinned Activity's four focus registration calls are removed.
"""
import hashlib
import json
from pathlib import Path
import shutil

SPIKE = Path(__file__).resolve().parent
ROOT = SPIKE.parents[1]
SOURCE = ROOT / '.tools/cocos-3.8.8/CocosCreator.app/Contents/Resources/resources/3d/engine/native/cocos/platform/android/java/src'
DESTINATION = SPIKE / 'rn-probe/android/build/kisel-cocos-java'
RELATIVE = Path('com/cocos/lib/CocosActivity.java')
EXPECTED = '99440574c40d2c32202f3d383310acc16387a1c7615f33d89830f2d657877656'


def main():
    original = (SOURCE / RELATIVE).read_bytes()
    assert hashlib.sha256(original).hexdigest() == EXPECTED, 'Pinned Cocos Activity changed; review adapter'
    text = original.decode()
    register = 'CocosAudioFocusManager.registerAudioFocusListener(this);'
    unregister = 'CocosAudioFocusManager.unregisterAudioFocusListener(this);'
    assert text.count(register) == 3 and text.count(unregister) == 1
    adapted = text.replace(register, '// Kisel host owns the single audio-focus request.')
    adapted = adapted.replace(unregister, '// Kisel host abandons its own audio-focus request.')
    shutil.copytree(SOURCE, DESTINATION, dirs_exist_ok=True)
    (DESTINATION / RELATIVE).write_text(adapted)
    assert (SOURCE / RELATIVE).read_bytes() == original
    record = {'vendorSha256': EXPECTED, 'adaptedSha256': hashlib.sha256(adapted.encode()).hexdigest(),
              'removedRegisterCalls': 3, 'removedUnregisterCalls': 1,
              'sourceUnmodified': True, 'scope': 'RN Android native spike only'}
    print(json.dumps(record, indent=2))


if __name__ == '__main__':
    main()
