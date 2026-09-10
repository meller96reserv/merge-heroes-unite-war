#!/usr/bin/env python3
"""Convert raw diagnostics to an allowlisted summary; never copy free-form messages."""
import hashlib, json, re, sys
from pathlib import Path
def summarize(data):
    text=data.decode('utf8',errors='replace')
    return {'format':'diagnostic-summary-v1','sourceSha256':hashlib.sha256(data).hexdigest(),
      'sourceBytes':len(data),'lineCount':len(text.splitlines()),
      'successMarkerCount':len(re.findall(r'\b(?:PASS|successfully|succeeded)\b',text)),
      'failureMarkerCount':len(re.findall(r'\b(?:FAIL|ERROR|failed)\b',text)),
      'executionStatus':'NOT_ASSERTED','rawMessagesIncluded':False}
if __name__=='__main__':
    source,target=map(Path,sys.argv[1:]);target.write_text(json.dumps(summarize(source.read_bytes()),indent=2)+'\n')
