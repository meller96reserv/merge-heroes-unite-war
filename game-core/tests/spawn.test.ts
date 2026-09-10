import {test} from 'node:test';import assert from 'node:assert/strict';import {spawnEncounter,type EnemyDefinition} from '../src/systems/EncounterSpawner';
export const enemy:EnemyDefinition={id:'boar',stats:{attack:0,defense:0,hp:40,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},rewardId:'boar_reward',canAttack:false,hitDelayMs:150};
test('configured wave creates unique generation-scoped identities and no reward on spawn',()=>{
 const a=spawnEncounter('stage1',1,0,[{enemyId:'boar',count:3}],[enemy],50),b=spawnEncounter('stage1',2,0,[{enemyId:'boar',count:3}],[enemy],50);
 assert.equal(new Set([...a.entities,...b.entities].map(e=>e.id)).size,6);assert.deepEqual(a.entities.map(e=>e.spawnOrdinal),[0,1,2]);assert.equal(a.complete,false);assert.ok(a.entities.every(e=>e.hp===40&&!e.deathEmitted));assert.equal('grants' in a,false);
 assert.throws(()=>spawnEncounter('stage1',1,0,[{enemyId:'missing',count:1}],[enemy],50));assert.throws(()=>spawnEncounter('stage1',1,0,[{enemyId:'boar',count:33}],[enemy],50));
});
