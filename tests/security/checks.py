import importlib.util,base64,json
from pathlib import Path
def load(path):
 s=importlib.util.spec_from_file_location('security_module',path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
scan=load('tooling/security/check-staged.py');sanitize=load('tooling/security/sanitize-log.py')
synthetic=base64.b64encode(b'fixture-user:fixture-password')
raw=b'Proxy-Authorization: '+b'Basic '+synthetic+b'\nTest PASS\n'
assert 'authorization-value' in scan.violations('example.txt',raw)
assert 'url-credential' in scan.violations('example.txt',b'https://'+b'user:password'+b'@example.invalid')
assert 'raw-runtime-log' in scan.violations('spikes/example/logs/runtime.log',b'hello')
summary=json.dumps(sanitize.summarize(raw)).encode();assert synthetic not in summary;assert b'Authorization' not in summary;assert not scan.violations('summary.json',summary)
print('PASS: synthetic auth detection, URL credentials, raw-log rejection, allowlisted summary excludes credentials')
