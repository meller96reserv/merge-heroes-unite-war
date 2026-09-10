#!/usr/bin/env python3
"""Exercise the private API36 probe; stop immediately on a missing runtime oracle."""
import argparse
import json
from pathlib import Path
import re
import subprocess
import time
import xml.etree.ElementTree as ET

SPIKE = Path(__file__).resolve().parent
ADB = '/Users/admin/Library/Android/sdk/platform-tools/adb'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--serial', default='emulator-5556')
    parser.add_argument('--mode', choices=['reopen', 'background'], required=True)
    parser.add_argument('--run-id', default='', help='Suffix for a new attempt; preserve earlier evidence')
    parser.add_argument('--expected-rn-counter', type=int, default=10)
    args = parser.parse_args()
    assert re.fullmatch(r'[a-zA-Z0-9_-]*', args.run_id)
    suffix = '-' + args.run_id if args.run_id else ''
    prefix = [ADB, '-s', args.serial]
    def adb(*command):
        return subprocess.check_output(prefix + list(command), text=True, timeout=30)
    pid = ''
    deadline = time.monotonic() + 30
    while not pid and time.monotonic() < deadline:
        found = subprocess.run(prefix + ['shell', 'pidof', 'com.kiselnativeprobe'], capture_output=True, text=True, timeout=10)
        if found.returncode == 0: pid = found.stdout.strip()
        else: time.sleep(.25)
    assert pid.isdigit(), 'Probe process unavailable'
    output = SPIKE / f'evidence/lifecycle-android-{args.mode}{suffix}.json'
    assert not output.exists(), 'Use a fresh evidence file; preserve previous attempts'
    rows = []
    def logs():
        text = adb('logcat', '-d', '--pid=' + pid, '-v', 'threadtime')
        keep = [line for line in text.splitlines() if any(marker in line for marker in
                ['KiselHost:', 'KiselBridge:', '[kisel-probe]', '[kisel-lifecycle]', '[bridge-probe]'])]
        (SPIKE / f'logs/lifecycle-android-{args.mode}{suffix}-events.log').write_text('\n'.join(keep) + '\n')
        return '\n'.join(keep)
    def wait(predicate, description):
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            text = logs()
            if predicate(text): return text
            time.sleep(.3)
        raise AssertionError(description)
    def screenshot(name):
        path = SPIKE / f'evidence/lifecycle-android-{name}{suffix}.png'
        path.write_bytes(subprocess.check_output(prefix + ['exec-out', 'screencap', '-p'], timeout=30))
    def ui():
        adb('shell', 'uiautomator', 'dump', '/sdcard/kisel-lifecycle.xml')
        return ET.fromstring(adb('shell', 'cat', '/sdcard/kisel-lifecycle.xml'))
    def tap_id(identifier):
        node = None
        deadline = time.monotonic() + 30
        while node is None and time.monotonic() < deadline:
            node = next((n for n in ui().iter('node') if n.get('resource-id') == identifier), None)
        assert node is not None, f'Native UI target unavailable: {identifier}'
        x1, y1, x2, y2 = map(int, re.findall(r'\d+', node.attrib['bounds']))
        adb('shell', 'input', 'tap', str((x1+x2)//2), str((y1+y2)//2))
    def check_rn(count):
        nodes = list(ui().iter('node'))
        assert any(n.get('text') == f'RN taps: {count}' for n in nodes), 'RN counter lost'
        assert any(n.get('text') == 'Bridge PASS: color=1, rejected=9/9' for n in nodes), 'Bridge did not finish'
    def save(status, error=None):
        output.write_text(json.dumps({'status': status, 'mode': args.mode, 'pid': int(pid),
             'device': 'private API36 arm64 emulator', 'cycles': rows, 'error': error}, indent=2) + '\n')
    try:
        baseline = logs()
        before_creates = baseline.count('Cocos created=')
        before_destroys = baseline.count('Cocos destroyed live=0')
        before_complete = baseline.count('"event":"exchange-complete","status":"PASS"')
        if args.mode == 'reopen':
            for cycle in range(1, 11):
                started = time.monotonic()
                tap_id('open-cocos')
                wait(lambda s: s.count('"event":"exchange-complete","status":"PASS"') == before_complete + cycle,
                     'Fresh native bridge exchange missing')
                pre = logs().count('[kisel-probe] touch')
                adb('shell', 'input', 'tap', '540', '1400')
                text = wait(lambda s: s.count('[kisel-probe] touch') == pre + 1, 'Touch did not arrive exactly once')
                assert '"taps":1,' in text.split('[kisel-probe] touch')[-1], 'New scene did not start at zero taps'
                screenshot(f'reopen-{cycle}-cocos')
                adb('shell', 'input', 'keyevent', '4')
                wait(lambda s: s.count('Cocos destroyed live=0') == before_destroys + cycle, 'Owner not destroyed')
                tap_id('rn-tap-button')
                check_rn(cycle)
                assert adb('shell', 'pidof', 'com.kiselnativeprobe').strip() == pid, 'Host process changed'
                rows.append({'cycle': cycle, 'status': 'PASS', 'freshBridge': True, 'touchCount': 1,
                             'rnCounter': cycle, 'seconds': round(time.monotonic()-started, 3)})
                save('IN_PROGRESS')
                print('Android reopen', cycle, 'PASS', flush=True)
        else:
            tap_id('open-cocos')
            wait(lambda s: s.count('"event":"exchange-complete","status":"PASS"') == before_complete + 1, 'Fresh native bridge missing')
            baseline = logs()
            pauses = baseline.count('Cocos paused live=1')
            resumes = baseline.count('Cocos resumed live=1')
            for cycle in range(1, 11):
                adb('shell', 'input', 'keyevent', '3')
                wait(lambda s: s.count('Cocos paused live=1') == pauses + cycle, 'Background pause missing')
                time.sleep(2)
                # Matches a launcher intent, not a force-stop/restart.
                launch = adb('shell', 'am', 'start', '-a', 'android.intent.action.MAIN', '-c',
                             'android.intent.category.LAUNCHER', '-n', 'com.kiselnativeprobe/.MainActivity', '-f', '0x10200000')
                text = wait(lambda s: s.count('Cocos resumed live=1') == resumes + cycle, 'Foreground did not resume existing Cocos')
                assert text.count('Cocos created=') == before_creates + 1, 'Background recreated the engine'
                assert text.count('Cocos destroyed live=0') == before_destroys, 'Background destroyed Cocos'
                pre = text.count('[kisel-probe] touch')
                adb('shell', 'input', 'tap', '540', '1400')
                text = wait(lambda s: s.count('[kisel-probe] touch') == pre + 1, 'Resumed touch missing/duplicated')
                assert f'"taps":{cycle},' in text.split('[kisel-probe] touch')[-1], 'Touch state reset'
                screenshot(f'background-{cycle}-cocos')
                assert adb('shell', 'pidof', 'com.kiselnativeprobe').strip() == pid, 'Process changed'
                rows.append({'cycle': cycle, 'status': 'PASS', 'touchCount': cycle, 'launcherResult': launch.strip()})
                save('IN_PROGRESS')
                print('Android background', cycle, 'PASS', flush=True)
            adb('shell', 'input', 'keyevent', '4')
            wait(lambda s: s.count('Cocos destroyed live=0') == before_destroys + 1, 'Final dismissal missing')
            check_rn(args.expected_rn_counter)
        screenshot(args.mode + '-final-rn')
        logs()
        save('PASS')
    except Exception as error:
        logs()
        save('FAIL', str(error))
        raise


if __name__ == '__main__':
    main()
