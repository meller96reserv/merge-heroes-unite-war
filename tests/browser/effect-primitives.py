"""Original shared Skia recipes: visual markers, reduced motion and cancellation."""
import json,base64,io
from datetime import datetime,timezone
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/motion/primitives');out.mkdir(parents=True,exist_ok=True);cases=[]
with sync_playwright() as p:
 b=p.chromium.launch()
 for mode in ['full','low','reduced']:
  page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install()
  page.goto(f'http://localhost:8082/?fixture=effect-primitives&mode={mode}');page.get_by_test_id('effects-state').wait_for(state='attached');page.wait_for_timeout(500)
  page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+100)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
  def count():return int(page.get_by_test_id('effects-state').get_attribute('aria-label'))
  page.get_by_test_id('play-effects').dispatch_event('click');page.wait_for_timeout(80);page.clock.run_for(60);page.wait_for_timeout(80);assert count()==5
  frame=Image.open(io.BytesIO(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']))).convert('RGB').crop((0,30,430,350));frame.save(out/f'{mode}.png')
  visible=[]
  for i in range(5):
   x=60+i%3*150;y=70+i//3*180
   visible.append(sum(max(abs(c-base) for c,base in zip(frame.getpixel((a,z)),(36,57,74)))>20 for a in range(x-38,x+39) for z in range(y-38,y+39)))
  assert min(visible)>10,(mode,visible)
  page.get_by_test_id('cancel-effects').dispatch_event('click');assert count()==0;page.clock.run_for(900);assert count()==0
  page.get_by_test_id('play-effects').dispatch_event('click');page.wait_for_timeout(80);page.clock.run_for(900);page.wait_for_timeout(100);assert count()==0
  assert not errors;cases.append({'mode':mode,'visiblePixelsByRecipe':visible,'cancelAndReuse':'PASS','runtimeErrors':len(errors)});page.close()
 for critical in [False,True]:
  page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install()
  page.goto(f'http://localhost:8082/?fixture=combat-acceptance&tier=2&crit={int(critical)}');page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(500)
  page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+100)/1000,timezone.utc))
  for _ in range(23):page.get_by_test_id('step').dispatch_event('click')
  page.wait_for_timeout(80);page.clock.run_for(60);page.wait_for_timeout(80)
  state=json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'));assert state['combat']['encounter']['entities'][1]['hp']==(0 if critical else 10)
  raw=base64.b64decode(page.context.new_cdp_session(page).send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']);Image.open(io.BytesIO(raw)).crop((240,300,430,460)).save(out/f'combat-{int(critical)}.png')
  assert not errors;page.close()
 b.close()
(out/'results.json').write_text(json.dumps({'status':'PASS','cases':cases,'liveCombatHitAndCritical':'PASS','native':'NOT_RUN'},indent=2)+'\n');print(json.dumps({'status':'PASS','cases':len(cases)}))
