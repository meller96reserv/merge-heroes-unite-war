#!/usr/bin/env python3
"""Refresh only derived task graph/index/critical path from the authoritative manifest."""
from pathlib import Path
import json,sys
sys.path.insert(0,str(Path('tools/analysis').resolve()))
from runtime_consistency import executable_graph
p=Path('tasks/task_manifest.json');m=json.loads(p.read_text());tasks=m['tasks'];ids={t['id']:t for t in tasks};g=executable_graph(tasks);assert g['acyclic'] and not g['badDependencies']
m['executableTopologicalOrder']=g['topologicalOrder']
all_order=[]
while len(all_order)<len(tasks):
 ready=sorted(t['id'] for t in tasks if t['id'] not in all_order and set(t['dependencies'])<=set(all_order));assert ready;all_order+=ready
m['topologicalOrder']=all_order;p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
paths={};cost={}
for i in g['topologicalOrder']:
 deps=ids[i]['dependencies'];prev=max(deps,key=lambda d:cost[d]) if deps else None
 cost[i]=(cost[prev] if prev else 0)+ids[i]['estimatedPoints'];paths[i]=(paths[prev] if prev else [])+[i]
endpoint='TASK-0237';critical=paths[endpoint]
r={'architecture':'ADR-007','productAmendment':'TASK-0253','taskCount':len(tasks),'executableTaskCount':g['activeCount'],'historicalTaskIds':m['historicalTaskIds'],'edgeCount':sum(len(ids[i]['dependencies']) for i in g['topologicalOrder']),'acyclic':True,'topologicalOrder':g['topologicalOrder'],'criticalPathEndpoint':endpoint,'criticalPath':critical,'criticalPathRelativePoints':cost[endpoint],'method':'Longest weighted path in executable DAG; relative points, not duration.'}
Path('analysis/reports/task_dependency_analysis.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
p=Path('plans/01_DEPENDENCY_GRAPH.md');s=p.read_text().split('| Task |')[0];s+='| Task | Prerequisites | Output |\n| --- | --- | --- |\n'+'\n'.join(f"| {t['id']} | {', '.join(t['dependencies']) or 'none'} | `{t['output']}` |" for t in tasks if t.get('executionScope')!='HISTORICAL')+'\n';p.write_text(s)
p=Path('plans/02_CRITICAL_PATH.md');p.write_text('# Critical path\n\nComputed from the executable RN/Skia DAG including required rewarded-ad acceptance. Relative points are not hours. Endpoint '+endpoint+'; '+str(cost[endpoint])+' points. Ready-task browser priority remains in00_EXECUTION_ORDER.md.\n\n| Order | Task | Deliverable | Weight |\n| --- | --- | --- | --- |\n'+'\n'.join(f"| {n+1} | {i} | {ids[i]['title']} | {ids[i]['estimatedPoints']} |" for n,i in enumerate(critical))+'\n')
p=Path('tasks/TASK_INDEX.md');s=p.read_text().split('| Task |')[0];s+='| Task | Phase | Priority | Deliverable | Dependencies | Complexity | Risk |\n| --- | --- | --- | --- | --- | --- | --- |\n'+'\n'.join(f"| [{t['id']}](TASKS_PHASE_{t['phase']:02d}.md#{t['id'].lower()}) | {t['phase']:02d} | {t['priority']} | {t['title'] if t.get('executionScope')!='HISTORICAL' else 'Historical native spike (SUPERSEDED)'} | {', '.join(t['dependencies']) or 'none'} | {t['complexity']} | {t['risk']} |" for t in tasks)+'\n';p.write_text(s)
print('Derived task DAG updated:',len(tasks),'tasks; acyclic; no dangling dependencies.')
