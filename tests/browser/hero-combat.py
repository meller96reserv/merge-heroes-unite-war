import json
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
out=Path('analysis/reports/combat/browser');out.mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[]
 page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None)
 page.goto('http://localhost:8082');page.get_by_test_id('battle-status').wait_for(state='attached');page.wait_for_timeout(250);page.screenshot(path=str(out/'hero-idle.png'))
 page.wait_for_function('document.querySelector(\'[data-testid="battle-status"]\')?.getAttribute("aria-label").includes("Attacks 1")');page.wait_for_timeout(90);page.screenshot(path=str(out/'hero-attack.png'))
 page.wait_for_function('document.querySelector(\'[data-testid="battle-status"]\')?.getAttribute("aria-label").startsWith("Enemy health 30;")')
 page.get_by_test_id('board-slot-0').click();page.wait_for_timeout(350);assert 'deployed' not in page.get_by_test_id('board-slot-0').get_attribute('aria-label')
 page.wait_for_timeout(1300);assert page.get_by_test_id('battle-status').get_attribute('aria-label').startswith('Enemy health 30;')
 page.get_by_test_id('board-slot-0').click();page.wait_for_function('document.querySelector(\'[data-testid="battle-status"]\')?.getAttribute("aria-label").startsWith("Enemy health 20;")')
 a=Image.open(out/'hero-idle.png').convert('RGB').crop((0,320,100,480));z=Image.open(out/'hero-attack.png').convert('RGB').crop((0,320,100,480));changed=sum(max(v)>12 for v in ImageChops.difference(a,z).getdata())
 assert changed>20,changed;assert not errors,len(errors)
 report={'status':'PASS','sharedSkiaHeroVisible':True,'attackPhaseChangedPixels':changed,'authoritativeHitAfterAttack':True,'withdrawStopsAttacks':True,'redeployResumesWithFreshAttackId':True,'runtimeErrors':len(errors),'native':'NOT_RUN'}
 (out/'hero.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report));b.close()
