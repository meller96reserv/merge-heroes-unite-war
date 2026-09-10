#!/usr/bin/env python3
"""Validate recorded runtime oracles; this does not rerun native applications."""
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path

SPIKE = Path(__file__).resolve().parent
ROOT = SPIKE.parents[1]
EXPECTED = Counter([
    ('REQUEST_CONFLICT', '$.requestId'), ('INVALID_JSON', '$'),
    ('INVALID_ENVELOPE', '$.version'), ('INVALID_ENVELOPE', '$.type'),
    ('INVALID_PAYLOAD', '$.payload.token'), ('STALE_GENERATION', '$.generation'),
    ('STALE_SESSION', '$.sessionId'), ('SEQUENCE_GAP', '$.sequence'),
    ('INVALID_ENVELOPE', '$.unexpected'),
])


def host_events(lines):
    events = []
    for line in lines:
        if '[bridge-probe][host]' in line or '[bridge-probe][web-host]' in line:
            # Android wraps console arguments in single quotes; JSON has no such suffix.
            raw = line[line.index('{'):].rstrip("'\r\n")
            events.append(json.loads(raw))
    return events


def verify(events):
    host = Counter((e['code'], e['path']) for e in events
                   if e['event'] == 'receive' and e.get('kind') == 'rejected')
    game = Counter(tuple(e['result'].split(':', 2)[1:]) for e in events
                   if e['event'] == 'game-report' and e['result'].startswith('rejected:'))
    assert host == EXPECTED, ('host rejection code/path mismatch', host)
    assert game == EXPECTED, ('game rejection code/path mismatch', game)
    results = [e for e in events if e['event'] == 'exchange-complete']
    assert len(results) == 1 and results[0] == {
        'event': 'exchange-complete', 'status': 'PASS', 'hostRejected': 9,
        'hostDuplicates': 1, 'gameRejected': 9, 'gameDuplicates': 1, 'colorApplications': 1,
    }, results
    assert any(e['event'] == 'transport-check' and e.get('expected') == e.get('actual') == 'OVERSIZE'
               for e in events)
    assert not any(e['event'] == 'transport-check' and e.get('actual') != e.get('expected') for e in events)
    for message in ['game.ready', 'probe.ping', 'probe.pong']:
        assert any(e['event'] == 'receive' and e.get('kind') == 'accepted' and e.get('type') == message
                   for e in events), message
    return {**results[0], 'rejectionsEachDirection': [
        {'code': code, 'path': path, 'count': count} for (code, path), count in sorted(EXPECTED.items())]}


def main():
    report_path = SPIKE / 'bridge-results.json'
    previous = json.loads(report_path.read_text()) if report_path.exists() else None
    if previous:
        # Later DAG tasks may legitimately change fixture source. Never attribute
        # these historical runtime logs to the newer source by replacing its hash.
        for item in previous['evidence']:
            if '/logs/' in item['path'] or '/evidence/' in item['path']:
                assert hashlib.sha256((ROOT / item['path']).read_bytes()).hexdigest() == item['sha256'], item['path']
    android_text = (SPIKE / 'logs/bridge-android-events.log').read_text()
    android = verify(host_events(android_text.splitlines()))
    assert 'H2G dispatch on Thread-3' in android_text
    assert 'G2H received on Thread-3' in android_text
    assert 'G2H emit on mqt_v_js' in android_text
    assert 'G2H rejected OVERSIZE bytes=65537' in android_text
    ios_text = (SPIKE / 'logs/bridge-ios-exchange-snapshot.log').read_text()
    ios_events = json.loads((SPIKE / 'evidence/bridge-ios-hermes-console.json').read_text())['events']
    ios = verify([json.loads(e['args'][1]) for e in ios_events])
    assert 'H2G mainThread=1' in ios_text and 'G2H mainThread=1' in ios_text
    assert 'G2H rejected OVERSIZE bytes=65537' in ios_text
    assert '"event":"color-applied","count":1,"color":"cyan"' in ios_text
    browser = json.loads((SPIKE / 'evidence/bridge-web-console.json').read_text())
    assert browser['pageErrors'] == []
    web = verify(host_events(browser['events']))
    jest = (SPIKE / 'logs/bridge-all-jest.log').read_text()
    assert '15 passed, 15 total' in jest and '2 passed, 2 total' in jest
    files = [p for p in (SPIKE / 'cocos-probe/assets/scripts').rglob('*.ts')]
    files += [SPIKE / p for p in [
        'bridge-probe.schema.json', 'rn-probe/App.tsx', 'rn-probe/specs/NativeCocosHost.ts',
        'rn-probe/android/app/src/main/java/com/kiselnativeprobe/CocosHostActivity.kt',
        'rn-probe/android/app/src/main/java/com/kiselnativeprobe/CocosHostModule.kt',
        'rn-probe/ios/KiselNativeProbe/KiselCocosRuntime.mm',
        'rn-probe/ios/KiselNativeProbe/RCTCocosHost.mm',
        'logs/bridge-android-events.log', 'logs/bridge-ios-exchange-snapshot.log',
        'evidence/bridge-ios-hermes-console.json', 'evidence/bridge-web-console.json',
        'evidence/bridge-android-cocos.png', 'evidence/bridge-android-rn.png',
        'evidence/bridge-ios-cocos.png', 'evidence/bridge-ios-rn.png', 'evidence/bridge-web-preview.png',
    ]]
    result = {
        'taskId': 'TASK-0042', 'status': 'PASS', 'verifiedAt': datetime.now(timezone.utc).isoformat(),
        'scope': 'Bounded Debug native bridge fixture on Android API36 arm64 emulator and iOS26.2 arm64 Simulator; no gameplay.',
        'toolchain': {'cocos': '3.8.8', 'reactNative': '0.86.3', 'androidJs': 'Hermes + Cocos V8', 'iosJs': 'Hermes + Cocos V8'},
        'android': {**android, 'processId': 3224, 'threads': 'Cocos Thread-3 -> RN mqt_v_js; host-to-game dispatched on Thread-3'},
        'ios': {**ios, 'processId': 58739, 'threads': 'Cocos V8 and native bridge on main; generated TurboModule events received in Hermes'},
        'webDevelopmentOnly': web,
        'unitTests': {'status': 'PASS', 'suites': 2, 'tests': 15, 'log': 'spikes/rn-cocos/logs/bridge-all-jest.log'},
        'failedAttempts': [{'report': 'spikes/rn-cocos/evidence/bridge-ios-callback-failure.json',
                            'status': 'FAIL', 'resolution': 'Host-owned copied callback; full native exchange retest PASS'}],
        'manualReview': 'Android/iOS cyan Cocos screen TAPS0 and Bridge PASS color=1 rejected=9/9 RN screen visually reviewed; browser WEB DEV BRIDGE PASS reviewed.',
        'limits': [
            'Physical Android and iOS devices NOT_RUN; native feasibility is not accepted by this task.',
            '10 reopen/background cycles, delayed callback teardown, safe-area measurements and process-death handshake remain TASK-0043/0046.',
            'Audio focus and resource/memory baselines remain TASK-0044/0045.',
            'Probe-only message types do not extend the production catalogue; initialization safe area is a zero-inset scale1 fixture.',
            'Release/device builds and real save/economy/rewards are not exercised.',
        ],
        'evidence': [{'path': str(p.relative_to(ROOT)), 'bytes': p.stat().st_size,
                      'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(files)],
    }
    if previous is None:
        report_path.write_text(json.dumps(result, indent=2) + '\n')
    print('PASS: exact rejection code/path histograms and bidirectional runtime oracles on Android, iOS and web.')


if __name__ == '__main__':
    main()
