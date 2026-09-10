"""Reward UI controllers retry actual IndexedDB writes without replaying video."""
import json, subprocess, tempfile, threading
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from playwright.sync_api import sync_playwright
with tempfile.TemporaryDirectory(prefix='kisel-rewarded-retry-') as directory:
    script="require('esbuild').buildSync({entryPoints:['tests/browser/rewarded-retry.ts'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:process.argv[1]});"
    subprocess.run(['node','-e',script,str(Path(directory)/'check.js')],check=True)
    (Path(directory)/'index.html').write_text('<!doctype html><title>Reward retry</title>')
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=directory));threading.Thread(target=server.serve_forever,daemon=True).start()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch();page=browser.new_page();page.goto(f'http://127.0.0.1:{server.server_port}')
            result=page.evaluate("async()=>await(await import('/check.js')).verifyRewardedRetry()")
            browser.close();print(json.dumps(result))
    finally:server.shutdown();server.server_close()
