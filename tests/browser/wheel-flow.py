"""Small real-app Wheel golden path; economic state is inspected, never fabricated.
DEV completed-ad fixture is explicit. Set KISEL_WEB_URL for the running preview.
Only aggregate results are printed; no raw browser/runtime logs are retained.
"""
import json, os, time
from playwright.sync_api import sync_playwright

url=os.environ.get('KISEL_WEB_URL','http://127.0.0.1:8082')
def saved(page):
    return page.evaluate('''async()=>new Promise((resolve,reject)=>{
      const r=indexedDB.open('merge-heroes-saves-v1',1);
      r.onerror=()=>reject(Error('database unavailable'));
      r.onsuccess=()=>{const db=r.result,tx=db.transaction('candidates','readonly'),q=tx.objectStore('candidates').getAll();
        q.onsuccess=()=>{const states=q.result.filter(v=>v.generation).map(v=>JSON.parse(JSON.parse(v.bytes).payload)).sort((a,b)=>b.generation-a.generation);const s=states[0];resolve({wheel:s.data.wheel,receipts:s.data.transactionReceipts.filter(v=>v.source.startsWith('wheel:'))});};tx.oncomplete=()=>db.close();};
    })''')
with sync_playwright() as p:
    browser=p.chromium.launch()
    results=[]
    production=os.environ.get('KISEL_WEB_PRODUCTION')=='1'
    cases=[('?rewarded=completed','reserved')] if production else [('', 'reserved'), ('?rewarded=completed','committed')]
    for query,expected in cases:
        context=browser.new_context(viewport={'width':430,'height':932})
        page=context.new_page();errors=[]
        page.on('pageerror',lambda _e:errors.append(1))
        page.on('console',lambda m:errors.append(1) if m.type=='error' else None)
        page.goto(url+query);page.get_by_test_id('game-status').wait_for(timeout=60000)
        page.get_by_role('button',name='Lucky wheel',exact=True).click()
        started=time.monotonic();page.get_by_role('button',name='FREE SPIN',exact=True).click()
        page.get_by_role('button',name='WATCH & CLAIM',exact=True).wait_for(timeout=15000)
        assert time.monotonic()-started>=3, 'spin must visibly decelerate before result'
        pending=saved(page)['wheel']['pendingSpin'];assert pending['status']=='reserved'
        page.get_by_role('button',name='WATCH & CLAIM',exact=True).click()
        if expected=='reserved':
            page.wait_for_function("document.querySelector('[data-testid=wheel-status]')?.getAttribute('aria-label')?.includes('reward is saved')")
            assert len(saved(page)['receipts'])==0
            page.get_by_role('button',name='Back from wheel',exact=True).click()
            page.get_by_test_id('wheel-screen').wait_for(state='hidden')
            page.get_by_role('button',name='Lucky wheel',exact=True).click()
            page.get_by_role('button',name='WATCH & CLAIM',exact=True).wait_for()
            assert saved(page)['wheel']['pendingSpin']==pending
        else:
            page.wait_for_function("document.querySelector('[data-testid=wheel-status]')?.getAttribute('aria-label')?.startsWith('cooldown;')")
            assert len(saved(page)['receipts'])==1
            assert page.get_by_test_id('wheel-action').get_attribute('aria-disabled')=='true'
        page.reload();page.get_by_test_id('game-status').wait_for(timeout=60000)
        page.get_by_role('button',name='Lucky wheel',exact=True).click()
        page.get_by_test_id('wheel-screen').wait_for()
        restored=saved(page)
        assert restored['wheel']['pendingSpin']['id']==pending['id']
        assert restored['wheel']['pendingSpin']['status']==expected
        assert len(restored['receipts'])==(1 if expected=='committed' else 0)
        page.keyboard.press('Escape');page.get_by_test_id('wheel-screen').wait_for(state='hidden')
        page.get_by_test_id('buy-1').click()
        assert not errors,{'appErrorCount':len(errors)}
        results.append({'mode':'production-fixture-ignored' if production else 'normal-unavailable' if not query else 'DEV-confirmed','restart':'PASS','claim':expected,'returnToBattle':'PASS','appErrorCount':0})
        context.close()
    browser.close()
print(json.dumps({'status':'PASS','cases':results}))
