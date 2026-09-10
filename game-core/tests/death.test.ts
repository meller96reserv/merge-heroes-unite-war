import {test} from 'node:test';import assert from 'node:assert/strict';import {entity} from './combat-entity.test';import {hit} from './hit-queue.test';import {DamageResolver} from '../src/systems/DamageResolver';import {resolveDeaths} from '../src/systems/DeathSystem';
test('simultaneous lethal hits yield one death and one immutable encounter-specific reward source',()=>{
 const target=entity('enemy','enemy');target.hp=10;target.rewardId='reward1';const d=new DamageResolver({damageModel:'proposedSubtractDefense',rounding:'floor',minimumDamage:1});
 assert.equal(d.resolve(hit('first'),target,()=>0)!.hpAfter,0);assert.equal(d.resolve(hit('second'),target,()=>0),null);
 const deaths=resolveDeaths([target]);assert.equal(deaths.length,1);assert.equal(deaths[0]!.reward!.source,'kill:encounter1:enemy');assert.equal(Object.isFrozen(deaths[0]!.reward),true);assert.deepEqual(resolveDeaths([target]),[]);
 const hero=entity('hero');hero.hp=0;hero.rewardId='never';assert.equal(resolveDeaths([hero])[0]!.reward,null);
 const next=entity('enemy','enemy','encounter2');next.hp=0;next.rewardId='reward1';assert.notEqual(resolveDeaths([next])[0]!.reward!.source,deaths[0]!.reward!.source);
});
