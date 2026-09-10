"""One Daily/Relics/Dungeon UI milestone, using real gameplay rewards."""
import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e).split('\n')[0]));page.on('console',lambda m:errors.append(m.text[:160]) if m.type=='error' else None)
 page.goto('http://127.0.0.1:8082');page.get_by_test_id('lets-play').wait_for(timeout=60000);page.get_by_test_id('lets-play').click();page.get_by_test_id('game-status').wait_for(timeout=30000)
 page.get_by_role('button',name='Daily reward',exact=True).click();daily=page.get_by_test_id('daily-reward-screen');daily.wait_for();page.get_by_test_id('daily-action').click();daily.get_by_role('button',name='CLAIM',exact=True).wait_for();page.screenshot(path='/tmp/kisel-daily.png');page.get_by_test_id('daily-action').click();daily.get_by_role('button',name='BACK TO BATTLE',exact=True).wait_for();page.get_by_test_id('daily-action').click();daily.wait_for(state='hidden')
 page.get_by_role('button',name='Relics',exact=True).click();relic=page.get_by_test_id('relic-screen');relic.wait_for();page.wait_for_timeout(500);page.screenshot(path='/tmp/kisel-relics.png');page.get_by_test_id('open-relic-1').click();page.get_by_test_id('meta-detail').wait_for();page.get_by_test_id('meta-detail-action').click();page.get_by_test_id('meta-detail').wait_for(state='hidden');relic.get_by_role('button',name='Dungeon',exact=True).click();dungeon=page.get_by_test_id('dungeon-screen');dungeon.wait_for();page.wait_for_timeout(500);page.screenshot(path='/tmp/kisel-dungeon.png')
 for name in ['infernal','frost','shadow']:
  page.get_by_test_id('dungeon-'+name).click();page.get_by_role('button',name='Fight dragon',exact=True).click();dungeon.wait_for(state='hidden');page.get_by_role('button',name='Leave dungeon',exact=True).wait_for();page.wait_for_timeout(800)
  if name=='infernal':page.screenshot(path='/tmp/kisel-dragon-battle.png')
  page.get_by_role('button',name='Leave dungeon',exact=True).click();page.get_by_role('button',name='Leave dungeon',exact=True).wait_for(state='hidden');page.get_by_role('button',name='Dungeon',exact=True).click();dungeon.wait_for()
 dungeon.get_by_role('button',name='Battle',exact=True).click();dungeon.wait_for(state='hidden');page.get_by_test_id('buy-1').click()
 assert not errors,errors
 print(json.dumps({'dailyClaimRelicOpenThreeDragonEntryExit':'PASS','appErrors':0}));b.close()
