"""One Equipment / Hero Upgrade UI milestone smoke; user owns final visual acceptance."""
import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e).split('\n')[0]));page.on('console',lambda m:errors.append(m.text[:160]) if m.type=='error' else None)
 page.goto('http://127.0.0.1:8082');page.get_by_test_id('lets-play').wait_for(timeout=60000);page.get_by_test_id('lets-play').click();page.get_by_test_id('game-status').wait_for(timeout=30000)
 page.get_by_role('button',name='Heroes',exact=True).click();page.get_by_test_id('equipment-screen').wait_for();page.wait_for_timeout(1200);page.screenshot(path='/tmp/kisel-equipment.png')
 page.get_by_test_id('equipment-slot-weapon').click();page.get_by_test_id('equipment-inventory').wait_for();page.get_by_role('button',name='Close equipment inventory',exact=True).click()
 page.get_by_role('button',name='Hero upgrades',exact=True).click();page.get_by_test_id('hero-upgrades-screen').wait_for();page.wait_for_timeout(700);page.screenshot(path='/tmp/kisel-upgrades.png')
 page.get_by_test_id('upgrade-1').click();page.get_by_role('alert').wait_for();page.get_by_test_id('hero-upgrades-screen').get_by_role('button',name='Battle',exact=True).click();page.get_by_test_id('hero-upgrades-screen').wait_for(state='hidden');page.get_by_test_id('buy-1').click()
 print(json.dumps({'equipmentUpgradesBattleSmoke':not errors,'errors':errors}));b.close()
