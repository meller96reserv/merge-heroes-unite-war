#!/usr/bin/env python3
"""Measure candidate rasters and produce side-by-side review sheets; never alter sources."""
import hashlib
import json
from pathlib import Path
import textwrap
from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / 'analysis/figma'


def normalized(image):
    bbox = image.getchannel('A').getbbox()
    cropped = image.crop(bbox) if bbox else Image.new('RGBA', (1, 1))
    cropped.thumbnail((256, 256), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (256, 256))
    canvas.paste(cropped, ((256-cropped.width)//2, (256-cropped.height)//2))
    return canvas


def main():
    pairs = json.loads((BASE / 'near_duplicates.json').read_text())
    assets = {a['index']: a for a in json.loads((BASE / 'asset_manifest.json').read_text())}
    semantics = {a['semanticId']: a for a in json.loads((BASE / 'semantic_map.json').read_text())}
    sheets = BASE / 'near_duplicate_review'
    sheets.mkdir(exist_ok=True)
    font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 15)
    small = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 12)
    measurements = []
    sheet = None
    for index, pair in enumerate(pairs):
        if index % 12 == 0:
            sheet = Image.new('RGB', (1440, 1080), '#f4f4f4')
        draw = ImageDraw.Draw(sheet)
        cell_x, cell_y = (index % 3)*480, ((index % 12)//3)*270
        records = [assets[pair['a']], assets[pair['b']]]
        images = []
        for column, record in enumerate(records):
            source = ROOT / record['sourceFile']
            assert hashlib.sha256(source.read_bytes()).hexdigest() == record['sha256']
            rgba = Image.open(source).convert('RGBA')
            images.append(rgba)
            preview = rgba.copy()
            preview.thumbnail((210, 184), Image.Resampling.LANCZOS)
            x, y = cell_x+12+column*235, cell_y+42
            draw.rectangle((x, y, x+210, y+184), fill='#b8b8b8')
            sheet.paste(preview, (x+(210-preview.width)//2, y+(184-preview.height)//2), preview)
            label = f"{record['index']} | {rgba.width}x{rgba.height}"
            draw.text((x, cell_y+228), label, font=small, fill='black')
            family = semantics[record['semanticName']]['visualFamily']
            draw.text((x, cell_y+244), textwrap.shorten(family, width=33, placeholder='…'), font=small, fill='black')
        a, b = images
        na, nb = map(normalized, images)
        delta = ImageStat.Stat(ImageChops.difference(na, nb)).mean
        alpha_a = na.getchannel('A').point(lambda v: 255 if v > 127 else 0)
        alpha_b = nb.getchannel('A').point(lambda v: 255 if v > 127 else 0)
        outline_difference = ImageStat.Stat(ImageChops.difference(alpha_a, alpha_b)).mean[0]/255
        row = {'id': pair['id'], 'a': pair['a'], 'b': pair['b'], 'phashDistance': pair['distance'],
               'semanticA': records[0]['semanticName'], 'semanticB': records[1]['semanticName'],
               'sourceSha256A': records[0]['sha256'], 'sourceSha256B': records[1]['sha256'],
               'dimensionsA': list(a.size), 'dimensionsB': list(b.size),
               'alphaBoundsA': a.getchannel('A').getbbox(), 'alphaBoundsB': b.getchannel('A').getbbox(),
               'decodedPixelsEqual': a.size == b.size and a.tobytes() == b.tobytes(),
               'normalizedRgbaMeanAbsoluteDifference': [round(v, 5) for v in delta],
               'normalizedAlphaOutlineDifferenceRatio': round(outline_difference, 6),
               'sameVisualFamily': semantics[records[0]['semanticName']]['visualFamily'] == semantics[records[1]['semanticName']]['visualFamily'],
               'sourceNodeIdsA': semantics[records[0]['semanticName']]['sourceNodeIds'],
               'sourceNodeIdsB': semantics[records[1]['semanticName']]['sourceNodeIds'],
               'scopeA': semantics[records[0]['semanticName']]['scope'],
               'scopeB': semantics[records[1]['semanticName']]['scope'],
               'contactSheet': f'analysis/figma/near_duplicate_review/pairs_{index//12+1:02}.jpg'}
        measurements.append(row)
        header = f"{pair['id']}  pHash={pair['distance']}  outline delta={outline_difference:.3f}"
        draw.text((cell_x+12, cell_y+12), header, font=font, fill='#123d68' if row['sameVisualFamily'] else '#a21d4b')
        if index % 12 == 11 or index == len(pairs)-1:
            sheet.save(ROOT / row['contactSheet'], quality=88)
    (BASE / 'near_duplicate_measurements.json').write_text(json.dumps(measurements, indent=2)+'\n')
    print(json.dumps({'pairs':len(measurements),'sheets':(len(pairs)+11)//12,
                      'decodedExactPairs':sum(m['decodedPixelsEqual'] for m in measurements),
                      'crossFamilyPairs':[m['id'] for m in measurements if not m['sameVisualFamily']]}))


if __name__ == '__main__':
    main()
