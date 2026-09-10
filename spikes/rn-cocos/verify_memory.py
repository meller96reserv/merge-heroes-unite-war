#!/usr/bin/env python3
"""Verify recorded native memory evidence; does not rerun devices or retag source."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPIKE = Path(__file__).resolve().parent
report = json.loads((SPIKE / 'memory-results.json').read_text())
rows = list(csv.DictReader((SPIKE / 'memory-cycles.csv').open()))
assert len(rows) == report['sampleCount'] == 44
for platform in ('android', 'ios'):
    subset = [r for r in rows if r['platform'] == platform]
    assert len(set(r['pid'] for r in subset)) == 1
    assert [int(r['cycle']) for r in subset if r['phase'] == 'closed'] == list(range(1,11))
    assert [int(r['cycle']) for r in subset if r['phase'] == 'open'] == list(range(1,11))
    assert len([r for r in subset if r['phase'] == 'warmup']) == 1
    assert len([r for r in subset if r['phase'] == 'baseline']) == 1
for evidence in report['evidence']:
    assert hashlib.sha256((ROOT / evidence['path']).read_bytes()).hexdigest() == evidence['sha256'], evidence['path']
assert report['iosInvestigation']['postMeasurementAutomationSurvival'].startswith('FAIL')
assert report['androidInvestigation']['idleActivities'] == 1
assert report['androidInvestigation']['idleHeapAllocatedKiB'] < report['androidInvestigation']['warmupHeapAllocatedKiB']
print('PASS:44 recorded samples and native evidence hashes; automation crash and physical/soak limits remain explicit')
