import {test} from 'node:test'; import assert from 'node:assert/strict';
import {SeededRng,rngStreams} from '../src/ports/SeededRng';
test('xoshiro known vector, restore and stream independence',()=>{
 const streams=rngStreams([1,2,3,4],[5,6,7,8],[9,10,11,12]); assert.equal(streams.combat.nextUint32(),11520);
 const restored=new SeededRng(streams.combat.snapshot()), reward=streams.reward.snapshot();
 for(let i=0;i<1000;i++){assert.equal(streams.combat.nextUint32(),restored.nextUint32());streams.presentation.nextUint32();}
 assert.deepEqual(streams.reward.snapshot(),reward); const copy=streams.combat.snapshot() as number[];copy[0]=0;assert.notDeepEqual(copy,streams.combat.snapshot());
 assert.throws(()=>new SeededRng([0,0,0,0]));assert.throws(()=>new SeededRng([1,2,3]));
 for(let i=0;i<1000;i++)assert.ok(streams.reward.below(10)<10);
 assert.throws(()=>streams.reward.below(0));
});
