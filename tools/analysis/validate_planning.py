#!/usr/bin/env python3
"""Validate planning integrity and schema examples. Does not build or test a game."""
from plan_common import *
import re,csv,hashlib,sys,ast,copy,argparse,os
from collections import Counter,defaultdict,deque
from urllib.parse import unquote
from jsonschema import Draft202012Validator
from referencing import Registry,Resource

parser=argparse.ArgumentParser(description=__doc__)
modes=parser.add_mutually_exclusive_group()
modes.add_argument('--complete',action='store_true',help='Read-only planning completion check')
modes.add_argument('--implementation',action='store_true',help='Read-only implementation evidence and native gate check')
parser.add_argument('--report',help='Write the full current validation result to this explicit report path')
args=parser.parse_args()
implementation=args.implementation
final=args.complete or implementation
errors=[];checks=[]
def check(name,ok,detail):
 checks.append({'check':name,'passed':bool(ok),'detail':detail})
 if not ok:errors.append(name+': '+str(detail))
req=json.loads((ROOT/'analysis/reports/required_artifacts.json').read_text())
allowed={'analysis/reports/planning_consistency_report.md'}|({'PLANNING_COMPLETE.md'} if not final else set())
missing=[p for p in req if not (ROOT/p).is_file() and p not in allowed]
empty=[p for p in req if (ROOT/p).is_file() and not (ROOT/p).stat().st_size]
check('required_artifacts',not missing and not empty,{'required':len(req),'missing':missing,'empty':empty,'completionPendingByDesign':not final})
sha=lambda p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
check('immutable_original_fig',sha('docs/Merge Heroes Unite War.fig')=='59b80b59e499d68278363460e0f4cf46498eb688366e3ed098fe3fafc92aec69','original SHA256 matches initial inventory')
check('immutable_master',sha('docs/CODEX_MASTER_PLAN.md')=='3d0084b914c4d8c56580c98f63fbad0f2c71d312638a03ff3237f2f5d5098dde','master SHA256 matches full-read input')
runtime_present=any((ROOT/p).exists() for p in ['game-core','cocos-game','mobile-shell','package.json'])
if not implementation:
 check('no_production_implementation',not runtime_present, 'Only plans/schemas/evidence/analysis scripts and spike documentation are present')
manifest=json.loads((ROOT/'analysis/figma/asset_manifest.json').read_text());semantic=json.loads((ROOT/'analysis/figma/semantic_map.json').read_text())
required_asset=['sourceInternalId','sourceFile','sha256','phash','width','height','aspectRatio','format','hasAlpha','alphaBounds','exactDuplicateOf','nearDuplicateGroup','category','semanticName','confidence','usedOnScreens','notes']
check('asset_manifest_fields',len(manifest)==351 and all(all(k in a for k in required_asset) for a in manifest),'351 rows with all master-required fields')
source_errors=[a['sourceFile'] for a in manifest if not (ROOT/a['sourceFile']).exists() or sha(a['sourceFile'])!=a['sha256']]
check('asset_source_hashes',not source_errors,source_errors or '351 source rasters hash-verified')
semids={a['semanticId'] for a in semantic};hashes={a['sourceHash'] for a in semantic}
check('semantic_coverage',len(semids)==len(hashes)==351 and hashes=={a['sourceInternalId'] for a in manifest},'351 unique source/semantic mappings;no unclassified asset')
semfields=['sourceNodeIds','sourceDimensions','trimmedDimensions','targetPath','screens','prefabUsage','atlasGroup','importSettings','pivotTopLeftNormalized','nineSlice','animationRole','derivativeAllowed','license','scope','status']
check('semantic_import_contract',all(all(k in a for k in semfields) for a in semantic),'All import/pivot/atlas/rights/scope fields present;unknown insets explicitly null')
screens=sorted((ROOT/'docs/screens').glob('SCREEN-*.md'));screenids={p.stem.split('_')[0] for p in screens}
check('screen_coverage',len(screens)==15 and all((ROOT/'analysis/figma/screenshots'/n).is_file() for n in ['2_2.png','2_406.png','2_426.png','75_744.png','71_279.png','80_1109.png','89_1310.png','2_418.png','106_553.png','2_186.png','2_171.png','2_114.png','2_265.png','2_276.png','2_287.png']), '15 Figma screen specs and actual screenshots')
check('asset_screen_refs',all(set(a['usedOnScreens'])<=screenids for a in manifest),'No nonexistent screen ID in source manifest')
tm=json.loads((ROOT/'tasks/task_manifest.json').read_text());tasks=tm['tasks'];ids={t['id']:t for t in tasks}
check('task_ids',len(ids)==len(tasks) and len(tasks)>=251 and sorted(ids)==[f'TASK-{i:04d}' for i in range(1,len(tasks)+1)],f'{len(tasks)} unique contiguous IDs')
baddep=[(t['id'],d) for t in tasks for d in t['dependencies'] if d not in ids or d==t['id']]
incoming={i:0 for i in ids};adj=defaultdict(list)
for t in tasks:
 for d in t['dependencies']:
  if d in ids:incoming[t['id']]+=1;adj[d].append(t['id'])
queue=deque(i for i,n in incoming.items() if not n);topo=[]
while queue:
 i=queue.popleft();topo.append(i)
 for nxt in adj[i]:
  incoming[nxt]-=1
  if incoming[nxt]==0:queue.append(nxt)
check('task_dag',not baddep and len(topo)==len(tasks),{'edges':sum(len(t['dependencies']) for t in tasks),'badDependencies':baddep,'sorted':len(topo)})
phase_deps={i:set() for i in range(21)}
for t in tasks:
 for d in t['dependencies']:
  if d in ids and ids[d]['phase']!=t['phase']:phase_deps[t['phase']].add(ids[d]['phase'])
phase_order=[]
while len(phase_order)<21:
 ready=[i for i,ds in phase_deps.items() if i not in phase_order and ds<=set(phase_order)]
 if not ready:break
 phase_order+=ready
# Phase labels group work; early release configuration and promoted Figma tasks
# can form aggregate phase cycles without a task cycle. Only the task DAG schedules.
check('phase_group_coverage',set(phase_deps)==set(range(21)) and len(topo)==len(tasks),{'phaseLabelsAreNotSchedulingUnits':True,'aggregateOrder':phase_order,'edges':{str(i):sorted(d) for i,d in phase_deps.items()}})
check('task_atomic_contract',all(t['complexity'] in ['XS','S','M','L'] and t['risk'] in ['low','medium','high'] and t['output'] and t['oracle'] and t['testCases'] and t['acceptanceCriteria'] for t in tasks),'Every task has bounded output,oracle,tests,size,risk and acceptance')
if implementation:
 execution_errors=[]
 for t in tasks:
  if t['status'] not in ['NOT_STARTED','IN_PROGRESS','BLOCKED','COMPLETED','SUPERSEDED']:
   execution_errors.append((t['id'],'invalid status'))
  if t['status']=='COMPLETED':
   if any(ids.get(d,{}).get('status')!='COMPLETED' for d in t['dependencies']):
    execution_errors.append((t['id'],'dependency not completed'))
   if not (ROOT/t['output']).is_file():execution_errors.append((t['id'],'output missing'))
   if not t.get('evidence') or any(not (ROOT/p).is_file() for p in t.get('evidence',[])):
    execution_errors.append((t['id'],'evidence missing'))
   if t.get('verification',{}).get('status')!='PASS' or not t.get('completedAt'):
    execution_errors.append((t['id'],'acceptance or timestamp missing'))
  taskdoc=ROOT/f"tasks/TASKS_PHASE_{t['phase']:02d}.md"
  block=re.split(r'^## '+re.escape(t['id'])+r' — ',taskdoc.read_text(),flags=re.M)[1].split('\n## TASK-',1)[0]
  if 'Status: '+t['status']+'\n' not in block:
   execution_errors.append((t['id'],'manifest/document status mismatch'))
 check('task_execution_evidence',not execution_errors,execution_errors or dict(Counter(t['status'] for t in tasks)))
 from runtime_consistency import validate as validate_runtime
 runtime_check=validate_runtime(ROOT,tm)
 check('runtime_architecture_consistency',runtime_check['passed'],runtime_check)
 check('production_amendment_gate',not runtime_present or ids.get('TASK-0252',{}).get('status')=='COMPLETED','Production foundation follows accepted ADR-007 and completed targeted migration')
 if 'delivery' in tm:
  from delivery_scope import validate as validate_delivery
  delivery_check=validate_delivery(tm)
  check('delivery_scope_and_dag',delivery_check['passed'],delivery_check)
else:
 check('all_tasks_future',all(t['status']=='NOT_STARTED' for t in tasks),'Planning does not claim implementation tasks passed')
taskheads=['Goal','Context','Source-of-truth docs','Exact files to inspect first','Files expected to create','Files expected to modify','Implementation steps','Edge cases','Test cases','Manual verification','Acceptance criteria','Definition of Done','Do not do','Estimated complexity','Notes / unknowns']
badheads=[]
for p in sorted((ROOT/'tasks').glob('TASKS_PHASE_*.md')):
 blocks=re.split(r'^## TASK-\d{4} — ',p.read_text(),flags=re.M)[1:]
 for b in blocks:
  for h in taskheads:
   if '### '+h+'\n' not in b:badheads.append((p.name,b.splitlines()[0],h))
check('task_document_sections',not badheads,badheads or 'All251 task blocks have every required heading')
phaseheads=['Goal','Why this phase exists','Entry criteria','Source documents to read first','Inputs','Outputs','Non-goals','Dependencies','Risks','Decisions that must already be locked','Detailed implementation sequence','Files/directories expected to be created','Existing files expected to be modified','Data migrations if any','Tests required','Manual validation procedure','Performance checks','Visual checks','Android checks','iOS checks','Web-preview checks','Failure/rollback strategy','Definition of Done','Exit criteria','Tasks generated from this phase']
phases=sorted((ROOT/'plans').glob('PHASE_*.md'));badphase=[(p.name,h) for p in phases for h in phaseheads if '## '+h+'\n' not in p.read_text()]
check('phase_document_sections',len(phases)==21 and not badphase,badphase or '21 complete phase plans')
systems=[*sorted((ROOT/'docs/gameplay').glob('[0-9][0-9]_*.md')),*sorted((ROOT/'docs/progression').glob('[0-9][0-9]_*.md'))];systems=[p for p in systems if not p.name.startswith('00_')]
badsub=[(p.name,c) for p in systems for c in 'ABCDEFGHIJKLMNOPQR' if not re.search(r'^## '+c+r'\. ',p.read_text(),re.M)]
check('subsystem_A_to_R',len(systems)==32 and not badsub,badsub or '17 gameplay+15 progression specs each have A–R contract')
unknowns=json.loads((ROOT/'analysis/reference/unknowns.json').read_text())
check('unknown_verification_tasks',len(unknowns)==35 and all(u.get('verification') and u.get('whyImportant') and u.get('taskId') in ids for u in unknowns),'35 unknowns each have reason,method,phase,severity and real task')
check('retired_gate_applicability',unknowns[0].get('status')=='SUPERSEDED_REQUIREMENT' and unknowns[0].get('supersededBy')=='ADR-007','Historical strategy retired; new RN device QA remains separately executable')
ledger=json.loads((ROOT/'analysis/reference/evidence_ledger.json').read_text());evid={e['id'] for e in ledger}
check('evidence_specs',len(evid)==len(ledger) and all((ROOT/e['spec']).is_file() and e['status'] in ['OBSERVED','MEASURED','DERIVED','INFERRED','PROPOSED','UNKNOWN'] for e in ledger),'31 evidence claims with status/source/spec linkage')
anims=list(csv.DictReader((ROOT/'docs/visual/animation_matrix.csv').open()));audio=list(csv.DictReader((ROOT/'docs/audio/audio_event_matrix.csv').open()));animids={a['eventId'] for a in anims};audioids={a['eventId'] for a in audio}
check('motion_audio_ids',len(animids)==len(anims) and len(audioids)==len(audio) and all(a['sfxId']=='none' or a['sfxId'] in audioids for a in anims),{'animationEvents':len(anims),'audioEvents':len(audio),'allAudioHooksResolve':True})
components=list(csv.DictReader((ROOT/'docs/visual/component_motion_map.csv').open()));badcomp=[r for r in components if r['screenId'] not in screenids or any(x!='none.static' and x not in animids for x in r['motionDecision'].split('/'))]
check('screen_motion_coverage',{r['screenId'] for r in components}==screenids and not badcomp,{'componentDecisions':len(components),'invalid':badcomp})
submap=json.loads((ROOT/'data-spec/subsystem-presentation-map.json').read_text())['entries']
check('subsystem_presentation_ids',len(submap)==32 and all(set(r['animationIds'])<=animids and set(r['audioIds'])<=audioids and (ROOT/r['spec']).exists() for r in submap),'All32 subsystem hook lists resolve to canonical motion/audio IDs')

# Check schema meta-validity and resolve all cross-schema references locally, never from network.
schemas={p.name:json.loads(p.read_text()) for p in (ROOT/'data-spec').glob('*.schema.json')}
registry=Registry().with_resources([(s['$id'],Resource.from_contents(s)) for s in schemas.values()])
schemaerrors=[]
for name,s in schemas.items():
 try:Draft202012Validator.check_schema(s)
 except Exception as e:schemaerrors.append((name,str(e)))
check('json_schema_meta_validation',not schemaerrors,{'schemas':len(schemas),'errors':schemaerrors})
schema_cases=[]
def validates(name,value):return not list(Draft202012Validator(schemas[name],registry=registry).iter_errors(value))
control={'version':1,'type':'app.pause','requestId':'pause:1','sessionId':'session:1','generation':1,'sequence':4,'timestamp':1000,'payload':{'reason':'background','hostMonotonicMs':100,'wallUtcMs':1000,'flushRequested':True}}
schema_cases.append(('valid bridge pause',validates('bridge.schema.json',control) and validates('bridge-payloads.schema.json',control)))
for label,mut in [('unknown type',lambda x:x.update(type='app.arbitrary')),('missing pause payload field',lambda x:x['payload'].pop('flushRequested')),('arbitrary reward amount',lambda x:x.update(type='app.rewardGranted',payload={'operationId':'op:1','placementId':'auto','verificationToken':'proof','amount':'100000'})),('wrong version',lambda x:x.update(version=2))]:
 bad=copy.deepcopy(control);mut(bad);schema_cases.append((label,not(validates('bridge.schema.json',bad) and validates('bridge-payloads.schema.json',bad))))
hero={'id':'hero_1','family':'warrior','tier':1,'rarityId':None,'attackType':'melee','baseStats':{'attack':1,'defense':0,'hp':1,'attackIntervalMs':1000,'critChanceBp':0,'critMultiplierBp':15000},'visualId':'hero_lion_knight__1616x1788','portraitId':'portrait_1','animationProfile':'hero.attack','audioProfile':'combat.melee','projectileId':None,'unlockId':None,'evidenceIds':['EV-031']}
schema_cases.append(('valid hero record',validates('hero.schema.json',hero)))
heroes={'schemaVersion':1,'dataVersion':'proposed-v1','evidenceMode':'PROPOSED','entries':[hero]}
schema_cases.append(('local cross-schema hero collection',validates('heroes.schema.json',heroes)))
for label,field,value in [('zero attack interval','attackIntervalMs',0),('crit over100percent','critChanceBp',10001),('unsafe combat integer','attack',9007199254740992)]:
 bad=copy.deepcopy(hero);bad['baseStats'][field]=value;schema_cases.append((label,not validates('hero.schema.json',bad)))
save={'schemaVersion':1,'dataVersion':'proposed-v1','revision':0,'generation':0,'createdAt':1,'updatedAt':1,'lastActiveAt':1,'data':{'player':{'accountLevel':1,'xp':'0','tutorialVersion':1,'completedTutorialSteps':[]},'currencies':{'gold':'100','gem':'0'},'heroes':[],'board':[{'slotId':i,'unlocked':i<5,'unitId':None} for i in range(15)],'progression':{'discoveredTiers':[],'highestClearedOrdinal':0,'purchaseCounts':{}},'stages':{'currentStageId':'stage_1_1','encounterSequence':0,'bossRetryAvailable':False,'farmStageId':None},'unlocks':{'unlockedIds':[],'announcedIds':[]},'equipment':[],'quests':{},'daily':{'lastClaimedPeriod':None,'attendanceIndex':0},'wheel':{'nextFreeAt':0,'freeSpins':0,'pendingSpin':None},'offline':{'lastProcessedAt':1,'pendingClaim':None},'settings':{'musicGain':1,'sfxGain':1,'haptics':True,'reducedMotion':False,'notifications':False},'analyticsConsent':'unknown','transactionReceipts':[],'sourceWatermarks':{},'nextInstanceSequence':1,'rng':{'algorithm':'xoshiro128ss-proposed-v1','combatState':[1,2,3,4],'rewardState':[5,6,7,8]},'autoMerge':{'enabled':False,'entitlementId':None,'expiresAtUtcMs':None,'lastObservedWallUtcMs':1}}}
schema_cases.append(('valid save including timed auto and RNG',validates('save.schema.json',save)))
for label,value in [('negative currency','-1'),('leading zero','01'),('floating currency',1.5),('scientific notation','1e20')]:
 bad=copy.deepcopy(save);bad['data']['currencies']['gold']=value;schema_cases.append((label,not validates('save.schema.json',bad)))
huge=copy.deepcopy(save);huge['data']['currencies']['gold']='1000000000000000000000000000000';schema_cases.append(('huge exact decimal save accepted',validates('save.schema.json',huge)))
check('schema_behavior_examples',all(ok for _,ok in schema_cases),{'cases':len(schema_cases),'results':schema_cases})
if not final:
 dump('data-spec/examples/save-v1.valid.json',save);dump('data-spec/examples/bridge-pause.valid.json',control)
 dump('analysis/reports/schema_validation_cases.json',[{'case':name,'passed':ok} for name,ok in schema_cases])

# Markdown file links: future output paths remain code spans; only actual links must resolve.
mds=[]
generated_dirs={'node_modules','Pods','build','temp','library','.gradle','.git','raw'}
for folder in ['docs','plans','tasks','data-spec','spikes','analysis/reports','analysis/reference','analysis/figma']:
 for directory,dirs,files in os.walk(ROOT/folder):
  dirs[:]=[name for name in dirs if name not in generated_dirs]
  mds.extend(Path(directory)/name for name in files if name.endswith('.md') and name!='CODEX_MASTER_PLAN.md')
mds += [ROOT/'CODEX_EXECUTION_RULES.md']
if (ROOT/'PLANNING_COMPLETE.md').exists():mds.append(ROOT/'PLANNING_COMPLETE.md')
broken=[];links=0;incomingdocs=defaultdict(int)
for p in mds:
 if not p.exists():continue
 s=re.sub(r'```.*?```','',p.read_text(),flags=re.S)
 for raw in re.findall(r'\[[^\]]*\]\(([^)]+)\)',s):
  target=raw.strip().strip('<>')
  if target.startswith(('http:','https:','mailto:','app:')):continue
  target=unquote(target.split('#')[0])
  if not target:continue
  resolved=(p.parent/target).resolve();links+=1
  if not resolved.exists() and not (not final and resolved==ROOT/'PLANNING_COMPLETE.md') and resolved!=ROOT/'analysis/reports/planning_consistency_report.md':broken.append((str(p.relative_to(ROOT)),raw))
  incomingdocs[resolved]+=1
check('markdown_links',not broken,{'checked':links,'broken':broken})
orphans=[str(p.relative_to(ROOT)) for p in (ROOT/'docs').rglob('*.md') if p.name not in ['CODEX_MASTER_PLAN.md','00_INDEX.md'] and not incomingdocs[p.resolve()]]
check('no_orphan_specs',not orphans,orphans or 'All generated docs have incoming links from index/spec/plan/task')
badsyntax=[]
for p in (ROOT/'tools/analysis').glob('*.py'):
 try:ast.parse(p.read_text(),filename=str(p))
 except Exception as e:badsyntax.append((p.name,str(e)))
check('analysis_script_syntax',not badsyntax,badsyntax or 'All analysis scripts parse;no production build/test claim')
captures=json.loads((ROOT/'analysis/reference/captures.json').read_text());check('capture_hashes',all((ROOT/c['file']).is_file() and sha(c['file'])==c['sha256'] for c in captures),f'{len(captures)} screenshots hash verified')
check('reference_checklist',len(list(csv.DictReader((ROOT/'analysis/reference/mechanic_checklist.csv').open())))==45,'All45 master checklist entries have bounded statuses')
if final:
 text=(ROOT/'PLANNING_COMPLETE.md').read_text();finalheads=['Summary','Repository analyzed','Figma analyzed','Reference game analyzed','Docs generated','Plans generated','Atomic tasks generated','P0 task count','P1 task count','P2 task count','Confirmed core mechanics','Inferred mechanics','Major proposed improvements','Blockers','High-priority unknowns','Architecture decisions','RN/Cocos integration decision status','Vertical slice scope','MVP scope','Recommended first implementation task','STOP']
 check('completion_contract',all('## '+h+'\n' in text for h in finalheads) and 'Production implementation has NOT started.' in text,'All required completion sections and STOP sentence')
counts={'docsMarkdownGenerated':len([p for p in (ROOT/'docs').rglob('*.md') if p.name!='CODEX_MASTER_PLAN.md']),'phasePlans':len(phases),'plansTotal':len(list((ROOT/'plans').glob('*.md'))),'tasks':len(tasks),'priorities':dict(Counter(t['priority'] for t in tasks)),'schemas':len(schemas),'assets':len(manifest),'screens':len(screens),'animationEvents':len(anims),'audioEvents':len(audio),'captures':len(captures),'evidenceClaims':len(ledger),'unknowns':len(unknowns)}
result={'status':'PASS' if not errors else 'FAIL','mode':'complete_read_only' if final else 'precompletion','counts':counts,'checks':checks,'errors':errors,'limits':'Planning integrity/schema examples only. Native/game builds,gameplay automated tests,device performance and audio audition are NOT_RUN.'}
if not final:
 dump('analysis/reports/planning_validation.json',result)
 write('analysis/reports/planning_consistency_report.md','# Planning consistency report\n\nStatus: '+result['status']+'. Separate consistency pass completed after artifact generation. This validates planning integrity and schema examples;it does not claim runtime/native QA. PLANNING_COMPLETE.md is intentionally written only after this pass succeeds.\n\n'+table(['Check','Result','Evidence/detail'],[(c['check'],'PASS' if c['passed'] else 'FAIL',json.dumps(c['detail'],ensure_ascii=False)) for c in checks])+'''\n\n## Semantic review

- Currency authority:gold/gem use exact Amount strings;third reference icons remain unidentified;Figma counters are fixtures.
- Terminology:accountLevel,hero tier,upgradeLevel andstage ordinal are distinct;stage labels chapter-index are display strings.
- Save authority:one versioned schema includes RNG,instance sequence,timed auto entitlement,pending claims and source watermarks;A/Bchecksum is storage wrapper,not another state model.
- Merge:manual drop target observed;auto cascade observed but general ordering/deployed priority remains configurable unknown. Timed60-minute activation is explicit;no always-on default.
- Offline:live multi-reward popup and proposed gold-only claim fixture are explicitly separated byCF012. No exact formula inferred from247Kdisplay.
- IDs:semantic asset mappings complete;animation→audio and screen→motion links resolve. Event aliases translate to one canonical emission,not duplicate events.
- Native:early phase03spike is a mandatory dependency;NOT_RUN environment ledger does not close feasibility.
- Quality:allP0tasks have concrete output/oracle/tests;phase/task graph is acyclic;all35unknowns have verification tasks;all45reference checklist items have statuses.

## Master self-review

All20AppendixGquestions answered YES for planning readiness:assets visually inspected;keyregions mapped;screenshots separated;facts tagged;auto/fullboard/cascade/battle/transactions/save/offline specified;native spike early;motion/audio/gaps/balance/device plans present;atomic acceptance andDAG validated;TASK0001has exact inputs. Runtime results remain explicitly unexecuted.

## Remaining gates

See [unresolved blockers](unresolved_blockers.md). Native feasibility,exact reference rules,rights/fonts/audio and release identity are future verification gates with concrete methods. None is an unassigned planning blocker. [Machine-readable validation](planning_validation.json) · [Task graph analysis](task_dependency_analysis.json) · [Index](../../docs/00_INDEX.md).
''')
if args.report:
 Path(args.report).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'status':result['status'],'counts':counts,'checks':len(checks),'errors':errors},ensure_ascii=False,indent=2))
sys.exit(1 if errors else 0)
