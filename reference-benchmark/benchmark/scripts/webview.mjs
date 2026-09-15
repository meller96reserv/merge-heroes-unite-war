import WebSocket from 'ws';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
const adbArgs=process.env.ANDROID_SERIAL?['-s',process.env.ANDROID_SERIAL]:[];
const sockets=execFileSync('adb',[...adbArgs,'shell','cat','/proc/net/unix'],{encoding:'utf8'});
const packageId=process.env.REFERENCE_PACKAGE||'com.kisel.referencebenchmark.offline';
const pid=execFileSync('adb',[...adbArgs,'shell','pidof',packageId],{encoding:'utf8'}).trim().split(/\s+/)[0];
if(!sockets.includes('webview_devtools_remote_'+pid))throw new Error('Reference WebView not yet available');
execFileSync('adb',[...adbArgs,'forward','tcp:9228','localabstract:webview_devtools_remote_'+pid]);
const targets=await(await fetch('http://127.0.0.1:9228/json/list')).json();
const target=targets.find(t=>t.url.startsWith('https://appassets.androidplatform.net'));
if(!target)throw new Error('Reference WebView target missing; refresh adb forward after restart');
const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let id=0;const requests=new Map();
const observations=[];const urls=new Map();
ws.onmessage=event=>{const m=JSON.parse(event.data);
if(m.method==='Network.requestWillBeSent'){try{const u=new URL(m.params.request.url);urls.set(m.params.requestId,u.origin+u.pathname);}catch{}}
if(m.method==='Network.responseReceived')observations.push({kind:'response',url:urls.get(m.params.requestId),status:m.params.response.status,type:m.params.type});
if(m.method==='Network.loadingFailed')observations.push({kind:'failed',url:urls.get(m.params.requestId),error:m.params.errorText,cors:m.params.corsErrorStatus});
if(m.method==='Runtime.exceptionThrown')observations.push({kind:'exception',text:m.params.exceptionDetails.text});
if(m.id&&requests.has(m.id)){requests.get(m.id)(m);requests.delete(m.id)}};
async function send(method,params){const n=++id;const done=new Promise(resolve=>requests.set(n,resolve));ws.send(JSON.stringify({id:n,method,params}));return done;}
if(process.argv[2]==='--observe'){await send('Network.enable',{});await send('Runtime.enable',{});await send('Page.reload',{});await new Promise(r=>setTimeout(r,18000));fs.writeFileSync('capture/reports/android-network-smoke.json',JSON.stringify(observations,null,2));console.log(JSON.stringify({total:observations.length,failedResponseCount:observations.filter(o=>o.kind!=='response'||o.status>=400).length,uniqueFailedPaths:[...new Set(observations.filter(o=>o.status>=400).map(o=>o.url))].length,remote:observations.filter(o=>o.url&&!o.url.startsWith('https://appassets.androidplatform.net')).slice(-15)}));ws.close();process.exit(0);}
const expression=process.argv[2]||`JSON.stringify({url:location.href,ready:document.readyState,scene:window.cc?.director?.getScene()?.name,canvas:[...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height})),resources:performance.getEntriesByType('resource').slice(-8).map(r=>({name:r.name.split('?')[0],duration:Math.round(r.duration),bytes:r.transferSize}))})`;
const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});console.log(result.result?.result?.value??JSON.stringify(result));ws.close();
