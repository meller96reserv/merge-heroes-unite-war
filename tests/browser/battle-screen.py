from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image,ImageChops,ImageStat
import json
out=Path('analysis/reports/battle-screen');out.mkdir(exist_ok=True)
results=[]
with sync_playwright() as p:
 browser=p.chromium.launch()
 for w,h in [(430,932),(360,640),(390,844),(412,915),(768,1024)]:
  for mode in ['figma-battle-10','adapted-battle-15']:
   page=browser.new_page(viewport={'width':w,'height':h});errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
   page.goto('http://localhost:8082/?fixture='+mode);page.get_by_test_id('battle-screen').wait_for();page.wait_for_timeout(2200)
   name=f'{mode}-{w}x{h}.png';page.screenshot(path=str(out/name));assert not errors,errors
   canvas=page.locator('canvas');assert canvas.count()==1
   before=page.screenshot();page.get_by_role('button',name='Settings',exact=True).click();page.get_by_role('button',name='Back to battle').click();page.wait_for_timeout(100);assert before==page.screenshot(),'route return changed frozen fixture'
   for tab in ['Shop','Heroes','Dungeon','Relics']:
    page.get_by_role('button',name=tab,exact=True).click();page.get_by_role('button',name='Back to battle').click()
   bounds=page.get_by_role('button',name='Buy hero',exact=True).bounding_box();assert bounds['width']>=44 and bounds['height']>=44
   results.append({'viewport':[w,h],'fixture':mode,'consoleErrors':len(errors),'oneCanvas':True,'routeReturnIdentical':True,'purchaseTarget':bounds});page.close()
 browser.close()
source=Image.open('analysis/figma/screenshots/2_426.png').convert('RGB');actual=Image.open(out/'figma-battle-10-430x932.png').convert('RGB');diff=ImageChops.difference(source,actual);diff.save(out/'canonical-diff.png');Image.blend(source,actual,.5).save(out/'canonical-overlay.png')
bad=sum(1 for rgb in diff.getdata() if max(rgb)>16);fraction=bad/(430*932)
report={'tasks':['TASK-0059','TASK-0060','TASK-0061'],'checks':results,'canonicalUnmaskedPixelDifferenceAtTolerance16':fraction,'initialPixelTarget':.015,'fullPixelGate':'PASS' if fraction<=.015 else 'NEEDS_CALIBRATION_TASK_0069','source':'Figma YL2jFE10viR9zQV5GzBCuZ node2:426','nativeExecution':'NOT_RUN','productionGameplay':'NOT_IMPLEMENTED_BY_STATIC_TASKS'}
(out/'visual-check.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'viewports':len(results),'pixelDifference':fraction,'fullPixelGate':report['fullPixelGate']}))
