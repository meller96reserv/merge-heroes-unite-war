import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
process.chdir(root); process.umask(0o077);
const local=process.argv.includes('--local');
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const run=local?`local-${stamp}`:stamp;
const reports='capture/reports', harDir=`capture/har/${run}`;
fs.mkdirSync(harDir,{recursive:true});
const journal=fs.createWriteStream(`${harDir}/entries.jsonl`);
journal.setMaxListeners(0); // Many concurrent bodies can wait for the same drain event.
const records=[], failed=[], errors=[], operations=[]; const pending=new Set();
let requests=0, successes=0, excluded=0, closing=false;
const selectedHeaders=['content-type','content-length','content-encoding','cache-control','etag','last-modified','access-control-allow-origin','cross-origin-resource-policy'];
const safeUrl=s=>{try{const u=new URL(s); for(const k of u.searchParams.keys())if(/token|auth|credential|signature|session|secret|key/i.test(k))u.searchParams.set(k,'REDACTED');u.hash='';return u.href}catch{return s}};
const browser=await chromium.launchPersistentContext(local?'capture/local-profile':'capture/profile',{
  channel:process.env.REFERENCE_BROWSER_CHANNEL||'chrome', headless:false,
  viewport:process.argv.includes('--mobile')?{width:411,height:914}:{width:1280,height:960}, deviceScaleFactor:process.argv.includes('--mobile')?2.625:1,
  ...(process.argv.includes('--mobile')?{isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 16; sdk_gphone64_arm64) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/151.0.7922.199 Mobile Safari/537.36'}:{}),
  args:['--remote-debugging-port=9227','--remote-debugging-address=127.0.0.1'],
  serviceWorkers:'allow'
});
const page=browser.pages()[0]||await browser.newPage();
function scope(req){
 let frame='';try{frame=req.frame().url()}catch{}
 const u=new URL(req.url());
 if(!['http:','https:'].includes(u.protocol))return 'excluded:non-http';
 if(/doubleclick|googlesyndication|google-analytics|analytics|adnxs|amazon-adsystem|pubmatic|rubiconproject|prebid|sentry|facebook|scorecardresearch/.test(u.hostname))return 'excluded:ads-telemetry';
 if(req.method()!=='GET')return 'metadata:non-get';
 if(!/^(www|builds|api|games|files|sdk|imgs)\.crazygames\.com$|^fonts\.(googleapis|gstatic)\.com$|^cdn\.privacy-mgmt\.com$|^(localhost|127\.0\.0\.1)$/.test(u.hostname))return 'excluded:unrelated-host';
 if(u.hostname==='imgs.crazygames.com'&&!u.pathname.includes('heroes-unite'))return 'excluded:unrelated-thumbnail';
 if(/localhost|127.0.0.1/.test(u.hostname))return 'local';
 if(u.href.includes('heroes-unite')||(/heroes-unite/.test(frame)&&!frame.startsWith('https://www.crazygames.com/')))return 'game';
 if(['script','stylesheet','font','document','manifest','worker'].includes(req.resourceType()))return 'host-dependency';
 if(/crazygames\.com$|crazygames\.net$/.test(u.hostname)&&['xhr','fetch'].includes(req.resourceType()))return 'host-config';
 return 'excluded:unrelated-portal';
}
browser.on('request',()=>requests++);
browser.on('requestfailed',req=>failed.push({url:safeUrl(req.url()),method:req.method(),type:req.resourceType(),error:req.failure()?.errorText,time:new Date().toISOString()}));
browser.on('response',response=>{
 const promise=(async()=>{
  const req=response.request();const category=scope(req);const status=response.status(); if(status>=200&&status<300)successes++;
  if(category.startsWith('excluded')){excluded++;return;}
  const u=new URL(req.url());const headers=await response.allHeaders();
  const rec={url:safeUrl(req.url()),hostname:u.hostname,pathname:u.pathname,method:req.method(),status,mime:headers['content-type']||'',resourceType:req.resourceType(),category,timestamp:new Date().toISOString(),headers:Object.fromEntries(selectedHeaders.filter(k=>headers[k]).map(k=>[k,headers[k]])),fromServiceWorker:response.fromServiceWorker()};
  records.push(rec);
  if(status<200||status>=300||category==='metadata:non-get'){rec.uncapturedReason='Non-success or non-GET: status/metadata only';return;}
  try{
   const body=await response.body();const hash=crypto.createHash('sha256').update(body).digest('hex');
   const dest=`capture/responses/sha256/${hash.slice(0,2)}/${hash}`;
   fs.mkdirSync(path.dirname(dest),{recursive:true});if(!fs.existsSync(dest))fs.writeFileSync(dest,body,{flag:'wx'});
   Object.assign(rec,{size:body.length,sha256:hash,capturedPath:dest});
   const entry={startedDateTime:rec.timestamp,time:0,request:{method:req.method(),url:rec.url,httpVersion:'HTTP/1.1',headers:[],queryString:[],cookies:[],headersSize:-1,bodySize:0},response:{status,statusText:response.statusText(),httpVersion:'HTTP/1.1',headers:Object.entries(rec.headers).map(([name,value])=>({name,value})),cookies:[],content:{size:body.length,mimeType:rec.mime,text:body.toString('base64'),encoding:'base64'},redirectURL:'',headersSize:-1,bodySize:body.length},cache:{},timings:{send:0,wait:0,receive:0},_resourceType:rec.resourceType,_scope:category,_timingsUnavailable:true};
   if(!journal.write(JSON.stringify(entry)+'\n'))await new Promise(resolve=>journal.once('drain',resolve));
  }catch(e){rec.uncapturedReason=String(e).slice(0,250)}
 })();pending.add(promise);promise.then(()=>pending.delete(promise),e=>{pending.delete(promise);errors.push({type:'response-capture',text:String(e).slice(0,250)});});
});
browser.on('page',p=>listen(p));
function listen(p){p.on('pageerror',e=>errors.push({type:'pageerror',text:String(e).slice(0,800),time:new Date().toISOString()}));p.on('console',m=>{if(m.type()==='error')errors.push({type:'console',text:safeUrl(m.text()).slice(0,800),time:new Date().toISOString()})});}
listen(page);
async function storage(){
 const inventories=[];
 for(const p of browser.pages())for(const f of p.frames())try{
  inventories.push(await f.evaluate(async()=>({origin:location.origin,url:location.href,localStorage:Object.fromEntries(Object.entries(localStorage)),sessionStorage:Object.fromEntries(Object.entries(sessionStorage)),indexedDB:await indexedDB.databases(),caches:await Promise.all((await caches.keys()).map(async name=>({name,urls:(await(await caches.open(name)).keys()).map(r=>r.url)}))),serviceWorkers:(await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,active:r.active?.scriptURL,waiting:r.waiting?.scriptURL}))})));
 }catch(e){inventories.push({url:safeUrl(f.url()),error:String(e).slice(0,150)})}
 fs.writeFileSync(`capture/storage/${run}-inventory.json`,JSON.stringify(inventories,null,2));
 await browser.storageState({path:`capture/storage/${run}-state.json`,indexedDB:true});
}
function summary(){
 const bodies=records.filter(r=>r.sha256),unique=new Map(bodies.map(r=>[r.sha256,r.size]));
 return{run,local,requests,successfulResponses:successes,resourcesCaptured:bodies.length,uniqueBodies:unique.size,uniqueBytes:[...unique.values()].reduce((a,b)=>a+b,0),excludedResponses:excluded,pending:pending.size,failedRequests:failed.length,uncapturedResponses:records.filter(r=>r.uncapturedReason).length,hosts:[...new Set(bodies.map(r=>r.hostname))]};
}
async function finalize(){
 if(closing)return;closing=true;
 const timeout=(ms)=>new Promise((_,reject)=>setTimeout(()=>reject(new Error('Timed out; retained profile remains available')),ms));
 await Promise.race([storage(),timeout(10000)]).catch(e=>errors.push({type:'storage',text:String(e)}));
 await Promise.race([Promise.allSettled([...pending]),timeout(5000)]).catch(()=>{});
 await browser.close().catch(()=>{});await Promise.allSettled([...pending]);
 await new Promise(r=>journal.end(r));
 const har=fs.createWriteStream(`${harDir}/heroes-unite-full.har`);
 har.write('{"log":{"version":"1.2","creator":{"name":"isolated-playwright-response-capture","version":"1"},"comment":"Scoped public response bodies. Request credentials/cookies omitted; timings unavailable (zero placeholders), excluded portal resources omitted.","entries":[');
 let first=true;for await(const line of readline.createInterface({input:fs.createReadStream(`${harDir}/entries.jsonl`)})){if(!har.write((first?'':',')+line))await new Promise(r=>har.once('drain',r));first=false;}
 await new Promise(r=>har.end(']}}',r));fs.unlinkSync(`${harDir}/entries.jsonl`);
 const data={...summary(),limitations:['Only exercised public GET responses; excluded unrelated portal/ads/telemetry. No request credentials in index/HAR.','Bodies are decoded browser bytes; content-encoding in headers describes original transport.','No brute-force source maps; guest storage is private local evidence.'],resources:records,failed,errors,operations};
 fs.writeFileSync(`${reports}/${run}-resource-index.json`,JSON.stringify(data,null,2));
 if(!local){fs.writeFileSync(`${reports}/resource-index.json`,JSON.stringify(data,null,2));fs.writeFileSync(`${reports}/CAPTURE_SUMMARY.md`,`# Public capture\n\n${JSON.stringify(summary(),null,2)}\n\nScope: target runtime and necessary loader/host scripts; unrelated recommendations/ads omitted.\nResponse bodies are decoded and deduplicated by SHA-256. Filtered HAR embeds base64 content, preserves navigation, omits credentials; timing fields are unavailable placeholders.\n\nSee resource-index.json for failed and uncaptured resources, MIME types and headers.\n`);}
 fs.writeFileSync(`${reports}/${local?'local-':'capture-'}session.json`,JSON.stringify({summary:summary(),errors,operations,failed},null,2));
 await browser.close();server.close();console.log(JSON.stringify({finalized:true,...summary()}));
}
async function command(c){
 const p=browser.pages().find(p=>p.url()!=='about:blank')||page;let result;
 if(c.op==='status')result={...summary(),url:safeUrl(p.url())};
 else if(c.op==='frames')result=p.frames().map(f=>({url:safeUrl(f.url()),name:f.name()}));
 else if(c.op==='text')result=(await p.locator('body').innerText()).slice(0,4000);
 else if(c.op==='snapshot'){const name=String(c.name||'latest').replace(/[^a-z0-9_-]/gi,'');const dest=`${reports}/${name}.png`;await p.screenshot({path:dest});result={path:dest};}
 else if(c.op==='click')await p.mouse.click(c.x,c.y);
 else if(c.op==='drag'){await p.mouse.move(c.x1,c.y1);await p.mouse.down();await p.mouse.move(c.x2,c.y2,{steps:20});await p.mouse.up();}
 else if(c.op==='key')await p.keyboard.press(c.key);
 else if(c.op==='goto')await p.goto(c.url,{waitUntil:'domcontentloaded',timeout:60000});
 else if(c.op==='note')result={coverage:c.text};
 else if(c.op==='storage')await storage();
 else if(c.op==='stop'){setTimeout(()=>finalize().catch(e=>console.error(String(e))),100);return{stopping:true};}
 else throw new Error('Unsupported command');
 if(!['status','text','frames'].includes(c.op))operations.push({time:new Date().toISOString(),command:c,result});
 return result??{ok:true};
}
const server=http.createServer(async(req,res)=>{
 if(req.method!=='POST'){res.writeHead(405);res.end();return;}
 let body='';for await(const part of req){body+=part;if(body.length>8192){res.writeHead(413);res.end();return;}}
 try{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(await command(JSON.parse(body))))}catch(e){res.statusCode=500;res.end(JSON.stringify({error:String(e)}))}
});
server.listen(8091,'127.0.0.1');
process.on('SIGINT',()=>finalize());process.on('SIGTERM',()=>finalize());
await page.goto(local?'http://localhost:8087':process.env.REFERENCE_URL||'https://www.crazygames.com/game/heroes-unite',{waitUntil:'domcontentloaded',timeout:60000}).catch(e=>console.log(JSON.stringify({navigationError:String(e).slice(0,200)})));
console.log(JSON.stringify({ready:true,control:'http://127.0.0.1:8091',profile:local?'capture/local-profile':'capture/profile',run}));
