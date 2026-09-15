#!/usr/bin/env python3
"""Derive a separate offline client; never change original or online runtime bytes."""
import pathlib, shutil, json, hashlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
source=ROOT/'runtime/local'; target=ROOT/'runtime/offline'
config=ROOT/'capture/offline/public-settings-response.json'
if not config.exists():raise SystemExit('Missing public settings snapshot: run python3 capture/scripts/fetch-offline-settings.py once with Internet.')
shutil.copytree(source,target,dirs_exist_ok=True)
raw=json.loads(config.read_text())
if raw.get('code')!=200 or not isinstance(raw.get('result'),dict):raise SystemExit('Public settings snapshot is not a successful configuration response')
settings=raw['result']
# Freeze base config, disable server-scheduled events/notices and external links.
settings['event_list']=[];settings['notice_list']=[]
for key in list(settings):
    if '_URL' in key or key=='SUPPORT_EMAIL':settings[key]=''
(target/'reference-offline-settings.js').write_text('window.ReferenceOfflineSettings='+json.dumps(settings,ensure_ascii=True,separators=(',',':'))+';\n')
shutil.copy2(ROOT/'capture/scripts/reference-offline.js',target/'reference-offline.js')
p=target/'index.html';s=p.read_text()
csp="default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; object-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'"
s=s.replace('<head>','<head>\n  <meta http-equiv="Content-Security-Policy" content="'+csp+'">',1)
s=s.replace('<script src="benchmark-portal.js"></script>','<script src="benchmark-portal.js"></script>\n  <script src="reference-offline-settings.js"></script>\n  <script src="reference-offline.js"></script>',1)
s=s.replace('Heroes Unite [Crazy]','Heroes Unite Offline Reference');p.write_text(s)
p=target/'main.9b5b8.js';s=p.read_text();needle='cc.game.run(option, onStart);'
if s.count(needle)!=1:raise SystemExit('Main boot hook changed; refusing an ambiguous patch')
s=s.replace(needle,'window.ReferenceOffline.install();\n                        '+needle);p.write_text(s)
# Captured SweetAlert dependency contains a conditional domain/language input blocker.
# Its .ru/.su/.by domain predicate is inactive at appassets, but remove it entirely here.
p=target/'assets/main/index.6e590.js';s=p.read_text()
start=s.index('if("undefined"!=typeof window&&/^ru\\b/.test(navigator.language)&&location.host.match(')
end=s.index('Ta.prototype.disableButtons=',start)
removed=s[start:end]
if 'flag-gimn.ru' not in removed or len(removed)>1500:raise SystemExit('Unexpected dependency block; refusing patch')
s=s[:start]+s[end:];p.write_text(s)
report={'mode':'offline','settingsSnapshotSha256':hashlib.sha256(config.read_bytes()).hexdigest(),'source':'runtime/local','output':'runtime/offline','changes':['Entry CSP and offline scripts','Boot hook before cc.game.run','Local startup/settings/save adapter; online-only services disabled','Removed conditional third-party domain/language input/audio block'],'removedDependencyBlockBytes':len(removed.encode()),'gameplayRules':'Original client battle/purchase/merge logic retained; device clock replaces server time; online events/rewards unavailable'}
(ROOT/'capture/reports/offline-preparation.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report))
