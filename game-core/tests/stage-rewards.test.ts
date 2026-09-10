import {test} from 'node:test';import assert from 'node:assert/strict';import {createState} from '../src/model/GameState';import {claimStageFirstClear} from '../src/systems/StageRewardService';import {advanceStage} from '../src/systems/StageSystem';import {claimBattleRewards,type ClaimBattleRewards} from '../src/systems/KillRewardService';import {stages,firstClearRewards,stageKillRewards} from '../src/content/StageConfig';import {rewardCatalog} from '../src/content/PlayableConfig';import {Dispatcher} from '../src/commands/Dispatcher';import {MemorySaveStore,FakeClock} from '../src/ports';import {TransactionCoordinator} from '../src/systems/TransactionCoordinator';import {decodeSave,encodeSave} from '../src/persistence/SaveCodec';
test('first clear is once per stage across repeat farming, pruning, reopen, and out-of-order lower clear',()=>{
 let s=createState({dataVersion:'playable-v1',initialGold:'0',utcMs:0});const grant=(id:string)=>claimStageFirstClear(s,stages.get(id),`clear:${id}`,firstClearRewards,rewardCatalog);
 grant('stage_1_3');assert.equal(s.data.currencies.gold,'40');assert.equal(s.data.progression.highestClearedOrdinal,3);grant('stage_1_1');assert.equal(s.data.currencies.gold,'45');assert.equal(s.data.progression.highestClearedOrdinal,3);s.data.transactionReceipts=[];s=decodeSave(encodeSave(s));assert.deepEqual(grant('stage_1_3'),[]);assert.equal(s.data.currencies.gold,'45');
});
test('kill + first clear + next stage share one durable barrier; no advance/grant on failure',async()=>{
 const state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0}),store=new MemorySaveStore();
 const d=new Dispatcher<ClaimBattleRewards>(state,(s,c)=>{
  const stageId=s.data.stages.currentStageId,sequence=s.data.stages.encounterSequence;
  const result=claimBattleRewards(s,c,stageKillRewards,rewardCatalog);if(!result.ok)return result;
  if(c.cleared)result.events.push(...advanceStage(s,{stageId,sequence,encounterId:c.encounterId,waveOrdinal:c.waveOrdinal,commandId:c.commandId},stages,(draft,stage,id)=>claimStageFirstClear(draft,stage,id,firstClearRewards,rewardCatalog)));
  return result;
 },new TransactionCoordinator(store,new FakeClock(10),'test').commit);
 const encounterId='stage_1_1:0:0',entityId=`${encounterId}:enemy:0`,c:ClaimBattleRewards={type:'ClaimBattleRewards',commandId:'clear:1',encounterId,waveOrdinal:0,rewards:[{encounterId,entityId,source:`kill:${encounterId}:${entityId}`,rewardId:'early_boar'}],cleared:true,rng:[1,2,3,4]};
 store.failNext='write';assert.equal((await d.dispatch(c)).ok,false);assert.equal(d.getSnapshot().data.currencies.gold,'100');assert.equal(d.getSnapshot().data.stages.currentStageId,'stage_1_1');
 assert.equal((await d.dispatch(c)).ok,true);assert.equal(d.getSnapshot().data.currencies.gold,'106');assert.equal(d.getSnapshot().data.stages.currentStageId,'stage_1_2');assert.equal(d.getSnapshot().data.progression.highestClearedOrdinal,1);await d.dispatch(c);assert.equal(d.getSnapshot().data.currencies.gold,'106');
});
