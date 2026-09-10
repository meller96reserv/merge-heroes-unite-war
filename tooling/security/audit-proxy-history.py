#!/usr/bin/env python3
"""Exact-value audit using ambient proxy configuration; never print credential bytes."""
import os,base64,subprocess,urllib.parse,json,sys
repo=sys.argv[1] if len(sys.argv)>1 else '.'
needles=set()
for name in ['HTTP_PROXY','HTTPS_PROXY']:
    u=urllib.parse.urlsplit(os.environ.get(name,''))
    if u.username and u.password:
        plain=f'{u.username}:{u.password}'.encode();needles.update([plain,base64.b64encode(plain)])
if not needles: raise SystemExit('NOT_RUN: no ambient proxy credential available for exact-value audit')
def git(*args):return subprocess.check_output(['git','-C',repo,*args])
items=git('rev-list','--objects','--all').splitlines()
p=subprocess.Popen(['git','-C',repo,'cat-file','--batch'],stdin=subprocess.PIPE,stdout=subprocess.PIPE)
hits=[];blobs=0
for item in items:
    oid,_,path=item.partition(b' ');p.stdin.write(oid+b'\n');p.stdin.flush();header=p.stdout.readline().split();data=p.stdout.read(int(header[2]));p.stdout.read(1)
    if header[1]==b'blob':
        blobs+=1
        if any(v in data for v in needles):hits.append({'object':oid.decode(),'path':path.decode(errors='replace')})
p.stdin.close();p.wait()
result={'scope':'all reachable Git refs','status':'FAIL' if hits else 'PASS','blobsScanned':blobs,'matches':hits,'credentialValuesPrinted':False}
print(json.dumps(result,indent=2));sys.exit(bool(hits))
