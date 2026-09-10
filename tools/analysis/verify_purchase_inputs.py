#!/usr/bin/env python3
"""Verify recorded purchase input cases and preserve their observational limits."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'analysis/reference'
source = BASE / 'purchase_input_cases.csv'
rows = list(csv.DictReader(source.open()))
report = json.loads((BASE / 'purchase_input_results.json').read_text())
expected = {'tap': (1, 1, 4), 'full_board': (1, 0, 0), 'hold_2s': (1, 2, 8),
            'rapid_20': (20, 6, 30), 'release_outside': (1, 1, 6)}
assert len(rows) == len(expected) == report['cases']
assert report['tierAdvance']['status'] == 'UNKNOWN_GENERAL_RULE'
for row in rows:
    assert tuple(int(row[k]) for k in ('inputCount', 'acceptedBuys', 'derivedGoldSpent')) == expected[row['caseId']]
    assert int(row['afterUnits']) - int(row['beforeUnits']) == int(row['acceptedBuys'])
    assert int(row['beforeGold']) - int(row['afterGold']) == int(row['derivedGoldSpent'])
    assert int(row['afterUnits']) <= int(row['unlockedSlots'])
    assert row['deployedCount'] == '0' and row['autoEnabled'] == 'False'
    assert float(row['beforeElapsedSeconds']) < float(row['inputFirstElapsedSeconds']) <= float(row['inputLastElapsedSeconds']) < float(row['afterElapsedSeconds'])
    for side in ('before', 'after'):
        assert hashlib.sha256((ROOT / row[side + 'Screenshot']).read_bytes()).hexdigest() == row[side + 'Sha256']
assert hashlib.sha256(source.read_bytes()).hexdigest() == report['csvSha256']
print(f"PASS:{len(rows)} recorded cases;{sum(int(r['inputCount']) for r in rows)} inputs;10 accepted buys;48 gold; exact tier advance/cadence remains UNKNOWN")
