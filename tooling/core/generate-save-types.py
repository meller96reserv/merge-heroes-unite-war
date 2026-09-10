from pathlib import Path
import json
schema=json.loads(Path('data-spec/save.schema.json').read_text())
def ts(s):
 if 'const' in s:return json.dumps(s['const'])
 if 'enum' in s:return ' | '.join(json.dumps(x) for x in s['enum'])
 if 'anyOf' in s:return '('+' | '.join(ts(x) for x in s['anyOf'])+')'
 t=s.get('type')
 if t=='object':
  props=[json.dumps(k)+('' if k in s.get('required',[]) else '?')+': '+ts(v)+';' for k,v in s.get('properties',{}).items()]
  if isinstance(s.get('additionalProperties'),dict):props.append('[key:string]: '+ts(s['additionalProperties'])+';')
  return '{\n'+'\n'.join(props)+'\n}'
 if t=='array':return 'Array<'+ts(s['items'])+'>'
 return {'integer':'number','number':'number','string':'string','boolean':'boolean','null':'null'}[t]
Path('game-core/src/model/SaveTypes.ts').write_text('// Generated from data-spec/save.schema.json; runtime validation is separate.\nexport type SaveState = '+ts(schema)+';\n')
