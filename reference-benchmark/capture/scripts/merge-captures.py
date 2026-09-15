#!/usr/bin/env python3
"""Merge per-session indices without changing or deleting archived response bytes."""
import json,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parents[2]
inputs=sys.argv[1:]
if len(inputs)<2:raise SystemExit('Pass at least two index JSON paths, oldest/validated capture first.')
parts=[json.loads((ROOT/p).read_text()) for p in inputs];d=dict(parts[0]);d['captureRuns']=[p['run'] for p in parts];d['resources']=sum((p['resources'] for p in parts),[]);d['failed']=sum((p.get('failed',[]) for p in parts),[]);d['errors']=sum((p.get('errors',[]) for p in parts),[]);d['operations']=sum((p.get('operations',[]) for p in parts),[]);d['supplements']=sum((p.get('supplements',[]) for p in parts),[])
for k in ['requests','successfulResponses','excludedResponses','failedRequests','uncapturedResponses']:d[k]=sum(p.get(k,0) for p in parts)
records=[r for r in d['resources'] if r.get('sha256')];d['resourcesCaptured']=len(records);unique={r['sha256']:r['size'] for r in records};d['uniqueBodies']=len(unique);d['uniqueBytes']=sum(unique.values());d['hosts']=sorted({r['hostname'] for r in records})
(ROOT/'capture/reports/resource-index.json').write_text(json.dumps(d,indent=2));print(json.dumps({k:d[k] for k in ['captureRuns','resourcesCaptured','uniqueBodies','uniqueBytes']}))
