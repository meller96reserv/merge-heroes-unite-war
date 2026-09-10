"""One targeted QA consolidation, preserving product implementation and old tasks."""
import json,re
from delivery_scope import ROOT,read,dump,is_active,refresh
POLICY='docs/qa/10_DELIVERY_QA_POLICY.md'
DEFER={69:[224],127:[121,122,124,223],157:[149,150,155,156,223],180:[177,178,179,186],200:[196,223],220:[213,219,229],221:[223],222:[211,223],225:[202,203,224],226:[150,155,223],228:[186,202,203],230:[229,237]}
OVERRIDES={
 143:'One Settings/Wheel and required meta UI milestone review: short browser interaction, no click-through or app-caused errors. Keep automated daily/wheel/reward/persistence correctness in their owning tasks; reuse those results. User browser review may provide final visual acceptance.',
 176:'One lightweight animations/VFX milestone review: typecheck/build, playable browser flow and no app-caused errors. Check representative cancellation/reduced motion; reuse existing evidence. User browser review may provide final visual acceptance; no exhaustive per-event marker matrix.',
 186:'One audio milestone audition of shipped music/SFX/ambience with mute, focus, loop recovery and bounded voices. Validate asset decoding/metadata in acquisition/import; reuse results. Native-only checks join native smoke; no repeated exhaustive event/device matrix.',
 211:'One representative native release smoke for resume/reopen, process restart, storage, audio focus and provider responses, reusing Android/iOS build smoke where applicable. Keep service correctness tests; defer exhaustive lifecycle permutations and long soaks.',
 213:'Measure a representative busy scene on available browser/native targets and record actual frame/resource behavior. Diagnose observed defects; no exhaustive device/scene campaign or long soak. Unavailable required native checks stay explicit.',
 219:'Close reproduced resource leaks using representative route/background/reopen checks and bounded pool/subscription observations. Reuse lifecycle smoke; long soak permutations are deferred.',
 223:'Run the final applicable correctness suite once and the release golden path: buy/drag/merge/battle/stage/boss, required equipment/relic/dungeon/daily, wheel/ads and save/restart. Check migration/receipt/ad completion failures through owning automated tests. Reuse their evidence instead of repeating separate matrices.',
 224:'One final representative responsive/safe-area browser pass across required screens, using user visual/interaction review as final visual acceptance where provided. Preserve high Figma fidelity. No repeated golden captures or large combinatorial viewport/state matrix; native layout smoke stays in Android/iOS release checks.',
 229:'Close all known P0/P1 product defects with focused fix/retest evidence; reuse final gameplay, responsive, native, audio and performance checks. Do not create a duplicate QA campaign.',
}
PRESENTATION=[36,*range(62,69),125,126,135,139,*range(168,180),183,184,186,224,227]

def apply_qa():
 m=json.loads(read('tasks/task_manifest.json'))
 if m['delivery'].get('qaPolicy'):raise ValueError('QA consolidation already applied')
 ids={t['id']:t for t in m['tasks']};changed=set()
 for n,owners in DEFER.items():
  t=ids[f'TASK-{n:04d}'];assert t['status']=='NOT_STARTED'
  t['preQaClassification']=t['deliveryClassification'];t['deliveryClassification']='DEFERRED_POST_DELIVERY';t['deliveryGroup']='Consolidated duplicate QA'
  t['qaCoverageOwners']=[f'TASK-{v:04d}' for v in owners]
  t['deliveryRationale']='Standalone duplicate/exhaustive QA deferred by user policy; mandatory checks retained in '+', '.join(t['qaCoverageOwners'])+'.'
  t['deliverySources']=[*t['deliverySources'],POLICY];changed.add(t['id'])
 def expand(d):
  return [x for parent in ids[d]['dependencies'] for x in expand(parent)] if int(d[5:]) in DEFER else [d]
 for t in m['tasks']:
  if not is_active(t) or t['status']=='COMPLETED':continue
  deps=list(dict.fromkeys(x for d in t['dependencies'] for x in expand(d)))
  if deps!=t['dependencies']:t['preQaDependencies']=t['dependencies'];t['dependencies']=deps;changed.add(t['id'])
 # Final path explicitly retains core correctness and save checks after merging QA.
 for n,extra in {223:[79,80,150,155,156,143,211,118,243,196,259],224:[*range(62,69)],229:[219,223,224,227,186,211]}.items():
  t=ids[f'TASK-{n:04d}'];t.setdefault('preQaDependencies',t['dependencies']);t['dependencies']=list(dict.fromkeys([*t['dependencies'],*[f'TASK-{x:04d}' for x in extra]]));changed.add(t['id'])
 for n,oracle in OVERRIDES.items():
  t=ids[f'TASK-{n:04d}'];t['preQaOracle']=t['oracle'];t['preQaAcceptanceCriteria']=t['acceptanceCriteria'];t['oracle']=oracle;t['acceptanceCriteria']=[oracle,*t['acceptanceCriteria'][1:]];t['deliveryScopeOverride']=oracle;changed.add(t['id'])
 for n in PRESENTATION:
  t=ids[f'TASK-{n:04d}'];t['qaPolicy']=POLICY;changed.add(t['id'])
 # Reconnect all required leaves after removing sequencing-only duplicate gates.
 active={i:t for i,t in ids.items() if is_active(t) and i!='TASK-0237'};used={d for t in active.values() for d in t['dependencies']}
 gate=ids['TASK-0237'];gate['preQaDependencies']=gate['dependencies'];gate['dependencies']=sorted(i for i,t in active.items() if i not in used and t['status']!='COMPLETED');changed.add(gate['id'])
 for p in sorted((ROOT/'tasks').glob('TASKS_PHASE_*.md')):
  text=p.read_text()
  for i in sorted(changed):
   t=ids[i]
   if t['phase']!=int(p.stem[-2:]):continue
   a=text.index('## '+i+' —');z=text.find('\n<a id="task-',a+1);z=len(text) if z<0 else z;b=text[a:z]
   deps=', '.join(f"[{d}](TASKS_PHASE_{ids[d]['phase']:02d}.md)" for d in t['dependencies']) or 'none'
   b=re.sub(r'^Dependencies: .*$',lambda _: 'Dependencies: '+deps,b,count=1,flags=re.M)
   b=re.sub(r'^Delivery classification: .*$',lambda _:f"Delivery classification: **{t['deliveryClassification']}**. {t['deliveryRationale']}",b,count=1,flags=re.M)
   if t.get('preQaOracle'):b=b.replace(t['preQaOracle'],t['oracle'])
   if t.get('qaPolicy') or t.get('preQaOracle'):
    b=b.replace('\n### Goal\n','\nCurrent QA policy: [batched delivery checks](../'+POLICY+'). This policy supersedes exhaustive visual matrices and per-task capture/report requirements below; correctness tests and release safety remain mandatory.\n\n### Goal\n',1)
   text=text[:a]+b+text[z:]
  p.write_text(text)
 for p in sorted((ROOT/'plans').glob('PHASE_*.md')):
  text=p.read_text();phase=int(p.name[6:8])
  for i in changed:
   t=ids[i]
   if t['phase']!=phase:continue
   text=re.sub(r'(\['+i+r'\][^\n]*Required predecessors: )[^\n]+',lambda v:v[1]+', '.join(t['dependencies'])+'.',text)
   text=re.sub(r'- '+i+r': (?:REQUIRED_NOW|SUPPORTING_REQUIRED|DEFERRED_POST_DELIVERY)\.',lambda _:f"- {i}: {t['deliveryClassification']}.",text)
   if t.get('preQaOracle'):text=text.replace(t['preQaOracle'],t['oracle'])
  if any(ids[i]['phase']==phase for i in changed):text+='\nCurrent [delivery QA policy](../'+POLICY+') supersedes exhaustive acceptance matrices; reuse owning correctness tests and batch visual checks.\n'
  p.write_text(text)
 m['delivery']['qaPolicy']=POLICY;m['delivery']['qaConsolidatedTasks']=[f'TASK-{n:04d}' for n in DEFER]
 return refresh(m)

if __name__=='__main__':
 result=apply_qa();print(json.dumps(result,indent=2));raise SystemExit(0 if result['passed'] else 1)
