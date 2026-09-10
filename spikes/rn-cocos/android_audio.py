#!/usr/bin/env python3
"""Run bounded audio controls on the private Android emulator; preserve failed runs."""
import argparse
import json
from pathlib import Path
import re
import subprocess
import time
import xml.etree.ElementTree as ET

SPIKE = Path(__file__).resolve().parent
PREFIX = ['/Users/admin/Library/Android/sdk/platform-tools/adb', '-s', 'emulator-5556']


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--run-id', required=True)
    args = parser.parse_args()
    assert re.fullmatch(r'[a-zA-Z0-9_-]+', args.run_id)
    result = SPIKE / f'evidence/audio-android-{args.run_id}.json'
    assert not result.exists(), 'Choose a fresh run ID'
    logfile = SPIKE / f'logs/audio-android-{args.run_id}.log'
    def adb(*a):
        return subprocess.check_output(PREFIX + list(a), text=True, timeout=40)
    pid = adb('shell', 'pidof', 'com.kiselnativeprobe').strip()
    rows = []
    def logs():
        raw = adb('logcat', '-d', '--pid=' + pid, '-v', 'threadtime')
        keep = '\n'.join(l for l in raw.splitlines() if any(s in l for s in
            ['KiselAudio:', 'KiselHost:', 'KiselBridge:', '[kisel-audio]', '[bridge-probe]', '[kisel-lifecycle]', '[kisel-probe] ready']))
        logfile.write_text(keep + '\n')
        return keep
    def events():
        text = logs().split('[kisel-probe] ready')[-1]
        return [json.loads(line.split('[kisel-audio] ', 1)[1]) for line in text.splitlines() if '[kisel-audio] {' in line]
    def wait(predicate, description):
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            values = events()
            if predicate(values): return values
            time.sleep(.25)
        raise AssertionError(description)
    def state(starts, muted):
        return wait(lambda ev: bool(ev) and any(e['event'] == 'host-state' and e['starts'] == starts and
                    e.get('muted') is muted and e['loopPlaying'] is (not muted) for e in ev),
                    f'Expected loop starts={starts}, muted={muted}')
    def tap(x):
        adb('shell', 'input', 'tap', str(x), '1950')
    def screenshot(label):
        target = SPIKE / f'evidence/audio-android-{args.run_id}-{label}.png'
        target.write_bytes(subprocess.check_output(PREFIX + ['exec-out', 'screencap', '-p'], timeout=30))
        return str(target.relative_to(SPIKE.parents[1]))
    def resume(starts, muted):
        count = sum(e['event'] == 'visibility' and e.get('shown') is False for e in events())
        adb('shell', 'input', 'keyevent', '3')
        wait(lambda ev: sum(e['event'] == 'visibility' and e.get('shown') is False for e in ev) == count + 1,
             'Cocos hide missing')
        time.sleep(1)
        adb('shell', 'am', 'start', '-a', 'android.intent.action.MAIN', '-c', 'android.intent.category.LAUNCHER',
            '-n', 'com.kiselnativeprobe/.MainActivity', '-f', '0x10200000')
        wait(lambda ev: sum(e['event'] == 'visibility' and e.get('shown') is True for e in ev) == count + 1,
             'Cocos show missing')
        state(starts, muted)
        time.sleep(.5)
        assert events()[-1]['starts'] == starts, 'Duplicate/missing resume loop'
        assert adb('shell', 'pidof', 'com.kiselnativeprobe').strip() == pid
    def save(status, error=None):
        result.write_text(json.dumps({'taskId': 'TASK-0044', 'status': status, 'pid': int(pid),
          'device': 'private API36 arm64 emulator', 'cases': rows, 'error': error,
          'limits': ['physical headphones NOT_RUN', 'separate OS focus interruption tested separately',
                     'native player events, not acoustic loopback measurements']}, indent=2) + '\n')
    try:
        state(1, False)
        tap(800)
        wait(lambda ev: any(e['event'] == 'oneshot-ended' and e['shots'] == 1 for e in ev), 'SFX did not end')
        rows.append({'case': 'loop-plus-one-shot', 'status': 'PASS', 'starts': 1, 'shots': 1})
        tap(280); state(1, True); tap(800)
        wait(lambda ev: any(e['event'] == 'oneshot-suppressed' and e['shots'] == 1 for e in ev), 'Muted SFX not suppressed')
        rows.append({'case': 'mute', 'status': 'PASS', 'screenshot': screenshot('muted')})
        resume(1, True)
        rows.append({'case': 'muted-resume', 'status': 'PASS', 'starts': 1})
        tap(280); state(2, False)
        for cycle in range(1, 4):
            resume(2 + cycle, False)
            rows.append({'case': 'unmuted-resume', 'cycle': cycle, 'status': 'PASS', 'starts': 2 + cycle})
        # Only the deliberately injected bridge suite may reject messages.
        raw = logs()
        for role in ['host', 'game']:
            expected = f'"runtime":"{role}","kind":"rejected"'
            assert raw.count(expected) == 9, f'Unexpected bridge rejection after resume: {role}'
        assert '"expected":"DELIVER"' not in raw, 'Unexpected native transport rejection'
        rows.append({'case': 'post-resume-bridge', 'status': 'PASS', 'rejectionsPerRuntime': 9,
                     'screenshot': screenshot('resumed')})
        tap(280); state(5, True)
        adb('shell', 'input', 'keyevent', '4')
        time.sleep(1)
        adb('shell', 'uiautomator', 'dump', '/sdcard/kisel-audio.xml')
        ui = ET.fromstring(adb('shell', 'cat', '/sdcard/kisel-audio.xml'))
        node = next(n for n in ui.iter('node') if n.get('resource-id') == 'open-cocos')
        x1, y1, x2, y2 = map(int, re.findall(r'\d+', node.attrib['bounds']))
        adb('shell', 'input', 'tap', str((x1+x2)//2), str((y1+y2)//2))
        state(0, True)
        rows.append({'case': 'mute-survives-scene-recreation', 'status': 'PASS', 'starts': 0})
        tap(280); state(1, False)
        save('PASS'); print(json.dumps({'status': 'PASS', 'cases': len(rows), 'pid': pid}))
    except Exception as error:
        logs(); save('FAIL', str(error)); raise


if __name__ == '__main__':
    main()
