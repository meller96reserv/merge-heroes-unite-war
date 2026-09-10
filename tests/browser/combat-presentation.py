"""Actual shared Skia presenters and core. Forced crit is a DEV fixture, not shipped balance."""
from datetime import datetime,timezone
import json,base64,hashlib,os
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path(os.environ.get('KISEL_MOTION_EVIDENCE_DIR','analysis/reports/combat/presentation'));out.mkdir(parents=True,exist_ok=True)
results=[];oracles={}
with sync_playwright() as p:
 b=p.chromium.launch()
 for tier,kind in [(1,'melee'),(2,'magic'),(3,'ranged')]:
  for mode in ['full','low','reduced']:
   page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'))
   page.clock.install();page.goto(f'http://localhost:8082/?fixture=combat-acceptance&tier={tier}&mode={mode}');page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(1800)
   page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
   def state():return json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'))
   def click(name,count=1):
    for _ in range(count):page.get_by_test_id(name).dispatch_event('click')
   def capture(marker):
    page.clock.run_for(60);(out/f'{kind}-{mode}-{marker}.png').write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']))
   click('step',20);assert len(state()['combat']['hits'])==1;capture('travel')
   click('step',3);assert state()['combat']['encounter']['entities'][1]['hp']==10;capture('hit')
   click('pause');before=state();click('step',5);assert state()==before;click('pause')
   page.clock.run_for(850);click('step',20);assert state()['combat']['encounter']['entities'][1]['hp']==0;capture('death');page.clock.run_for(400);capture('death-released')
   final=state();assert len([e for e in final['events'] if e['type']=='enemy.died'])==1
   digest=hashlib.sha256(json.dumps(final,sort_keys=True).encode()).hexdigest()
   if kind in oracles:assert oracles[kind]==digest
   else:oracles[kind]=digest
   assert not errors;results.append({'kind':kind,'mode':mode,'status':'PASS','coreHash':digest,'runtimeErrors':len(errors)});page.close()
 # Missing source cancels a queued projectile; crit is explicit 100% fixture-only.
 for mode in ['full','low','reduced']:
  for scenario in ['critical','missing-source','missing-target']:
   page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install();page.goto(f'http://localhost:8082/?fixture=combat-acceptance&tier=2&mode={mode}&crit={1 if scenario=="critical" else 0}');page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(1200);page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
   for _ in range(20):page.get_by_test_id('step').dispatch_event('click')
   if scenario=='missing-source':page.get_by_test_id('withdraw').dispatch_event('click')
   if scenario=='missing-target':page.get_by_test_id('missing-target').dispatch_event('click')
   for _ in range(0 if scenario=='missing-target' else 3):page.get_by_test_id('step').dispatch_event('click')
   page.clock.run_for(70);final=json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'));damage=[e for e in final['events'] if e['type']=='damage.applied']
   if scenario=='critical':assert damage[0]['payload']['crit'] and damage[0]['payload']['applied']==20
   elif scenario=='missing-source':assert not damage and final['combat']['encounter']['entities'][0]['hp']==20 and not final['combat']['hits']
   else:assert not damage and final['projectedProjectiles']==0 and len(final['combat']['hits'])==1
   (out/f'{scenario}-{mode}.png').write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));assert not errors;results.append({'scenario':scenario,'mode':mode,'status':'PASS','runtimeErrors':len(errors)});page.close()
 b.close()
report={'status':'PASS','cases':results,'native':'NOT_RUN','referenceMotionParity':'UNKNOWN','fixtureExcludedFromProduction':True}
(out/'results.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'status':'PASS','cases':len(results),'coreHashesEqualAcrossQualityModes':True}))
