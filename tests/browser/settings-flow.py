"""One real Settings/audio UI milestone: controls, durable restart and permission gating."""
import json,os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chromium');context=browser.new_context(viewport={'width':430,'height':932});page=context.new_page();errors=[]
 page.on('pageerror',lambda _e:errors.append(1));page.on('console',lambda m:errors.append(1) if m.type=='error' else None)
 page.goto(os.environ.get('KISEL_WEB_URL','http://127.0.0.1:8082'));page.get_by_test_id('game-status').wait_for(timeout=60000)
 def open_settings():
  page.get_by_role('button',name='Settings',exact=True).click();page.get_by_test_id('settings-screen').wait_for();page.wait_for_timeout(350)
 def value(name,v):page.wait_for_function("([name,v])=>document.querySelector('[data-testid=settings-'+name+']')?.getAttribute('aria-valuenow')===v",arg=[name,str(v)])
 def checked(name,v):page.wait_for_function("([name,v])=>document.querySelector('[data-testid=settings-'+name+']')?.getAttribute('aria-checked')===v",arg=[name,str(v).lower()])
 open_settings();music=page.get_by_test_id('settings-music');r=music.bounding_box();page.mouse.click(r['x']+7,r['y']+22);value('music',0)
 sound=page.get_by_test_id('settings-sound');sound.focus();sound.press('Home');value('sound',0);sound.press('ArrowRight');value('sound',10)
 page.get_by_test_id('settings-haptics').click();checked('haptics',False)
 page.get_by_role('button',name='Full settings',exact=True).click();page.wait_for_function("document.querySelector('[data-testid=settings-screen]')?.getAttribute('aria-label')==='Settings full'")
 value('music',0);page.get_by_role('button',name='Terms of Use',exact=True).click();page.get_by_role('alert').wait_for()
 page.get_by_role('button',name='Back from settings',exact=True).click();page.get_by_role('button',name='Close settings',exact=True).click();page.get_by_test_id('settings-screen').wait_for(state='detached')
 page.get_by_role('button',name='Buy hero',exact=True).click();page.wait_for_function("document.querySelector('[data-testid=board-slot-1]')?.getAttribute('aria-label')?.includes('level 1')")
 page.reload();page.get_by_test_id('game-status').wait_for();open_settings();value('music',0);value('sound',10);checked('haptics',False)
 context.grant_permissions([],origin=page.url.split('?')[0].rstrip('/'));page.get_by_test_id('settings-notifications').click();page.get_by_role('alert').wait_for();checked('notifications',False)
 context.grant_permissions(['notifications'],origin=page.url.split('?')[0].rstrip('/'));page.wait_for_function("Notification.permission==='granted'",timeout=5000);page.get_by_test_id('settings-notifications').click();checked('notifications',True)
 page.reload();page.get_by_test_id('game-status').wait_for();open_settings();checked('notifications',True)
 context.clear_permissions();page.evaluate("window.dispatchEvent(new Event('focus'))");checked('notifications',False)
 if page.get_by_test_id('audio-status').count():
  page.wait_for_function("JSON.parse(document.querySelector('[data-testid=audio-status]').getAttribute('aria-label')).musicGain===0")
 assert not errors,{'appErrors':len(errors)}
 print(json.dumps({'status':'PASS','figmaVariantsReachable':2,'pointerAndKeyboardVolume':'PASS','savedMuteAndVibration':'PASS','notificationDeniedGrantedRevoked':'PASS','legalUnconfiguredFallback':'PASS','returnToPlayableBattle':'PASS','appErrors':0}))
 browser.close()
