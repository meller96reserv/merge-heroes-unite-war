"""Shared UI: stages, boss failure, actual buy/merge, retry, victory and row unlock."""
import os
from datetime import datetime,timezone
import json,base64
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path(os.environ.get('KISEL_MOTION_EVIDENCE_DIR','analysis/reports/stages/browser'));out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None);page.clock.install();page.goto('http://localhost:8082');page.get_by_test_id('stage-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+100)/1000,timezone.utc))
 def stage():return page.get_by_test_id('stage-status').get_attribute('aria-label')
 def until(predicate,steps=160):
  for _ in range(steps):
   if predicate():return
   page.clock.run_for(250)
  raise AssertionError('Stage UI did not reach expected state')
 def capture(name):
  shot=page.context.new_cdp_session(page).send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False});(out/name).write_bytes(base64.b64decode(shot['data']))
 def drag(a,z):
  def center(i):
   r=page.get_by_test_id(f'board-slot-{i}').bounding_box();return r['x']+r['width']/2,r['y']+20
  page.mouse.move(*center(a));page.mouse.down();page.mouse.move(*center(z),steps=20);page.clock.run_for(80);page.mouse.up();page.clock.run_for(150)
 assert 'Stage 1-1' in stage();until(lambda:'Stage 1-2; WAVE 1/2' in stage());until(lambda:'Stage 1-2; WAVE 2/2' in stage());until(lambda:'Stage 1-3; Boss' in stage());capture('boss-countdown.png')
 until(lambda:'Stage 1-2;' in stage() and 'Farming' in stage());capture('boss-farming.png')
 page.get_by_role('button',name='Buy hero',exact=True).click(force=True);page.clock.run_for(100);drag(1,0);assert 'level 2' in page.get_by_test_id('board-slot-0').get_attribute('aria-label')
 page.get_by_role('button',name='Buy level 2 hero',exact=True).click(force=True);page.clock.run_for(100);drag(1,0);assert 'level 3' in page.get_by_test_id('board-slot-0').get_attribute('aria-label')
 until(lambda:page.get_by_role('button',name='Challenge boss',exact=True).count()==1);page.get_by_role('button',name='Challenge boss',exact=True).click(force=True);page.clock.run_for(100);assert 'Stage 1-3; Boss' in stage();capture('boss-retry-team.png')
 until(lambda:'Stage 1-4;' in stage());capture('boss-victory.png');assert 'locked' not in page.get_by_test_id('board-slot-5').get_attribute('aria-label');assert 'locked' in page.get_by_test_id('board-slot-10').get_attribute('aria-label')
 page.clock.resume();page.reload();page.get_by_test_id('stage-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+100)/1000,timezone.utc));assert 'Stage 1-4;' in stage();assert 'level 3' in page.get_by_test_id('board-slot-0').get_attribute('aria-label');assert 'locked' not in page.get_by_test_id('board-slot-5').get_attribute('aria-label');assert not errors,len(errors)
 result={'status':'PASS','sequentialWaves':True,'bossCountdownFailureFarm':True,'buyDragMergeToLevel3':True,'manualRetryVictory':True,'secondRowUnlocked':True,'reloadPreservesStageHeroAndSlots':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'stage-loop.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
