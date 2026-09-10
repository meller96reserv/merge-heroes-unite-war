import {test} from 'node:test';import assert from 'node:assert/strict';import {HitQueue} from '../src/systems/HitQueue';import type {AttackIntent} from '../src/systems/AttackSystem';import {entity} from './combat-entity.test';
export const hit=(id='attack1',actorId='hero',targetId='enemy'):AttackIntent=>({id,actorId,targetId,encounterId:'encounter1',createdTick:1,hitTick:4,sequence:1,attack:10,critChanceBp:0,critMultiplierBp:15000});
test('due hits resolve once in stable order; dead/stale targets and removed sources cancel; capacity failure is atomic',()=>{
 const q=new HitQueue(2),entities=[entity('hero'),entity('a'),entity('enemy','enemy')];q.enqueue([hit('b'),hit('a','a')]);assert.equal(q.drain(3,'encounter1',entities).length,0);
 assert.throws(()=>q.enqueue([hit('overflow')]));assert.equal(q.snapshot().length,2);assert.deepEqual(q.drain(4,'encounter1',entities).map(i=>i.id),['a','b']);q.enqueue([hit('b')]);assert.equal(q.snapshot().length,0);
 q.enqueue([hit('old')]);assert.equal(q.drain(4,'encounter2',entities).length,0);q.enqueue([hit('dead')]);entities[2]!.hp=0;assert.equal(q.drain(4,'encounter1',entities).length,0);
 q.enqueue([hit('removed')]);entities[2]!.hp=100;assert.equal(q.drain(4,'encounter1',entities.slice(1)).length,0);
});
