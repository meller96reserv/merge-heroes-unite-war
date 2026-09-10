import {test} from 'node:test';import assert from 'node:assert/strict';import {entity} from './combat-entity.test';import {selectTarget,acquireTargets} from '../src/systems/TargetingSystem';
test('spawn ordinal/ID ties are stable; dead, wrong encounter and disabled attackers clear stale targets',()=>{
 const hero=entity('h'),a=entity('a','enemy'),b=entity('b','enemy'),old=entity('old','enemy','previous');a.spawnOrdinal=1;b.spawnOrdinal=0;hero.targetId='old';
 acquireTargets([old,hero,a,b],'spawnOrder');assert.equal(hero.targetId,'b');a.spawnOrdinal=0;assert.equal(selectTarget(hero,[b,a],'spawnOrder'),'a');a.hp=0;assert.equal(selectTarget(hero,[a,b],'spawnOrder'),'b');b.hp=0;acquireTargets([hero,a,b,old],'spawnOrder');assert.equal(hero.targetId,null);
 hero.canAttack=false;b.hp=1;assert.equal(selectTarget(hero,[b],'spawnOrder'),null);
});
