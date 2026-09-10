import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState,draft} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {recoverSave} from '../../game-core/src/persistence/SaveRecovery';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
import {BOOST_OFFER_MS,reserveStageBoost} from '../../game-core/src/commands/ClaimStageBoost';
import {stages,stageEnemies} from '../../game-core/src/content/StageConfig';
async function setup(){
 const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'stage-boost').commit;
 const game=new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),commit,clock,'session:1');
 const encounterId='stage_1_1:0:0',entityId=encounterId+':enemy:0';
 const clear={type:'ClaimBattleRewards' as const,commandId:'battle:clear',encounterId,waveOrdinal:0,cleared:true,rng:[1,2,3,4],rewards:[{entityId,encounterId,source:`kill:${encounterId}:${entityId}`,rewardId:stageEnemies.find(e=>e.id===stages.get('stage_1_1').waves[0]!.enemyId)!.rewardId!}]};
 assert.equal((await game.dispatcher.dispatch(clear)).ok,true);const boost=Object.values(game.dispatcher.getSnapshot().data.stageBoosts!)[0]!;
 return {game,clock,store,commit,boost,clear};
}
test('real winning boundary creates the 2s offer from committed base; expiry/rollback cannot select and repeats cannot reroll',async()=>{
 const {game,clock,boost,clear}=await setup(),d=game.dispatcher;
 assert.equal(boost.baseGold,'6');assert.equal(d.getSnapshot().data.currencies.gold,'106');assert.equal(boost.offerEndsAt,1000+BOOST_OFFER_MS);
 await d.dispatch(clear);assert.equal(Object.keys(d.getSnapshot().data.stageBoosts!).length,1);
 const state=draft(d.getSnapshot()),before=encodeSave(state);clock.wall=999;assert.throws(()=>reserveStageBoost(state,{type:'ReserveStageBoost',commandId:'reserve',boostId:boost.id},clock));assert.equal(encodeSave(state),before);
 clock.wall=boost.offerEndsAt;assert.equal(reserveStageBoost(state,{type:'ReserveStageBoost',commandId:'reserve',boostId:boost.id},clock).ok,false);
 clock.wall=1500;assert.equal((await d.dispatch({type:'ReserveStageBoost',commandId:'reserve:1',boostId:boost.id})).ok,true);
 const chosen=d.getSnapshot().data.stageBoosts![boost.id]!,rng=d.getSnapshot().data.rng.rewardState;
 assert.ok(chosen.multiplier!>=1&&chosen.multiplier!<=10);clock.advance(100000);
 await d.dispatch({type:'ReserveStageBoost',commandId:'reserve:2',boostId:boost.id});assert.deepEqual(d.getSnapshot().data.rng.rewardState,rng);assert.equal(d.getSnapshot().data.stageBoosts![boost.id]!.multiplier,chosen.multiplier);
});
test('x1 through x10 grant only exact delta, including zero, after completion; restart/duplicate cannot repay',async()=>{
 for(let multiplier=1;multiplier<=10;multiplier++){
  const {game,clock,commit,boost}=await setup(),initial=draft(game.dispatcher.getSnapshot());
  initial.data.stageBoosts![boost.id]!.status='reserved';initial.data.stageBoosts![boost.id]!.multiplier=multiplier;
  const restored=new GameRuntime(decodeSave(encodeSave(initial)),async()=>{},clock,'session:2'),d=restored.dispatcher;
  await d.dispatch({type:'BeginStageBoostAd',commandId:'begin',boostId:boost.id});const op=Object.values(d.getSnapshot().data.rewardedOperations!)[0]!;
  const claim={type:'ClaimStageBoost' as const,commandId:`boostClaim:${boost.id}`,boostId:boost.id,operationId:op.id};
  assert.equal((await d.dispatch(claim)).ok,false);assert.equal(d.getSnapshot().data.currencies.gold,'106');
  await d.dispatch({type:'RecordStageBoostAd',commandId:'completed',result:{...op,status:'completed'}});await d.dispatch(claim);await d.dispatch(claim);
  assert.equal(d.getSnapshot().data.currencies.gold,String(100+6*multiplier));assert.equal(d.getSnapshot().data.transactionReceipts.at(-1)!.grants[0]!.amount,String(6*(multiplier-1)));
  const restart=new GameRuntime(decodeSave(encodeSave(draft(d.getSnapshot()))),async()=>{},clock,'session:3');assert.equal((await restart.dispatcher.dispatch({...claim,commandId:'duplicate'})).ok,false);assert.equal(restart.dispatcher.getSnapshot().data.currencies.gold,String(100+6*multiplier));
 }
});
test('cancelled video preserves selected multiplier; confirmed write/verify/flush failure remains retryable without another ad',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const {game,clock,store,commit,boost}=await setup(),d=game.dispatcher;
  await d.dispatch({type:'ReserveStageBoost',commandId:'select',boostId:boost.id});const selected=d.getSnapshot().data.stageBoosts![boost.id]!;
  await d.dispatch({type:'BeginStageBoostAd',commandId:'begin',boostId:boost.id});let op=Object.values(d.getSnapshot().data.rewardedOperations!).find(o=>o.status==='reserved')!;
  await d.dispatch({type:'RecordStageBoostAd',commandId:'cancel',result:{...op,status:'cancelled'}});assert.equal((await d.dispatch({type:'ClaimStageBoost',commandId:'cancelClaim',operationId:op.id,boostId:boost.id})).ok,false);
  await d.dispatch({type:'BeginStageBoostAd',commandId:'again',boostId:boost.id});op=Object.values(d.getSnapshot().data.rewardedOperations!).find(o=>o.status==='reserved')!;
  await d.dispatch({type:'RecordStageBoostAd',commandId:'completed',result:{...op,status:'completed'}});
  const claim={type:'ClaimStageBoost' as const,commandId:`boostClaim:${boost.id}`,boostId:boost.id,operationId:op.id};store.failNext=point;assert.deepEqual(await d.dispatch(claim),{ok:false,reason:'SAVE_FAILED'});assert.equal(d.getSnapshot().data.currencies.gold,'106');assert.equal(d.getSnapshot().data.stageBoosts![boost.id]!.multiplier,selected.multiplier);
  await d.dispatch(claim);const saved=recoverSave(await store.readCandidates('stage-boost'),['playable-v1']);if(saved.status!=='recovered')throw Error('recovery');const restart=new GameRuntime(saved.state,commit,clock,'session:3');await restart.dispatcher.dispatch(claim);assert.equal(restart.dispatcher.getSnapshot().data.currencies.gold,String(100+6*selected.multiplier!));
 }
});
test('failed multiplier reservation retains the same draw across retry and recovered saved outcome',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const {game,clock,store,commit,boost}=await setup(),d=game.dispatcher,select={type:'ReserveStageBoost' as const,commandId:'select',boostId:boost.id};
  const originalRng=d.getSnapshot().data.rng.rewardState;store.failNext=point;
  assert.deepEqual(await d.dispatch(select),{ok:false,reason:'SAVE_FAILED'});assert.equal(d.getSnapshot().data.stageBoosts![boost.id]!.multiplier,null);assert.deepEqual(d.getSnapshot().data.rng.rewardState,originalRng);
  const candidatesBefore=await store.readCandidates('stage-boost');const maybeWritten=recoverSave(candidatesBefore,['playable-v1']);
  assert.equal((await d.dispatch(select)).ok,true);const chosen=d.getSnapshot().data.stageBoosts![boost.id]!.multiplier;
  if(maybeWritten.status==='recovered'&&maybeWritten.state.data.stageBoosts![boost.id]!.status==='reserved')assert.equal(maybeWritten.state.data.stageBoosts![boost.id]!.multiplier,chosen);
  const recovered=recoverSave(await store.readCandidates('stage-boost'),['playable-v1']);if(recovered.status!=='recovered')throw Error('recovery');
  clock.advance(30000);const restart=new GameRuntime(recovered.state,commit,clock,'session:2');await restart.dispatcher.dispatch({...select,commandId:'reopen'});assert.equal(restart.dispatcher.getSnapshot().data.stageBoosts![boost.id]!.multiplier,chosen);
 }
});
