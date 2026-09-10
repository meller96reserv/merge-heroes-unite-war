#!/usr/bin/env python3
"""Print only paths/rule IDs, never matched values. Intended for staged content."""
import re, subprocess, sys
RULES = {
    'authorization-value': re.compile(rb'(?i)(?:Basic|Bearer)[ \t]+[A-Za-z0-9_+/=.-]{8,}'),
    'url-credential': re.compile(rb'https?://[^\s/\x22\x27<>:@]+:[^\s/\x22\x27<>@]+@'),
    'private-key': re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
}
def violations(path, data):
    result=[name for name,pattern in RULES.items() if pattern.search(data)]
    if re.search(r'(^|/)(logs?|diagnostics?)/.*\.(log|txt)$',path) or path.endswith('.log'):
        result.append('raw-runtime-log')
    return result
if __name__ == '__main__':
    paths=subprocess.check_output(['git','diff','--cached','--name-only','--diff-filter=ACMR','-z']).decode().split('\0')
    failures=[]
    for path in filter(None,paths):
        data=subprocess.check_output(['git','show',':'+path])
        for rule in violations(path,data): failures.append((path,rule))
    for path,rule in failures: print(f'BLOCKED {rule}: {path}')
    print(f'Staged security scan: {"FAIL" if failures else "PASS"}; findings={len(failures)}')
    sys.exit(bool(failures))
