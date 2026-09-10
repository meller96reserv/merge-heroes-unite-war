"""Drive the shared RN/Skia game through visible controls, including real durable saves."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/board/browser');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
    browser=p.chromium.launch();page=browser.new_page(viewport={'width':430,'height':932});errors=[]
    page.on('pageerror',lambda _:errors.append('page-error'))
    page.on('console',lambda m:errors.append('console-error') if m.type=='error' else None)
    # Use the real withdraw interaction to isolate board accounting; combat is
    # covered independently by stage-loop.py and combat-rewards.py.
    def withdraw_all():
        for i in range(5):
            slot=page.get_by_test_id(f'board-slot-{i}')
            if 'deployed' in slot.get_attribute('aria-label'):
                slot.click();page.wait_for_function('(i)=>!document.querySelector(`[data-testid="board-slot-${i}"]`).getAttribute("aria-label").includes("deployed")',arg=i)
    def status():return page.get_by_test_id('game-status').get_attribute('aria-label')
    def expect(value):page.wait_for_function('(value)=>document.querySelector(\'[data-testid="game-status"]\')?.getAttribute("aria-label")===value',arg=value)
    def center(slot):
        r=page.get_by_test_id(f'board-slot-{slot}').bounding_box();return r['x']+r['width']/2,r['y']+20
    def drag(source,target,screenshot=None):
        page.mouse.move(*center(source));page.mouse.down();page.mouse.move(*center(target),steps=20);page.wait_for_timeout(180)
        if screenshot:page.screenshot(path=str(out/screenshot))
        page.mouse.up();page.wait_for_timeout(300)
    page.goto('http://localhost:8082');expect('Coins 100; Heroes 1; Stage 1-1');withdraw_all();page.wait_for_timeout(3000)
    page.screenshot(path=str(out/'initial.png'))
    page.get_by_role('button',name='Buy hero',exact=True).click();expect('Coins 99; Heroes 2; Stage 1-1');withdraw_all()
    drag(1,0,'drag-targets.png');expect('Coins 139; Heroes 1; Stage 1-1')
    assert 'level 2' in page.get_by_test_id('board-slot-0').get_attribute('aria-label')
    page.get_by_role('button',name='Buy level 2 hero',exact=True).click();expect('Coins 135; Heroes 2; Stage 1-1');withdraw_all()
    drag(1,0);expect('Coins 195; Heroes 1; Stage 1-1')
    for _ in range(6):
        page.get_by_role('button',name='Buy hero',exact=True).click();withdraw_all()
    expect('Coins 191; Heroes 5; Stage 1-1');page.get_by_text('Your board is full. Merge two matching heroes!').wait_for()
    drag(1,2);expect('Coins 191; Heroes 4; Stage 1-1') # repeated tier discovery pays zero
    before=status();drag(0,2);assert status()==before # incompatible occupied target
    drag(2,1);assert 'level 2' in page.get_by_test_id('board-slot-1').get_attribute('aria-label')
    page.mouse.move(*center(1));page.mouse.down();page.mouse.move(420,100,steps=12);page.mouse.up();page.wait_for_timeout(250);assert status()==before
    # Blur during an active drag cancels ownership without a domain mutation.
    page.mouse.move(*center(1));page.mouse.down();page.mouse.move(220,580,steps=8);page.evaluate('window.dispatchEvent(new Event("blur"))');page.mouse.up();page.wait_for_timeout(250);assert status()==before
    # Actual adapter failure is injected at the browser API boundary after hydration.
    page.evaluate('''()=>{window.restoreTransaction=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args){if(this.name==='merge-heroes-saves-v1'&&args[1]==='readwrite')throw new DOMException('injected','QuotaExceededError');return window.restoreTransaction.apply(this,args);};}''')
    page.get_by_role('button',name='Buy hero',exact=True).click();page.get_by_text('Progress could not be saved. Please try again.').wait_for();assert status()==before
    page.evaluate('IDBDatabase.prototype.transaction=window.restoreTransaction;delete window.restoreTransaction')
    page.get_by_role('button',name='Settings',exact=True).click();page.get_by_role('button',name='Back to battle',exact=True).click();assert status()==before
    page.reload();expect(before);page.wait_for_timeout(1000)
    assert 'level 3' in page.get_by_test_id('board-slot-0').get_attribute('aria-label');assert 'level 2' in page.get_by_test_id('board-slot-1').get_attribute('aria-label')
    # Holding stops at capacity, release outside cannot resume after a merge frees a slot.
    r=page.get_by_role('button',name='Buy hero',exact=True).bounding_box();page.mouse.move(r['x']+r['width']/2,r['y']+r['height']/2);page.mouse.down();page.wait_for_timeout(1200);page.mouse.move(420,100,steps=8);page.mouse.up();expect('Coins 190; Heroes 5; Stage 1-1');withdraw_all()
    drag(2,3);expect('Coins 190; Heroes 4; Stage 1-1');page.wait_for_timeout(1200);assert status()=='Coins 190; Heroes 4; Stage 1-1'
    page.wait_for_timeout(1200);page.screenshot(path=str(out/'settled.png'))
    assert not errors,{'runtimeErrorCount':len(errors)}
    result={'status':'PASS','quickTap':True,'purchaseSpawn':True,'dragMerge':True,'discoveryOnce':True,'fullBoardNoDebit':True,'incompatibleNoMutation':True,'emptySlotMove':True,'outsideCancel':True,'blurCancel':True,'quotaFailureNoMutation':True,'reloadPreservesHeroesAndGold':True,'holdStopsAfterRelease':True,'runtimeErrors':len(errors),'native':'NOT_RUN'}
    (out/'acceptance.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));browser.close()
