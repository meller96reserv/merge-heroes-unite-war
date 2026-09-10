import {test} from 'node:test';import assert from 'node:assert/strict';
import {enemyMotionProfile} from '../../app/src/presentation/EnemyMotion';import {AnimationDirector} from '../../app/src/presentation/AnimationDirector';import {EnemyViewPool} from '../../app/src/battle/EnemyView';import {spawnEncounter} from '../../game-core/src/systems/EncounterSpawner';import {stageEnemies} from '../../game-core/src/content/StageConfig';
test('boss profiles differ while reduced motion retains opacity-only completion',()=>{
 assert.equal(enemyMotionProfile(true).deathMs,900);assert.equal(enemyMotionProfile(false).deathMs,280);
 for(const boss of [false,true]){const p=enemyMotionProfile(boss,true);assert.equal(p.deathRise,0);assert.equal(p.deathTilt,0);assert.equal(p.recoilPx,0);assert.equal(p.breathScale,0);assert.equal(p.spawnScale,1);assert.equal(p.deathMs,140);}
});
test('boss scene exit during death releases cosmetic ownership; stale callback cannot remove the new encounter',()=>{
 const pool=new EnemyViewPool(1),d=new AnimationDirector();
 const enemy=spawnEncounter('boss',1,0,[{enemyId:'boar_chief',count:1}],stageEnemies,50).entities[0]!;const rect=()=>({x:0,y:0,width:146,height:132}),view=pool.project([enemy],rect)[0]!;assert.equal(view.boss,true);
 const mount=d.mount(view.id,()=>{});let running=0;const ticket=d.play(mount,'boss.death','death',()=>{running++;return()=>{running--;};})!;
 d.unmount(mount);pool.reset();const next=pool.project([{...enemy,id:'next'}],rect)[0]!;assert.equal(d.finish(ticket),false);assert.equal(pool.release(view.id,view.lease),false);assert.equal(pool.size,1);assert.equal(next.phase,'alive');assert.equal(running,0);d.dispose();
});
