"""Real Chromium IndexedDB adapter test, isolated temporary origin/database."""
import json, subprocess, tempfile, threading
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from playwright.sync_api import sync_playwright

with tempfile.TemporaryDirectory(prefix='kisel-idb-') as directory:
    root=Path(directory)
    script="const ts=require('typescript'),fs=require('fs');process.stdout.write(ts.transpileModule(fs.readFileSync('app/src/platform/WebSaveStore.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);"
    (root/'adapter.js').write_bytes(subprocess.check_output(['node','-e',script]))
    (root/'index.html').write_text('<!doctype html><title>Save adapter verification</title>')
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self,*args):pass
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=directory));threading.Thread(target=server.serve_forever,daemon=True).start()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch();page=browser.new_page();page.goto(f'http://127.0.0.1:{server.server_port}')
            result=page.evaluate('''async()=>{
              const {WebSaveStore}=await import('/adapter.js');
              const bytes=(generation,value)=>JSON.stringify({payload:JSON.stringify({generation,value})});
              const a=new WebSaveStore(indexedDB,'isolated'),b=new WebSaveStore(indexedDB,'isolated');
              await a.writeCandidate('guest','B',bytes(1,'old'));await a.flush();await a.close();
              const reopen=await b.verifyCandidate('guest','B')===bytes(1,'old');
              await b.writeCandidate('guest','A',bytes(2,'new'));
              const isolated=(await b.readCandidates('another-account')).length===0;
              const quota=new WebSaveStore(indexedDB,'isolated',()=>{throw new DOMException('injected','QuotaExceededError');});
              let quotaRejected=false;try{await quota.writeCandidate('guest','B',bytes(3,'bad'));}catch{quotaRejected=true;}
              const oldPreserved=await b.verifyCandidate('guest','B')===bytes(1,'old');
              let staleRejected=false;try{await a.writeCandidate('guest','A',bytes(2,'stale'));}catch{staleRejected=true;}
              const newerPreserved=await b.verifyCandidate('guest','A')===bytes(2,'new');
              await a.close();await b.close();return {reopen,isolated,quotaRejected,oldPreserved,staleRejected,newerPreserved};
            }''')
            browser.close()
        assert all(result.values()),result
        result.update(status='PASS',platform='Chromium IndexedDB',native='NOT_RUN',physicalPowerLoss='NOT_RUN')
        Path('analysis/reports/save/indexeddb.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
    finally:server.shutdown();server.server_close()
