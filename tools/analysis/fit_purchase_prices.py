#!/usr/bin/env python3
"""Validate captured purchase deltas and report candidate fits, never reference certainty."""
import csv
import hashlib
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'analysis/reference'


def main():
    rows = list(csv.DictReader((BASE / 'purchase_cost_series.csv').open()))
    assert [int(r['purchaseOrdinal']) for r in rows] == list(range(1, 31))
    for row in rows:
        assert int(row['beforeGold']) - int(row['afterGold']) == int(row['displayedPrice']) == int(row['derivedGoldSpent'])
        assert row['farmingActive'] == 'NO' and row['deployedCount'] == '0'
        assert int(row['acceptedUnits']) == 1
        assert float(row['beforeElapsedSeconds']) < float(row['inputElapsedSeconds']) < float(row['afterElapsedSeconds'])
        for side in ('before', 'after'):
            assert hashlib.sha256((ROOT / row[side + 'Screenshot']).read_bytes()).hexdigest() == row[side + 'Sha256']
    prices = [int(r['displayedPrice']) for r in rows]
    candidates = {
        'constant_1': [1] * 30,
        'raw_exponential_1.05': [1.05 ** k for k in range(30)],
        'floor_exponential_1.05': [math.floor(1.05 ** k) for k in range(30)],
        'round_half_up_exponential_1.05': [math.floor(1.05 ** k + .5) for k in range(30)],
        'ceil_exponential_1.05': [math.ceil(1.05 ** k) for k in range(30)],
        'observed_piecewise_overfit': [1 if k < 15 else 2 if k < 23 else 3 if k < 29 else 4 for k in range(30)],
    }
    fits = []
    residual_rows = []
    for name, predictions in candidates.items():
        residuals = [actual - predicted for actual, predicted in zip(prices, predictions)]
        fits.append({'candidate': name, 'rmse': math.sqrt(sum(r*r for r in residuals)/30),
                     'maxAbsoluteResidual': max(map(abs, residuals)),
                     'exactMatches': sum(abs(r) < 1e-12 for r in residuals),
                     'classification': 'DERIVED_CANDIDATE_NOT_REFERENCE_FORMULA'})
        residual_rows.extend({'purchaseOrdinal': k+1, 'candidate': name, 'displayedPrice': prices[k],
                              'prediction': predictions[k], 'residualObservedMinusPrediction': residuals[k]}
                             for k in range(30))
    lower = max(prices[k] ** (1/k) for k in range(1,30))
    upper = min((prices[k]+1) ** (1/k) for k in range(1,30))
    assert lower < 1.05 < upper
    for rate in (lower + (upper-lower)*.25, lower + (upper-lower)*.75):
        assert [math.floor(rate ** k) for k in range(30)] == prices
    with (BASE / 'purchase_cost_residuals.csv').open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=residual_rows[0], lineterminator='\n')
        writer.writeheader(); writer.writerows(residual_rows)
    report = {'status': 'PASS', 'task': 'TASK-0008', 'run': 'RUN-03', 'version': 'LIVE_CRAZY3.16.2',
              'acceptedPurchases': 30, 'totalSpent': sum(prices), 'displayDeltaMismatches': 0,
              'fits': fits, 'floorFamily': {'formula': 'floor(r^(n-1)); n is accepted purchase ordinal starting at1',
                  'initialCoefficientAssumed': 1, 'compatibleRateLowerInclusive': lower,
                  'compatibleRateUpperExclusive': upper, 'nonIdentifiable': True},
              'exactReferenceFormula': 'UNKNOWN', 'platform': 'public desktop browser, no native parity claim',
              'limits': ['One fresh profile; thirty accepted tier1 purchases, not thirty arbitrary clicks',
                         'Tutorial/discovery rewards and manual merges between intervals excluded from cost differences',
                         'No deployed heroes or active farming during measured purchase intervals; auto disabled',
                         'Fit cannot identify a unique formula or prove extrapolation, tier changes or mobile parity'],
              'csvSha256': hashlib.sha256((BASE / 'purchase_cost_series.csv').read_bytes()).hexdigest()}
    (BASE / 'purchase_cost_fit.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({'status': report['status'], 'samples': 30, 'compatibleRate': [lower, upper], 'fits': fits}))


if __name__ == '__main__':
    main()
