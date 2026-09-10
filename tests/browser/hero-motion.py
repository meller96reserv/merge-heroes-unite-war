from datetime import datetime,timezone
import json,base64
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/motion/hero');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install();page.goto('http://localhost:8082/?fixture=hero-motion');page.get_by_test_id('hero-motion-ready').wait_for(state='attached');page.wait_for_timeout(2200);page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
 def capture(name):
  path=out/(name+'.png');path.write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));return Image.open(path).convert('RGB')
 page.get_by_test_id('restart-motion').dispatch_event('click');page.clock.run_for(120);capture('spawn-overshoot');page.clock.run_for(180);a=capture('grounded');page.clock.run_for(800);z=capture('breath')
 differences=[];footDrift=[]
 for i in range(10):
  x=15+(i%3)*140;y=20+(i//3)*190;diff=ImageChops.difference(a.crop((x,y,x+110,y+150)),z.crop((x,y,x+110,y+150)));changed=sum(max(v)>12 for v in diff.get_flattened_data());assert changed>20,(i,changed);differences.append(changed)
  def foot(im):return max(dy for dy in range(100,150) for dx in range(110) if sum(im.getpixel((x+dx,y+dy)))>300)
  drift=foot(z)-foot(a);assert abs(drift)<=(2 if i==7 else 1),(i,drift);footDrift.append(drift)
 page.get_by_test_id('reduce-motion').dispatch_event('click');page.clock.run_for(400);r=capture('reduced');page.clock.run_for(1000);s=capture('reduced-stable');assert ImageChops.difference(r.crop((0,0,430,800)),s.crop((0,0,430,800))).getbbox() is None;assert not errors
 result={'status':'PASS','families':10,'idleChangedPixels':differences,'footPixelDrift':footDrift,'groundedTolerancePx':1,'fairyHoverTolerancePx':2,'reducedMotionStable':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
