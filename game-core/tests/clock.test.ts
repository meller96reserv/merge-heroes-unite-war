import {test} from 'node:test';import assert from 'node:assert/strict';import {SimulationClock} from '../src/systems/SimulationClock';
test('split elapsed batches yield the same ticks; stalls are bounded; suspend drops background time',()=>{
 const run=(parts:number[])=>{const c=new SimulationClock(),ticks:number[]=[];for(const ms of parts)c.advance(ms,t=>ticks.push(t));return ticks;};
 assert.deepEqual(run([200,200]),run([17,33,101,49,200]));
 const c=new SimulationClock();assert.deepEqual(c.advance(2020,()=>{}),{steps:5,droppedMs:1750});assert.equal(c.tick,5);
 c.suspend();assert.equal(c.advance(3600000,()=>assert.fail()).steps,0);c.resume();assert.equal(c.advance(30,()=>assert.fail()).steps,0);assert.equal(c.advance(20,()=>{}).steps,1);assert.throws(()=>c.advance(-1,()=>{}));
});
