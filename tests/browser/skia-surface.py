"""TASK-0049 actual Skia pixels, gesture cancellation and Reanimated interpolation."""
import asyncio,json,io,math,sys
from pathlib import Path
from PIL import Image
from playwright.async_api import async_playwright
R=Path(__file__).resolve().parents[2];URL=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8082';OUT=R/(sys.argv[2] if len(sys.argv)>2 else 'analysis/reports/skia-surface');OUT.mkdir(parents=True,exist_ok=True)
def center(png):
 im=Image.open(io.BytesIO(png)).convert('RGB');points=[(x,y) for y in range(im.height) for x in range(im.width) if (lambda c:c[0]>180 and c[1]>120 and c[2]<210)(im.getpixel((x,y)))]
 assert len(points)>100,'No rendered Skia gold marker';return [round(sum(p[i] for p in points)/len(points),2) for i in range(2)]
async def main():
 result={'taskId':'TASK-0049','url':URL,'cases':[],'pageErrors':[],'nativeExecution':'NOT_RUN'}
 async with async_playwright() as p:
  b=await p.chromium.launch();page=await b.new_page(viewport={'width':430,'height':932},device_scale_factor=1);page.on('pageerror',lambda e:result['pageErrors'].append(str(e)))
  await page.goto(URL);await page.get_by_role('button',name='Enter camp',exact=True).click(timeout=60000)
  canvas=page.locator('canvas');await canvas.wait_for();await page.wait_for_timeout(600)
  box=await canvas.bounding_box();assert box and box['width']>250 and box['height']==250
  async def shot(name):
   png=await canvas.screenshot();(OUT/(name+'.png')).write_bytes(png);return center(png)
  initial=await shot('surface-idle');x0=box['x']+initial[0];y0=box['y']+initial[1]
  await page.mouse.move(x0,y0);await page.mouse.down();await page.mouse.move(x0+80,y0+40,steps=10);await page.wait_for_timeout(160);dragged=await shot('surface-drag')
  assert dragged[0]-initial[0]>65 and dragged[1]-initial[1]>30,(initial,dragged)
  result['cases'].append({'name':'Skia pixels follow Gesture Handler drag','status':'PASS','idleCenter':initial,'dragCenter':dragged})
  await page.mouse.up();await page.wait_for_timeout(40);transition=await shot('surface-returning');await page.wait_for_timeout(400);settled=await shot('surface-settled')
  assert initial[0]+1<transition[0]<dragged[0]-1,(initial,transition,dragged)
  assert math.dist(initial,settled)<2,(initial,settled)
  result['cases'].append({'name':'Reanimated release interpolates and settles','status':'PASS','intermediateCenter':transition,'settledCenter':settled})
  await page.mouse.move(x0,y0);await page.mouse.down();await page.mouse.move(x0-60,y0-30,steps=6);await page.wait_for_timeout(120)
  await canvas.dispatch_event('pointercancel',{'pointerId':1,'pointerType':'mouse','bubbles':True})
  await page.wait_for_timeout(450);cancelled=await shot('surface-cancelled');await page.mouse.up();assert math.dist(initial,cancelled)<2,(initial,cancelled)
  result['cases'].append({'name':'cancelled gesture reconciles to idle','status':'PASS','center':cancelled})
  for w,h in [(360,640),(768,1024)]:
   await page.set_viewport_size({'width':w,'height':h});await page.wait_for_timeout(200);bb=await canvas.bounding_box();assert bb and bb['x']>=0 and bb['x']+bb['width']<=w and bb['y']+bb['height']<=h,(w,h,bb)
  result['cases'].append({'name':'compact/tablet layout keeps surface visible','status':'PASS'})
  await page.set_viewport_size({'width':430,'height':932});await page.wait_for_timeout(100);await page.screenshot(path=str(OUT/'application.png'))
  for _ in range(3):
   await page.reload();await page.get_by_role('button',name='Enter camp',exact=True).click();await page.locator('canvas').wait_for();assert await page.locator('canvas').count()==1
  result['cases'].append({'name':'three reloads each mount exactly one canvas','status':'PASS'})
  await b.close()
 result['status']='PASS' if not result['pageErrors'] else 'FAIL';(OUT/'browser.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2));assert result['status']=='PASS'
asyncio.run(main())
