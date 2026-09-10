#!/usr/bin/env python3
"""Validate source-backed semantic assets; optional selection is an import allowlist."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
SCOPES = {'USED_IN_MVP', 'USED_POST_MVP', 'UNUSED_OR_REFERENCE_ONLY'}
CATEGORIES = {'background', 'boss', 'branding', 'currency', 'decoration', 'enemy',
              'equipment', 'hero', 'portrait', 'reference', 'relic', 'reward', 'ui'}


def validate(semantic, sources, screens, selected=(), root=ROOT):
    errors = []
    source_ids = {a['sourceInternalId']: a for a in sources}
    screen_ids = {s['screenId'] for s in screens}
    seen, mapped, paths = set(), set(), set()
    if len(semantic) != 351 or len(sources) != 351:
        errors.append('Expected all 351 source and semantic records')
    for screen in screens:
        if not (root / screen['screenshot']).is_file():
            errors.append('Missing screenshot: ' + screen['screenId'])
    for asset in semantic:
        sid = asset.get('semanticId', '')
        if not re.fullmatch(r'[a-z][a-z0-9_]*', sid) or sid in seen:
            errors.append('Invalid or duplicate semantic ID: ' + sid)
        seen.add(sid)
        source_id = asset.get('sourceHash')
        if source_id in mapped or source_id not in source_ids:
            errors.append('Duplicate or orphan source: ' + sid)
            continue
        mapped.add(source_id)
        source = source_ids[source_id]
        path = (root / asset.get('sourceFile', '')).resolve()
        if not path.is_relative_to((root / 'analysis/figma/raw/images').resolve()):
            errors.append('Source outside immutable image directory: ' + sid)
        elif not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != source['sha256']:
            errors.append('Source hash mismatch: ' + sid)
        if asset.get('sourceDimensions') != [source['width'], source['height']]:
            errors.append('Source dimensions mismatch: ' + sid)
        bounds = source['alphaBounds']
        if asset.get('trimmedDimensions') != [bounds['w'], bounds['h']]:
            errors.append('Alpha trim dimensions mismatch: ' + sid)
        if asset.get('scope') not in SCOPES or asset.get('category') not in CATEGORIES:
            errors.append('Unknown scope/category: ' + sid)
        if not set(asset.get('screens', [])) <= screen_ids:
            errors.append('Unknown screen: ' + sid)
        if set(asset.get('screens', [])) != set(source['usedOnScreens']):
            errors.append('Source/semantic screen mismatch: ' + sid)
        target = asset.get('targetPath', '')
        if target in paths or not (root / target).resolve().is_relative_to((root / 'cocos-game/assets/art').resolve()):
            errors.append('Duplicate or unsafe target path: ' + sid)
        paths.add(target)
        if not asset.get('license'):
            errors.append('Missing rights classification: ' + sid)
    if mapped != set(source_ids):
        errors.append('Semantic mappings do not cover the source inventory')
    by_id = {a['semanticId']: a for a in semantic}
    if len(selected) != len(set(selected)):
        errors.append('Duplicate runtime selection')
    for sid in selected:
        if sid not in by_id:
            errors.append('Orphan runtime selection: ' + sid)
        elif by_id[sid]['scope'] != 'USED_IN_MVP':
            errors.append('Runtime MVP selection excludes post-MVP/reference-only assets: ' + sid)
        elif by_id[sid]['category'] == 'reference':
            errors.append('Reference screenshot cannot become runtime UI: ' + sid)
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--selection', type=Path, help='JSON array of semantic IDs selected for MVP import')
    args = parser.parse_args()
    load = lambda p: json.loads((ROOT / p).read_text())
    selected = json.loads(args.selection.read_text()) if args.selection else []
    if not isinstance(selected, list) or any(not isinstance(x, str) for x in selected):
        parser.error('Selection must be a JSON array of semantic ID strings')
    semantic = load('analysis/figma/semantic_map.json')
    errors = validate(semantic, load('analysis/figma/asset_manifest.json'),
                      load('analysis/figma/screen_map.json'), selected)
    print(json.dumps({'taskId': 'TASK-0026', 'status': 'FAIL' if errors else 'PASS',
                      'assets': len(semantic), 'selected': len(selected), 'errors': errors,
                      'rights': 'Provenance validation only; distribution remains gated',
                      'runtimeImport': 'NOT_RUN'}, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
