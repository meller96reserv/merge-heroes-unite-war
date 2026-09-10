import {test} from 'node:test';import assert from 'node:assert/strict';import {StageCatalog} from '../src/model/Stage';import {stageDefinitions,stageEnemies,firstClearRewards,stages} from '../src/content/StageConfig';
const refs={enemies:stageEnemies.map(e=>e.id),worlds:['floating_islands'],rewards:Object.keys(firstClearRewards)};
test('explicit six-stage graph preserves ordinal/waves/terminal and unique manual boss farm references',()=>{
 assert.deepEqual(stages.all().map(s=>s.ordinal),[1,2,3,4,5,6]);assert.equal(stages.get('stage_1_2').waves.length,2);assert.equal(stages.get('stage_1_6').nextStageId,null);assert.equal(stages.bossForFarm('stage_1_2')?.id,'stage_1_3');assert.ok(Object.isFrozen(stages.get('stage_1_3').boss));
});
test('reject duplicate ordinals, dangling next/enemy/world/reward, cycle and invalid farm/timer/capacity',()=>{
 const mutations=[(d:any)=>d[1].ordinal=1,(d:any)=>d[0].nextStageId='missing',(d:any)=>d[0].waves[0].enemyId='missing',(d:any)=>d[0].worldId='missing',(d:any)=>d[0].firstClearRewardId='missing',(d:any)=>d[5].nextStageId=d[0].id,(d:any)=>d[2].boss.farmStageId=d[2].id,(d:any)=>d[2].boss.timerMs=0,(d:any)=>d[0].waves[0].count=33];
 for(const mutate of mutations){const d=JSON.parse(JSON.stringify(stageDefinitions));mutate(d);assert.throws(()=>new StageCatalog(d,refs));}
});
