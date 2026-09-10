#!/usr/bin/env python3
"""Targeted delivery classification and graph refresh; preserves stable tasks and source specs."""
from pathlib import Path
from collections import Counter
import argparse,json,re,hashlib
from delivery_decisions import GROUPS,DEPS,OVERRIDES,R,S,D,APP,ADS,GENERAL,FIGMA
ROOT=Path(__file__).resolve().parents[2]
def read(path):return (ROOT/path).read_text()
def write(path,text):(ROOT/path).write_text(text.rstrip()+'\n')
def dump(path,data):write(path,json.dumps(data,ensure_ascii=False,indent=2))
def topology(nodes):
 done=[]
 while len(done)<len(nodes):
  ready=sorted(i for i,t in nodes.items() if i not in done and set(t['dependencies'])<=set(done))
  if not ready:raise ValueError('Dangling dependency or cycle: '+', '.join(sorted(set(nodes)-set(done))))
  done+=ready
 return done

def is_active(t):return t.get('executionScope')!='HISTORICAL' and t.get('deliveryClassification')!=D

def compute(manifest):
 ids={t['id']:t for t in manifest['tasks']};active={i:t for i,t in ids.items() if is_active(t)}
 topology(ids);order=topology(active)
 remaining=[i for i in order if active[i]['status']!='COMPLETED']
 costs={};paths={}
 for i in order:
  parent=max(active[i]['dependencies'],key=lambda d:costs[d],default=None)
  weight=0 if active[i]['status']=='COMPLETED' else active[i].get('estimatedPoints',3)
  costs[i]=(costs[parent] if parent else 0)+weight
  paths[i]=(paths[parent] if parent else [])+([] if not weight else [i])
 return active,order,remaining,paths['TASK-0237'],costs['TASK-0237']

def validate(manifest):
 errors=[];ids={t['id']:t for t in manifest['tasks']};delivery=manifest.get('delivery',{})
 # Required product anchors cannot be silently deferred to make a graph pass.
 anchors=[*range(62,70),*range(119,130),*range(133,140),*range(168,187),202,203,207,208,209,210,224,229,231,232,233,234,237,242,243,246,*range(254,260)]
 for n in anchors:
  i=f'TASK-{n:04d}';t=ids.get(i,{})
  consolidated=(n in [69,127,180] and delivery.get('qaPolicy') and t.get('qaCoverageOwners')) or (n in [186,224,233] and i in delivery.get('candidateMode',{}).get('deferredTasks',[]) and t.get('candidateCoverageOwners'))
  if not consolidated and (not t or t.get('deliveryClassification') not in [R,S] and t.get('status')!='COMPLETED'):errors.append((i,'required product/Figma/quality anchor excluded'))
 for i in delivery.get('qaConsolidatedTasks',[]):
  owners=ids.get(i,{}).get('qaCoverageOwners',[])
  if not owners or any(o not in ids or not is_active(ids[o]) for o in owners):errors.append((i,'consolidated QA has no active coverage owner'))
 for source,digest in delivery.get('sourceHashes',{}).items():
  p=ROOT/source
  if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:errors.append((source,'authoritative source changed; targeted review required'))
 for i in delivery.get('classifiedAtCheckpoint',[]):
  t=ids.get(i,{})
  if t.get('deliveryClassification') not in [R,S,D] or not t.get('deliveryRationale') or not t.get('deliverySources'):errors.append((i,'missing classification/justification/source'))
 for t in manifest['tasks']:
  if t['status'] in ['NOT_STARTED','IN_PROGRESS'] and t.get('deliveryClassification') not in [R,S,D]:errors.append((t['id'],'unclassified remaining task'))
  if is_active(t):
   for d in t['dependencies']:
    if d not in ids or not is_active(ids[d]):errors.append((t['id'],'deferred/dangling dependency',d))
 try:
  active,order,remaining,path,points=compute(manifest)
  if manifest.get('executableTopologicalOrder')!=order:errors.append(('stale executable order',))
  gate_ancestors=set()
  def visit(i):
   for d in ids[i]['dependencies']:
    if d not in gate_ancestors:gate_ancestors.add(d);visit(d)
  visit('TASK-0237')
  ungated=set(remaining)-gate_ancestors-{'TASK-0237'}
  if ungated:errors.append(('required tasks do not reach delivery gate',sorted(ungated)))
  if delivery.get('remainingRequiredTaskIds')!=remaining:errors.append(('stale delivery remaining list',))
  if delivery.get('criticalPath')!=path:errors.append(('stale remaining critical path',))
 except ValueError as e:errors.append((str(e),))
 return {'passed':not errors,'errors':errors,'classified':len(delivery.get('classifiedAtCheckpoint',[])),'gate':'DELIVERY_COMPLETE','gateIsProductAcceptance':True}

def apply(manifest):
 if 'delivery' in manifest:raise ValueError('Scope already classified; use --refresh to preserve decisions')
 ids={t['id']:t for t in manifest['tasks']};classified=[]
 for cat,numbers,group,reason,sources in GROUPS:
  for n in numbers:
   i=f'TASK-{n:04d}';t=ids[i]
   if t['status'] not in ['NOT_STARTED','IN_PROGRESS']:continue
   classified.append(i);t.update(deliveryClassification=cat,deliveryGroup=group,deliveryRationale=reason,deliverySources=sources)
 for n,deps in DEPS.items():
  t=ids[f'TASK-{n:04d}'];assert t['status']!='COMPLETED'
  if t['dependencies']!=[f'TASK-{d:04d}' for d in deps]:t['preDeliveryDependencies']=t['dependencies'];t['dependencies']=[f'TASK-{d:04d}' for d in deps]
 for n,scope in OVERRIDES.items():
  t=ids[f'TASK-{n:04d}'];assert t['status']!='COMPLETED'
  t['preDeliveryOracle']=t['oracle'];t['preDeliveryAcceptanceCriteria']=t['acceptanceCriteria'];t['oracle']=scope
  t['acceptanceCriteria']=[scope,*[c for c in t['acceptanceCriteria'] if c!=t['preDeliveryOracle']]]
  t['deliveryScopeOverride']=scope
 active={i:t for i,t in ids.items() if is_active(t) and i!='TASK-0237'}
 used={d for t in active.values() for d in t['dependencies']}
 gate=ids['TASK-0237'];gate['preDeliveryDependencies']=gate['dependencies']
 gate['dependencies']=sorted(i for i,t in active.items() if i not in used and t['status']!='COMPLETED')
 manifest['delivery']={'status':'SCOPE_CLASSIFIED_PRODUCT_INCOMPLETE','checkpointBeforeAmendment':'70217f1','classifiedAtCheckpoint':sorted(classified),'gateTaskId':'TASK-0237','gateArtifact':'DELIVERY_COMPLETE.md','sourceHashes':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in [APP,ADS,GENERAL,FIGMA]}}
 # Edit only classified task blocks and materially affected phase lines.
 for p in sorted((ROOT/'tasks').glob('TASKS_PHASE_*.md')):
  text=p.read_text()
  for i in sorted(classified):
   t=ids[i]
   if p.name!=f"TASKS_PHASE_{t['phase']:02d}.md":continue
   a=text.index('## '+i+' —');z=text.find('\n<a id="task-',a+1);z=len(text) if z<0 else z;b=text[a:z]
   deps=', '.join(f"[{d}](TASKS_PHASE_{ids[d]['phase']:02d}.md)" for d in t['dependencies']) or 'none'
   b=re.sub(r'^Dependencies: .*$', 'Dependencies: '+deps,b,count=1,flags=re.M)
   annotation=f"\nDelivery classification: **{t['deliveryClassification']}**. {t['deliveryRationale']}\n"
   if t.get('deliveryScopeOverride'):annotation+='\nCurrent delivery scope: '+t['deliveryScopeOverride']+'\n'
   annotation+='\n[Delivery scope and gate](../plans/DELIVERY_SCOPE.md). Preserved internal/reference specifications do not expand this scope.\n'
   b=b.replace('\n### Goal\n',annotation+'\n### Goal\n',1)
   if t.get('preDeliveryOracle'):b=b.replace(t['preDeliveryOracle'],t['oracle'])
   text=text[:a]+b+text[z:]
  p.write_text(text)
 for p in sorted((ROOT/'plans').glob('PHASE_*.md')):
  text=p.read_text();phase=int(p.name[6:8]);changed=[ids[i] for i in classified if ids[i]['phase']==phase]
  for t in changed:
   text=re.sub(r'(\['+t['id']+r'\][^\n]*Required predecessors: )[^\n]+',lambda m:m[1]+(', '.join(t['dependencies']) or 'none')+'.',text)
   if t.get('preDeliveryOracle'):text=text.replace(t['preDeliveryOracle'],t['oracle'])
  if changed:text+='\n## Current delivery scope\n\nOnly REQUIRED_NOW and SUPPORTING_REQUIRED tasks gate current delivery.\nOriginal subsystem specifications remain available for deferred work.\n[Authoritative classification and gate](DELIVERY_SCOPE.md).\n\n'+'\n'.join(f"- {t['id']}: {t['deliveryClassification']}." for t in changed)+'\n'
  p.write_text(text)
 return manifest

def refresh(manifest):
 ids={t['id']:t for t in manifest['tasks']};active,order,remaining,path,points=compute(manifest)
 manifest['topologicalOrder']=topology(ids);manifest['executableTopologicalOrder']=order
 manifest['delivery'].update(remainingRequiredTaskIds=remaining,criticalPath=path,criticalPathPoints=points,deferredTaskIds=sorted(i for i,t in ids.items() if t.get('deliveryClassification')==D))
 dump('tasks/task_manifest.json',manifest)
 graph=json.loads(read('analysis/reports/task_dependency_analysis.json'))
 graph.update(criticalPath=path,criticalPathRelativePoints=points,criticalPathEndpoint='TASK-0237',method='Longest remaining weighted delivery path; completed tasks weigh zero; deferred tasks excluded.',executableTaskCount=len(active),edgeCount=sum(len(t['dependencies']) for t in active.values()),topologicalOrder=order,acyclic=True,delivery=manifest['delivery'])
 dump('analysis/reports/task_dependency_analysis.json',graph)
 records=[{'id':i,'title':ids[i]['title'],'status':ids[i]['status'],'classification':ids[i]['deliveryClassification'],'group':ids[i]['deliveryGroup'],'rationale':ids[i]['deliveryRationale'],'sources':ids[i]['deliverySources'],'dependencies':ids[i]['dependencies']} for i in manifest['delivery']['classifiedAtCheckpoint']]
 result=validate(manifest);dump('analysis/reports/delivery_scope.json',{'status':'PASS' if result['passed'] else 'FAIL','scopeValidationOnly':True,'deliveryComplete':False,'classificationCountsAtAmendment':dict(Counter(r['classification'] for r in records)), 'remainingRequired':len(remaining),'criticalPath':path,'criticalPathPoints':points,'records':records,'validation':result})
 rows=['| Task | Phase | Priority | Deliverable | Dependencies | Complexity | Risk | Delivery scope |','| --- | --- | --- | --- | --- | --- | --- | --- |']
 for t in manifest['tasks']:
  title=t['title'] if t.get('executionScope')!='HISTORICAL' else 'Historical native spike evidence (SUPERSEDED strategy)'
  rows.append(f"| [{t['id']}](TASKS_PHASE_{t['phase']:02d}.md#{t['id'].lower()}) | {t['phase']:02d} | {t['priority']} | {title} | {', '.join(t['dependencies']) or 'none'} | {t['complexity']} | {t['risk']} | {t.get('deliveryClassification',t.get('executionScope',t['status']))} |")
 write('tasks/TASK_INDEX.md','# Atomic task index\n\n[Delivery scope](../plans/DELIVERY_SCOPE.md) governs current execution. Stable IDs and deferred specifications are preserved.\n\n'+'\n'.join(rows))
 write('plans/01_DEPENDENCY_GRAPH.md','# Delivery dependency graph\n\nOnly REQUIRED_NOW + SUPPORTING_REQUIRED work and completed predecessor anchors participate. Deferred tasks remain in the full manifest with their specifications. Numeric phases are organizational labels, not scheduling barriers.\n\n| Task | Dependencies | Output |\n| --- | --- | --- |\n'+'\n'.join(f"| {i} | {', '.join(active[i]['dependencies']) or 'none'} | `{active[i]['output']}` |" for i in order)+'\n\n[Scope](DELIVERY_SCOPE.md) · [Manifest](../tasks/task_manifest.json)')
 write('plans/02_CRITICAL_PATH.md',f'# Remaining delivery critical path\n\nEndpoint TASK-0237 / DELIVERY_COMPLETE. {points} relative points; these are not hours or a delivery date. Completed work has zero remaining weight; deferred work is excluded.\n\n| Order | Task | Deliverable | Points |\n| --- | --- | --- | --- |\n'+'\n'.join(f"| {n+1} | {i} | {ids[i]['title']} | {ids[i].get('estimatedPoints',3)} |" for n,i in enumerate(path))+'\n\n[Scope](DELIVERY_SCOPE.md) · [Execution priority](00_EXECUTION_ORDER.md)')
 groups=[]
 for cat,group in dict.fromkeys((r['classification'],r['group']) for r in records):
  selected=[r['id'] for r in records if r['classification']==cat and r['group']==group and (cat==D or r['status']!='COMPLETED')]
  groups.append(f"| {cat} | {group} | {', '.join(selected) or 'Completed'} |")
 report='''# Current delivery scope

Authority: app-specific [ТЗ](<../docs/tz/Merge Heroes Unite War тз на разработку.md>) first; [advertising requirements](<../docs/tz/Реклама в приложениях.md>) govern rewarded behavior; supplied Figma governs required screens/art/composition; [general instructions](<../docs/tz/Инструкция для разработчиков.md>) apply only to this game. Internal plans and reference research provide implementation detail, not extra delivery scope. This is a complete production delivery, not an MVP/prototype.

The amendment follows coherent checkpoint `70217f1` (TASK-0167). All 152 tasks remaining at that checkpoint were reviewed: 50 REQUIRED_NOW, 58 SUPPORTING_REQUIRED, 44 DEFERRED_POST_DELIVERY. Completed work is preserved. Per-task reasons, source references, original dependency/acceptance values and current dependencies are in the [manifest](../tasks/task_manifest.json) and [machine-readable report](../analysis/reports/delivery_scope.json).

All 15 supplied Figma artboards remain required. This includes equipment and hero upgrades, relic Open x1/x10, daily rewards, maintenance/retry, and the three Dungeon dragon entries as well as loading/start/battle/Settings/Wheel. Relevant relic/dragon/open tasks 0242/0243/0246 are promoted from the old post-release group and bounded to those actual controls; Demon/Tower/pity/reference research stay deferred. The source .fig, semantic mapping, original screenshots and product specs are unchanged.

## Remaining required tasks and preserved deferred groups

| Classification | Group | Task IDs |
| --- | --- | --- |
'''+ '\n'.join(groups)+f'\n\nCurrent remaining delivery tasks: {len(remaining)}. [Remaining critical path](02_CRITICAL_PATH.md): {points} relative points. [Executable graph](01_DEPENDENCY_GRAPH.md) excludes all deferred work.\n'+'''
## Delivery gate

TASK-0237 owns `DELIVERY_COMPLETE.md`; create it only when the product gate actually passes. Scope-validation PASS is not product completion.

- Every explicit app ТЗ feature and every required interactive Figma screen, with high visual fidelity and no placeholders.
- Polished buy/spawn/drag/merge/battle/stage/boss loop, required VFX/animations, menu/game music and SFX.
- Complete Settings sound/notification/legal controls; 12-hour Wheel with durable outcome, timers and Watch & Claim.
- Rewarded-only Start.io where supported: unlimited 1000-coin shop videos, wheel claims and the 2-second win Boost / 1.5-second x1–x10 multiplier flow; no unconfirmed or duplicate grants, banners, interstitials or automatic ads.
- Project AppMetrica/configuration, reliable native/web persistence and restart, responsive layouts/safe areas, usable permission/failure/cancellation states.
- Actual Android production build/smoke and APK/AAB; iOS production build where signing/environment allow; package-named project ZIP, tested artifacts/checksums and required GitLab/repository/build metadata with monotonic delivered versions. Signing material and private configuration stay out of public Git/ZIP.
- Required native performance, save, visual, interaction, audio and final release smoke acceptance; zero known P0/P1 defects. Deferred optimization projects do not excuse a measured defect.

An unavailable owner-controlled credential, signing account, physical device, Start.io registration, final legal/rights approval or GitLab destination must be recorded as an exact external action after all independent work is completed. Such cases are NOT_RUN/BLOCKED, not PASS; the gate stays open. Prepare concrete artifacts before requesting any necessary publication approval. No automatic account messages or release submission follow from this amendment.

[Consistency acceptance](../analysis/reports/delivery_consistency.json) · [Negative validator tests](../analysis/reports/delivery_scope_tests.txt).

No generic betting, withdrawals, paid packs, low-balance handouts, leaderboards absent from this app's Figma, reference-only quests/offline farming, or store submission are added. Existing durable state/receipts and already implemented core rules remain intact.
'''
 if manifest['delivery'].get('qaPolicy'):report+='\nQA consolidation: '+str(len(manifest['delivery']['qaConsolidatedTasks']))+' duplicate/exhaustive QA tasks are additionally deferred; their mandatory checks move to named active owners. [Current QA policy](../docs/qa/10_DELIVERY_QA_POLICY.md) governs lightweight presentation acceptance, batched milestones and retained final release safety. Current classifications: '+', '.join(f'{k}: {v}' for k,v in Counter(r['classification'] for r in records).items())+'.\n'
 if delivery_mode:=manifest['delivery'].get('candidateMode'):
  report=report.replace('# Current delivery scope','# Current delivery scope\n\n**Execution override:** [Six-hour runnable candidate mode](DELIVERY_CANDIDATE_MODE.md) supersedes standalone QA and formal distribution ceremony below. All required product behavior remains mandatory. Final native smoke rebuilds the complete app; early launches run before final platform gates.',1)
 write('plans/DELIVERY_SCOPE.md',report)
 return result

if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--apply',action='store_true');parser.add_argument('--refresh',action='store_true');args=parser.parse_args()
 manifest=json.loads(read('tasks/task_manifest.json'))
 if args.apply:manifest=apply(manifest)
 result=refresh(manifest) if args.apply or args.refresh else validate(manifest)
 print(json.dumps(result,indent=2));raise SystemExit(0 if result['passed'] else 1)
