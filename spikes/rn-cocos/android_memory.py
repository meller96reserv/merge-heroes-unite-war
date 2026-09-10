#!/usr/bin/env python3
"""Exercise the installed private-emulator probe while memory_probe.py samples it."""
import json
from pathlib import Path
import re
import subprocess
import time
from urllib.request import build_opener, ProxyHandler
import xml.etree.ElementTree as ET

SPIKE = Path(__file__).resolve().parent
PREFIX = ['/Users/admin/Library/Android/sdk/platform-tools/adb', '-s', 'emulator-5556']


def adb(*args):
    return subprocess.check_output(PREFIX + list(args), text=True, timeout=40)


def main():
    pid = adb('shell', 'pidof', 'com.kiselnativeprobe').strip()
    output = SPIKE / 'evidence/memory-android-owner-cycles02.json'
    assert not output.exists(), 'Preserve existing run evidence'
    rows = []

    def logs():
        raw = adb('logcat', '-d', '--pid=' + pid, '-v', 'threadtime')
        result = '\n'.join(line for line in raw.splitlines() if any(s in line for s in
                           ('KiselHost:', 'KiselBridge:', '[kisel-probe]', '[bridge-probe]', '[kisel-lifecycle]')))
        (SPIKE / 'logs/memory-android-owner-cycles01.log').write_text(result + '\n')
        return result

    def sample(phase, cycle):
        assert adb('shell', 'pidof', 'com.kiselnativeprobe').strip() == pid
        # Local runner only: avoid inherited outbound HTTP proxy for loopback.
        with build_opener(ProxyHandler({})).open(f'http://127.0.0.1:7458/sample?platform=android&phase={phase}&cycle={cycle}', timeout=60) as response:
            assert json.load(response)['status'] == 'PASS'

    def tap(identifier):
        adb('shell', 'uiautomator', 'dump', '/sdcard/kisel-memory.xml')
        nodes = ET.fromstring(adb('shell', 'cat', '/sdcard/kisel-memory.xml'))
        node = next(n for n in nodes.iter('node') if n.get('resource-id') == identifier)
        x1, y1, x2, y2 = map(int, re.findall(r'\d+', node.attrib['bounds']))
        adb('shell', 'input', 'tap', str((x1+x2)//2), str((y1+y2)//2))

    def wait(predicate):
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            value = logs()
            if predicate(value): return value
            time.sleep(.25)
        raise AssertionError('Expected native owner/bridge event missing')

    try:
        sample('baseline', 0)
        for cycle in range(11):
            before = logs()
            completed = before.count('"event":"exchange-complete","status":"PASS"')
            destroyed = before.count('Cocos destroyed live=0')
            tap('open-cocos')
            wait(lambda s: s.count('"event":"exchange-complete","status":"PASS"') == completed + 1)
            adb('shell', 'input', 'tap', '540', '1400')
            if cycle: sample('open', cycle)
            adb('shell', 'input', 'keyevent', '4')
            wait(lambda s: s.count('Cocos destroyed live=0') == destroyed + 1)
            sample('closed' if cycle else 'warmup', cycle)
            rows.append({'cycle': cycle, 'freshBridge': True, 'destroyedLiveCount': 0, 'samePid': int(pid), 'status': 'PASS'})
            output.write_text(json.dumps({'status': 'IN_PROGRESS', 'cycles': rows}, indent=2) + '\n')
            print('Android memory cycle', cycle, 'PASS', flush=True)
        output.write_text(json.dumps({'status': 'PASS', 'cycles': rows}, indent=2) + '\n')
        (SPIKE / 'evidence/memory-android-final-rn.png').write_bytes(subprocess.check_output(PREFIX + ['exec-out', 'screencap', '-p']))
    except Exception as error:
        output.write_text(json.dumps({'status': 'FAIL', 'cycles': rows, 'error': str(error)}, indent=2) + '\n')
        raise


if __name__ == '__main__':
    main()
