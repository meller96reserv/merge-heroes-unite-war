import json
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/combat/browser')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None)
 page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached');page.wait_for_timeout(350);page.screenshot(path=str(out/'enemy-alive.png'))
 page.wait_for_function('document.querySelector(\'[data-testid="battle-status"]\')?.getAttribute("aria-label").startsWith("Enemy health 30;")');page.wait_for_timeout(45);page.screenshot(path=str(out/'enemy-hit.png'))
 page.wait_for_function('document.querySelector(\'[data-testid="battle-status"]\')?.getAttribute("aria-label").startsWith("Enemy health 0;")');page.wait_for_timeout(450);page.screenshot(path=str(out/'enemy-released.png'))
 a=Image.open(out/'enemy-alive.png').convert('RGB').crop((258,300,420,470));z=Image.open(out/'enemy-released.png').convert('RGB').crop((258,300,420,470));changed=sum(max(v)>16 for v in ImageChops.difference(a,z).getdata());assert changed>1500,changed;assert not errors,len(errors)
 report={'status':'PASS','hpProjection':True,'hitAndDeathCaptured':True,'removedAfterFadeChangedPixels':changed,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'enemy.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report));b.close()
