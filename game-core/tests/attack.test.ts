import {test} from 'node:test';import assert from 'node:assert/strict';import {entity} from './combat-entity.test';import {advanceCooldowns,attackIntents} from '../src/systems/AttackSystem';import {acquireTargets} from '../src/systems/TargetingSystem';
test('attacks occur at exact configured ticks with stable order and immutable stat snapshots',()=>{
 const a=entity('a'),b=entity('b'),enemy=entity('enemy','enemy'),entities=[b,enemy,a],times:number[]=[],ids:string[]=[];
 for(let tick=1;tick<=60;tick++){advanceCooldowns(entities);acquireTargets(entities,'spawnOrder');for(const intent of attackIntents(entities,tick)){times.push(intent.createdTick);ids.push(intent.actorId);assert.equal(intent.hitTick,tick+3);assert.equal(Object.isFrozen(intent),true);}}
 assert.deepEqual(times,[20,20,40,40,60,60]);assert.deepEqual(ids,['a','b','a','b','a','b']);a.hp=0;b.canAttack=false;
 for(let tick=61;tick<90;tick++){advanceCooldowns(entities);acquireTargets(entities,'spawnOrder');assert.equal(attackIntents(entities,tick).length,0);}
});
