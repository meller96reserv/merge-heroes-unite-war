import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const hash=(b: Buffer)=>crypto.createHash('sha256').update(b).digest('hex');
const source=JSON.parse(fs.readFileSync('analysis/figma/semantic_map.json','utf8'));
export function validate(records: any[]) {
  const seen=new Set();
  for(const a of records) {
    assert.ok(!seen.has(a.id),`duplicate runtime ID: ${a.id}`);seen.add(a.id);
    const s=source.find((s:any)=>s.semanticId===a.id);assert.ok(s,`missing semantic ID: ${a.id}`);
    assert.notEqual(s.scope,'UNUSED_OR_REFERENCE_ONLY','reference-only source');
    assert.ok(a.width>0 && a.height>0 && Number.isInteger(a.width) && Number.isInteger(a.height),'invalid dimensions');
    assert.ok(a.pivot && Array.isArray(a.pivot) && a.pivot.length === 2 && a.pivot.every(n=>Number.isFinite(n)&&n>=0&&n<=1),'invalid pivot');
    assert.deepEqual(a.originalSize,s.sourceDimensions,'original size');
    assert.deepEqual(a.trim,{applied:false,offset:[0,0]},'unreviewed trim');
    assert.equal(hash(fs.readFileSync(a.sourceFile)),a.sourceSha256,'changed source');
    assert.equal(hash(fs.readFileSync(a.file)),a.sha256,'changed runtime bytes');
  }
}
const r=JSON.parse(fs.readFileSync('app/assets/asset-registry.json','utf8')).records;validate(r);
const negative=[ [...r,r[0]], [{...r[0],id:'missing'}], [{...r[0],pivot:[-1,2]}], [{...r[0],trim:{applied:true,offset:[12,0]}}], [{...r[0],sha256:'changed'}], [{...r[0],id:source.find((s:any)=>s.scope==='UNUSED_OR_REFERENCE_ONLY').semanticId}] ];
for(const example of negative) assert.throws(()=>validate(example));
const report={task:'TASK-0034',status:'PASS',records:r.length,negativeCases:negative.length,checks:['duplicate IDs','missing semantic refs','out-of-range pivot','unreviewed trim','changed bytes','reference-only selection']};
fs.writeFileSync('analysis/reports/asset-import/registry-validation.json',JSON.stringify(report,null,2)+'\n');console.log(report);
const density=JSON.parse(fs.readFileSync('app/assets/variants.json','utf8')).records;
const variantKeys=new Set();
for(const v of density){
 const a=r.find((a:any)=>a.id===v.id);assert.ok(a,'variant semantic reference');
 const key=v.id+':'+v.edge;assert.ok(!variantKeys.has(key),'duplicate density variant');variantKeys.add(key);
 assert.ok([128,256,512].includes(v.edge)&&Math.max(v.width,v.height)<=v.edge,'density dimensions');
 assert.equal(v.sourceSha256,a.sourceSha256);assert.equal(v.trimApplied,false);assert.equal(hash(fs.readFileSync(v.file)),v.sha256);
}
const components=JSON.parse(fs.readFileSync('app/assets/component-exports.json','utf8')).records;
const componentNodes:Record<string,string>={ui_frame_currency__figma_2_487:'2:487',ui_wheel_sectors__figma_2_634:'2:634',ui_icon_close__figma_2_121:'2:121',ui_panel_settings_audio__figma_2_190:'2:190',ui_panel_settings_toggles__figma_2_191:'2:191'};
for(const c of components){
 assert.ok(!r.some((a:any)=>a.id===c.semanticId));assert.equal(c.fileKey,'YL2jFE10viR9zQV5GzBCuZ');assert.equal(c.nodeId,componentNodes[c.semanticId]);assert.equal(hash(fs.readFileSync(c.file)),c.sha256);
 if(c.sourceFile)assert.equal(hash(fs.readFileSync(c.sourceFile)),c.sourceSha256);
}
console.log({densityVariants:density.length,componentExports:components.length,validation:'PASS'});
