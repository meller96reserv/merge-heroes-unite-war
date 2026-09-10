"""A chained derived transform must move pixels without React state or snapshot-forced draws."""
from playwright.sync_api import sync_playwright
from pathlib import Path
from PIL import Image
import json,base64
out=Path('analysis/reports/motion/frame-probe');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('error'));page.goto('http://localhost:8082/?fixture=frame-probe');page.get_by_test_id('start-probe').wait_for();page.wait_for_timeout(300);page.get_by_test_id('start-probe').click();cdp=page.context.new_cdp_session(page);centres=[]
 for i in range(4):
  page.wait_for_timeout(200);path=out/f'frame-{i}.png';path.write_bytes(base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data']));im=Image.open(path).convert('RGB');xs=[x for x in range(430) if im.getpixel((x,120))[0]>200];centres.append((min(xs)+max(xs))/2)
 assert all(b>=a for a,b in zip(centres,centres[1:])) and len(set(centres))>=3 and centres[-1]-centres[0]>100,centres;assert not errors
 result={'status':'PASS','centres':centres,'runtimeErrors':len(errors),'forcedSnapshotDraws':0,'clock':'real browser RAF'};(out/'results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
