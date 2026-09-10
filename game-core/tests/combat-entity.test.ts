import {test} from 'node:test';import assert from 'node:assert/strict';import {combatEntity} from '../src/model/CombatEntity';
export const entity=(id:string,side:'hero'|'enemy'='hero',encounterId='encounter1')=>combatEntity({id,definitionId:id,encounterId,side,spawnOrdinal:0,stats:{attack:10,defense:0,hp:100,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},stepMs:50,hitDelayMs:150,canAttack:side==='hero'});
test('combat entities contain stable identities and integer timing independent of render transforms',()=>{
 const a=entity('hero1'),b=entity('hero2');a.hp=1;a.targetId='enemy1';assert.equal(b.hp,100);assert.equal(b.targetId,null);assert.equal(a.intervalTicks,20);assert.equal(a.hitDelayTicks,3);assert.equal('x' in a,false);
 assert.throws(()=>combatEntity({id:'bad',definitionId:'bad',encounterId:'e',side:'hero',spawnOrdinal:0,stats:{attack:Number.MAX_SAFE_INTEGER,defense:0,hp:1,attackIntervalMs:1,critChanceBp:1,critMultiplierBp:100000},stepMs:50,hitDelayMs:0,canAttack:true}));
});
