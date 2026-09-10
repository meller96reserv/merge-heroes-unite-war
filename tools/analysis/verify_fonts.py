#!/usr/bin/env python3
"""TASK-0029: measure pinned font sources; never assert unknown Figma revision parity."""
import csv
import hashlib
import io
import json
from pathlib import Path

import fontTools
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont, features

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'analysis/figma/fonts'
FACES = [
    ('Passion One', 'Bold', 'passionone/PassionOne-Bold.ttf', {}),
    ('Passion One', 'Regular', 'passionone/PassionOne-Regular.ttf', {}),
    ('Roboto', 'SemiBold', 'roboto/Roboto[wdth,wght].ttf', {'wght': 600, 'wdth': 100}),
    ('Roboto', 'Regular', 'roboto/Roboto[wdth,wght].ttf', {'wght': 400, 'wdth': 100}),
    ('Nunito', 'Regular', 'nunito/Nunito[wght].ttf', {'wght': 400}),
]
CYRILLIC = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
SAMPLES = ['0123456789 1 000 10 000 +1000 00:21:19', 'Loading... BOSS STAGE CLAIM',
           'ELF archer Ice Fairy Settings', 'Привет! Герой ёжик 1000 золота']


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    acquired = json.loads((OUT / 'acquisition.json').read_text())
    for record in acquired:
        path = ROOT / record['file']
        assert sha(path) == record['sha256'], path
        assert path.stat().st_size == record['bytes'], path
        assert f"/{record['revision']}/" in record['url']
    by_path = {r['file']: r for r in acquired}
    texts = json.loads((ROOT / 'analysis/figma/text_inventory.json').read_text())
    raw_nodes = json.loads((ROOT / 'analysis/figma/node_inventory.json').read_text())
    nodes = {r[0]: dict(zip(raw_nodes['columns'], r)) for r in raw_nodes['nodes']}
    report = {'taskId': 'TASK-0029', 'classification': 'MEASURED_SOURCE_FONTS',
              'fontTools': fontTools.__version__, 'raqm': features.check('raqm'),
              'referenceBinaryRevision': 'UNKNOWN: Figma inventory gives family/style/axes, no font binary hash/version',
              'sourceIntegrity': 'PASS', 'sourceFiles': acquired, 'faces': [], 'nodeMetrics': []}
    ownership = []
    sheet = Image.new('RGB', (1400, 1550), '#102034')
    draw = ImageDraw.Draw(sheet)
    heading = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 20)
    draw.text((24, 14), 'Pinned font specimens — source glyphs, not a Figma pixel-parity claim', font=heading, fill='white')
    for index, (family, style, filename, axes) in enumerate(FACES):
        path = OUT / 'source' / filename
        source = by_path[str(path.relative_to(ROOT))]
        license_path = path.parent / 'OFL.txt'
        license_record = by_path[str(license_path.relative_to(ROOT))]
        license_text = license_path.read_text()
        assert 'SIL OPEN FONT LICENSE Version 1.1' in license_text
        font = TTFont(path)
        source_names = {str(n.nameID): n.toUnicode() for n in font['name'].names if n.nameID in (1, 2, 5, 6, 16, 17)}
        assert family in (source_names.get('1'), source_names.get('16'))
        source_axes = {a.axisTag: [a.minValue, a.defaultValue, a.maxValue] for a in font['fvar'].axes} if 'fvar' in font else {}
        if axes:
            for key, value in axes.items():
                assert source_axes[key][0] <= value <= source_axes[key][2]
            font = instantiateVariableFont(font, axes, inplace=False)
        buffer = io.BytesIO()
        font.save(buffer)
        data = buffer.getvalue()  # Measurement-only instance, never distributed/renamed.
        cmap = font.getBestCmap()
        matching = [r for r in texts if r['font']['family'] == family and r['font']['style'] == style]
        assert matching
        observed_chars = set(''.join(r['text'] for r in matching)) - set('\r\n\t')
        absent_observed = ''.join(sorted(c for c in observed_chars if ord(c) not in cmap))
        absent_cyrillic = ''.join(c for c in CYRILLIC if ord(c) not in cmap)
        face = {'family': family, 'style': style, 'sourceFile': source['file'],
                'sourceNames': source_names, 'axes': axes, 'sourceAxes': source_axes,
                'unitsPerEm': font['head'].unitsPerEm,
                'hhea': {'ascent': font['hhea'].ascent, 'descent': font['hhea'].descent, 'lineGap': font['hhea'].lineGap},
                'cyrillic': {'tested': len(CYRILLIC), 'present': len(CYRILLIC) - len(absent_cyrillic), 'missing': absent_cyrillic},
                'observedNodeCount': len(matching), 'missingObservedCharacters': absent_observed,
                'samplesAt32px': []}
        for sample in SAMPLES:
            pf = ImageFont.truetype(io.BytesIO(data), 32)
            face['samplesAt32px'].append({'text': sample, 'advancePx': pf.getlength(sample),
                                           'inkBoundsPx': list(pf.getbbox(sample)),
                                           'missingChars': ''.join(sorted(set(c for c in sample if ord(c) not in cmap)))})
        y = 65 + index * 290
        draw.text((24, y), f'{family} {style} | Cyrillic {len(CYRILLIC)-len(absent_cyrillic)}/{len(CYRILLIC)} | Figma nodes {len(matching)}', font=heading, fill='#8edaff')
        for row, sample in enumerate(SAMPLES):
            draw.text((32, y + 34 + row * 48), sample, font=ImageFont.truetype(io.BytesIO(data), 32), fill='white')
        for text in matching:
            pf = ImageFont.truetype(io.BytesIO(data), round(text['size'] * 4))
            lines = text['text'].replace('\r\n', '\n').replace('\r', '\n').split('\n')
            advances = [pf.getlength(line) / 4 for line in lines]
            node = nodes[text['id']]
            report['nodeMetrics'].append({'nodeId': text['id'], 'text': text['text'], 'family': family,
                'style': style, 'sizePx': text['size'], 'layoutBox': [node['width'], node['height']],
                'unwrappedLineAdvancesPx': advances,
                'unwrappedExceedsBox': max(advances) > node['width'] + 2,
                'interpretation': 'Layout fit screening only: wrapping, tracking, auto-resize and renderer differ; box width is not a glyph advance oracle'})
        report['faces'].append(face)
        ownership.append({'font_id': f"font.{family.lower().replace(' ', '')}.{style.lower()}",
            'family': family, 'style': style, 'axes': json.dumps(axes, sort_keys=True),
            'file': source['file'], 'sha256': source['sha256'], 'source_url': source['url'],
            'source_revision': source['revision'], 'font_version': source_names.get('5'),
            'license': 'OFL-1.1', 'license_file': license_record['file'], 'license_sha256': license_record['sha256'],
            'copyright': license_text.splitlines()[0], 'allowed_in_production': 'YES_UNMODIFIED_WITH_LICENSE',
            'reference_binary_parity': 'UNKNOWN', 'cyrillic_coverage': f'{len(CYRILLIC)-len(absent_cyrillic)}/{len(CYRILLIC)}',
            'observed_missing_chars': absent_observed, 'evidence': 'analysis/figma/fonts/metrics.json'})
    assert len(report['nodeMetrics']) == len(texts) == 296
    report['checks'] = {'sourceAndLicenseHashes': 'PASS', 'familyStyleAndAxesCoverage': 'PASS',
        'all296TextNodesMeasured': 'PASS',
        'observedGlyphCoverage': 'PASS' if all(not f['missingObservedCharacters'] for f in report['faces']) else 'FAIL',
        'referencePixelParity': 'NOT_RUN; source binary revision unknown; visual import gates remain separate'}
    (OUT / 'metrics.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    with (OUT.parent / 'font_ownership.csv').open('w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=list(ownership[0]), lineterminator='\n')
        writer.writeheader(); writer.writerows(ownership)
    sheet.save(OUT / 'specimens.png')
    print(json.dumps({'checks': report['checks'], 'faces': [dict(family=f['family'], style=f['style'], cyrillic=f['cyrillic']['present'], missingObserved=f['missingObservedCharacters']) for f in report['faces']], 'unwrappedExceedsBox': sum(r['unwrappedExceedsBox'] for r in report['nodeMetrics'])}, ensure_ascii=False, indent=2))
    return 0 if report['checks']['observedGlyphCoverage'] == 'PASS' else 1


if __name__ == '__main__':
    raise SystemExit(main())
