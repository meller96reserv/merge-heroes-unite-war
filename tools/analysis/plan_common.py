"""Helpers for authoring planning documents; never imports or creates game runtime."""
from pathlib import Path
import json,os
ROOT=Path(__file__).resolve().parents[2]
def write(path,text):
 p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.strip()+'\n')
def dump(path,value):write(path,json.dumps(value,ensure_ascii=False,indent=2))
def rel(from_path,to_path):return os.path.relpath(ROOT/to_path,(ROOT/from_path).parent)
def link(from_path,to_path,label=None):return f'[{label or Path(to_path).name}]({rel(from_path,to_path)})'
def table(headers,rows):
 return '| '+' | '.join(headers)+' |\n| '+' | '.join(['---']*len(headers))+' |\n'+'\n'.join('| '+' | '.join(str(v).replace('|','/').replace('\n','; ') for v in row)+' |' for row in rows)
