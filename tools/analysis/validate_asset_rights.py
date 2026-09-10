#!/usr/bin/env python3
"""Validate asset rights evidence or explicit exclusion; optional release selection fails closed."""
import argparse
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def validate(selection=()):
    rows = list(csv.DictReader((ROOT / 'analysis/figma/asset_ownership.csv').open()))
    semantic = {r['semanticId']:r for r in json.loads((ROOT / 'analysis/figma/semantic_map.json').read_text())}
    errors = []
    if len(rows) != len(semantic) or {r['asset_id'] for r in rows} != set(semantic):
        errors.append('Ownership ledger must cover every source asset exactly once')
    for row in rows:
        asset = semantic.get(row['asset_id'])
        if not asset:
            errors.append('Unknown asset: ' + row['asset_id'])
            continue
        if row['source'] != asset['sourceFile'] or row['scope'] != asset['scope']:
            errors.append('Source/scope mismatch: ' + row['asset_id'])
        if hashlib.sha256((ROOT / asset['sourceFile']).read_bytes()).hexdigest() != row['source_sha256']:
            errors.append('Source hash mismatch: ' + row['asset_id'])
        allowed = row['allowed_in_production'] == 'YES'
        if allowed:
            proof = (ROOT / row['distribution_proof_file']).resolve()
            if not row['distribution_proof_file'] or not proof.is_relative_to(ROOT) or not proof.is_file():
                errors.append('Missing distribution proof: ' + row['asset_id'])
            elif hashlib.sha256(proof.read_bytes()).hexdigest() != row['distribution_proof_sha256']:
                errors.append('Proof hash mismatch: ' + row['asset_id'])
            if row['owner'] == 'UNKNOWN' or row['license_identifier'] == 'UNKNOWN':
                errors.append('Unresolved owner/license: ' + row['asset_id'])
        elif row['allowed_in_production'] != 'NO' or row['release_status'] != 'EXCLUDED_RIGHTS_UNVERIFIED':
            errors.append('Unproven asset lacks explicit release exclusion: ' + row['asset_id'])
    by_id = {r['asset_id']:r for r in rows}
    for sid in selection:
        row = by_id.get(sid)
        if not row or row['allowed_in_production'] != 'YES' or row['scope'] == 'UNUSED_OR_REFERENCE_ONLY':
            errors.append('Release selection rejected: ' + sid)
    return {'taskId':'TASK-0028','status':'FAIL' if errors else 'PASS','ledgerRows':len(rows),
            'releaseExcluded':sum(r['allowed_in_production']=='NO' for r in rows),
            'releaseAuthorized':sum(r['allowed_in_production']=='YES' for r in rows),
            'selected':len(selection),'errors':errors,'distributionGate':'TASK-0233 remains required'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--release-selection', type=Path, help='JSON array of semantic IDs proposed for distribution')
    args = parser.parse_args()
    selected = json.loads(args.release_selection.read_text()) if args.release_selection else []
    if not isinstance(selected,list) or any(not isinstance(s,str) for s in selected):
        parser.error('Release selection must be a JSON array of semantic IDs')
    result = validate(selected)
    print(json.dumps(result, indent=2))
    raise SystemExit(bool(result['errors']))
