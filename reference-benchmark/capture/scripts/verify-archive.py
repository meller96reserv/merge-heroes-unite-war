#!/usr/bin/env python3
"""One integrity check for untouched originals and the bounded local patch surface."""
import pathlib,json,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
m=json.loads((ROOT/'runtime/resource-map.json').read_text());seen=set();fail=[];localSeen=set()
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for r in m['mapping']:
    for kind in ['captured','original']:
        p=ROOT/r[kind]
        if str(p) not in seen:
            seen.add(str(p))
            if not p.is_file() or sha(p)!=r['sha256']:fail.append(str(p.relative_to(ROOT)))
    if r.get('local') and not r['local'].endswith('/index.html') and r['local'] not in localSeen:
        localSeen.add(r['local'])
        if sha(ROOT/r['local'])!=r['sha256']:fail.append(r['local'])
report={'status':'PASS' if not fail else 'FAIL','checkedCapturedAndOriginalFiles':len(seen),'unmodifiedLocalResourceFiles':len(localSeen),'allowedLocalChanges':['index.html SDK script reference','benchmark-portal.js added adapter','public URL root relocated to local root'],'failures':fail}
(ROOT/'capture/reports/archive-integrity.json').write_text(json.dumps(report,indent=2));print(json.dumps(report));raise SystemExit(bool(fail))
