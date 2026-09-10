"""Single shared-app rewarded UI smoke. No fabricated game state or raw logs."""
import json,os,time
from playwright.sync_api import sync_playwright

def saved(page):
    return page.evaluate('''async()=>new Promise((resolve,reject)=>{
      const r=indexedDB.open('merge-heroes-saves-v1',1);r.onerror=()=>reject(Error('save unavailable'));
      r.onsuccess=()=>{const db=r.result,tx=db.transaction('candidates','readonly'),q=tx.objectStore('candidates').getAll();
        q.onsuccess=()=>{const s=q.result.filter(v=>v.generation).map(v=>JSON.parse(JSON.parse(v.bytes).payload)).sort((a,b)=>b.generation-a.generation)[0];resolve({gold:s.data.currencies.gold,boosts:s.data.stageBoosts??{},receipts:s.data.transactionReceipts.filter(v=>v.source.startsWith('freeCoins:')||v.source.startsWith('stageBoost:'))});};tx.oncomplete=()=>db.close();};
    })''')
with sync_playwright() as p:
    browser=p.chromium.launch();results=[]
    for mode in ['completed','cancelled','unavailable']:
        context=browser.new_context(viewport={'width':430,'height':932});page=context.new_page();errors=[]
        page.on('pageerror',lambda _e:errors.append(1));page.on('console',lambda m:errors.append(1) if m.type=='error' else None)
        url=os.environ.get('KISEL_WEB_URL','http://127.0.0.1:8082')
        page.goto(url+('?rewarded='+mode if mode!='unavailable' else ''));page.get_by_test_id('game-status').wait_for(timeout=60000)
        page.get_by_role('button',name='Shop',exact=True).click();page.get_by_test_id('shop-screen').wait_for()
        page.get_by_test_id('rewarded-action').click()
        if mode=='completed':
            page.wait_for_function("document.querySelector('[data-testid=rewarded-action]')?.getAttribute('aria-disabled')!=='true'")
            assert len(saved(page)['receipts'])==1
            page.get_by_role('button',name='FREE COINS',exact=True).wait_for();page.get_by_test_id('rewarded-action').click();page.wait_for_timeout(1600)
            assert len(saved(page)['receipts'])==2,{'receipts':len(saved(page)['receipts']),'cta':page.get_by_test_id('rewarded-action').get_attribute('aria-label'),'alerts':page.get_by_role('alert').count()}
            page.screenshot(path='/tmp/kisel-reward-shop.png')
        else:
            page.get_by_role('alert').wait_for();assert len(saved(page)['receipts'])==0
        page.get_by_role('button',name='Back from shop',exact=True).click();page.get_by_test_id('shop-screen').wait_for(state='hidden')
        if mode=='completed':
            page.get_by_test_id('buy-1').click()
            boost=page.get_by_role('button',name='Boost Reward',exact=True);boost.wait_for(timeout=25000);boost.click()
            page.get_by_test_id('stage-boost-screen').wait_for();began=time.monotonic()
            page.get_by_role('button',name='CLAIM!',exact=True).wait_for(timeout=5000)
            assert time.monotonic()-began>=1,'visible multiplier spin'
            pending=next(b for b in saved(page)['boosts'].values() if b['status']=='reserved')
            page.screenshot(path='/tmp/kisel-reward-boost.png')
            page.keyboard.press('Escape');page.get_by_test_id('stage-boost-screen').wait_for(state='hidden')
            page.reload();page.get_by_test_id('game-status').wait_for(timeout=60000)
            page.get_by_role('button',name='Victory reward',exact=True).click();page.get_by_test_id('stage-boost-screen').wait_for()
            assert saved(page)['boosts'][pending['id']]['multiplier']==pending['multiplier']
            page.get_by_role('button',name='CLAIM!',exact=True).click()
            page.get_by_role('button',name='BACK TO BATTLE',exact=True).wait_for(timeout=5000)
            claimed=saved(page);receipt=next(r for r in claimed['receipts'] if r['source']=='stageBoost:'+pending['id'])
            assert int(receipt['grants'][0]['amount'])==int(pending['baseGold'])*(pending['multiplier']-1)
            assert claimed['boosts'][pending['id']]['status']=='claimed'
            page.get_by_role('button',name='BACK TO BATTLE',exact=True).click();page.get_by_test_id('stage-boost-screen').wait_for(state='hidden')
        page.get_by_test_id('buy-1').click();assert not errors,{'appErrors':len(errors)}
        results.append({'mode':mode,'freeCoins':'PASS','boostRestartAndClaim':'PASS' if mode=='completed' else 'covered by controller/core tests','appErrors':0});context.close()
    browser.close();print(json.dumps({'status':'PASS','cases':results}))
