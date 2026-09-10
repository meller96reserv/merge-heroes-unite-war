from datetime import datetime,timezone
"""Actual browser game: durable repeated kills, failed save, retry and reload."""
import json,base64
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/combat/browser')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None)
 page.clock.install();page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp(page.evaluate('Date.now()')/1000,timezone.utc))
 def gold():return int(page.get_by_test_id('game-status').get_attribute('aria-label').split(';')[0].split()[-1])
 def until(predicate,steps=220):
  for _ in range(steps):
   if predicate():return
   page.clock.run_for(50)
  raise AssertionError('Timed out waiting for game transition')
 def saved():
  return page.evaluate('''async()=>{const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('merge-heroes-saves-v1');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(Error('Save unavailable'));});const data=await Promise.all(['A','B'].map(slot=>new Promise(resolve=>{const r=db.transaction('candidates').objectStore('candidates').get(JSON.stringify(['local-guest.production',slot]));r.onsuccess=()=>resolve(r.result?JSON.parse(JSON.parse(r.result.bytes).payload):null);})));db.close();return data.filter(Boolean).sort((a,b)=>b.generation-a.generation)[0];}''')
 def capture(name):
  shot=page.context.new_cdp_session(page).send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False});(out/name).write_bytes(base64.b64decode(shot['data']))
 until(lambda:gold()==108);s=saved();assert s['data']['stages']['encounterSequence']==2;assert len([r for r in s['data']['transactionReceipts'] if r['source'].startswith('kill:')])==2
 page.evaluate('''()=>{window.restoreTransaction=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args){if(this.name==='merge-heroes-saves-v1'&&args[1]==='readwrite')throw new DOMException('injected','QuotaExceededError');return window.restoreTransaction.apply(this,args);};}''')
 until(lambda:page.get_by_role('button',name='Retry saving reward').count()==1);assert gold()==108;page.clock.run_for(1500);assert gold()==108;assert saved()['data']['stages']['encounterSequence']==2;capture('reward-retry.png')
 page.evaluate('IDBDatabase.prototype.transaction=window.restoreTransaction;delete window.restoreTransaction');page.get_by_role('button',name='Retry saving reward').click(force=True);until(lambda:gold()==118);assert saved()['data']['stages']['encounterSequence']==3
 page.clock.run_for(600);assert 'Enemy health 180;' in page.get_by_test_id('battle-status').get_attribute('aria-label');capture('reward-next-enemy.png')
 page.clock.resume();page.reload();page.get_by_test_id('battle-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp(page.evaluate('Date.now()')/1000,timezone.utc));assert gold()==118;assert saved()['data']['stages']['encounterSequence']==3
 until(lambda:gold()==120,steps=400);assert len([r for r in saved()['data']['transactionReceipts'] if r['source'].startswith('kill:')])==4;assert not errors,len(errors)
 result={'status':'PASS','fourUniqueKillsGold':120,'failedSavePreservesGoldAndSequence':True,'retryOnceAndFreshOpponent':True,'reloadDoesNotReplayKills':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'rewards.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
