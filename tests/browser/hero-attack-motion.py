from datetime import datetime,timezone
import json,base64
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/motion/attack');out.mkdir(parents=True,exist_ok=True)
results=[]
with sync_playwright() as p:
 b=p.chromium.launch()
 for tier,kind in [(1,'melee'),(2,'magic'),(3,'ranged')]:
  page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install();page.goto(f'http://localhost:8082/?fixture=combat-acceptance&tier={tier}');page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(1500);page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
  def state():return json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'))
  def capture(marker):
   path=out/f'{kind}-{marker}.png';path.write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));return Image.open(path).convert('RGB').crop((0,345,125,465))
  for _ in range(20):page.get_by_test_id('step').dispatch_event('click')
  page.clock.run_for(80);a=capture('anticipation');assert state()['combat']['encounter']['entities'][1]['hp']==20
  page.clock.run_for(70);z=capture('release');assert state()['combat']['encounter']['entities'][1]['hp']==20
  for _ in range(3):page.get_by_test_id('step').dispatch_event('click')
  assert state()['combat']['encounter']['entities'][1]['hp']==10;page.clock.run_for(160);capture('settled')
  changed=sum(max(v)>12 for v in ImageChops.difference(a,z).get_flattened_data());assert changed>100;assert not errors
  results.append({'kind':kind,'status':'PASS','anticipationToReleasePixels':changed,'releaseMarkerMs':150,'damageOnlyAfterCoreStep':True,'runtimeErrors':len(errors)});page.close()
 b.close()
(out/'results.json').write_text(json.dumps({'status':'PASS','cases':results,'native':'NOT_RUN'},indent=2)+'\n');print(json.dumps({'status':'PASS','cases':len(results)}))
