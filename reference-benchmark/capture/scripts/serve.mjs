import http from 'node:http';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),process.argv.includes('--offline')?'../../runtime/offline':'../../runtime/local');
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.wasm':'application/wasm','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.svg':'image/svg+xml','.plist':'application/xml','.bin':'application/octet-stream'};
http.createServer((req,res)=>{let file;try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep))throw new Error('unsafe');}catch{res.writeHead(400);res.end();return;}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not captured: '+new URL(req.url,'http://localhost').pathname);return;}
 const stat=fs.statSync(file);let start=0,end=stat.size-1,status=200;
 const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Access-Control-Allow-Origin':'*','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
 if(req.headers.range){const m=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);if(!m){res.writeHead(416);res.end();return;}start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end;if(start>end){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;}
 headers['Content-Length']=end-start+1;res.writeHead(status,headers);if(req.method==='HEAD'||stat.size===0)res.end();else fs.createReadStream(file,{start,end}).pipe(res);
}).listen(Number(process.env.PORT||8087),'127.0.0.1',()=>console.log(`Reference runtime:\nhttp://localhost:${process.env.PORT||8087}`));
