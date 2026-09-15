"""Publish the customer-requested legal pages; keep the editing token private."""
from pathlib import Path
import json,os,urllib.request,urllib.parse
P=Path(__file__).resolve().parents[1]
def call(method,**fields):
 data=urllib.parse.urlencode({k:json.dumps(v) if isinstance(v,(list,dict)) else v for k,v in fields.items()}).encode()
 with urllib.request.urlopen(urllib.request.Request('https://api.telegra.ph/'+method,data=data),timeout=30) as response:r=json.load(response)
 if not r.get('ok'):raise RuntimeError(r.get('error','Telegraph request failed'))
 return r['result']
private=P/'private/telegraph-account.json';private.parent.mkdir(exist_ok=True)
if private.exists():account=json.loads(private.read_text())
else:
 account=call('createAccount',short_name='MergeHeroesLegal',author_name='Merge Heroes Unite War')
 fd=os.open(private,os.O_WRONLY|os.O_CREAT|os.O_TRUNC,0o600)
 with os.fdopen(fd,'w') as f:json.dump(account,f)
config=json.loads((P/'app-services.json').read_text());pages={}
for key,name in [('privacyUrl','PRIVACY'),('termsUrl','TERMS')]:
 lines=(P/f'legal/{name}.md').read_text().splitlines();title=lines[0][2:];nodes=[]
 for paragraph in '\n'.join(lines[1:]).strip().split('\n\n'):
  if paragraph.startswith('## '):
   head,_,body=paragraph.partition('\n');nodes.append({'tag':'h3','children':[head[3:]]})
   if body:nodes.append({'tag':'p','children':[body]})
  elif paragraph:nodes.append({'tag':'p','children':[paragraph.replace('\n',' ')]})
 related=config.get('termsUrl' if key=='privacyUrl' else 'privacyUrl')
 if related:nodes.append({'tag':'p','children':[{'tag':'a','attrs':{'href':related},'children':['Terms of Use' if key=='privacyUrl' else 'Privacy Policy']}]})
 common=dict(access_token=account['access_token'],title=title,author_name='Merge Heroes Unite War',content=nodes,return_content='true')
 existing=config.get(key)
 result=call('editPage',path=existing.rsplit('/',1)[-1],**common) if existing else call('createPage',**common)
 config[key]=result['url'];pages[key]=result
 (P/'app-services.json').write_text(json.dumps(config,indent=2)+'\n')
# Mutual link after both pages exist; no placeholder URL is ever published.
p=pages['privacyUrl'];nodes=p['content']
if not any(config['termsUrl'] in json.dumps(n) for n in nodes):
 nodes.append({'tag':'p','children':[{'tag':'a','attrs':{'href':config['termsUrl']},'children':['Terms of Use']}]})
 call('editPage',access_token=account['access_token'],path=p['path'],title=p['title'],author_name='Merge Heroes Unite War',content=nodes)
(P/'legal/urls.json').write_text(json.dumps({k:config[k] for k in ['termsUrl','privacyUrl']},indent=2)+'\n')
print(json.dumps({k:config[k] for k in ['termsUrl','privacyUrl']},indent=2))
