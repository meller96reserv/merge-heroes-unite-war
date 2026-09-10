import {test} from 'node:test';import assert from 'node:assert/strict';import {DamageLabelPool} from '../../app/src/battle/DamageLabel';
const hit=(attackId:string,applied:number,crit=false)=>({type:'damage.applied',payload:{attackId,targetId:'boar',applied,raw:999,crit}});
test('labels show exact applied damage, isolate critical style, bound overlap and reject stale releases/replayed events',()=>{
 const pool=new DamageLabelPool(2);pool.ingest([hit('a',7),hit('b',3,true)]);assert.deepEqual(pool.snapshot().map(v=>[v.text,v.crit]),[['7',false],['3',true]]);
 const old=pool.snapshot()[0]!;pool.ingest([hit('c',5)]);assert.equal(pool.snapshot().length,2);assert.equal(pool.release(old.id,old.lease),false);
 const crit=pool.snapshot()[0]!;assert.equal(pool.release(crit.id,crit.lease+1),false);assert.equal(pool.release(crit.id,crit.lease),true);pool.ingest([hit('b',3,true),hit('zero',0)]);assert.equal(pool.snapshot().length,1);
 pool.reset();pool.ingest([hit('b',3,true)]);assert.equal(pool.release('b',crit.lease),false);
 const disabled=new DamageLabelPool(0);disabled.ingest([hit('a',1)]);assert.equal(disabled.snapshot().length,0);
});
test('simultaneous normal hits coalesce exactly, critical hits remain distinct and saturation stays bounded',()=>{
 const pool=new DamageLabelPool();const batch=[hit('a',Number.MAX_SAFE_INTEGER),hit('b',Number.MAX_SAFE_INTEGER),hit('crit',3,true)];const original=JSON.stringify(batch);
 pool.ingest(batch);assert.deepEqual(pool.snapshot().map(v=>v.text),['18014398509481982','3']);assert.equal(JSON.stringify(batch),original);
 for(let i=0;i<1000;i++)pool.ingest([hit(String(i),1)]);
 assert.equal(pool.stats.active,48);assert.equal(pool.stats.seen,512);const stale=pool.snapshot()[0]!;
 pool.clear();assert.equal(pool.stats.active,0);pool.ingest([hit('fresh',2)]);assert.equal(pool.release(stale.id,stale.lease),false);
});
