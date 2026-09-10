"""Keep the pure runtime schema synchronized without importing outside game-core."""
import json
from pathlib import Path
schema=json.loads(Path('data-spec/save.schema.json').read_text())
supported={'$id','$schema','title','description','type','const','enum','anyOf','properties','required','additionalProperties','items','minimum','maximum','minItems','maxItems','pattern','minLength','maxLength'}
def check(s):
    assert not set(s)-supported, set(s)-supported
    for v in s.get('properties',{}).values():check(v)
    for v in s.get('anyOf',[]):check(v)
    if isinstance(s.get('items'),dict):check(s['items'])
    if isinstance(s.get('additionalProperties'),dict):check(s['additionalProperties'])
check(schema)
Path('game-core/src/persistence/SaveSchema.ts').write_text('// Generated from data-spec/save.schema.json; do not edit.\nimport type {Schema} from \'./SchemaValidation\';\nexport const saveSchema:Schema='+json.dumps(schema,ensure_ascii=False,separators=(',',':'))+';\n')
