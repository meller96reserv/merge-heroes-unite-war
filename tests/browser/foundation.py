"""TASK-0047 real Metro/browser acceptance; temporary Fast Refresh edit is restored."""
import asyncio,json,time,sys
from pathlib import Path
from playwright.async_api import async_playwright
R=Path(__file__).resolve().parents[2];OUT=R/(sys.argv[1] if len(sys.argv)>1 else 'analysis/reports/foundation');OUT.mkdir(exist_ok=True,parents=True)
async def main():
 result={'taskId':'TASK-0047','url':'http://127.0.0.1:8082','cases':[],'errors':[],'platform':'Chromium Web; native NOT_RUN'}
 async with async_playwright() as pw:
  browser=await pw.chromium.launch()
  page=await browser.new_page(viewport={'width':430,'height':932},device_scale_factor=1)
  page.on('pageerror',lambda e:result['errors'].append(str(e)))
  nav=[];page.on('framenavigated',lambda f:nav.append(f.url) if f==page.main_frame else None)
  start=time.monotonic();await page.goto(result['url']);await page.get_by_role('button',name='Enter camp',exact=True).wait_for(timeout=120000)
  result['cases'].append({'name':'cold RN boot after local CanvasKit','status':'PASS','interactiveMs':round((time.monotonic()-start)*1000)})
  await page.screenshot(path=str(OUT/'boot.png'))
  await page.get_by_role('button',name='Enter camp',exact=True).click();await page.get_by_text('Preparing your camp…',exact=True).wait_for()
  source=R/'app/src/App.tsx';original=source.read_text();before=len(nav)
  try:
   assert 'Your adventure begins here.' in original
   source.write_text(original.replace('Your adventure begins here.','Your adventure begins here — refresh verified.'))
   await page.get_by_text('Your adventure begins here — refresh verified.',exact=True).wait_for(timeout=30000)
   assert await page.get_by_text('Preparing your camp…',exact=True).count()==1
   assert len(nav)==before,'Fast Refresh caused navigation/reload'
   result['cases'].append({'name':'Fast Refresh preserves entered state without navigation','status':'PASS','mainFrameNavigationsDuringEdit':len(nav)-before})
   await page.screenshot(path=str(OUT/'fast-refresh.png'))
  finally:source.write_text(original)
  await page.get_by_text('Your adventure begins here.',exact=True).wait_for(timeout=30000)
  for w,h in [(360,640),(768,1024)]:
   await page.set_viewport_size({'width':w,'height':h});await page.get_by_text('Preparing your camp…',exact=True).wait_for()
   assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  result['cases'].append({'name':'compact and tablet viewport without horizontal overflow','status':'PASS'})
  # Load failure is expected on this page; retry must create a fresh WASM module promise.
  failed=await browser.new_page(viewport={'width':430,'height':932})
  await failed.route('**/canvaskit.wasm',lambda route:route.abort())
  await failed.goto(result['url']);await failed.get_by_role('button',name='Try again',exact=True).wait_for(timeout=30000)
  await failed.unroute('**/canvaskit.wasm');await failed.get_by_role('button',name='Try again',exact=True).click()
  await failed.get_by_role('button',name='Enter camp',exact=True).wait_for(timeout=30000)
  result['cases'].append({'name':'missing CanvasKit gives error and retry recovers','status':'PASS'})
  await browser.close()
 result['status']='PASS' if not result['errors'] else 'FAIL'
 (OUT/'browser.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert result['status']=='PASS'
asyncio.run(main())
