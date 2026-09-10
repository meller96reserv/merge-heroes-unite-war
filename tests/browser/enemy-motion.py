from datetime import datetime,timezone
import json,base64,hashlib
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/motion/enemy');out.mkdir(parents=True,exist_ok=True);results=[];hashes={}
with sync_playwright() as p:
 b=p.chromium.launch()
 for boss in [False,True]:
  for mode in ['full','reduced']:
   label=f'{"boss" if boss else "enemy"}-{mode}';page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.clock.install();page.goto(f'http://localhost:8082/?fixture=combat-acceptance&boss={int(boss)}&mode={mode}');page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(1500);page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+1000)/1000,timezone.utc));cdp=page.context.new_cdp_session(page)
   def capture(marker):
    path=out/f'{label}-{marker}.png';path.write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));return Image.open(path).convert('RGB').crop((260,300,420,465))
   def state():return json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'))
   page.get_by_test_id('restart-presentation').dispatch_event('click');page.clock.run_for(70 if mode=='reduced' else 450 if boss else 140);capture('intro');page.clock.run_for(1000);alive=capture('alive')
   for _ in range(23):page.get_by_test_id('step').dispatch_event('click')
   page.clock.run_for(50);capture('hit');page.clock.run_for(800)
   for _ in range(20):page.get_by_test_id('step').dispatch_event('click')
   assert state()['combat']['encounter']['entities'][1]['hp']==0;page.clock.run_for(70 if mode=='reduced' else 300 if boss else 100);capture('death');page.clock.run_for(1000);dead=capture('released')
   changed=sum(max(v)>12 for v in ImageChops.difference(alive,dead).get_flattened_data());assert changed>1000
   digest=hashlib.sha256(json.dumps(state()['combat'],sort_keys=True).encode()).hexdigest()
   if boss in hashes:assert hashes[boss]==digest
   hashes[boss]=digest;assert not errors
   results.append({'kind':'boss' if boss else 'enemy','mode':mode,'status':'PASS','deathReleasedChangedPixels':changed,'coreHash':digest,'runtimeErrors':len(errors)});page.close()
 b.close()
(out/'results.json').write_text(json.dumps({'status':'PASS','cases':results,'native':'NOT_RUN'},indent=2)+'\n');print(json.dumps({'status':'PASS','cases':len(results)}))
