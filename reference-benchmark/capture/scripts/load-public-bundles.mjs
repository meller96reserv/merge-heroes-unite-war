import {chromium} from 'playwright';
import fs from 'node:fs';
// Ordinary Cocos asset loading using explicit public build manifest names only.
// No guessed endpoints, debug bundle, scene creation, save edits or unlocks.
const endpoint=await (await fetch('http://127.0.0.1:9227/json/version')).json();
const browser=await chromium.connectOverCDP(endpoint.webSocketDebuggerUrl);
const cdp=await browser.newBrowserCDPSession();
const {targetInfos}=await cdp.send('Target.getTargets');
const target=targetInfos.find(t=>t.url.startsWith('https://files.crazygames.com/heroes-unite/'));
if(!target)throw new Error('Public game target missing');
const {sessionId}=await cdp.send('Target.attachToTarget',{targetId:target.targetId,flatten:false});
let seq=0;const awaiting=new Map();
cdp.on('Target.receivedMessageFromTarget',event=>{if(event.sessionId!==sessionId)return;const m=JSON.parse(event.message);if(awaiting.has(m.id)){awaiting.get(m.id)(m);awaiting.delete(m.id);}});
const frame={evaluate:async(fn,arg)=>{const id=++seq;const response=new Promise(resolve=>awaiting.set(id,resolve));await cdp.send('Target.sendMessageToTarget',{sessionId,message:JSON.stringify({id,method:'Runtime.evaluate',params:{expression:'('+fn.toString()+')('+JSON.stringify(arg??null)+')',awaitPromise:true,returnByValue:true}})});const r=await response;if(r.error||r.result?.exceptionDetails)throw new Error(JSON.stringify(r.error||r.result.exceptionDetails));return r.result.result.value;}};
// Cocos clears _CCSettings after boot. Read only explicit names from the response already captured.
const harRun=fs.readdirSync('capture/har',{withFileTypes:true}).filter(d=>d.isDirectory()&&!d.name.startsWith('local-')).map(d=>d.name).sort().at(-1);
let settings='';
const readline=await import('node:readline');
for await(const line of readline.createInterface({input:fs.createReadStream('capture/har/'+harRun+'/entries.jsonl')})){
 try{const e=JSON.parse(line);if(/files\.crazygames\.com\/heroes-unite\/[^/]+\/src\/settings\./.test(e.request.url)){settings=Buffer.from(e.response.content.text,'base64').toString();break;}}catch{}
}
const names=[...settings.matchAll(/\b([a-zA-Z0-9_]+):"[a-f0-9]{5}"/g)].map(m=>m[1]).filter(n=>!['main','internal','debug_scene'].includes(n));
if(!names.length)throw new Error('No explicit bundle manifest found; start the game through the public portal first.');
const report=[];
for(const name of names){
 const result=await frame.evaluate(async name=>{
  const start=performance.now();
  return await Promise.race([new Promise(resolve=>cc.assetManager.loadBundle(name,(err,bundle)=>{
   if(err){resolve({name,status:'FAILED',error:String(err).slice(0,180)});return;}
   bundle.loadDir('',(error,assets)=>resolve({name,status:error?'PARTIAL':'LOADED',assets:assets?.length||0,error:error?String(error).slice(0,180):null,elapsedMs:Math.round(performance.now()-start)}));
  })),new Promise(resolve=>setTimeout(()=>resolve({name,status:'TIMEOUT'}),25000))]);
 },name);
 report.push(result);fs.writeFileSync('capture/reports/public-bundle-load.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(result));
}
await browser.close();
