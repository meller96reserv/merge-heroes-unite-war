import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {layout} from '../../app/src/ui/ResponsiveLayout';
const results:unknown[]=[];
test('TASK-0057 five viewports, single safe inset, inverse points, targets, board/HUD/navigation clearance',()=>{
 for(const [w,h] of [[430,932],[360,640],[390,844],[412,915],[768,1024]] as const)for(const slots of [10,15])for(const inset of [0,24]){
  const l=layout(w,h,{top:inset,right:0,bottom:inset,left:0},slots);
  const last=l.board.at(-1)!;
  for(const r of l.board){const p=l.toScreen(r);assert.ok(p.width>=44&&p.height>=44);assert.ok(p.x>=0&&p.y>=inset&&p.x+p.width<=w&&p.y+p.height<=h-inset);}
  assert.ok(last.y+last.height<l.buyY);assert.ok(l.buyY+77<l.navY);assert.ok(l.boostY>233);
  for(const [x,y] of [[0,0],[430,0],[0,l.virtualHeight],[430,l.virtualHeight],[215,466]]){const p=l.toScreen({x:x!,y:y!,width:0,height:0});const q=l.toDesign(p.x,p.y);assert.ok(Math.abs(q.x-x!)<1e-6&&Math.abs(q.y-y!)<1e-6);}
  results.push({w,h,slots,inset,boardTop:l.toScreen(l.board[0]!).y,lastBottom:(last.y+last.height)*l.scale+inset,minTarget:l.rowHeight*l.scale,navY:l.navY*l.scale+inset});
 }
 const exact=layout(430,932,undefined,10);assert.equal(exact.board[0]!.y,549);assert.equal(exact.navY,847);
 fs.writeFileSync('analysis/reports/ui-foundation/anchors.json',JSON.stringify(results,null,2)+'\n');
});
