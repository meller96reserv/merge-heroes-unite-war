import {test} from 'node:test';import assert from 'node:assert/strict';import {EnemyViewPool} from '../../app/src/battle/EnemyView';import {spawnEncounter} from '../../game-core/src/systems/EncounterSpawner';import {earlyEnemies} from '../../game-core/src/content/BattleConfig';
test('enemy leases release after death and stale completion cannot touch a reused view',()=>{
 const pool=new EnemyViewPool(1),a=spawnEncounter('stage1',1,0,[{enemyId:'ironhide_boar',count:1}],earlyEnemies,50).entities[0]!,rect=()=>({x:0,y:0,width:100,height:100});
 const first=pool.project([a],rect)[0]!;a.hp=0;assert.equal(pool.project([a],rect)[0]!.phase,'death');assert.equal(pool.release(first.id,first.lease),true);assert.equal(pool.project([a],rect).length,0);assert.equal(pool.size,0);
 pool.reset();a.hp=40;const next=pool.project([a],rect)[0]!;assert.notEqual(next.lease,first.lease);assert.equal(pool.release(first.id,first.lease),false);assert.equal(pool.size,1);
 const b={...a,id:'different'};assert.throws(()=>pool.project([a,b],rect));assert.equal(a.hp,40);
});
