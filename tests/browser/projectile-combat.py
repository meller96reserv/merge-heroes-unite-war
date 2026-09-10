from datetime import datetime,timezone
import json,base64
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/combat/browser')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None)
 page.clock.install();page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp(page.evaluate('Date.now()')/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
 def capture(name):
  shot=cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False});(out/name).write_bytes(base64.b64decode(shot['data']))
 capture('projectile-before.png')
 for _ in range(45):
  page.clock.run_for(25)
  if 'Attacks 1' in page.get_by_test_id('battle-status').get_attribute('aria-label'):break
 else:raise AssertionError('First attack did not start')
 page.clock.run_for(50);assert 'Enemy health 40;' in page.get_by_test_id('battle-status').get_attribute('aria-label');capture('projectile-travel.png')
 page.clock.run_for(150);assert 'Enemy health 30;' in page.get_by_test_id('battle-status').get_attribute('aria-label')
 before=Image.open(out/'projectile-before.png').convert('RGB').crop((110,350,255,445));after=Image.open(out/'projectile-travel.png').convert('RGB').crop((110,350,255,445));changed=sum(max(v)>12 for v in ImageChops.difference(before,after).getdata());assert changed>20,changed;assert not errors,len(errors)
 result={'status':'PASS','visibleTravelChangedPixels':changed,'damageFollowsDomainHit':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'projectile.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
