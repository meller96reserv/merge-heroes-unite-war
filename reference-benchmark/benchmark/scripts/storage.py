#!/usr/bin/env python3
import pathlib,json
ROOT=pathlib.Path(__file__).resolve().parents[2]
def size(p):return sum(f.stat().st_size for f in p.rglob('*') if f.is_file() and not f.is_symlink()) if p.is_dir() else p.stat().st_size if p.exists() else 0
items=['capture/responses','runtime/original','runtime/local','runtime/offline','capture/har','capture/profile','capture/local-profile','android','build/apk','node_modules','benchmark/results']
rows=[f'| {p} | {size(ROOT/p):,} | {size(ROOT/p)/1024**2:.1f} |' for p in items]
idx=json.loads((ROOT/'capture/reports/resource-index.json').read_text());cats={};seen=set()
for r in idx['resources']:
 if r.get('sha256') and r['sha256'] not in seen:
  seen.add(r['sha256']);key=r['mime'].split(';')[0];cats[key]=cats.get(key,0)+r['size']
text='# Storage report\n\nLogical file bytes (filesystem allocation/APFS compression may differ). Original, online local and offline adaptations are independent copies. Android flavors reference their corresponding runtime tree directly as assets. HAR embeds content and therefore duplicates bodies intentionally.\n\n| Area | Bytes | MiB |\n|---|---:|---:|\n'+'\n'.join(rows)+'\n\nLargest captured categories (unique hashes):\n\n'+'\n'.join(f'- {k}: {v/1024**2:.1f} MiB' for k,v in sorted(cats.items(),key=lambda x:-x[1])[:8])+'\n'
(ROOT/'capture/reports/STORAGE_REPORT.md').write_text(text);print(text)
