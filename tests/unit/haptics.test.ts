import {test} from 'node:test';import assert from 'node:assert/strict';
import {Haptics,type HapticKind} from '../../app/src/platform/Haptics';
test('haptics respect live preference, focus, transaction deduplication and global cooldown',()=>{
 let now=0;const calls:HapticKind[]=[],h=new Haptics({available:true,play:async kind=>{calls.push(kind);}},()=>now);
 assert.equal(h.emit('merge.completed','disabled'),'suppressed');h.enabled=true;h.active=true;
 assert.equal(h.emit('merge.completed','merge'),'requested');now=50;assert.equal(h.emit('ui.primary'),'cooldown');now=300;assert.equal(h.emit('merge.completed','merge'),'duplicate');
 h.enabled=false;assert.equal(h.emit('daily.claimed','daily'),'suppressed');h.enabled=true;h.active=false;assert.equal(h.emit('ui.tab'),'suppressed');h.active=true;assert.equal(h.emit('ui.tab'),'requested');
 assert.deepEqual(calls,['medium','selection']);
});
test('unavailable and failing native drivers cannot affect application commands',async()=>{
 const absent=new Haptics({available:false,play:async()=>{throw Error('must not call');}});absent.enabled=absent.active=true;assert.equal(absent.emit('ui.primary'),'unavailable');
 const failing=new Haptics({available:true,play:async()=>{throw Error('unsupported actuator');}});failing.enabled=failing.active=true;assert.equal(failing.emit('ui.primary'),'requested');await Promise.resolve();assert.equal(failing.stats.driverErrors,1);
});
