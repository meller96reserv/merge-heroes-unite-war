#!/usr/bin/env python3
"""Non-destructive local Figma ZIP inventory; analysis artifacts only."""
import argparse, csv, hashlib, json, shutil, zipfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import imagehash

def dump(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--source',default='docs/Merge Heroes Unite War.fig')
    ap.add_argument('--output',default='analysis/figma')
    args=ap.parse_args(); src=Path(args.source); out=Path(args.output)
    raw=out/'raw'; raw.mkdir(parents=True,exist_ok=True)
    for name in ['contact_sheets','screen_candidates']:(out/name).mkdir(exist_ok=True)
    before=hashlib.sha256(src.read_bytes()).hexdigest()
    copy=raw/'source.fig'; shutil.copyfile(src,copy)
    with zipfile.ZipFile(copy) as z:
        bad=z.testzip()
        if bad:raise ValueError('Corrupt ZIP member: '+bad)
        for member in z.infolist():
            dest=(raw/member.filename).resolve()
            if not dest.is_relative_to(raw.resolve()):raise ValueError('Unsafe ZIP path')
            if (member.external_attr>>16)&0o170000==0o120000:raise ValueError('Symlink ZIP member')
        z.extractall(raw)
        members=[{'name':i.filename,'bytes':i.file_size,'compressedBytes':i.compress_size,'crc':i.CRC} for i in z.infolist()]
    shutil.copyfile(raw/'meta.json',out/'meta.json')
    shutil.copyfile(raw/'thumbnail.png',out/'thumbnail.png')
    Image.open(raw/'thumbnail.png').resize((1600,432)).save(out/'thumbnail_inspection.png')
    rows=[]; hashes={}
    for idx,p in enumerate(sorted((raw/'images').iterdir()),1):
        if not p.is_file():continue
        with Image.open(p) as im:
            fmt=im.format; im.load(); w,h=im.size; alpha='A' in im.getbands(); b=im.getchannel('A').getbbox() if alpha else (0,0,w,h)
            digest=hashlib.sha256(p.read_bytes()).hexdigest()
            opaque=Image.new('RGB',im.size,(128,128,128)); opaque.paste(im,mask=im.getchannel('A') if alpha else None)
            ph=str(imagehash.phash(opaque)); bbox={'x':b[0],'y':b[1],'w':b[2]-b[0],'h':b[3]-b[1]} if b else {'x':0,'y':0,'w':0,'h':0}
            screen=w>=300 and h>=600 and .4<=w/h<=.72
            row={'index':idx,'sourceInternalId':p.name,'sourceFile':str(p),'sha256':digest,'phash':ph,'width':w,'height':h,'aspectRatio':round(w/h,6),'format':fmt,'mime':'image/'+('jpeg' if fmt=='JPEG' else fmt.lower()),'colorMode':im.mode,'hasAlpha':alpha,'alphaBounds':bbox,'fileSize':p.stat().st_size,'rgbaDecodedBytes':w*h*4,'transparentPaddingRatio':round(1-bbox['w']*bbox['h']/(w*h),4),'exactDuplicateOf':hashes.get(digest),'nearDuplicateGroup':None,'category':'screen_candidate' if screen else 'unclassified','semanticName':None,'confidence':0,'usedOnScreens':[],'bakedText':'UNKNOWN','nineSliceCandidate':False,'notes':''}
            hashes.setdefault(digest,p.name); rows.append(row)
            if screen:
                preview=im.copy();preview.thumbnail((430,932));preview.save(out/'screen_candidates'/f'{idx:03d}.png')
    near=[]
    for i,a in enumerate(rows):
        for b in rows[i+1:]:
            distance=(int(a['phash'],16)^int(b['phash'],16)).bit_count()
            if distance<=6 and abs(a['aspectRatio']-b['aspectRatio'])<.15 and a['sha256']!=b['sha256']:
                group=f"NEAR-{len(near)+1:03d}"; near.append({'id':group,'a':a['index'],'b':b['index'],'distance':distance})
                for r in [a,b]:r['nearDuplicateGroup']=(r['nearDuplicateGroup'] or [])+[group]
    dump(out/'asset_manifest.json',rows);dump(out/'archive_members.json',members);dump(out/'near_duplicates.json',near)
    with (out/'asset_manifest.csv').open('w',newline='') as f:
        wr=csv.DictWriter(f,fieldnames=rows[0]);wr.writeheader()
        for r in rows:wr.writerow({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(dict,list)) else v for k,v in r.items()})
    for start in range(0,len(rows),60):
        sheet=Image.new('RGB',(1200,1440),'#202630'); d=ImageDraw.Draw(sheet)
        for j,r in enumerate(rows[start:start+60]):
            x=(j%8)*150;y=(j//8)*180
            for yy in range(y,y+148,12):
                for xx in range(x,x+148,12):d.rectangle((xx,yy,xx+11,yy+11),fill='#aab0bb' if ((xx-x)//12+(yy-y)//12)%2 else '#d5d9df')
            im=Image.open(r['sourceFile']).convert('RGBA');im.thumbnail((142,142));sheet.paste(im,(x+(148-im.width)//2,y+(148-im.height)//2),im)
            d.text((x+3,y+149),f"{r['index']:03d} {r['sourceInternalId'][:8]}",fill='white')
            d.text((x+3,y+163),f"{r['width']}x{r['height']}",fill='white')
        sheet.save(out/'contact_sheets'/f'all_{start//60+1:02d}.jpg',quality=90)
    assert before==hashlib.sha256(src.read_bytes()).hexdigest()
    summary={'source':str(src),'sourceSha256':before,'sourceBytes':src.stat().st_size,'members':len(members),'images':len(rows),'formats':{fmt:sum(r['format']==fmt for r in rows) for fmt in sorted({r['format'] for r in rows})},'alphaCount':sum(r['hasAlpha'] for r in rows),'screenCandidates':sum(r['category']=='screen_candidate' for r in rows),'exactDuplicates':sum(r['exactDuplicateOf'] is not None for r in rows),'nearDuplicatePairs':len(near),'totalDecodedRgbaBytes':sum(r['rgbaDecodedBytes'] for r in rows),'sourceUnchanged':True}
    dump(out/'inventory_summary.json',summary)
    (out/'extraction_log.md').write_text('# Extraction log\n\n[MEASURED] ZIP CRC validation passed; extraction from copied archive; source SHA-256 unchanged.\n\n```json\n'+json.dumps(summary,indent=2)+'\n```\n')
    (out/'duplicate_report.md').write_text('# Duplicate report\n\n[MEASURED] Exact byte duplicates: '+str(summary['exactDuplicates'])+'. Near duplicate candidates (64-bit pHash Hamming ≤6, aspect difference <0.15): '+str(len(near))+'.\n\nPerceptual similarity is not interchangeability; inspect state, alpha and resolution before deduplication. See [pair data](near_duplicates.json).\n')
    print(json.dumps(summary,indent=2))

if __name__=='__main__':main()
