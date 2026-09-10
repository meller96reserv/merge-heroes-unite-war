"""Same owned hero through three slain bosses; exercise production Skia motion.

The core is stepped separately from the presentation clock: pixels alone cannot
stand in for damage, and continuing projectiles cannot stand in for hero motion.
"""
import base64,io,json,os
from datetime import datetime,timezone
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright

out=Path(os.environ.get('KISEL_MOTION_EVIDENCE_DIR','analysis/reports/motion/encounter-regression'))
out.mkdir(parents=True,exist_ok=True)
cases=[]
with sync_playwright() as p:
 b=p.chromium.launch()
 for tier,kind in [(1,'melee'),(2,'magic'),(3,'ranged')]:
  page=b.new_page(viewport={'width':430,'height':932});errors=[]
  page.on('pageerror',lambda _:errors.append('error'))
  page.clock.install();page.goto(f'http://localhost:8082/?fixture=combat-acceptance&tier={tier}&boss=1')
  page.get_by_test_id('combat-fixture-state').wait_for(state='attached');page.wait_for_timeout(1500)
  page.clock.pause_at(datetime.fromtimestamp((page.evaluate('Date.now()')+100)/1000,timezone.utc))
  cdp=page.context.new_cdp_session(page)
  def state():return json.loads(page.get_by_test_id('combat-fixture-state').get_attribute('aria-label'))
  def actor(side):return next(e for e in state()['combat']['encounter']['entities'] if e['side']==side)
  def step(n):
   for _ in range(n):page.get_by_test_id('step').dispatch_event('click')
  def capture(marker):
   page.wait_for_timeout(80)  # Flush scheduled RN/Skia work without advancing the paused clock.
   raw=base64.b64decode(cdp.send('Page.captureScreenshot',{'format':'png','captureBeyondViewport':False})['data'])
   # Hero only: excludes enemy, projectiles, damage labels and the control panel.
   frame=Image.open(io.BytesIO(raw)).convert('RGB').crop((0,345,125,465))
   # Retain six small review markers; full-screen captures are unnecessary output.
   if marker in ('2-attack-1-neutral','2-attack-1-100'):frame.save(out/f'{kind}-{marker}.png')
   return frame
  def changed(a,z):return sum(max(v)>12 for v in ImageChops.difference(a,z).get_flattened_data())
  for encounter in range(3):
   assert actor('hero')['id']=='hero' and actor('hero')['attackSequence']==0
   assert state()['combat']['encounter']['sequence']==encounter
   a=capture(f'{encounter}-entry');page.clock.run_for(80);a=capture(f'{encounter}-entry-80')
   page.clock.run_for(70);z=capture(f'{encounter}-entry-150');entry_pixels=changed(a,z)
   assert actor('enemy')['hp']==20 and actor('hero')['attackSequence']==0
   assert not state()['combat']['hits']
   page.clock.run_for(850)
   for attack in [1,2]:
    neutral=capture(f'{encounter}-attack-{attack}-neutral')
    step(20 if attack==1 else 17)
    assert actor('hero')['attackSequence']==attack
    assert actor('enemy')['hp']==(30-10*attack)
    assert len(state()['combat']['hits'])==1 and state()['projectedProjectiles']==1
    page.wait_for_timeout(80)
    motion_samples=[]
    for marker in [50,100,150]:
     page.clock.run_for(50);frame=capture(f'{encounter}-attack-{attack}-{marker}')
     motion_samples.append(changed(neutral,frame))
    pixels=max(motion_samples)
    assert actor('enemy')['hp']==(30-10*attack)
    step(3);assert actor('enemy')['hp']==20-10*attack
    page.clock.run_for(850)
    cases.append({'family':kind,'encounter':encounter,'attack':attack,'motionPixels':pixels,
     'entryMotionPixels':entry_pixels,'motionSamples':motion_samples,'coreDamageAtScheduledTick':True,'runtimeErrors':len(errors)})
   assert actor('enemy')['hp']==0 and state()['combat']['waiting']
   if encounter<2:page.get_by_test_id('next-encounter').dispatch_event('click')
  assert not errors
  page.close()
 b.close()
result={'status':'PASS' if len(cases)==18 and all(c['motionPixels']>1000 and c['entryMotionPixels']<1000 for c in cases) else 'FAIL',
 'cases':cases,'native':'NOT_RUN','oracle':'Hero-only >1000 changing pixels from idle within each attack; <1000 on encounter reset; core hit timing independent.'}
(out/'results.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result))
assert result['status']=='PASS','Attack motion must survive repeated encounter replacement without a reset strike'
