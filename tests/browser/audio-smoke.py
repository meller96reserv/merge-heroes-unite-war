"""One lightweight real-game audio milestone smoke; no runtime log capture."""
import json,os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch();page=browser.new_page(viewport={'width':430,'height':932});errors=[]
    page.on('pageerror',lambda _e:errors.append(1))
    page.on('console',lambda m:errors.append(1) if m.type=='error' else None)
    page.goto(os.environ.get('KISEL_WEB_URL','http://127.0.0.1:8082'))
    page.get_by_test_id('game-status').wait_for(timeout=60000)
    page.wait_for_function("JSON.parse(document.querySelector('[data-testid=audio-status]')?.getAttribute('aria-label')||'{}').ready===1",timeout=60000)
    def stats():return json.loads(page.get_by_test_id('audio-status').get_attribute('aria-label'))
    before=stats();assert before['played']==0 and before['activated']==0
    page.get_by_test_id('buy-1').click();page.wait_for_function("document.querySelector('[data-testid=board-slot-1]')?.getAttribute('aria-label')?.includes('level 1')");page.wait_for_timeout(350)
    assert stats()['played']>=2
    a=page.get_by_test_id('board-slot-1').bounding_box();b=page.get_by_test_id('board-slot-0').bounding_box()
    page.mouse.move(a['x']+a['width']/2,a['y']+20);page.mouse.down()
    page.mouse.move(b['x']+b['width']/2,b['y']+20,steps=20);page.mouse.up()
    page.wait_for_function("document.querySelector('[data-testid=board-slot-0]')?.getAttribute('aria-label')?.includes('level 2')")
    page.wait_for_timeout(1200)
    assert stats()['played']>=5
    page.get_by_role('button',name='Lucky wheel',exact=True).click()
    page.get_by_role('button',name='FREE SPIN',exact=True).click()
    page.get_by_role('button',name='WATCH & CLAIM',exact=True).wait_for(timeout=12000)
    page.wait_for_timeout(550);active=stats()
    assert active['played']>15 and active['loops']==2 and active['errors']==0
    assert active['oneShots']<=25 and active.get('retiring',0)<=3
    page.evaluate("window.dispatchEvent(new Event('blur'))");page.wait_for_timeout(550);paused=stats()
    assert paused['oneShots']==0 and paused['context']=='suspended'
    page.evaluate("window.dispatchEvent(new Event('focus'))");page.wait_for_timeout(550);resumed=stats()
    assert resumed['loops']==2 and resumed['context']=='running'
    assert not errors,{'appErrors':len(errors)}
    print(json.dumps({'status':'PASS','activationGate':'PASS','purchaseMergeBattle':'PASS','presentationPlays':active['played'],'decodedBytes':active['decodedBytes'],'focusPauseResume':'PASS','loopCount':resumed['loops'],'appErrors':0}))
    browser.close()
