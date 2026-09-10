#!/usr/bin/env python3
"""Verify immutable inputs, coverage and evidence of the near-duplicate adjudication."""
import argparse
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'analysis/figma'
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()


def validate(decisions):
    errors = []
    rows = list(csv.DictReader(decisions.open()))
    measured = json.loads((BASE / 'near_duplicate_measurements.json').read_text())
    review = json.loads((BASE / 'near_duplicate_visual_review.json').read_text())
    expected = {r['id']: r for r in measured}
    if len(rows) != len(expected) or {r['pairId'] for r in rows} != set(expected):
        errors.append('Missing or duplicate candidate decisions')
    if set(review['reviewedIds']) != set(expected):
        errors.append('Visual review does not cover all pairs')
    if sha(BASE / 'near_duplicate_measurements.json') != review['measurementsSha256']:
        errors.append('Measurements changed after visual review')
    for sheet in review['sheets']:
        if sha(ROOT / sheet['file']) != sheet['sha256']:
            errors.append('Review sheet changed: ' + sheet['file'])
    assets = {r['semanticId']: r for r in json.loads((BASE / 'semantic_map.json').read_text())}
    for row in rows:
        record = expected.get(row['pairId'])
        if not record:
            errors.append('Unknown pair: ' + row['pairId'])
            continue
        for side in 'AB':
            for field in ['semantic', 'sourceSha256', 'scope']:
                if row[field+side] != record[field+side]:
                    errors.append(row['pairId'] + ': changed ' + field+side)
            source = ROOT / assets[record['semantic'+side]]['sourceFile']
            if sha(source) != record['sourceSha256'+side]:
                errors.append(row['pairId'] + ': source bytes changed')
        if row['decision'] != 'KEEP_BOTH' or not row['reason']:
            errors.append(row['pairId'] + ': unsupported decision; alias needs separate exact equivalence evidence')
        if row['reviewSheet'] != record['contactSheet']:
            errors.append(row['pairId'] + ': wrong review sheet')
    return {'taskId':'TASK-0027','status':'FAIL' if errors else 'PASS','pairs':len(rows),
            'aliases':sum(r['decision']!='KEEP_BOTH' for r in rows),'errors':errors}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--decisions', type=Path, default=BASE / 'near_duplicate_decisions.csv')
    args = parser.parse_args()
    result = validate(args.decisions)
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['errors']))
