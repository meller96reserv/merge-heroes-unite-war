#!/usr/bin/env python3
"""Read/capture public reference pages in a fresh, isolated browser profile.
JSON-line commands: snapshot, click(x,y), wait(ms<=10000), frames, text, goto(url).
Never records cookies, auth headers, bundled source code or proprietary audio.
"""
import argparse,json,sys,time
from pathlib import Path
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', default='analysis/reference')
parser.add_argument('--profile', help='Optional isolated development profile; keep it Git-ignored')
args=parser.parse_args()
out=Path(args.output);(out/'screenshots').mkdir(parents=True,exist_ok=True)
with sync_playwright() as p:
    options=dict(viewport={'width':1440,'height':1000},record_video_dir=str(out/'videos'),record_video_size={'width':1440,'height':1000})
    launch=dict(headless=True,executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',args=['--autoplay-policy=no-user-gesture-required'])
    if args.profile:
        context=p.chromium.launch_persistent_context(args.profile,**launch,**options);browser=None
    else:
        browser=p.chromium.launch(**launch);context=browser.new_context(**options)
    page=context.new_page();start=time.monotonic()
    for line in sys.stdin:
        try:
            c=json.loads(line);op=c['op'];result=None
            if op=='goto':page.goto(c['url'],wait_until='domcontentloaded',timeout=60000);result={'title':page.title()}
            elif op=='wait':page.wait_for_timeout(min(c.get('ms',1000),10000))
            elif op=='click':page.mouse.click(c['x'],c['y'])
            elif op=='drag':
                page.mouse.move(c['x1'],c['y1']);page.mouse.down();page.mouse.move(c['x2'],c['y2'],steps=20);page.mouse.up()
            elif op=='hold':
                page.mouse.move(c['x'],c['y']);page.mouse.down();page.wait_for_timeout(min(c.get('ms',1000),10000));page.mouse.up()
            elif op=='key':page.keyboard.press(c['key'])
            elif op=='snapshot':
                path=out/'screenshots'/(c['name']+'.png');page.screenshot(path=str(path));result={'screenshot':str(path)}
            elif op=='frames':result=[{'url':f.url,'name':f.name} for f in page.frames]
            elif op=='text':result=page.inner_text('body')[:20000]
            elif op=='stop':break
            else:raise ValueError('Unsupported read/capture command')
            entry={'elapsedSeconds':round(time.monotonic()-start,3),'command':c,'result':result}
            with (out/'browser_session.jsonl').open('a') as f:f.write(json.dumps(entry,ensure_ascii=False)+'\n')
            print(json.dumps(entry,ensure_ascii=False),flush=True)
        except Exception as e:print(json.dumps({'error':str(e)}),flush=True)
    context.close()
    if browser:browser.close()
