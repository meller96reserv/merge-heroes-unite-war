import test from 'node:test';import assert from 'node:assert/strict';
import {ResourceLeaseCache} from '../../app/src/rendering/ResourceLeaseCache';
const wait=(ms=20)=>new Promise(r=>setTimeout(r,ms));
test('shared visible texture decodes once; route-only textures retire; fast reopen cancels retirement',async()=>{
 const released:string[]=[],cache=new ResourceLeaseCache(async(key:string)=>({key}),10,value=>released.push(value.key));
 const a=cache.retain('shared'),b=cache.retain('shared'),route=cache.retain('equipment');await cache.ready('shared');await cache.ready('equipment');assert.equal(cache.loads,2);
 a();route();await wait();assert.ok(cache.get('shared'));assert.equal(cache.get('equipment'),null);assert.deepEqual(released,['equipment']);
 b();const reopened=cache.retain('shared');await wait();assert.equal(cache.loads,2);assert.ok(cache.get('shared'));reopened();await wait();assert.equal(cache.inspect().length,0);assert.deepEqual(released,['equipment','shared']);
});
test('abandoned in-flight image is not retained and concurrent remount shares the pending decode',async()=>{
 let finish!:(value:{key:string})=>void;const released:string[]=[],cache=new ResourceLeaseCache((_key:string)=>new Promise<{key:string}>(r=>finish=r),10,v=>released.push(v.key));
 const off=cache.retain('dungeon');off();await wait();const again=cache.retain('dungeon');assert.equal(cache.loads,1);const done=cache.ready('dungeon');finish({key:'dungeon'});await done;assert.ok(cache.get('dungeon'));again();await wait();assert.deepEqual(released,['dungeon']);
 const last=cache.retain('abandoned');last();await wait();const pending=cache.ready('abandoned');finish({key:'abandoned'});await pending;assert.equal(cache.inspect().length,0);assert.deepEqual(released,['dungeon','abandoned']);
});
