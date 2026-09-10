from datetime import datetime,timezone
import json,base64,os
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path(os.environ.get('KISEL_MOTION_EVIDENCE_DIR','analysis/reports/motion/merge'));out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install();page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached')
 def status():return page.get_by_test_id('game-status').get_attribute('aria-label')
 def count():return int(page.get_by_test_id('merge-motion-state').get_attribute('aria-label'))
 def withdraw():
  for i in range(5):
   slot=page.get_by_test_id(f'board-slot-{i}')
   if 'deployed' in slot.get_attribute('aria-label'):slot.click();page.wait_for_timeout(100)
 withdraw();page.get_by_role('button',name='Buy hero',exact=True).click();page.wait_for_function('document.querySelector(\'[data-testid="game-status"]\').getAttribute("aria-label").includes("Heroes 2")');withdraw();page.wait_for_timeout(700)
 page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
 def capture(name):
  page.wait_for_timeout(60);path=out/(name+'.png');path.write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));return Image.open(path).convert('RGB').crop((0,535,200,640))
 def drag():
  def center(i):
   r=page.get_by_test_id(f'board-slot-{i}').bounding_box();return r['x']+r['width']/2,r['y']+20
  page.mouse.move(*center(1));page.mouse.down();page.mouse.move(*center(0),steps=12);page.clock.run_for(30);page.mouse.up()
  for _ in range(100):
   page.clock.run_for(2)
   if count()==1:return
  raise AssertionError('No committed merge presentation')
 drag();assert status()=='Coins 139; Heroes 1; Stage 1-1';page.clock.run_for(90);a=capture('converge');page.clock.run_for(410);z=capture('reveal');assert count()==1;page.clock.run_for(300);capture('settled');assert count()==0;assert 'level 2' in page.get_by_test_id('board-slot-0').get_attribute('aria-label');assert status()=='Coins 139; Heroes 1; Stage 1-1'
 page.get_by_role('button',name='Buy level 2 hero',exact=True).dispatch_event('click')
 for _ in range(100):
  page.clock.run_for(5)
  if 'Heroes 2' in status():break
 drag();assert status()=='Coins 195; Heroes 1; Stage 1-1';cascade=json.loads(page.get_by_test_id('cascade-motion-state').get_attribute('aria-label'));assert cascade==[{'intensity':2,'pitch':1.06}],cascade;page.clock.run_for(120);page.evaluate('window.dispatchEvent(new Event("blur"))');page.clock.run_for(5);assert count()==0;capture('cancelled');assert 'level 3' in page.get_by_test_id('board-slot-0').get_attribute('aria-label')
 page.reload();page.get_by_test_id('battle-status').wait_for(state='attached');assert status()=='Coins 195; Heroes 1; Stage 1-1';assert count()==0
 revealImage=Image.open(out/'reveal.png').convert('RGB');ringPixels=sum(1 for y in range(524,601) for x in range(10,88) if 27**2<=(x-49)**2+(y-562)**2<=39**2 and (lambda r,g,b:g>r+20 and b>r+20 and g>130)(*revealImage.getpixel((x,y))));assert ringPixels>30,ringPixels
 changed=sum(max(v)>12 for v in ImageChops.difference(a,z).get_flattened_data());assert changed>100;assert not errors
 result={'status':'PASS','durationMs':650,'markerChangedPixels':changed,'visibleRevealRingPixels':ringPixels,'committedBeforeMotion':True,'secondMergeIntensity':cascade[0]['intensity'],'secondMergePitch':cascade[0]['pitch'],'cancelReconcilesTier3':True,'reloadPreservesGold195':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
