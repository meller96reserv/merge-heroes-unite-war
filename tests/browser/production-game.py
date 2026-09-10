"""Serve the exported Expo application: no dev fixture and no alternative web game."""
import os
import json,threading
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from playwright.sync_api import sync_playwright
out=Path(os.environ.get('KISEL_MOTION_EVIDENCE_DIR','analysis/reports/stages/browser'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory='dist'));threading.Thread(target=server.serve_forever,daemon=True).start()
try:
 with sync_playwright() as p:
  b=p.chromium.launch();page=b.new_page(viewport={'width':430,'height':932});errors=[];page.on('pageerror',lambda _:errors.append('page'));page.on('console',lambda m:errors.append('console') if m.type=='error' else None)
  page.goto(f'http://127.0.0.1:{server.server_port}/?fixture=figma-battle-10');page.get_by_test_id('stage-status').wait_for(state='attached');assert 'Stage 1-1;' in page.get_by_test_id('stage-status').get_attribute('aria-label');assert page.locator('canvas').count()==1
  page.wait_for_function('document.querySelector(\'[data-testid="stage-status"]\')?.getAttribute("aria-label").startsWith("Stage 1-2;")')
  page.get_by_role('button',name='Buy hero',exact=True).click();page.wait_for_function('document.querySelector(\'[data-testid="board-slot-1"]\')?.getAttribute("aria-label").includes("level 1")')
  def center(i):
   r=page.get_by_test_id(f'board-slot-{i}').bounding_box();return r['x']+r['width']/2,r['y']+20
  page.mouse.move(*center(1));page.mouse.down();page.mouse.move(*center(0),steps=20);page.mouse.up();page.wait_for_function('document.querySelector(\'[data-testid="board-slot-0"]\')?.getAttribute("aria-label").includes("level 2")');page.wait_for_timeout(500);page.screenshot(path=str(out/'production-live.png'));assert not errors,len(errors)
  result={'status':'PASS','build':'Expo production Web export','fixtureQueryIgnored':True,'sharedSkiaCanvas':True,'autoBattleStageProgression':True,'buyAndDragMerge':True,'runtimeErrors':len(errors),'native':'NOT_RUN'};(out/'production-game.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result));b.close()
finally:server.shutdown();server.server_close()
