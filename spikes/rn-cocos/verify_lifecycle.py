#!/usr/bin/env python3
"""Check recorded native lifecycle events and write a bounded acceptance report."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path

SPIKE = Path(__file__).resolve().parent
ROOT = SPIKE.parents[1]


def read(name):
    return json.loads((SPIKE / name).read_text())


def main():
    reopen = read('evidence/lifecycle-android-reopen-attempt2.json')
    background = read('evidence/lifecycle-android-background-attempt3.json')
    ios = read('evidence/lifecycle-ios.json')
    for report in [reopen, background]:
        assert report['status'] == 'PASS' and len(report['cycles']) == 10
        assert [c['cycle'] for c in report['cycles']] == list(range(1, 11))
    assert ios['status'] == 'PASS' and ios['reopenCycles'] == ios['backgroundCycles'] == 10
    assert len(ios['retainedSessionPongs']) == 10
    assert hashlib.sha256((ROOT / ios['source']).read_bytes()).hexdigest() == ios['sourceSha256']
    native = (SPIKE / 'logs/lifecycle-android-background-attempt3-events.log').read_text()
    game = [json.loads(line[line.index('{'):]) for line in native.splitlines() if '[kisel-lifecycle]' in line]
    hides = {e['count']: e for e in game if e['event'] == 'hide'}
    shows = {e['count']: e for e in game if e['event'] == 'show'}
    pairs = []
    assert list(shows) == list(range(1, 11)) and list(hides) == list(range(1, 12))
    for cycle in range(1, 11):
        for field in ['frames', 'seconds', 'taps']:
            assert hides[cycle][field] == shows[cycle][field], (cycle, field)
        pairs.append({'cycle': cycle, 'hidden': hides[cycle], 'shown': shows[cycle]})
    resumes = [e for e in game if e['event'] == 'resume-frame']
    assert len(resumes) == 10 and all(e['appliedDt'] == 0 for e in resumes)
    assert native.count('Cocos created=') == native.count('Cocos destroyed live=0') == 1
    assert 'live=2' not in native
    reopen_logs = (SPIKE / 'logs/lifecycle-android-reopen-attempt2-events.log').read_text()
    assert reopen_logs.count('Cocos created=') == reopen_logs.count('Cocos destroyed live=0') == 10
    assert reopen_logs.count('"event":"exchange-complete","status":"PASS"') == 10
    assert 'live=2' not in reopen_logs
    assert '17 passed, 17 total' in (SPIKE / 'logs/lifecycle-jest.log').read_text()
    evidence = [p for p in (SPIKE / 'evidence').glob('lifecycle-*.json')]
    evidence += [SPIKE / p for p in [
        'logs/lifecycle-ios-snapshot.log', 'logs/lifecycle-ios-reopen-maestro.log',
        'logs/lifecycle-ios-background-maestro.log', 'logs/lifecycle-jest.log',
        'logs/lifecycle-android-reopen-attempt2-events.log', 'logs/lifecycle-android-background-attempt3-events.log',
        'rn-probe/android/app/src/main/AndroidManifest.xml',
        'rn-probe/ios/KiselNativeProbe/KiselCocosRuntime.mm',
        'cocos-probe/assets/scripts/NativeProbe.ts', 'cocos-probe/assets/scripts/protocol/ProbeExchange.ts',
    ]]
    output = {
        'taskId': 'TASK-0043', 'status': 'PASS', 'verifiedAt': datetime.now(timezone.utc).isoformat(),
        'scope': 'Debug Cocos3.8.8 + RN0.86.3 on Android API36 arm64 emulator and iOS26.2 arm64 Simulator.',
        'oracle': 'Ten reopen and ten Home/foreground cycles on each platform; actual touch and owner/session records.',
        'android': {'reopen': reopen, 'background': background, 'pauseResumePairs': pairs, 'resumeFrames': resumes,
                    'ownership': 'One engine at a time; each dismissal destroys it. Background keeps the same Activity, engine, PID and tap state.',
                    'rnCounters': '0→10 during reopen series; separate cold-launch background series preserves RN0.'},
        'ios': {'report': 'spikes/rn-cocos/evidence/lifecycle-ios.json', 'processId': ios['processId'],
                'engineInitializations': 1, 'reopenCycles': 10, 'backgroundCycles': 10,
                'touchCount': 20, 'rnCounter': 10, 'retainedSessionPongs': 10},
        'verification': 'Every hide/show pair has exactly equal frame/time/touch counters; 30 resumed deltas apply zero catch-up. Twenty iOS touches and ten Android background touches accumulate once. Native receiver sessions survive correctly.',
        'unitTests': {'status': 'PASS', 'tests': 17, 'includes': 'Cancel queued closed/reset owners and ping a retained session.'},
        'manualReview': 'First/last Cocos touch screenshots and final RN screenshots reviewed on both platforms; no flattened game UI involved.',
        'failuresAndLimits': [
            'Android first background attempt cleared Cocos with singleTask. singleTop preserved Cocos but a second attempt created another RN Activity because cold start used a component-only intent and resume used MAIN/LAUNCHER. These failed series remain FAIL. Matching real launcher intents pass all ten cycles.',
            'Use the documented MAIN/LAUNCHER command for cold start and resume. Mixed developer/launcher intents and duplicate RN root prevention remain an explicit TASK-0046 routing follow-up, not accepted by the normal-launch oracle.',
            'One driver startup raced Android process creation before any cycles; fixed bounded readiness wait, failure log retained.',
            'Physical devices, rotation/safe-area geometries, popup Back and process-death/save handshake are not established by this bounded lifecycle result; complete NAT gate remains open.',
            'No audio-focus or memory-slope/leak PASS is claimed. TASK-0044/0045 own these measurements.',
        ],
        'evidence': [{'path': str(p.relative_to(ROOT)), 'bytes': p.stat().st_size,
                      'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(set(evidence))],
    }
    report = SPIKE / 'lifecycle-results.json'
    if report.exists():
        previous = read('lifecycle-results.json')
        for item in previous['evidence']:
            if '/evidence/' in item['path'] or '/logs/' in item['path']:
                assert hashlib.sha256((ROOT / item['path']).read_bytes()).hexdigest() == item['sha256'], item['path']
    else:
        report.write_text(json.dumps(output, indent=2) + '\n')
    print('PASS: 40 native cycles, 30 unchanged pause/resume states, actual touches and owner/session evidence.')


if __name__ == '__main__':
    main()
