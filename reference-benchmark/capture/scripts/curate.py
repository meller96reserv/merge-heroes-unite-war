#!/usr/bin/env python3
"""Discard accidentally captured unrelated portal bodies before original normalization.
Retains original response bytes for target resources; streams filtered HAR entries.
"""
import json,pathlib,re,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
p=ROOT/'capture/reports/resource-index.json';d=json.loads(p.read_text());run=d['run']
allowed={'www.crazygames.com','builds.crazygames.com','games.crazygames.com','files.crazygames.com','sdk.crazygames.com','cdn.privacy-mgmt.com','fonts.googleapis.com','fonts.gstatic.com'}
def keep(r):return r['hostname'] in allowed and not re.search(r'/auth/|/account/|/token/|/login/',r['pathname'])
old=d['resources'];d['resources']=[r for r in old if keep(r)];d['prunedUnrelatedResponses']=len(old)-len(d['resources']);valid={r['url'] for r in d['resources'] if r.get('sha256')}
d['excludedResponses']+=d['prunedUnrelatedResponses'];d['resourcesCaptured']=sum('sha256' in r for r in d['resources']);unique={r['sha256']:r['size'] for r in d['resources'] if 'sha256' in r};d['uniqueBodies']=len(unique);d['uniqueBytes']=sum(unique.values());d['hosts']=sorted({r['hostname'] for r in d['resources'] if 'sha256' in r});d['uncapturedResponses']=sum('uncapturedReason' in r for r in d['resources'])
# The filtered index retains all request counts and failures but no unrelated bodies.
p.write_text(json.dumps(d,indent=2));(p.parent/(run+'-resource-index.json')).write_text(json.dumps(d,indent=2))
har=ROOT/'capture/har'/run/'heroes-unite-full.har';temp=har.with_suffix('.tmp')
def entries(f):
    buf='';decoder=json.JSONDecoder()
    while '"entries":[' not in buf:
        chunk=f.read(65536)
        if not chunk:raise ValueError('Missing HAR entries')
        buf+=chunk
    buf=buf.split('"entries":[',1)[1]
    while True:
        buf=buf.lstrip(' \r\n,')
        if buf.startswith(']'):return
        try:item,end=decoder.raw_decode(buf);buf=buf[end:];yield item
        except json.JSONDecodeError:
            chunk=f.read(65536)
            if not chunk:raise
            buf+=chunk
with har.open() as f,temp.open('w') as out:
    out.write('{"log":{"version":"1.2","creator":{"name":"isolated-response-capture","version":"1"},"comment":"Filtered public runtime/launch dependencies; request credentials omitted; timing fields unavailable.","entries":[')
    first=True
    for e in entries(f):
        if e['request']['url'] not in valid:continue
        if not first:out.write(',')
        json.dump(e,out,separators=(',',':'));first=False
    out.write(']}}')
temp.replace(har)
# Only remove orphan bodies belonging solely to pruned records; never touch runtime/original.
retained=set(unique)
for r in old:
    if r.get('sha256') and r['sha256'] not in retained:
        (ROOT/r['capturedPath']).unlink(missing_ok=True)
cats={}
for r in d['resources']:
    if not r.get('sha256'):continue
    k=r['mime'].split(';')[0];v=cats.setdefault(k,{'count':0,'bytes':0});v['count']+=1;v['bytes']+=r['size']
summary={k:d[k] for k in ['run','requests','successfulResponses','resourcesCaptured','uniqueBodies','uniqueBytes','hosts','failedRequests','uncapturedResponses','excludedResponses']}
(p.parent/'CAPTURE_SUMMARY.md').write_text('# Public response capture\n\n```json\n'+json.dumps(summary,indent=2)+'\n```\n\n## MIME inventory\n\n'+ '\n'.join(f'- {k}: {v["count"]} responses, {v["bytes"]:,} decoded bytes' for k,v in sorted(cats.items()))+'\n\nScoped to Heroes Unite and its launch dependencies. Explicit build manifest release bundles loaded through Cocos; debug_scene skipped. Resources are decoded bytes, deduplicated by hash; repeated requests remain in the index. No claim of every possible late-game/remote resource. See CAPTURE_COVERAGE.md, public-bundle-load.json, failed and uncaptured entries in resource-index.json. HAR embeds response content; credentials omitted and transport timings unavailable. Initial unrelated third-party bodies removed before original normalization.\n')
print(json.dumps(summary))
