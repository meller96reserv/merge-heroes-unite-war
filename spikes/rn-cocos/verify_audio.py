#!/usr/bin/env python3
"""Validate recorded bounded evidence. Never equate this with full physical acceptance."""
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
SPIKE = ROOT / 'spikes/rn-cocos'
r = json.loads((SPIKE / 'audio-results.json').read_text())
assert r['status'] == 'PARTIAL' and r['notRun']
for path, expected in r['evidenceSha256'].items():
    assert hashlib.sha256((ROOT / path).read_bytes()).hexdigest() == expected, path
android = json.loads((ROOT / r['android']['controls']).read_text())
assert android['status'] == 'PASS' and len(android['cases']) == 8
assert all(c['status'] == 'PASS' for c in android['cases'])
focus = (SPIKE / 'logs/audio-android-external-focus02.log').read_text().split('09-09 00:34:58.238', 1)[1]
assert 'request result=1 uid=10217' in focus and 'reason=focus:-2' in focus and 'reason=focus:1' in focus
assert focus.count('"event":"loop-started"') == 1
assert '"event":"stop-all","starts":2' in focus and '"event":"loop-started","starts":3' in focus
raw = (SPIKE / 'logs/audio-ios-runtime-final.log').read_text()
clean = re.sub(r'2026-09-\d\d \d\d:\d\d:\d\d\.\d+ KiselNativeProbe\[\d+:\d+\][^\n]*\n', '', raw)
ev = [json.loads(line.split('[kisel-audio] ', 1)[1]) for line in clean.splitlines() if '[kisel-audio] {' in line]
starts = [e['starts'] for e in ev if e['event'] == 'loop-started']
assert starts == list(range(1, 8)), starts
assert sum(e['event'] == 'oneshot-started' for e in ev) == 2
assert any(e['event'] == 'oneshot-suppressed' and e['shots'] == 1 for e in ev)
assert r['ios']['screenshotReview']['status'] == 'PASS'
web = json.loads((ROOT / r['web']['evidence']).read_text())
assert web['status'] == 'PASS' and not web['errors']
assert sum(e['event'] == 'loop-started' for e in web['events']) == 2
assert sum(e['event'] == 'oneshot-started' for e in web['events']) == 2
assert 'Tests:       21 passed' in (ROOT / r['unitTests']['evidence']).read_text()
print(json.dumps({'status': 'PASS', 'scope': 'recorded simulator evidence',
                  'fullNativeAcceptance': 'PARTIAL', 'evidenceFiles': len(r['evidenceSha256'])}))
