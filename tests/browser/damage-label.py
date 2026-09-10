from datetime import datetime,timezone
import json,base64
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/combat/browser')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('page'));page.clock.install();page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached');page.clock.pause_at(datetime.fromtimestamp(page.evaluate('Date.now()')/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
 def capture(name):
  shot=cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False});(out/name).write_bytes(base64.b64decode(shot['data']))
 for _ in range(50):
  page.clock.run_for(25)
  if 'Enemy health 30;' in page.get_by_test_id('battle-status').get_attribute('aria-label'):break
 else:raise AssertionError('Hit did not occur')
 page.clock.run_for(80);capture('damage-visible.png');page.clock.run_for(700);capture('damage-released.png')
 a=Image.open(out/'damage-visible.png').convert('RGB').crop((292,327,368,356));z=Image.open(out/'damage-released.png').convert('RGB').crop((292,327,368,356));changed=sum(max(v)>12 for v in ImageChops.difference(a,z).getdata());assert changed>40,changed;assert not errors
 result={'status':'PASS','exactDamage':10,'labelRiseAndReleaseChangedPixels':changed,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'damage-label.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
