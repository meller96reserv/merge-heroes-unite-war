#!/usr/bin/env python3
"""Exercise the same Cocos export in Chrome, with a real gesture to unlock audio."""
import argparse
import json
from pathlib import Path
import re
import time
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--run-id', required=True)
args = parser.parse_args()
assert re.fullmatch(r'[a-zA-Z0-9_-]+', args.run_id)
output = ROOT / f'evidence/audio-web-{args.run_id}.json'
assert not output.exists(), 'Preserve previous evidence'
events, errors = [], []
def audio_events():
    return [json.loads(t.split('[kisel-audio] ', 1)[1]) for t in events if t.startswith('[kisel-audio] {')]
status, error = 'FAIL', None
with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 430, 'height': 932})
    page.on('console', lambda m: events.append(m.text))
    page.on('pageerror', lambda e: errors.append(str(e)))
    def wait(predicate):
        deadline = time.monotonic() + 30
        while time.monotonic() < deadline:
            if predicate(audio_events()): return
            page.wait_for_timeout(100)
        raise AssertionError('Expected Cocos audio event did not arrive')
    try:
        page.goto('http://127.0.0.1:7457', wait_until='networkidle')
        wait(lambda ev: any(e['event'] == 'assets-ready' for e in ev))
        # Network idle does not imply that the Cocos scene/input has initialized.
        page.mouse.click(215, 400)
        wait(lambda ev: any(e['event'] == 'loop-started' for e in ev))
        for x in [330, 100, 330, 100, 330]:
            page.mouse.click(x, 780)
            page.wait_for_timeout(600)
        values = audio_events()
        assert sum(e['event'] == 'loop-started' for e in values) == 2
        assert sum(e['event'] == 'oneshot-started' for e in values) == 2
        assert sum(e['event'] == 'oneshot-suppressed' for e in values) == 1
        assert not errors
        status = 'PASS'
    except Exception as failure:
        error = str(failure)
    finally:
        page.screenshot(path=str(ROOT / f'evidence/audio-web-{args.run_id}.png'))
        browser.close()
output.write_text(json.dumps({'status': status, 'events': audio_events(), 'errors': errors, 'error': error,
    'url': 'http://127.0.0.1:7457', 'viewport': [430, 932],
    'limits': 'Same Cocos export; browser development transport, not native focus evidence'}, indent=2) + '\n')
(ROOT / f'logs/audio-web-{args.run_id}.log').write_text('\n'.join(events) + '\n')
print(status, error)
assert status == 'PASS'
