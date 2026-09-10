"""ADR-007 checks: active requirements, task/phase synchronization and executable DAG."""
import json,re
from pathlib import Path

RETIRED=re.compile(r'cocos|mobile-shell|HostBridge|NativeGameHost|GameActivity|GameViewController|SpriteFrame|JsbBridge|game\.ready|app\.initialize',re.I)
HISTORICAL_DOCS={
 'docs/CODEX_MASTER_PLAN.md':'immutable original mission',
 'docs/03_EVIDENCE_LEDGER.md':'historical evidence claims plus current EV-043',
 'docs/06_REFERENCE_GAME_REVERSE_ENGINEERING.md':'reference runtime observations',
 'docs/adr/ADR-001-ENGINE.md':'SUPERSEDED redirect',
 'docs/adr/ADR-002-MOBILE-HOST.md':'SUPERSEDED redirect',
 'docs/adr/ADR-006-RN-COCOS-BRIDGE.md':'SUPERSEDED redirect',
 'docs/technical/04_COCOS_RENDERING_LAYER.md':'SUPERSEDED redirect',
 'docs/technical/15_REACT_NATIVE_COCOS_INTEGRATION.md':'SUPERSEDED redirect',
 'docs/technical/18_BRIDGE_PROTOCOL.md':'SUPERSEDED redirect',
}

def obsolete_lines(text):
 findings=[]
 for n,line in enumerate(text.splitlines(),1):
  # Explicit historical citations remain links, not production requirements.
  if line.startswith(('[HISTORICAL OBSERVED','| SRC-WEB |','Historical TASK-0044 ','Historical redirects (SUPERSEDED','| U-001 |')):continue
  line=re.sub(r'`spikes/rn-cocos/[^`]*`','<historical path>',line)
  line=re.sub(r'\[[^\]]*\]\([^)]*(?:spikes/rn-cocos/|ADR-006-RN-COCOS-BRIDGE.md)[^)]*\)','<historical evidence link>',line)
  line=line.replace('zero production Cocos requirements','zero obsolete runtime requirements')
  if RETIRED.search(line):findings.append((n,line))
 return findings

def executable_graph(tasks):
 ids={t['id']:t for t in tasks};active={i:t for i,t in ids.items() if t.get('executionScope')!='HISTORICAL' and t.get('deliveryClassification')!='DEFERRED_POST_DELIVERY'}
 bad=[(i,d) for i,t in active.items() for d in t['dependencies'] if d not in active or d==i]
 bad += [(i,d) for i,t in active.items() for d in t.get('referenceVerificationDependencies',[]) if d not in ids or d==i]
 done=[]
 while len(done)<len(active):
  ready=sorted(i for i,t in active.items() if i not in done and set(t['dependencies'])<=set(done))
  if not ready:break
  done+=ready
 return {'activeCount':len(active),'badDependencies':bad,'acyclic':len(done)==len(active),'topologicalOrder':done}

def validate(root,manifest):
 root=Path(root);tasks=manifest['tasks'];g=executable_graph(tasks);fail=[]
 if g['badDependencies'] or not g['acyclic']:fail.append(('executable_dag',g))
 if g['topologicalOrder']!=manifest.get('executableTopologicalOrder'):fail.append(('stale_executable_order',None))
 report=json.loads((root/'analysis/reports/task_dependency_analysis.json').read_text())
 if report['topologicalOrder']!=g['topologicalOrder']:fail.append(('stale_graph_artifact',None))
 production=[];findings=[]
 for p in (root/'docs').rglob('*'):
  rel=p.relative_to(root).as_posix()
  if not p.is_file() or p.suffix not in ['.md','.csv'] or 'tz' in p.parts or rel in HISTORICAL_DOCS:continue
  production.append(rel)
 for path in ['README.md','AGENTS.md','CODEX_EXECUTION_RULES.md','start_prompt.md','data-spec/README.md']:
  production.append(path)
 production += [p.relative_to(root).as_posix() for p in (root/'plans').glob('*.md') if not p.name.startswith('PHASE_03')]
 production += [p.relative_to(root).as_posix() for p in (root/'tasks').glob('*.md') if p.name!='TASKS_PHASE_03.md']
 for p in production:findings += [(p,n,line) for n,line in obsolete_lines((root/p).read_text())]
 for t in tasks:
  if t.get('executionScope')=='HISTORICAL':
   if t.get('supersededBy')!='ADR-007':fail.append((t['id'],'retired task lacks superseding ADR'))
   continue
  # Historical completion evidence may name the retired spike; execution fields may not.
  fields={k:v for k,v in t.items() if k not in ['evidence','verification','completedAt']}
  findings += [(t['id'],n,line) for n,line in obsolete_lines(json.dumps(fields,ensure_ascii=False,indent=2))]
  p=root/f"tasks/TASKS_PHASE_{t['phase']:02d}.md"
  match=re.search(r'(?ms)^## '+t['id']+r' — ([^\n]+)\n(.*?)(?=\n<a id="task-|\Z)',p.read_text())
  if not match:fail.append((t['id'],'task block missing'));continue
  deps=re.search(r'^Dependencies: (.*)$',match[2],re.M)
  actual=re.findall(r'\[(TASK-\d+)\]',deps[1]) if deps else []
  if actual!=t['dependencies']:fail.append((t['id'],'task markdown dependencies differ',actual))
  if match[1]!=t['title']:fail.append((t['id'],'task title differs'))
  phase=next((root/'plans').glob(f"PHASE_{t['phase']:02d}_*.md"))
  step=re.search(r'\['+t['id']+r'\].*?Required predecessors: ([^\n]+)',phase.read_text())
  if not step or re.findall(r'TASK-\d+',step[1])!=t['dependencies']:fail.append((t['id'],'phase sequence dependencies differ'))
  if t['output'] not in phase.read_text():fail.append((t['id'],'phase output missing'))
 if findings:fail.append(('obsolete_production_requirements',findings))
 for p,reason in HISTORICAL_DOCS.items():
  if 'redirect' in reason and 'Status: SUPERSEDED' not in (root/p).read_text():fail.append((p,'historical redirect not marked superseded'))
 for p in (root/'data-spec').glob('bridge*.json'):
  if 'SUPERSEDED' not in json.loads(p.read_text()).get('$comment',''):fail.append((str(p),'legacy schema not marked historical'))
 return {'passed':not fail,'productionFilesScanned':len(production),'zeroProductionCocosRequirements':not findings,'graph':g,'errors':fail,'historicalExclusions':HISTORICAL_DOCS}
