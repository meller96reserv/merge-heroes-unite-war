from plan_common import *
from task_catalog import PHASES,CATALOG
from collections import Counter,defaultdict
import re

primary={0:'docs/01_PROJECT_SCOPE.md',1:'docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md',2:'docs/08_FIGMA_ASSET_MAP.md',3:'docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md',4:'docs/technical/02_REPOSITORY_STRUCTURE.md',5:'docs/12_UI_LAYOUT_SPEC.md',6:'docs/technical/03_DOMAIN_GAME_CORE.md',7:'docs/gameplay/03_MERGE_SYSTEM.md',8:'docs/gameplay/06_BATTLE_SYSTEM.md',9:'docs/gameplay/13_BOSS_SYSTEM.md',10:'docs/progression/10_EQUIPMENT.md',11:'docs/11_NAVIGATION_FLOW.md',12:'docs/technical/08_SAVE_SYSTEM.md',13:'docs/visual/04_ANIMATION_LANGUAGE.md',14:'docs/audio/02_SFX_EVENT_MAP.md',15:'docs/progression/15_BALANCE_REVERSE_ENGINEERING.md',16:'docs/technical/18_BRIDGE_PROTOCOL.md',17:'docs/technical/14_PERFORMANCE_BUDGET.md',18:'docs/qa/01_TEST_STRATEGY.md',19:'docs/release/04_PRODUCTION_DEFINITION.md',20:'docs/release/05_POST_LAUNCH_BACKLOG.md'}
secondary={0:'docs/02_SOURCE_OF_TRUTH.md',1:'docs/05_REFERENCE_CAPTURE_PLAN.md',2:'analysis/figma/semantic_map.json',3:'spikes/rn-cocos/ACCEPTANCE.md',4:'data-spec/README.md',5:'docs/09_SCREEN_CATALOG.md',6:'data-spec/save.schema.json',7:'data-spec/merge.schema.json',8:'docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md',9:'data-spec/stage.schema.json',10:'data-spec/equipment.schema.json',11:'docs/progression/06_REWARDS.md',12:'docs/qa/08_SAVE_MIGRATION_TESTS.md',13:'docs/visual/animation_matrix.csv',14:'docs/audio/audio_event_matrix.csv',15:'data-spec/reference_balance_observed.json',16:'data-spec/bridge-protocol.json',17:'docs/qa/06_PERFORMANCE_TESTING.md',18:'docs/qa/03_INTEGRATION_TEST_MATRIX.md',19:'docs/qa/09_RELEASE_CHECKLIST.md',20:'docs/gameplay/16_BATTLE_CONTENT_MODES.md'}
edges={
0:'Source changed since planning; user edits present; unknown gate accidentally marked closed.',1:'Tutorial input masks; ongoing farming confounds balance; web/mobile version mismatch; inaccessible late content.',2:'Transparent padding; visually similar but non-identical rasters; missing rights/font; reference-only image selected.',3:'Duplicate engine; stale native callback; destroyed surface; missing Cocos/device/signing; failed platform remains blocked.',4:'Clean checkout; invalid config; stale generated .meta; accidental core import of engine/browser.',5:'360×640 safe area; long text; huge currency; disabled/loading control; rapid route change.',6:'Duplicate command; save failure; bigint overflow boundary; reentrant observer; stale revision.',7:'Exact funds; full board; incompatible/max pair; deployed hero; pointer cancel; purchase during cascade.',8:'No target; simultaneous lethal hits; stale projectile; zero/huge stats; paused clock; pool exhaustion.',9:'Lethal hit at timeout; last wave; repeated farm kill; repeated first clear; restart during retry.',10:'Wrong slot/family; item already owned by another hero; max upgrade; failed save; stale selection.',11:'Double claim; midnight/clock rollback; popup close click-through; reopened saved outcome; background while pending.',12:'Corrupt A/B; full disk; crash at every commit barrier; future version; clock rollback; duplicate resume.',13:'Cancel halfway; scene exit; reused pool node; burst saturation; reduced motion; long clipped weapon.',14:'Missing file; mute; interrupted loop; voice saturation; pitch RNG affecting gameplay; unverified license.',15:'Sparse evidence; rounded displays; orphan IDs; numeric scale >2^53; changed pending reward definition.',16:'Process recreation; account switch; stale generation; duplicate result; oversize payload; audio interruption.',17:'Thermal throttling; capture overhead; cold vs warm cache; long session; background queue accumulation.',18:'Flaky timing; wrong fixture version; absent physical device; screenshot masks hiding defects.',19:'Missing owner/rights/signing; incompatible save downgrade; stale store requirements; unapproved publication.',20:'Unobserved feature; content removal migration; mode-specific recovery; optional monetization scope expansion.'}
tests={
0:'Run planning validator and source SHA comparison; report exact failures and do not repair user files automatically.',1:'Attach before/input/after screenshot/video PTS and repeated sample counts; distinguish displayed,derived and unknown values.',2:'Validate manifest IDs/hash/source refs and visually compare chosen variants against contact sheets and source node usage.',3:'Run applicable NAT cases on actual Android/iOS targets; attach build/log/video/memory evidence, not only source inspection.',4:'Clean install/typecheck/config validation and deterministic smoke fixture must succeed with pinned toolchain.',5:'Capture source/runtime/overlay/diff and anchor errors at430×932 plus360×640; manually exercise every created state.',6:'Behavioral unit tests assert state/events and rejected-command hash; replay with fake storage/clock/RNG.',7:'Use UT002–006 plus duplicate-command/save-failure cases; assert exact balance,occupancy,result slot and IDs.',8:'Use UT007–010/020; compare tick/event sequence under varied render FPS and simultaneous hit fixtures.',9:'Use UT011–012 and GP003; assert unique encounter sequence,first-clear watermark and timer order.',10:'Use UT017/IT005; assert item ownership uniqueness,stat totals,exact debit and restart equivalence.',11:'Use UT014–016/021 and IT003/005; inject duplicate claim,clock boundary and presentation interruption.',12:'Use UT013/018/019 and IT002/007/010; reopen at every crash point and compare old-or-new state.',13:'Use IT009 and motion marker captures; assert pool/listener baseline after cancellation and same core state hash.',14:'Audition event matrix,stress100hits and interrupt focus on physical targets; verify bounded voices and no duplicate loop.',15:'Schema/cross-ID validation,observed-vs-proposed separation,holdout/residual report and deterministic progression simulation.',16:'Use UT022 and IT004/008/011;50reopen cycles and process-death cases on both native hosts.',17:'Record p50/p95/p99,raw traces and memory slope against centralized budgets; compare quality-mode state hashes.',18:'Execute named QA matrix with build/device/fixture/expected/actual/artifact columns and retest defects.',19:'Check release checklist and artifact/version/rights evidence; dry-run metadata and rollback before any distribution.',20:'Add feature-specific domain/save/visual tests after evidence/scope gate; disabled feature must not alter existing MVP.'}

tasks=[];bytitle={};byphase=defaultdict(list)
for phase in range(21):
 for line in CATALOG[phase].splitlines():
  title,out,oracle=line.split('|',2);idx=len(tasks)+1
  priority='P2' if phase==20 else 'P1' if phase in [10,11,14,15] or title=='Relic dungeon static fixtures' else 'P0'
  if phase==1 and any(w in title for w in ['Daily','Wheel','Equipment','Quest','Skills']):priority='P1'
  if phase==13 and any(w in title for w in ['Daily','Wheel','Background']):priority='P1'
  if title in ['Audio acquisition','Audio director buses','Audio event wiring','Audio settings lifecycle']:priority='P0'
  typ='research' if phase in [0,1] or 'capture' in title.lower() or title in ['Host decision','Asset rights ledger','Font acquisition','Content visual mapping','Motion art calibration','Release readiness'] else 'test' if any(w in title.lower() for w in ['acceptance',' qa','execution','probe','validation','verification']) else 'asset' if phase in [2,14] and 'acquisition' in title.lower() else 'implementation'
  if phase==19:typ='release'
  complexity='L' if any(w in title for w in ['Android full-screen','iOS full-screen','Android production','iOS production','Durable transaction','Native memory leak']) else 'S' if typ=='research' or any(w in title for w in ['model','selector','catalogue','manifest','ledger','readiness']) else 'M'
  risk='high' if phase in [3,12,16,19] or any(w in title.lower() for w in ['transaction','reward','damage','migration','cascade']) else 'low' if phase in [0,2,5,14] else 'medium'
  t={'id':f'TASK-{idx:04d}','title':title,'phase':phase,'priority':priority,'type':typ,'complexity':complexity,'risk':risk,'output':out,'oracle':oracle,'dependencies':[],'status':'NOT_STARTED','sourceDocs':[primary[phase],secondary[phase]],'unknownIds':[]}
  tasks.append(t);bytitle[title]=t;byphase[phase].append(t)
def dep(title,*names):bytitle[title]['dependencies']=list(dict.fromkeys(bytitle[n]['id'] for n in names))
def adddep(title,*names):bytitle[title]['dependencies']=list(dict.fromkeys(bytitle[title]['dependencies']+[bytitle[n]['id'] for n in names]))
# Conservative serial defaults within implementation subsystems; independent capture/art/static work is explicit below.
base={0:None,1:'Fidelity gate registry',2:'Planning handoff validation',3:'Host decision',4:'Native integration acceptance',5:'Cocos project foundation',6:'Core TypeScript boundary',7:'State invariant tests',8:'Deployment command',9:'Battle tick pipeline',10:'Save offline acceptance',11:'Save offline acceptance',12:'Normalized game state',13:'Combat visual acceptance',14:'Planning handoff validation',15:'Purchase cost measurements',16:'Native integration acceptance',17:'Native production lifecycle QA',18:'Performance budget acceptance',19:'Beta gate acceptance',20:'Production release gate'}
for phase,rows in byphase.items():
 for i,t in enumerate(rows):
  if phase in [1,2,5,14,20]:dep(t['title'],*([base[phase]] if base[phase] else []))
  else:dep(t['title'],*([rows[i-1]['title']] if i else [base[phase]] if base[phase] else []))
dep('Auto-merge ordering','Auto-merge unlock capture')
for t in byphase[1][1:]:adddep(t['title'],'Reference version lock')
for t in byphase[2][1:]:adddep(t['title'],'Immutable extraction verification')
dep('Runtime import tool','Asset import calibration','Atlas membership manifest','Cocos project foundation')
dep('Sprite registry validation','Runtime import tool','Asset semantic validator')
dep('Standalone RN host probe','Native toolchain lock')
dep('Android full-screen host probe','Standalone Cocos export probe','Standalone RN host probe')
dep('iOS full-screen host probe','Standalone Cocos export probe','Standalone RN host probe')
dep('Bridge ping probe','Android full-screen host probe','iOS full-screen host probe')
dep('Native memory probe','Native lifecycle probe')
dep('Native integration acceptance','Native memory probe','Native audio focus probe','Bridge ping probe')
dep('Cocos project foundation','Workspace package foundation')
dep('Config loader validation','Core TypeScript boundary','Runtime ports and test fakes')
dep('Typed domain event bus','Core TypeScript boundary')
dep('Runtime ports and test fakes','Core TypeScript boundary')
dep('Core CI checks','Config loader validation','Typed domain event bus')
dep('Web fixture harness','Cocos project foundation','Config loader validation')
dep('Board layout conflict review','Asset import calibration','Unlock capture')
dep('Design token import','Cocos project foundation','Font acquisition')
dep('Responsive canvas anchors','Design token import','Board layout conflict review')
dep('Reusable button states','Responsive canvas anchors','Button state asset review')
for t in byphase[5][4:-1]:dep(t['title'],'Reusable button states','Sprite registry validation','Web fixture harness')
dep('Static golden comparison',*[t['title'] for t in byphase[5][4:-1]])
dep('Amount value type','Core TypeScript boundary','Runtime ports and test fakes')
dep('Command dispatcher','Normalized game state','Typed domain event bus')
dep('Durable transaction coordinator','Command dispatcher','Runtime ports and test fakes')
dep('Seeded RNG streams','Runtime ports and test fakes')
dep('Game state selectors','Normalized game state')
dep('Simulation clock','Runtime ports and test fakes')
dep('Input router','Reusable button states','Cocos project foundation')
dep('State invariant tests','Reward receipt service','Game state selectors','Seeded RNG streams','Simulation clock')
dep('Core replay harness','State invariant tests','Simulation clock')
adddep('Purchase hero transaction','Durable transaction coordinator')
adddep('Purchase hold controller','Input purchase capture','Input router')
adddep('Manual merge transaction','Reward receipt service','Deployment capture')
adddep('Timed auto-merge entitlement','Auto-merge unlock capture','Reward receipt service')
adddep('Auto-merge pair selector','Auto-merge ordering')
adddep('Auto-merge cascade reducer','Auto-merge unlock capture')
adddep('Deployment command','Deployment capture')
adddep('Board input projection','Board and battle static fixture','Input router')
adddep('Purchase merge acceptance','Save offline acceptance')
adddep('Target selector','Targeting capture')
adddep('Damage resolver','Combat balance measurements')
adddep('Mode attack and recovery policy','Death recovery capture')
adddep('Stage definition graph','Boss observations')
adddep('Unlock condition evaluator','Unlock capture')
adddep('Equipment instance model','Equipment observations')
adddep('Equipment panel binding','Hero equipment static fixture')
adddep('Hero upgrades panel binding','Hero upgrades static fixture')
dep('Route and popup coordinator','Save offline acceptance','Bottom navigation fixture','Input router')
adddep('Quest event reducer','Quest observations')
adddep('Daily period service','Daily reward observations')
adddep('Daily panel binding','Daily reward static fixtures')
adddep('Wheel outcome selector','Wheel observations')
adddep('Wheel panel controller','Wheel static fixtures')
dep('Save envelope codec','Normalized game state')
dep('Web save adapter','Save envelope codec','Cocos project foundation')
dep('Native save adapter contract','Runtime ports and test fakes','Native integration acceptance')
dep('Save candidate recovery','Save envelope codec','Web save adapter')
dep('Save checkpoint scheduling','Save candidate recovery','Durable transaction coordinator')
dep('Offline interval calculator','Simulation clock','Offline measurements')
dep('Offline entitlement reservation','Offline interval calculator','Reward receipt service','Save checkpoint scheduling')
dep('Receipt compaction policy','Offline claim transaction','Save candidate recovery')
dep('Save crash injection harness','Receipt compaction policy','Save migration pipeline')
dep('Lifecycle save integration','Save checkpoint scheduling','Offline claim transaction','Bridge ping probe')
dep('Save offline acceptance','Save crash injection harness','Lifecycle save integration','Migration fixture suite')
dep('Motion art calibration','Asset import calibration')
dep('Animation director','Combat visual acceptance','Motion art calibration')
adddep('Haptic event adapter','Native integration acceptance')
for t in byphase[14][3:]:dep(t['title'],'Audio acquisition','Cocos project foundation')
dep('Audio voice budget','Audio director buses')
dep('Music duck crossfade','Audio voice budget','Music acquisition')
dep('Audio event wiring','Audio voice budget','Animation director')
dep('Audio settings lifecycle','Audio director buses','Native audio focus probe')
dep('Audio mix acceptance','Audio event wiring','Audio settings lifecycle','Music duck crossfade','Ambience acquisition','Audio import validation')
adddep('Hero tier content table','Reward catalogue','Content visual mapping')
adddep('Hero enemy content table','Combat balance measurements')
adddep('Stage world content table','Boss observations')
adddep('Equipment reward content table','Equipment observations','Reward catalogue')
adddep('Meta unlock content table','Daily reward observations','Wheel observations','Unlock capture','Quest observations')
adddep('Animation audio config table','Motion freeze and interruption QA','Audio mix acceptance')
adddep('Content fidelity acceptance','Stage boss acceptance','Equipment progression acceptance','Meta lifecycle acceptance')
dep('Production RN shell','Native integration acceptance','Save offline acceptance')
dep('Android production host','Production RN shell')
dep('iOS production host','Production RN shell')
dep('Typed native module codegen','Android production host','iOS production host')
adddep('Native storage implementation','Native save adapter contract')
dep('Analytics decision','Production RN shell')
dep('Analytics adapter','Analytics decision')
dep('Native production lifecycle QA','Native lifecycle audio ownership','Deep-link notification routing','Analytics adapter','Native storage implementation')
dep('Native build reproducibility','Native production lifecycle QA')
adddep('Performance baseline capture','Content fidelity acceptance','Audio mix acceptance','Native build reproducibility')
adddep('Beta gate acceptance','Asset rights ledger','Font acquisition','Audio acquisition')
# Rights acquisition precedes beta; phase19 consolidates distribution proof without a phase cycle.
dep('Distribution rights acceptance','Asset rights ledger','Font acquisition','Audio acquisition')
dep('Release readiness','Beta gate acceptance')
dep('Release build provenance','Current platform requirements review','Distribution rights acceptance','Native build reproducibility')
adddep('Controlled distribution task','Production release gate')
for name,capture in [('Dragon mode implementation slice','Alternative mode capture'),('Demon mode implementation slice','Alternative mode capture'),('Tower mode implementation slice','Alternative mode capture'),('Summon pool reducer','Summon capture'),('Skill status reducer','Skills capture')]:adddep(name,capture)

topic_docs=[('purchase','docs/gameplay/02_HERO_PURCHASE_SUMMON_SYSTEM.md'),('auto-merge','docs/gameplay/04_AUTO_MERGE_SYSTEM.md'),('deployment','docs/gameplay/05_BOARD_SLOT_SYSTEM.md'),('target','docs/gameplay/07_TARGETING_SYSTEM.md'),('damage','docs/gameplay/09_DAMAGE_CRIT_DEFENSE.md'),('projectile','docs/gameplay/10_PROJECTILE_SYSTEM.md'),('boss','docs/gameplay/13_BOSS_SYSTEM.md'),('unlock','docs/progression/05_UNLOCKS.md'),('daily','docs/progression/08_DAILY_REWARD.md'),('wheel','docs/progression/09_WHEEL_OF_LUCK.md'),('quest','docs/progression/07_QUESTS.md'),('tutorial','docs/gameplay/17_TUTORIAL_SYSTEM.md'),('offline','docs/progression/13_OFFLINE_PROGRESS.md'),('migration','docs/technical/09_SAVE_MIGRATIONS.md'),('bridge','docs/technical/18_BRIDGE_PROTOCOL.md'),('music','docs/audio/03_MUSIC_PLAN.md'),('ambience','docs/audio/04_AMBIENCE_PLAN.md'),('audio acquisition','docs/audio/06_AUDIO_ASSET_ACQUISITION.md')]
for t in tasks:
 for needle,doc in topic_docs:
  if needle in t['title'].lower() and doc not in t['sourceDocs']:t['sourceDocs'].append(doc)
bytitle['Durable transaction coordinator']['oracle']+=' Unit tests use fault-injectable SaveStore ports;real web/native durability is a phase12 gate before playable purchase/merge acceptance.'

unknowns=json.loads((ROOT/'analysis/reference/unknowns.json').read_text())
for u in unknowns:
 t=bytitle[u['taskKey']];t['unknownIds'].append(u['id']);u['taskId']=t['id'];u['taskPath']=f'tasks/TASKS_PHASE_{t["phase"]:02d}.md#{t["id"].lower()}'
dump('analysis/reference/unknowns.json',unknowns)

# Explicit gates for timed auto feature, separated from renderer animation state.
for name in ['Auto-merge pair selector','Auto-merge cascade reducer']:
 bytitle[name]['oracle']+=' Auto entitlement/expiry and enabled state are persisted/configured;60-minute observed offer is not a permanent default.'

idmap={t['id']:t for t in tasks}
visiting=set();visited=set();order=[]
def visit(i):
 if i in visiting:raise ValueError('dependency cycle '+i)
 if i in visited:return
 visiting.add(i)
 for d in idmap[i]['dependencies']:visit(d)
 visiting.remove(i);visited.add(i);order.append(i)
for t in tasks:visit(t['id'])
for t in tasks:
 t['parallelization']='Allowed after listed dependencies; exclusive edit ownership for '+t['output']+'. Shared registries are integrated by their dedicated validation/wiring task.'
 t['testCases']=tests[t['phase']];t['edgeCases']=edges[t['phase']]
 t['acceptanceCriteria']=[t['oracle'],'Evidence/test report names the exact input, expected result and actual result; no unresolved failure is marked passed.','Relevant source docs, data/schema and dependency tasks agree; production changes exclude debug/research assets.']
 t['filesToInspect']=list(dict.fromkeys(t['sourceDocs']+[idmap[d]['output'] for d in t['dependencies']]))
 t['filesToCreate']=[] if (ROOT/t['output']).exists() else [t['output']]
 t['filesToModify']=[t['output']] if (ROOT/t['output']).exists() else []
 t['estimatedPoints']={'XS':1,'S':2,'M':3,'L':5}[t['complexity']]
dump('tasks/task_manifest.json',{'status':'PLANNING_ONLY_ALL_NOT_STARTED','tasks':tasks,'topologicalOrder':order})

def tasklink(path,t):return link(path,f'tasks/TASKS_PHASE_{t["phase"]:02d}.md',t['id'])+f' — {t["title"]}'
for phase,rows in byphase.items():
 path=f'tasks/TASKS_PHASE_{phase:02d}.md';parts=[f'# Atomic tasks — phase {phase:02d}\n\nAll tasks NOT_STARTED. Planning artifacts are inputs; no implementation completion is implied. Read [execution rules](../CODEX_EXECUTION_RULES.md) and the [phase plan](../plans/PHASE_{phase:02d}_{PHASES[phase][0]}.md).']
 for t in rows:
  deps='; '.join(tasklink(path,idmap[d]) for d in t['dependencies']) or 'None; first handoff task.'
  inspection='\n'.join('- '+(link(path,p) if (ROOT/p).exists() else f'`{p}` — future artifact from listed dependency') for p in t['filesToInspect'])
  create='\n'.join('- `'+p+'`' for p in t['filesToCreate']) or 'None; update the existing artifact listed below.'
  modify='\n'.join('- '+link(path,p) for p in t['filesToModify']) or 'None required in the initial checkout; integrate shared registries only through the named wiring/validation tasks.'
  unknown='; '.join(t['unknownIds']) or 'No new unsupported rule may be invented; consult the phase-specific unknown gates before extending scope.'
  verify=t['oracle'] if t['type'] in ['research','asset','release','test'] else 'Exercise the behavior described in Acceptance criteria through the smallest domain/Cocos/native harness that reaches this output. '+t['oracle']
  parts.append(f'''<a id="{t['id'].lower()}"></a>
## {t['id']} — {t['title']}

Phase: {phase:02d} · Priority: {t['priority']} · Type: {t['type']} · Status: NOT_STARTED

Dependencies: {deps}

Parallelization: {t['parallelization']}

### Goal
{t['oracle']}

### Context
This is the bounded {t['title'].lower()} deliverable within {PHASES[phase][1].lower()}. Its authoritative output is `{t['output']}`; adjacent systems remain separate tasks.

### Source-of-truth docs
{' · '.join(link(path,p) for p in t['sourceDocs'])} · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md).

### Exact files to inspect first

{inspection}

### Files expected to create

{create}

### Files expected to modify

{modify}

### Implementation steps

1. Inspect the listed inputs and dependency evidence. Lock the concrete cases and output format for `{t['output']}`; unresolved reference behavior stays gated.
2. {t['oracle']}
3. Cover the edge cases below in the smallest relevant harness or evidence table. Keep raw capture/test results with version, fixture and expected/actual values.
4. Review the output against the source contract, update traceability and hand it to dependent tasks only after acceptance passes.

### Edge cases
{t['edgeCases']}

### Test cases
{t['testCases']}

### Manual verification
{verify} Record the visible result/artifact and any platform limitation explicitly.

### Acceptance criteria

'''+ '\n'.join('- '+a for a in t['acceptanceCriteria'])+f'''

### Definition of Done
The bounded output exists, relevant checks pass with evidence, dependencies are satisfied, and docs/config/tests reflect the final behavior. Any remaining blocker is linked to a separate concrete task; this task is not marked complete while its own oracle is unmet.

### Do not do
Do not implement neighboring systems, copy reference code/audio, overwrite the original .fig, invent parity numbers, bypass durable transaction rules, publish/distribute without release authorization, or mark NOT_RUN as passed.

### Estimated complexity
{t['complexity']} · Risk: {t['risk']}. Relative complexity only; no unsupported hour estimate.

### Notes / unknowns
{unknown} [Evidence ledger](../docs/03_EVIDENCE_LEDGER.md) · [Task index](TASK_INDEX.md).
''')
 write(path,'\n\n'.join(parts))

counts=Counter(t['priority'] for t in tasks)
write('tasks/README.md',f'''# Atomic task execution

{len(tasks)} bounded future tasks across21phases. All NOT_STARTED. Priorities: {counts['P0']}P0, {counts['P1']}P1, {counts['P2']}P2. [Machine-readable manifest](task_manifest.json) is the dependency/status source; [index](TASK_INDEX.md) is the readable entry.

Execute a ready task whose dependencies and evidence gates are satisfied. Numeric phase order is not dependency order. Phase06 proves transaction behavior with fault-injectable storage ports;phase12 supplies real codec/storage/recovery before playable purchase/merge acceptance. Phase12offline and phase13/14core presentation form the vertical slice before meta expansion. Native feasibility is an early gate.

Do not expand a task into an entire subsystem. If investigation reveals multiple independent deliverables, split before implementation, assign new stable IDs and regenerate DAG/index/critical path. Complexity XS/S/M/L and risk low/medium/high are relative; XL is forbidden. Parallel work is allowed only after dependencies and with exclusive file ownership; this planning run did not delegate agents.

Update task evidence/status after verification and retain source-of-truth links. New evidence updates ledger→unknown/conflict→spec/schema→plan/tasks→tests in that order. [Execution rules](../CODEX_EXECUTION_RULES.md) · [Execution order](../plans/00_EXECUTION_ORDER.md).
''')
write('tasks/TASK_INDEX.md','# Task index\n\nAll tasks NOT_STARTED; dependency order is authoritative.\n\n'+table(['ID','Phase','Priority','Title','Dependencies','Size','Risk'],[(f'[{t["id"]}](TASKS_PHASE_{t["phase"]:02d}.md#{t["id"].lower()})',f'{t["phase"]:02d}',t['priority'],t['title'],', '.join(t['dependencies']) or 'none',t['complexity'],t['risk']) for t in tasks])+'\n\n[Manifest](task_manifest.json) · [Execution order](../plans/00_EXECUTION_ORDER.md) · [Rules](../CODEX_EXECUTION_RULES.md).')

for phase,rows in byphase.items():
 path=f'plans/PHASE_{phase:02d}_{PHASES[phase][0]}.md'
 external=sorted({d for t in rows for d in t['dependencies'] if idmap[d]['phase']!=phase})
 inputs=list(dict.fromkeys([primary[phase],secondary[phase]]+[idmap[d]['output'] for d in external]))
 out='\n'.join('- `'+t['output']+'` — '+t['title'] for t in rows)
 deps='\n'.join('- '+tasklink(path,idmap[d]) for d in external) or 'No earlier implementation dependency; validate this planning handoff first.'
 steps='\n\n'.join(f'### Step {phase:02d}.{i+1}\n\n{tasklink(path,t)}. {t["oracle"]} Required predecessors: '+(', '.join(t['dependencies']) or 'none')+'.' for i,t in enumerate(rows))
 migrations='No player-data migration in this phase; if a schema/content shape must change, add a versioned migration task before merging.'
 if phase in [6,7,9,10,11,12,15,20]:migrations='This phase touches persisted state/content contracts. Before shipping a changed shape, increment schema/data version as appropriate, add sequential migration/alias fixtures and preserve balances/ownership/pending claims. There are no existing production saves in the current repository; syntheticv0→v1 is a QA fixture only.'
 write(path,f'''# PHASE {phase:02d} — {PHASES[phase][0].replace('_',' ').title()}

## Goal
{PHASES[phase][1]}. Deliver only the bounded outputs listed below.

## Why this phase exists
{primary[phase]} defines a distinct implementation risk. This phase turns that contract into reviewable artifacts and checks so dependent work can rely on evidence, not an assumed successful integration or invented reference rule.

## Entry criteria
Listed task predecessors and their acceptance evidence are available. Read current unknown/conflict gates. A phase can start independent ready tasks while other tasks remain gated; phase completion requires all in-scope outputs accepted.

## Source documents to read first
{link(path,primary[phase])} · {link(path,secondary[phase])} · [Unknowns](../docs/04_UNKNOWNS_REGISTER.md) · [Execution rules](../CODEX_EXECUTION_RULES.md).

## Inputs

'''+ '\n'.join('- '+(link(path,p) if (ROOT/p).exists() else f'`{p}` — expected predecessor artifact') for p in inputs)+f'''

## Outputs

{out}

## Non-goals
No adjacent subsystem expansion, no unverified parity claims, no copied reference code/audio and no release action outside phase19 authorization. P2 content is not silently promoted into MVP.

## Dependencies

{deps}

## Risks
{edges[phase]} Each unresolved rule has an evidence task and a gate; proposed development fixtures do not close it.

## Decisions that must already be locked
Source hierarchy and evidence labels; phase-specific contract from the source documents; versioned data/bridge/save boundaries. Native production phases require accepted spike strategy; art import requires calibrated metadata; economic behavior requires durable transaction semantics.

## Detailed implementation sequence

{steps}

## Files/directories expected to be created

'''+ '\n'.join('- `'+p+'`' for t in rows for p in t['filesToCreate'])+f'''

## Existing files expected to be modified

'''+ ('\n'.join('- '+link(path,p) for t in rows for p in t['filesToModify']) or 'No current production file exists for these outputs. Update the linked source contracts only when evidence/implementation changes them, with a recorded decision.')+f'''

## Data migrations if any
{migrations}

## Tests required
{tests[phase]} Every task also carries its concrete oracle; runtime tests listed here are NOT_RUN during planning.

## Manual validation procedure
Open each output from this phase, reproduce its named input/scenario, compare expected/actual behavior and retain evidence. For interactive outputs exercise success,disabled/locked,pending,error and interrupted states; for research verify source/time/version and uncertainty.

## Performance checks
Measure any changed native/render/storage hot path against [budgets](../docs/technical/14_PERFORMANCE_BUDGET.md). Documentation/research-only outputs need reproducible generation and bounded artifact size; they cannot claim runtime performance pass.

## Visual checks
Use source screen IDs and [visual protocol](../docs/qa/05_VISUAL_REGRESSION.md) for rendered outputs. Keep exact Figma and15-slot adaptation baselines separate. Nonvisual outputs need readable evidence/diagnostics, not screenshot-only assertions.

## Android checks
For native/runtime changes run relevant device/harness cases and attach actual build/OS results. Pure-domain/research tasks use platform-independent tests; Android acceptance remains in native/device tasks and is never inferred from web.

## iOS checks
Run equivalent native cases or record the precise environment blocker. Simulator success does not substitute for physical audio/performance. No Android-only result closes a both-platform gate.

## Web-preview checks
Use the same Cocos/core implementation with deterministic fixtures. Verify preview-specific storage/audio unlock and viewport behavior where affected; do not build a separate React game prototype.

## Failure/rollback strategy
Keep prior valid source/config/save generation. Revert only the bounded implementation changes on its branch, preserving user edits and captured evidence. Failed durable commands retain old state; failed schema migration preserves backup; native failure keeps integration gate closed.

## Definition of Done
All in-scope task oracles pass; artifacts,source docs,schemas and tests agree; evidence links resolve; no task hides unresolved work behind a generic TODO. Optional excludedP2work is explicitly classified.

## Exit criteria
Dependent tasks can consume the listed outputs with named versions and accepted gates. Release/runtime feasibility is claimed only where actual execution evidence exists. Update task manifest and phase result with accepted/not-run/blocked distinctions.

## Tasks generated from this phase

'''+ '\n'.join('- '+tasklink(path,t) for t in rows)+f'\n\n[Task file](../tasks/TASKS_PHASE_{phase:02d}.md) · [Execution order](00_EXECUTION_ORDER.md) · [Dependency graph](01_DEPENDENCY_GRAPH.md).')

milestones=[('M0 — Source/decision handoff',['Fidelity gate registry','Reference version lock','Asset semantic validator']),('M1 — Native feasibility',['Native integration acceptance']),('M2 — Static Figma fidelity',['Static golden comparison']),('M3 — Playable vertical slice',['Purchase merge acceptance','Combat visual acceptance','Stage boss acceptance','Save offline acceptance','Merge convergence profile','Audio event wiring','Audio settings lifecycle']),('M4 — MVP meta/content',['Equipment progression acceptance','Meta lifecycle acceptance','Content fidelity acceptance','Motion freeze and interruption QA','Audio mix acceptance']),('M5 — Production native/performance',['Native build reproducibility','Performance budget acceptance']),('M6 — Beta/release',['Beta gate acceptance','Production release gate'])]
write('plans/00_EXECUTION_ORDER.md','# Execution order\n\nDo not execute phases by filename alone. The'+str(len(tasks))+'-task DAG is authoritative; early storage and native gates prevent late integration surprises. All implementation tasks are NOT_STARTED.\n\n'+table(['Milestone','Required accepted tasks'],[(m,'; '.join(f'{bytitle[n]["id"]} {n}' for n in names)) for m,names in milestones])+'''

## Sequence

1. Validate handoff/source versions and begin independent reference/art/rights work. Lock host scope and toolchain; execute native spike before foundation.
2. Establish core/Cocos foundation. In parallel calibrate/import art and build exact static fixtures plus15-slot adaptation.
3. Define state,transaction/reward contracts and fault-injectable storage ports. Complete phase12codec/web adapter/recovery before playable purchase/merge acceptance;pure command work can proceed alongside storage.
4. Build combat→stage/boss; complete save recovery/offline and core motion/audio subset for playable native slice.
5. Expand equipment/quests/daily/wheel/settings/tutorial and complete content/visual/audio contracts after their evidence gates.
6. Harden RN Android/iOS hosts, run physical-device performance, full QA and beta/release gates. P2extensions follow separate evidence/scope tasks.

Native spike may report a precise iOS environment blocker, but production both-platform acceptance remains closed until an actual required result exists. Exact reference unknowns block affected rules/content imports, not independent static or infrastructure tasks. If an evidence task cannot close a rule, record an explicit proposed-scope decision with tests; never mark the rule observed.

## Parallel work

Reference captures, rights/fonts, asset annotation and native spike are separate tracks. Android/iOS host probes run independently after standalone builds. Static panels can proceed independently after shared buttons/layout/imports. Domain/render/audio work separates only after event contracts. Shared registries and save schema have one editor/integration task at a time.

## First tasks

Start with TASK-0001 planning handoff validation. First executable native implementation work is the Native toolchain lock followed by Standalone Cocos/RN probes; their IDs are in the task index. No production feature implementation occurred during planning.

[Task index](../tasks/TASK_INDEX.md) · [Manifest](../tasks/task_manifest.json) · [DAG](01_DEPENDENCY_GRAPH.md) · [Critical path](02_CRITICAL_PATH.md).
''')
dag='flowchart TD\n  Source[Source handoff] --> Native[Native spike]\n  Source --> Evidence[Reference gates]\n  Source --> Art[Art and fonts]\n  Native --> Foundation[Core and Cocos foundation]\n  Art --> Static[Static Figma fixtures]\n  Foundation --> Static\n  Foundation --> State[State and save codec]\n  State --> Tx[Durable transactions]\n  Tx --> Merge[Purchase merge deployment]\n  Evidence --> Merge\n  Merge --> Battle[Battle and stages]\n  Tx --> Offline[Save recovery and offline]\n  Battle --> Slice[Playable vertical slice]\n  Offline --> Slice\n  Static --> Slice\n  Slice --> Meta[Meta and content]\n  Meta --> Host[Production native hosts]\n  Host --> Perf[Performance and QA]\n  Perf --> Release[Release gate]'
write('plans/01_DEPENDENCY_GRAPH.md','# Dependency graph\n\nThis Mermaid overview is intentionally coarse; exact task edges and topological order are in [task_manifest.json](../tasks/task_manifest.json). The validator rejects cycles/missing IDs.\n\n```mermaid\n'+dag+'\n```\n\n## Cross-phase edges\n\n'+table(['Task','Depends on','Reason/output'],[(t['id'],d,idmap[d]['output']) for t in tasks for d in t['dependencies'] if idmap[d]['phase']!=t['phase']])+'\n\n[Execution order](00_EXECUTION_ORDER.md) · [Tasks](../tasks/TASK_INDEX.md).')
distance={};predecessor={}
for i in order:
 ds=idmap[i]['dependencies'];best=max(ds,key=lambda d:distance[d]) if ds else None
 distance[i]=idmap[i]['estimatedPoints']+(distance[best] if best else 0);predecessor[i]=best
endpoint=bytitle['Production release gate']['id'];chain=[];cur=endpoint
while cur:chain.append(cur);cur=predecessor[cur]
chain.reverse()
dump('analysis/reports/task_dependency_analysis.json',{'taskCount':len(tasks),'edgeCount':sum(len(t['dependencies']) for t in tasks),'priorityCounts':dict(counts),'acyclic':True,'topologicalOrder':order,'criticalPathEndpoint':endpoint,'criticalPath':chain,'criticalPathRelativePoints':distance[endpoint],'method':'longest dependency path weighted XS1/S2/M3/L5; no hours or resource scheduling inferred'})
write('plans/02_CRITICAL_PATH.md','# Critical path\n\nComputed from the explicit task DAG using relative complexity weights XS1/S2/M3/L5. This is a dependency/effort model, not elapsed hours or a staffing forecast. Evidence collection with long waiting periods and unavailable devices can dominate calendar time independently of points.\n\nEndpoint '+endpoint+' production release gate; weighted path '+str(distance[endpoint])+' points.\n\n'+table(['Order','Task','Deliverable','Weight'],[(i+1,t,idmap[t]['title'],idmap[t]['estimatedPoints']) for i,t in enumerate(chain)])+'''

## Dominant risks and acceleration

Native feasibility, exact purchase/merge/combat/boss/offline evidence, durable save semantics, source rights/fonts/audio and device performance are explicit gates. Start captures and acquisition alongside native spike. Parallel Android/iOS probes and independent static panels reduce calendar wait after shared contracts, but cannot bypass acceptance.

Recompute this path whenever dependencies or scope change. Do not declare a task complete to shorten the graph. The source-to-release chain includes configuration/state→transaction→gameplay→save/meta/content→native production→performance→QA→release. Exact weighted chain above reflects the current conservative task dependencies.

[Machine-readable analysis](../analysis/reports/task_dependency_analysis.json) · [Execution order](00_EXECUTION_ORDER.md) · [Task index](../tasks/TASK_INDEX.md).
''')
write('analysis/reference/unknown_task_mapping.md','# Unknown verification tasks\n\n'+table(['Unknown','Verification task','Gate phases','Method'],[(u['id'],f'[{u["taskId"]}](../../{u["taskPath"]})',u['blocksPhase'],u['verification']) for u in unknowns])+'\n\n[Unknown register](../../docs/04_UNKNOWNS_REGISTER.md) · [Capture plan](../../docs/05_REFERENCE_CAPTURE_PLAN.md).')
print(json.dumps({'tasks':len(tasks),'priorities':dict(counts),'edges':sum(len(t['dependencies']) for t in tasks),'criticalPathPoints':distance[endpoint]}))
