#!/usr/bin/env python3
"""Measure immutable source geometry and render bounded nine-slice QA fixtures."""
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
FIG = ROOT / 'analysis/figma'
# Source-pixel cap selections reviewed against corner crops, not inferred engine metadata.
# Order: left, top, right, bottom. Center ornaments/dividers are excluded below.
CAPS = {
    'ui_button_red_square__1580x1579': [370, 370, 370, 370],
    'ui_panel_blue_square__1448x1614': [120, 120, 120, 120],
    'ui_panel_dark_square__1576x1595': [120, 120, 120, 120],
    'ui_frame_board_slot__244x219': [45, 45, 45, 45],
    'ui_frame_equipment_gold__1035x1545': [220, 220, 220, 220],
    'ui_button_orange__2542x1359': [300, 300, 300, 300],
    'ui_button_gold__2378x1300': [300, 300, 300, 300],
    'ui_panel_gold_navy_wide__2339x828': [300, 200, 300, 200],
}
REJECT = {
    'ui_panel_plain_navy__1126x2000': 'Bottom-center gold ornament would stretch; fixed sprite until separate source-supported ornament exists.',
    'ui_panel_gold_black_wide__3815x1593': 'Baked horizontal divider and middle ornaments need independent layout.',
    'ui_panel_stats_black__966x425': 'Baked interior row dividers would move with stretch; fixed sprite only.',
}


def validate_stretch(record, factor, release=False):
    if not record['localImportEligible']:
        raise ValueError('Reference-only or unmapped raster cannot enter runtime selection')
    if release and not record['distributionAllowed']:
        raise ValueError('Missing distribution rights')
    policy = record['nineSlice']
    if policy['insetsSourcePx'] is None or policy.get('visualReview') is None:
        raise ValueError('Unreviewed/null insets cannot stretch')
    if not policy['visualReview']['minUniformScale'] <= factor <= 2:
        raise ValueError('Scale outside visually reviewed range')


def nine_slice(im, caps, size):
    if caps is None:
        raise ValueError('Uncalibrated insets cannot stretch')
    left, top, right, bottom = caps
    width, height = size
    if min(caps) < 0 or width <= left + right or height <= top + bottom:
        raise ValueError('Target is smaller than preserved caps plus center')
    sx = [0, left, im.width - right, im.width]
    sy = [0, top, im.height - bottom, im.height]
    dx = [0, left, width - right, width]
    dy = [0, top, height - bottom, height]
    out = Image.new('RGBA', size)
    for row in range(3):
        for col in range(3):
            patch = im.crop((sx[col], sy[row], sx[col + 1], sy[row + 1]))
            patch = patch.resize((dx[col + 1] - dx[col], dy[row + 1] - dy[row]), Image.Resampling.BILINEAR)
            out.paste(patch, (dx[col], dy[row]))
    return out


def main():
    semantic = json.loads((FIG / 'semantic_map.json').read_text())
    manifest = {x['semanticName']: x for x in json.loads((FIG / 'asset_manifest.json').read_text())}
    inv = json.loads((FIG / 'node_inventory.json').read_text())
    nodes = {row[0]: dict(zip(inv['columns'], row)) for row in inv['nodes']}
    records, cases = [], []
    review = FIG / 'import_review'
    review.mkdir(exist_ok=True)
    review_file = review / 'visual-decisions.json'
    reviewed = json.loads(review_file.read_text()) if review_file.exists() else {}
    corner_sheet = Image.new('RGB', (1440, 800), '#e2e8f0')
    corner_draw = ImageDraw.Draw(corner_sheet)
    for item in semantic:
        sid = item['semanticId']
        source = ROOT / item['sourceFile']
        raw = source.read_bytes()
        sha = hashlib.sha256(raw).hexdigest()
        assert sha == manifest[sid]['sha256'], sid
        im = Image.open(source).convert('RGBA')
        bbox = im.getchannel('A').getbbox()
        assert bbox is not None, sid
        x, y, end_x, end_y = bbox
        bounds = {'x': x, 'y': y, 'w': end_x - x, 'h': end_y - y}
        assert bounds == manifest[sid]['alphaBounds'], sid
        character = item['category'] in ('hero', 'enemy', 'boss')
        pivot = [(x + end_x) / 2, end_y] if character else [im.width / 2, im.height / 2]
        usages = [{'nodeId': node_id, 'width': nodes[node_id]['width'], 'height': nodes[node_id]['height'],
                   'topLevelId': nodes[node_id]['topLevelId']}
                  for node_id in item['sourceNodeIds'] if node_id in nodes]
        eligible = item['scope'] != 'UNUSED_OR_REFERENCE_ONLY' and bool(usages)
        caps = CAPS.get(sid)
        r = {'semanticId': sid, 'sourceFile': item['sourceFile'], 'sourceSha256': sha,
             'sourceDimensions': list(im.size), 'alphaBounds': bounds,
             'trim': {'applied': False, 'originalCanvas': list(im.size), 'contentRect': bounds,
                      'cropOffsetTopLeft': [x, y], 'croppedPivotPx': [pivot[0] - x, pivot[1] - y]},
             'pivot': {'sourcePxTopLeft': pivot, 'normalizedTopLeft': [pivot[0] / im.width, pivot[1] / im.height],
                       'geometryStatus': 'MEASURED_ALPHA_BASE' if character else 'MEASURED_CANVAS_CENTER',
                       'placementPolicy': 'PROPOSED_GEOMETRIC_BASE' if character else 'PROPOSED_CENTER',
                       'referenceRigPivot': 'UNKNOWN_NOT_PRESENT_IN_RASTER'},
             'display': {'referenceViewport': [430, 932], 'nodeBounds': usages,
                         'boundsStatus': 'OBSERVED_FIGMA_NODE_BOUNDS' if usages else 'UNKNOWN_NO_SOURCE_NODE',
                         'pixelsPerUIUnit': 1, 'ppuStatus': 'PROPOSED_COCOS_UI_COORDINATE_POLICY',
                         'fillTransform': 'NOT_CAPTURED_BY_NODE_INVENTORY; node bounds alone do not authorize nonuniform artwork stretch'},
             'localImportEligible': eligible, 'distributionAllowed': False,
             'nineSlice': {'insetsSourcePx': caps, 'stretchAllowedAfterImportQA': bool(caps),
                           'status': 'MEASURED_CAP_SELECTION' if caps else 'FIXED_SPRITE_ONLY',
                           'reason': REJECT.get(sid, 'No selected calibrated border; null insets prohibit stretch.' if caps is None else 'Corners reviewed; Cocos import/alpha parity remains TASK-0033/TASK-0034 and phase05.')}}
        if caps:
            assert eligible
            index = list(CAPS).index(sid)
            ox, oy = index % 4 * 360, index // 4 * 400
            crop = im.crop((0, 0, caps[0] * 2, caps[1] * 2))
            crop.thumbnail((340, 340))
            corner_sheet.paste(crop, (ox, oy + 40), crop)
            corner_draw.text((ox + 4, oy + 5), sid.split('__')[0], fill='black')
            corner_draw.text((ox + 4, oy + 20), f'L/T/R/B={caps} source px', fill='black')
            corner_draw.line((ox + crop.width//2, oy+40, ox + crop.width//2, oy+40+crop.height), fill='magenta')
            corner_draw.line((ox, oy+40+crop.height//2, ox+crop.width, oy+40+crop.height//2), fill='magenta')
            decision = reviewed.get(sid)
            if decision:
                assert decision['sourceSha256'] == sha and decision['insetsSourcePx'] == caps
                r['nineSlice']['visualReview'] = decision
                r['nineSlice']['status'] = 'MEASURED_REVIEWED_BOUNDED_CAPS'
                validate_stretch(r, 1)
            else:
                r['nineSlice']['visualReview'] = None
            reconstructed = nine_slice(im, caps, im.size)
            assert reconstructed.tobytes() == im.tobytes(), sid
            examples = []
            for factor in [.5, .75, 1, 1.5, 2]:
                target = [round(im.width * factor), round(im.height * factor)]
                stretched = nine_slice(im, caps, target)
                left, top, right, bottom = caps
                source_corners = [(0, 0, left, top), (im.width-right, 0, im.width, top),
                                  (0, im.height-bottom, left, im.height), (im.width-right, im.height-bottom, im.width, im.height)]
                target_corners = [(0, 0, left, top), (target[0]-right, 0, target[0], top),
                                  (0, target[1]-bottom, left, target[1]), (target[0]-right, target[1]-bottom, *target)]
                assert all(im.crop(a).tobytes() == stretched.crop(b).tobytes() for a, b in zip(source_corners, target_corners)), (sid, factor)
                cases.append({'id': sid, 'scale': factor, 'targetPixels': target, 'cornerPixelsEqual': True,
                              'oneXReconstructionEqual': True if factor == 1 else None,
                              'visualDecision': ('REJECT_SCALE' if factor < decision['minUniformScale'] else 'ACCEPT_BOUNDED_FIXTURE') if decision else 'NOT_REVIEWED'})
                stretched.thumbnail((290, 300))
                examples.append((factor, stretched))
            sheet = Image.new('RGB', (1500, 700), '#e2e8f0')
            draw = ImageDraw.Draw(sheet)
            for col, (factor, preview) in enumerate(examples):
                for row, color in enumerate(('#e2e8f0', '#0f172a')):
                    draw.rectangle((col * 300, row * 350, col * 300 + 299, row * 350 + 349), fill=color)
                    draw.text((col * 300 + 5, row * 350 + 8), f'{factor}x; full-size corners verified; thumbnail', fill='black' if row == 0 else 'white')
                    sheet.paste(preview, (col * 300 + (300-preview.width)//2, row * 350 + 40), preview)
            sheet.save(review / (sid + '-stretch.png'))
        records.append(r)
    corner_sheet.save(review / 'border-measurements.png')
    negative = []
    for caps, size in [(None, (20, 20)), ([8, 8, 8, 8], (10, 10))]:
        try:
            nine_slice(Image.new('RGBA', (20, 20)), caps, size)
        except ValueError as error:
            negative.append(str(error))
        else:
            raise AssertionError('Unsafe stretch accepted')
    if reviewed:
        for record, factor, release in [
            (next(r for r in records if r['semanticId'].startswith('reference_screen_')), 1, False),
            (next(r for r in records if r['semanticId'] in REJECT), 1, False),
            (next(r for r in records if r['semanticId'].startswith('ui_button_red_square__1580')), .5, False),
            (next(r for r in records if r['semanticId'] in CAPS), 1, True),
        ]:
            try:
                validate_stretch(record, factor, release)
            except ValueError as error:
                negative.append(str(error))
            else:
                raise AssertionError('Unsafe selection accepted')
        assert set(reviewed) == set(CAPS)
    report = {'taskId': 'TASK-0030', 'status': 'PASS' if reviewed else 'MEASURED_PENDING_VISUAL_REVIEW',
              'sourceOriginalModified': False, 'runtimeImport': 'NOT_RUN', 'sourceNodeCount': len(nodes),
              'records': records, 'checks': {'sourceAndAlphaChecks': len(records), 'sliceCases': cases,
                                           'rejectedUnsafeInputs': negative},
              'review': {'cornerSheet': 'analysis/figma/import_review/border-measurements.png',
                         'characterSheets': ['analysis/figma/import_review/character-anchors-1.png',
                                             'analysis/figma/import_review/character-anchors-2.png',
                                             'analysis/figma/import_review/boss-anchors.png']}}
    (FIG / 'import_calibration.json').write_text(json.dumps(report, indent=2) + '\n')
    print(f'Measured {len(records)} immutable rasters, {len(cases)} slice cases, {len(negative)} rejected invalid inputs.')


if __name__ == '__main__':
    main()
