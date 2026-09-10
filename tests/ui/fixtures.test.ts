import test from 'node:test';import assert from 'node:assert/strict';
import {loadFixture,fixtureFromSearch} from '../../app/src/debug/FixtureHarness';
test('TASK-0054 named seed/clock/state and frozen animation marker',()=>{
 const a=loadFixture('figma-battle-10',240),b=fixtureFromSearch('?fixture=figma-battle-10&animationMs=240');assert.deepEqual(a,b);assert.equal(a.animationMs,240);assert.equal(a.slots,10);assert.ok(Object.isFrozen(a.tiers));assert.equal(loadFixture('adapted-battle-15').slots,15);assert.equal(fixtureFromSearch(''),null);assert.throws(()=>loadFixture('typo'));assert.throws(()=>loadFixture('figma-battle-10',NaN));
});
