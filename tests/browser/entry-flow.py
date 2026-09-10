"""One browser entry/boot milestone smoke; user accepts final visuals."""
import json,os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e).split('\n')[0]));page.on('console',lambda m:errors.append(m.text[:150]) if m.type=='error' else None)
 page.goto(os.environ.get('KISEL_WEB_URL','http://127.0.0.1:8082'));page.get_by_test_id('lets-play').wait_for(timeout=60000);page.screenshot(path='/tmp/kisel-start.png')
 assert page.get_by_test_id('game-status').count()==0
 page.get_by_role('button',name='Terms of Use',exact=True).click();page.get_by_role('alert').wait_for()
 page.get_by_test_id('lets-play').click();page.get_by_test_id('game-status').wait_for(timeout=30000);page.get_by_test_id('buy-1').click()
 page.wait_for_function("document.querySelector('[data-testid=board-slot-1]')?.getAttribute('aria-label')?.includes('level 1')")
 assert not errors,errors
 print(json.dumps({'startLegalBattlePurchase':'PASS','errors':0}));b.close()
