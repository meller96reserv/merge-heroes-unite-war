import {test} from 'node:test';import assert from 'node:assert/strict';
import {claimBattleRewards,type ClaimBattleRewards} from '../src/systems/KillRewardService';import {createState,draft} from '../src/model/GameState';import {Dispatcher} from '../src/commands/Dispatcher';import {killRewards} from '../src/content/BattleConfig';import {rewardCatalog} from '../src/content/PlayableConfig';import {MemorySaveStore,FakeClock} from '../src/ports';import {TransactionCoordinator} from '../src/systems/TransactionCoordinator';import {recoverSave} from '../src/persistence/SaveRecovery';
const reduce=(s:ReturnType<typeof createState>,c:ClaimBattleRewards)=>claimBattleRewards(s,c,killRewards,rewardCatalog);
export const claim=(n=0):ClaimBattleRewards=>{const encounterId=`stage_1_1:${n}:0`,entityId=`${encounterId}:enemy:0`;return {type:'ClaimBattleRewards',commandId:`battle:${n}`,encounterId,waveOrdinal:0,rewards:[{encounterId,entityId,source:`kill:${encounterId}:${entityId}`,rewardId:'early_boar'}],cleared:true,rng:[1,2,3,4]};};
test('kill, RNG and next encounter commit atomically; duplicate/reopen/pruned receipts never pay twice',async()=>{
 const store=new MemorySaveStore(),clock=new FakeClock(100),coordinator=new TransactionCoordinator(store,clock,'test');let d=new Dispatcher(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0}),reduce,coordinator.commit);
 for(let n=0;n<20;n++){const results=await Promise.all([d.dispatch(claim(n)),d.dispatch(claim(n))]);assert.ok(results.every(r=>r.ok));}
 assert.equal(d.getSnapshot().data.currencies.gold,'120');assert.equal(d.getSnapshot().data.stages.encounterSequence,20);
 const recovered=recoverSave(await store.readCandidates('test'),['playable-v1']);assert.equal(recovered.status,'recovered');if(recovered.status!=='recovered')throw Error('No save');recovered.state.data.transactionReceipts=[];
 d=new Dispatcher(recovered.state,reduce,coordinator.commit);assert.ok((await d.dispatch({...claim(0),commandId:'replay'})).ok);assert.equal(d.getSnapshot().data.currencies.gold,'120');assert.equal(d.getSnapshot().data.stages.encounterSequence,20);
 const before=draft(d.getSnapshot());assert.equal((await d.dispatch({...claim(21),commandId:'future'})).ok,false);assert.deepEqual(d.getSnapshot(),before);
});
test('save failures retain the old whole state and retry exact kill sources',async()=>{
 for(const point of ['write','verify','flush'] as const){const store=new MemorySaveStore(),coordinator=new TransactionCoordinator(store,new FakeClock(10),'test'),d=new Dispatcher(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0}),reduce,coordinator.commit);store.failNext=point;assert.deepEqual(await d.dispatch(claim()),{ok:false,reason:'SAVE_FAILED'});assert.equal(d.getSnapshot().data.currencies.gold,'100');assert.equal(d.getSnapshot().data.stages.encounterSequence,0);assert.ok((await d.dispatch(claim())).ok);assert.equal(d.getSnapshot().data.currencies.gold,'101');assert.equal(d.getSnapshot().data.stages.encounterSequence,1);}
});
test('forged source, duplicate entity and unsupported reward definition are rejected',()=>{
 for(const mutate of [(c:ClaimBattleRewards)=>{c.rewards=[{...c.rewards[0]!,source:'other'}];},(c:ClaimBattleRewards)=>{c.rewards=[...c.rewards,...c.rewards];},(c:ClaimBattleRewards)=>{c.rewards=[{...c.rewards[0]!,rewardId:'million'}];}]){const c=claim();mutate(c);const s=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0}),before=structuredClone(s);assert.equal(reduce(s,c).ok,false);assert.deepEqual(s,before);}
});
