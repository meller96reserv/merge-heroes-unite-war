#!/usr/bin/env python3
"""Verify a fresh isolated extraction and exercise the real extractor's rejection paths."""
import argparse
import hashlib
import json
from pathlib import Path
import struct
import subprocess
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[2]
EXTRACTOR = ROOT / 'tools/analysis/fig_inventory.py'


def verify(extracted):
    source = ROOT / 'docs/Merge Heroes Unite War.fig'
    digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
    expected = '59b80b59e499d68278363460e0f4cf46498eb688366e3ed098fe3fafc92aec69'
    original = json.loads((ROOT / 'analysis/figma/asset_manifest.json').read_text())
    fresh = json.loads((extracted / 'asset_manifest.json').read_text())
    fresh_ids = {a['sourceInternalId']: a for a in fresh}
    mismatches = []
    fields = ['sha256', 'width', 'height', 'format', 'hasAlpha', 'alphaBounds', 'phash']
    for asset in original:
        candidate = fresh_ids.get(asset['sourceInternalId'])
        if candidate is None or any(asset[f] != candidate[f] for f in fields):
            mismatches.append(asset['sourceInternalId'])
        elif digest(Path(candidate['sourceFile'])) != asset['sha256']:
            mismatches.append(asset['sourceInternalId'])
    checks = [
        {'case': 'immutable source and extraction copy', 'expected': expected,
         'actual': [digest(source), digest(extracted / 'raw/source.fig')],
         'passed': digest(source) == digest(extracted / 'raw/source.fig') == expected},
        {'case': '351 fresh records and actual bytes', 'expected': 351,
         'actual': len(fresh_ids), 'mismatches': mismatches,
         'passed': len(fresh) == len(fresh_ids) == len(original) == 351 and not mismatches},
    ]
    with tempfile.TemporaryDirectory(prefix='kisel-zip-rejection-') as directory:
        directory = Path(directory)
        for name, member, mode, corrupt, message in [
            ('parent traversal', '../escape.txt', 0, False, 'Unsafe ZIP path'),
            ('absolute path', '/tmp/kisel-extraction-escape.txt', 0, False, 'Unsafe ZIP path'),
            ('symlink', 'link', 0o120777, False, 'Symlink ZIP member'),
            ('CRC corruption', 'meta.json', 0, True, 'Corrupt ZIP member'),
        ]:
            archive = directory / (name.replace(' ', '-') + '.fig')
            with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_STORED) as z:
                info = zipfile.ZipInfo(member)
                info.create_system = 3
                info.external_attr = mode << 16
                z.writestr(info, b'{"fixture":true}')
            if corrupt:
                data = bytearray(archive.read_bytes())
                filename_length, extra_length = struct.unpack_from('<HH', data, 26)
                data[30 + filename_length + extra_length] ^= 1
                archive.write_bytes(data)
            run = subprocess.run([sys.executable, str(EXTRACTOR), '--source', str(archive),
                                  '--output', str(directory / (name + '-output'))],
                                 capture_output=True, text=True, timeout=30)
            checks.append({'case': name, 'expected': message, 'exitCode': run.returncode,
                           'actual': run.stderr.strip().splitlines()[-1],
                           'passed': run.returncode != 0 and message in run.stderr})
    return {'taskId': 'TASK-0025', 'status': 'PASS' if all(c['passed'] for c in checks) else 'FAIL',
            'source': str(source.relative_to(ROOT)), 'sourceSha256': digest(source),
            'extractionCommand': 'python tools/analysis/fig_inventory.py --output <isolated-directory>',
            'verificationCommand': 'python tools/analysis/verify_fig_extraction.py --extracted <isolated-directory>',
            'checks': checks, 'runtimeImport': 'NOT_RUN', 'sourceModified': False}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--extracted', type=Path, required=True)
    args = parser.parse_args()
    result = verify(args.extracted)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    sys.exit(0 if result['status'] == 'PASS' else 1)
