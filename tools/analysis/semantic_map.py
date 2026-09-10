#!/usr/bin/env python3
"""Combine manually inspected identities, ZIP metrics and Figma hierarchy."""
import json,csv,collections
from pathlib import Path
from PIL import Image,ImageDraw

root=Path('analysis/figma')
def dump(name,value):(root/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
rows=json.loads((root/'asset_manifest.json').read_text());nodes=json.loads((root/'node_inventory.json').read_text())['nodes'];by={n[0]:n for n in nodes}
labels={int(line.split()[0]):line.split()[1] for line in (root/'visual_classification.txt').read_text().splitlines() if line and not line.startswith('#')}
assert set(labels)==set(range(1,352))
screens=[('SCREEN-001','2:2','loading'),('SCREEN-002','2:406','start'),('SCREEN-003','2:426','main_battle'),('SCREEN-004','75:744','hero_equipment'),('SCREEN-005','71:279','relic'),('SCREEN-006','80:1109','dungeon'),('SCREEN-007','89:1310','hero_upgrades'),('SCREEN-008','2:418','daily_get_gold'),('SCREEN-009','106:553','daily_claim'),('SCREEN-010','2:186','settings'),('SCREEN-011','2:171','settings_modal'),('SCREEN-012','2:114','maintenance'),('SCREEN-013','2:265','wheel_spin'),('SCREEN-014','2:276','wheel_free'),('SCREEN-015','2:287','wheel_cooldown')]
screen_by_top={node:sid for sid,node,_ in screens};refs=collections.defaultdict(list)
for n in nodes:
 for h in n[9]:refs[h].append(n)
used_names=collections.Counter();semantic=[]
for r in rows:
 label=labels[r['index']];category=label.split('_')[0];nrefs=refs[r['sourceInternalId']]
 name=f"{label}__{r['width']}x{r['height']}";used_names[name]+=1
 if used_names[name]>1:name+=f"_variant{used_names[name]}"
 r.update(category=category,semanticName=name,confidence=.95 if nrefs else .85,usedOnScreens=sorted({screen_by_top[n[2]] for n in nrefs if n[2] in screen_by_top}),bakedText='YES' if label.startswith(('branding_logo','branding_welcome','branding_app','branding_banner','reference_screen')) else 'NO_VISIBLE_TEXT',nineSliceCandidate=label.startswith(('ui_panel','ui_button','ui_frame_equipment','ui_frame_board')))
 scope='UNUSED_OR_REFERENCE_ONLY' if category=='reference' or label in ['branding_banner','branding_app_icon','reference_gradient_wallpaper'] else ('USED_POST_MVP' if category=='relic' or label.startswith('background_dungeon') else 'USED_IN_MVP')
 atlas='reference_only' if scope=='UNUSED_OR_REFERENCE_ONLY' else ('equipment_icons' if category in ['equipment','relic'] else 'hero_portraits' if category=='portrait' else 'battle_common' if category in ['hero','enemy','boss'] else 'backgrounds' if category=='background' else 'meta_daily_wheel' if 'wheel' in label or 'chest' in label or 'gift' in label else 'core_ui')
 b=r['alphaBounds'];pivot={'x':.5,'y':round((b['y']+b['h'])/r['height'],5)} if category in ['hero','enemy','boss'] else {'x':.5,'y':.5}
 semantic.append({'semanticId':name,'visualFamily':label,'sourceHash':r['sourceInternalId'],'sourceFile':r['sourceFile'],'sourceNodeIds':[n[0] for n in nrefs],'sourceNodeNames':list(dict.fromkeys(n[4] for n in nrefs)),'sourceDimensions':[r['width'],r['height']],'trimmedDimensions':[b['w'],b['h']],'alpha':r['hasAlpha'],'targetPath':f"cocos-game/assets/art/{category}/{name}."+('jpg' if r['format']=='JPEG' else 'png'),'category':category,'screens':r['usedOnScreens'],'prefabUsage':{'hero':'HeroView','enemy':'EnemyView','boss':'EnemyView','portrait':'HeroPortrait','equipment':'EquipmentSlot','relic':'RelicCard','ui':'UiSprite'}.get(category,'ScreenArt'),'atlasGroup':atlas,'importSettings':{'filtering':'linear','mipmaps':False,'wrap':'clamp','maxTextureSize':2048,'compression':'RGBA8 validation; platform ASTC/ETC2 after alpha QA','trim':'metadata_only_until_pivot_QA'},'pivotTopLeftNormalized':pivot,'pivotStatus':'PROPOSED_ALPHA_FOOT' if category in ['hero','enemy','boss'] else 'PROPOSED_CENTER','nineSlice':{'candidate':r['nineSliceCandidate'],'insets':None,'status':'UNKNOWN_REQUIRES_BORDER_INSPECTION' if r['nineSliceCandidate'] else 'NOT_APPLICABLE'},'animationRole': 'body_transform' if category in ['hero','enemy','boss'] else 'static_or_ui','derivativeAllowed':'technical resize/trim with source mapping; artwork changes require visual review','license':'user-provided; production rights unverified','scope':scope,'status':'MAPPED_NOT_IMPORTED','classificationStatus':'OBSERVED_VISUAL_ROLE','gameplayMeaningStatus':'UNKNOWN' if category in ['equipment','relic'] else 'NOT_CLAIMED','higherResolutionCandidates':[]})
families=collections.defaultdict(list)
for a in semantic:families[a['visualFamily']].append(a)
for a in semantic:a['higherResolutionCandidates']=[b['semanticId'] for b in families[a['visualFamily']] if b['sourceDimensions'][0]*b['sourceDimensions'][1]>a['sourceDimensions'][0]*a['sourceDimensions'][1]]
dump('asset_manifest.json',rows);dump('semantic_map.json',semantic);dump('asset_source_map.json',{a['semanticId']:{'hash':a['sourceHash'],'nodes':a['sourceNodeIds'],'source':a['sourceFile']} for a in semantic})
with (root/'asset_manifest.csv').open('w',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(dict,list)) else v for k,v in r.items()} for r in rows)
catalog=[]
for sid,node,slug in screens:
 t=by[node];ns=[n for n in nodes if n[2]==node];assets=[a['semanticId'] for a in semantic if sid in a['screens']]
 catalog.append({'screenId':sid,'nodeId':node,'name':slug,'figmaName':t[4],'referenceSize':t[7:9],'canvasPosition':t[5:7],'screenshot':f'analysis/figma/screenshots/{node.replace(":","_")}.png','directChildren':[{'id':n[0],'type':n[3],'name':n[4],'bounds':n[5:9],'normalizedBounds':[round(n[5]/430,5),round(n[6]/932,5),round(n[7]/430,5),round(n[8]/932,5)]} for n in ns if n[1]==node],'assets':assets,'nodeCount':len(ns)})
dump('screen_map.json',catalog)
with (root/'asset_ownership.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['asset_id','source','owner_license_status','allowed_in_production','notes'])
 for a in semantic:w.writerow([a['semanticId'],a['sourceFile'],'USER_PROVIDED_RIGHTS_UNVERIFIED','UNKNOWN','No proprietary reference-game extraction'])
for cat in sorted({a['category'] for a in semantic}):
 entries=[r for r in rows if r['category']==cat]
 for offset in range(0,len(entries),60):
  chunk=entries[offset:offset+60];height=((len(chunk)+7)//8)*180;im=Image.new('RGB',(1200,height),'#ced1d5');d=ImageDraw.Draw(im)
  for j,r in enumerate(chunk):
   x=j%8*150;y=j//8*180;a=Image.open(r['sourceFile']).convert('RGBA');a.thumbnail((140,140));im.paste(a,(x+(150-a.width)//2,y),a);d.text((x,y+145),str(r['index'])+' '+labels[r['index']].split('_')[-1][:15],fill='black')
  im.save(root/'contact_sheets'/f'{cat}_{offset//60+1:02d}.jpg',quality=88)
dump('semantic_summary.json',{'mapped':len(semantic),'hierarchyMatched':sum(bool(a['sourceNodeIds']) for a in semantic),'visualOnly':sum(not a['sourceNodeIds'] for a in semantic),'categories':dict(collections.Counter(a['category'] for a in semantic)),'scopeSets':dict(collections.Counter(a['scope'] for a in semantic)),'unknownUnclassified':[],'sourceHashMatchCount':sum(bool(refs[r['sourceInternalId']]) for r in rows)})
print((root/'semantic_summary.json').read_text())
