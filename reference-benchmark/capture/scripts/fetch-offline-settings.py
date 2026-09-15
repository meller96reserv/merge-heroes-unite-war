#!/usr/bin/env python3
"""One exact public config request, without accounts, tokens or user payload."""
import pathlib,urllib.request,json,hashlib
root=pathlib.Path(__file__).resolve().parents[2]
request=urllib.request.Request('https://new-crazy-api.superjoy2.link/setting/version',data=b'',headers={'Content-Type':'application/json'},method='POST')
with urllib.request.urlopen(request,timeout=20) as response:body=response.read()
data=json.loads(body)
if data.get('code')!=200 or not isinstance(data.get('result'),dict):raise SystemExit('Public setting response was not successful')
folder=root/'capture/offline';folder.mkdir(parents=True,exist_ok=True)
path=folder/'public-settings-response.json'
if path.exists():raise SystemExit('Snapshot already exists; keep the frozen build configuration')
path.write_bytes(body)
print(json.dumps({'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'path':str(path.relative_to(root))}))
