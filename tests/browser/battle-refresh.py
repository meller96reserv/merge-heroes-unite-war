from pathlib import Path
from playwright.sync_api import sync_playwright
import json,time
source=Path('app/src/components/Hud.tsx');original=source.read_text();out=Path('analysis/reports/battle-screen')
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});navigations=[];page.on('framenavigated',lambda f:navigations.append(f.url) if f==page.main_frame else None)
 try:
  page.goto('http://localhost:8082/?fixture=figma-battle-10');page.get_by_test_id('battle-screen').wait_for();page.wait_for_timeout(2200);page.get_by_role('button',name='Settings',exact=True).click();before=page.screenshot(clip={'x':75,'y':160,'width':90,'height':28});count=len(navigations)
  source.write_text(original.replace('text="STAGE"','text="STAGE!"'));deadline=time.monotonic()+20
  while time.monotonic()<deadline:
   page.wait_for_timeout(250)
   if page.screenshot(clip={'x':75,'y':160,'width':90,'height':28})!=before:break
  else:raise AssertionError('No visual Fast Refresh update')
  assert page.get_by_role('button',name='Back to battle').is_visible();assert len(navigations)==count;assert page.locator('canvas').count()==1
  (out/'fast-refresh.json').write_text(json.dumps({'status':'PASS','changedComponent':'Hud.tsx','visibleSkiaTextUpdated':True,'modalStatePreserved':True,'fullNavigationsDuringEdit':0,'canvasCount':1},indent=2)+'\n')
 finally:
  source.write_text(original);page.wait_for_timeout(700);b.close()
