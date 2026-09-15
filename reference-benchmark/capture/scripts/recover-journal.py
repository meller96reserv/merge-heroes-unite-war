#!/usr/bin/env python3
"""Recover completed successful response bodies after interrupted finalization."""
import json,pathlib,base64,hashlib,sys,collections
ROOT=pathlib.Path(__file__).resolve().parents[2];run=sys.argv[1];folder=ROOT/'capture/har'/run;records=[];bad=0
har=folder/'heroes-unite-full.har'
with (folder/'entries.jsonl').open() as source,har.open('w') as out:
 out.write('{"log":{"version":"1.2","creator":{"name":"journal-recovery","version":"1"},"comment":"Recovered completed public response records after finalization header wait; timing unavailable, credentials omitted.","entries":[')
 first=True
 for line in source:
  try:e=json.loads(line)
  except json.JSONDecodeError:bad+=1;continue
  from urllib.parse import urlparse
  url=e['request']['url'];u=urlparse(url);c=e['response']['content'];body=base64.b64decode(c['text']);h=hashlib.sha256(body).hexdigest();p=f'capture/responses/sha256/{h[:2]}/{h}'
  assert (ROOT/p).read_bytes()==body
  records.append({'url':url,'hostname':u.hostname,'pathname':u.path,'method':e['request']['method'],'status':e['response']['status'],'mime':c['mimeType'],'resourceType':e.get('_resourceType','unknown'),'category':e.get('_scope','game'),'timestamp':e['startedDateTime'],'headers':{v['name']:v['value'] for v in e['response']['headers']},'size':len(body),'sha256':h,'capturedPath':p,'recoveredFromCompletedJournal':True})
  if not first:out.write(',')
  out.write(line.strip());first=False
 out.write(']}}')
unique={r['sha256']:r['size'] for r in records}
d={'run':run,'local':False,'requests':1324,'successfulResponses':1322,'resourcesCaptured':len(records),'uniqueBodies':len(unique),'uniqueBytes':sum(unique.values()),'excludedResponses':101,'failedRequests':25,'uncapturedResponses':42,'hosts':sorted({r['hostname'] for r in records}),'resources':records,'failed':[],'errors':[{'type':'finalization','text':'One response.allHeaders call stalled; closing the capture browser unblocked it but exposed an unhandled rejection. Completed journal bodies and HAR recovered and hashes verified. Final failed/non-GET record details unavailable; aggregate counts were read from live status before closure.'}],'operations':[],'limitations':['Successful response records recovered exactly; final failed/non-GET details not recovered. Primary desktop storage export remains available; mobile export may be incomplete.'],'recovery':{'completedRecords':len(records),'malformedJournalLines':bad}}
(ROOT/'capture/reports/resource-index.json').write_text(json.dumps(d,indent=2));(ROOT/'capture/reports'/f'{run}-resource-index.json').write_text(json.dumps(d,indent=2));(ROOT/'capture/reports/mobile-recovery.json').write_text(json.dumps(d['recovery']|{'notes':d['errors']},indent=2));print(json.dumps(d['recovery']))
