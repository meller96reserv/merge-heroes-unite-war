import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');process.chdir(root);
const index=JSON.parse(fs.readFileSync('capture/reports/resource-index.json','utf8'));
const resources=index.resources.filter(r=>r.sha256);
const entry=resources.find(r=>r.hostname==='files.crazygames.com'&&/\/heroes-unite\/[^/]+\/index.html$/.test(r.pathname));
if(!entry)throw new Error('No captured public game entry. Run capture and start the game first.');
const base=entry.pathname.slice(0,entry.pathname.lastIndexOf('/')+1);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const safe=(base,p)=>{const result=path.resolve(base,p);if(!result.startsWith(path.resolve(base)+path.sep))throw new Error('Unsafe resource path');return result;};
const mapping=[],maps=[],written=new Map();let copied=0;
for(const r of resources){
 const file=r.pathname.endsWith('/')?r.pathname+'index.html':r.pathname;
 const suffix=new URL(r.url).search?'__q_'+hash(Buffer.from(new URL(r.url).search)).slice(0,12):'';
 const original=`runtime/original/${r.hostname}${file}${suffix}__${r.sha256.slice(0,12)}`;
 const originalPath=safe('runtime/original',original.slice('runtime/original/'.length));
 const body=fs.readFileSync(r.capturedPath);if(hash(body)!==r.sha256)throw new Error('Capture hash mismatch');
 fs.mkdirSync(path.dirname(originalPath),{recursive:true});
 if(fs.existsSync(originalPath)){if(hash(fs.readFileSync(originalPath))!==r.sha256)throw new Error('Original conflict: retain old capture; use a new capture workspace/version');}
 else {fs.copyFileSync(r.capturedPath,originalPath,fs.constants.COPYFILE_EXCL);fs.chmodSync(originalPath,0o444);}
 let local=null;
 if(r.hostname==='files.crazygames.com'&&r.pathname.startsWith(base))local='runtime/local/'+r.pathname.slice(base.length);
 if(r.hostname==='sdk.crazygames.com'&&r.pathname==='/crazygames-sdk-v3.js')local='runtime/local/vendor/crazygames-sdk-v3.js';
 if(local && written.has(local) && written.get(local)!==r.sha256)local=null;
 if(local){written.set(local,r.sha256);const dest=safe('runtime/local',local.slice('runtime/local/'.length));fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(originalPath,dest);fs.chmodSync(dest,0o644);copied++;}
 mapping.push({url:r.url,sha256:r.sha256,captured:r.capturedPath,original,local,size:r.size,mime:r.mime});
 if(/javascript/.test(r.mime)||r.pathname.endsWith('.js'))for(const m of body.toString('utf8').matchAll(/[#@]\s*sourceMappingURL=([^\s*]+)/g)){const url=new URL(m[1],r.url).href;maps.push({script:r.url,declaration:m[1],url,publiclyReceived:resources.some(x=>x.url===url)});}
}
let html=fs.readFileSync('runtime/local/index.html','utf8');
html=html.replace('https://sdk.crazygames.com/crazygames-sdk-v3.js','benchmark-portal.js');
fs.copyFileSync('capture/scripts/benchmark-portal.js','runtime/local/benchmark-portal.js');
fs.writeFileSync('runtime/local/index.html',html);
fs.writeFileSync('runtime/resource-map.json',JSON.stringify({capturedAt:index.run,gameBaseUrl:`https://files.crazygames.com${base}`,entry:entry.url,mapping},null,2));
fs.writeFileSync('capture/reports/source-maps.json',JSON.stringify(maps,null,2));
if(!fs.existsSync('runtime/LOCAL_PATCHES.md'))fs.writeFileSync('runtime/LOCAL_PATCHES.md',`# Local patch ledger\n\nBuild ${base}; source capture ${index.run}. Original files are byte-identical, checked by SHA-256, read-only copies. Local files are independent copies; no hardlinks to original.\n\n| File | Original | Local modification / reason | Gameplay | Benchmark effect |\n|---|---|---|---|---|\n| Directory layout | Public files.crazygames.com${base} | Served as local HTTP root; original relative paths retained | No intended change | Local asset I/O replaces CDN latency; startup timings are not public-network startup |\n| index.html | Remote CrazyGames SDK script | benchmark-portal.js reports SDK disabled; captured original SDK remains archived | No gameplay/reward mutations; plugin uses built-in public guest fallback | Removes SDK mock authenticated user, ads, telemetry, portal/cloud/social host overhead. Public guest backend still required |\n\nRuntime adaptation status is recorded in capture/reports/LOCAL_VERIFICATION.md. No economy, progression, combat, rewards, renderer or effects changed.\n`);
console.log(JSON.stringify({localResources:copied,originalResources:mapping.length,sourceMapDeclarations:maps.length,entry:'http://localhost:8087'}));
