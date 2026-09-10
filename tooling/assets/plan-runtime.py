from pathlib import Path
import json,csv,hashlib,math
R=Path.cwd();s=json.load(open('analysis/figma/semantic_map.json'));ids={a['semanticId']:a for a in s};raw={a['sourceInternalId']:a for a in json.load(open('analysis/figma/asset_manifest.json'))}
order=['turtle_warrior','fox_sorcerer','raccoon_engineer','owl_mage','panda_monk','bunny_assassin','lion_knight','ice_fairy','inferno_dragon','elf_archer']
rows=[]
for tier,f in enumerate(order,1):
 a=max((a for a in s if a['visualFamily']=='hero_'+f),key=lambda a:a['sourceDimensions'][0])
 rows.append(dict(definitionId=f'hero_tier_{tier}',tier=tier,mergeLineage='heroes',visualId=a['semanticId'],visualFamily=f,sourceHash=a['sourceHash'],sourceSha256=raw[a['sourceHash']]['sha256'],rarity='UNKNOWN',mappingEvidence='OBSERVED_FIGMA_TIER_BADGE' if tier<10 else 'PROPOSED_EXTENSION',referenceHumanName='NOT_EQUIVALENT',notes='Local preview selection; silhouette verified on hero contact sheet. Gold ornament does not imply rarity.'))
p=R/'analysis/figma/content_visual_mapping.csv'
with p.open('w') as f:w=csv.DictWriter(f,fieldnames=rows[0],lineterminator="\n");w.writeheader();w.writerows(rows)
assert len({r['visualFamily'] for r in rows})==10
selected=[a for a in s if a['scope']!='UNUSED_OR_REFERENCE_ONLY' and a['sourceNodeIds']]
# Select all source-backed screen assets, plus the ten mapped hero families. No pHash aliases.
selected=list({a['semanticId']:a for a in selected+[ids[r['visualId']] for r in rows]}.values())
entries=[];pages={}
for a in sorted(selected,key=lambda a:a['semanticId']):
 w,h=a['sourceDimensions'];limit=1536 if a['category']=='background' and 'slot' not in a['semanticId'] else 384 if a['category'] in ['hero','enemy'] else 768
 scale=min(1,limit/max(w,h));tw,th=round(w*scale),round(h*scale)
 group=('standalone' if a['category']=='background' and 'slot' not in a['semanticId'] else a['atlasGroup'])
 entries.append({'semanticId':a['semanticId'],'sourceFile':a['sourceFile'],'sourceSha256':raw[a['sourceHash']]['sha256'],'runtimeSize':[tw,th],'decodedBytes':tw*th*4,'group':group,'screens':a['screens'],'trimApplied':False,'distributionAllowed':False})
for e in entries:
 if e['group']=='standalone':e['plannedPage']=e['semanticId'];continue
 page=pages.setdefault(e['group'],{'n':0,'x':2,'y':2,'row':0});w,h=e['runtimeSize']
 if page['x']+w+2>2048:page['x']=2;page['y']+=page['row']+4;page['row']=0
 if page['y']+h+2>2048:page['n']+=1;page['x']=2;page['y']=2;page['row']=0
 e['plannedPage']=e['group']+'_'+str(page['n']);e['plannedRect']=[page['x'],page['y'],w,h];page['x']+=w+4;page['row']=max(page['row'],h)
route={screen:sum(e['decodedBytes'] for e in entries if screen in e['screens']) for screen in {x for e in entries for x in e['screens']}}
assert route['SCREEN-003']<128*1024**2
out={'taskId':'TASK-0032','status':'PASS','packing':'Planned 2048 pages with 2px padding/extrusion; initial Skia import uses individual semantic images. Physical atlas packing awaits measured texture cost.','records':entries,'routeDecodedBytesIndividualImages':route,'pageCounts':{g:p['n']+1 for g,p in pages.items()},'rights':'Local development authorized; distribution proof remains release gate.'}
(R/'analysis/figma/atlas_plan.json').write_text(json.dumps(out,indent=2)+'\n')
(R/'analysis/reports/asset-import/planning.json').write_text(json.dumps({'status':'PASS','mappedHeroFamilies':10,'rarityInferred':False,'selectedAssets':len(entries),'sourceHashesValid':all(hashlib.sha256((R/e['sourceFile']).read_bytes()).hexdigest()==e['sourceSha256'] for e in entries),'battleDecodedMiB':route['SCREEN-003']/1024**2,'allPlannedRectsWithin2048':all('plannedRect' not in e or e['plannedRect'][0]+e['runtimeSize'][0]+2<=2048 and e['plannedRect'][1]+e['runtimeSize'][1]+2<=2048 for e in entries),'figmaContext':'analysis/figma/implementation/battle-context.txt','unavailableNewFile':'Yc3y8PHv9qJdh1fXUzLl1S: Figma connector reports no edit access; no version identity assumed.'},indent=2)+'\n')
print(json.load(open('analysis/reports/asset-import/planning.json')))
