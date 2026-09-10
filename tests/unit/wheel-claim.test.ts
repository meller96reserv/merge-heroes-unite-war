import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
import type {RewardedBinding} from '../../game-core/src/rewards/RewardedOperation';
async function setup(outcome='fortune_v1_1'){
 const state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000});
 state.data.wheel={nextFreeAt:43_201_000,freeSpins:0,pendingSpin:{id:'spin:1',outcomeId:outcome,rewardId:outcome,status:'reserved'}};
 state.data.nextInstanceSequence=2;
 const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'wheel').commit;
 const game=new GameRuntime(state,commit,clock,'session:1');
 assert.equal((await game.dispatcher.dispatch({type:'BeginWheelAd',commandId:'ad:begin',spinId:'spin:1'})).ok,true);
 const operation=Object.values(game.dispatcher.getSnapshot().data.rewardedOperations!)[0]!;
 const binding:RewardedBinding={id:operation.id,placement:operation.placement,outcomeId:operation.outcomeId,sessionId:operation.sessionId};
 return {game,clock,store,commit,binding};
}
test('all twelve saved outcomes require completed video and grant exact gold/free-spin/empty receipt once',async()=>{
 const amounts=['10000','100','0','500','1000','200','0','300','0','5000','150','800'];
 for(let i=0;i<12;i++){
  const {game,clock,commit,binding}=await setup(`fortune_v1_${i}`),d=game.dispatcher;
  const claim={type:'CompleteSpin' as const,commandId:'claim:1',spinId:'spin:1',operationId:binding.id};
  assert.deepEqual(await d.dispatch(claim),{ok:false,reason:'LOCKED'});
  assert.equal((await d.dispatch({type:'RecordWheelAd',commandId:'ad:result',result:{...binding,status:'completed'}})).ok,true);
  const [a,b]=await Promise.all([d.dispatch(claim),d.dispatch(claim)]);assert.equal(a.ok,true);assert.equal(b.ok&&b.duplicate,true);
  assert.equal(d.getSnapshot().data.currencies.gold,String(100+Number(amounts[i])));
  assert.equal(d.getSnapshot().data.wheel.freeSpins,i===6?3:0);
  assert.equal(d.getSnapshot().data.wheel.pendingSpin?.status,'committed');
  const restored=new GameRuntime(decodeSave(encodeSave(d.getSnapshot() as ReturnType<typeof createState>)),commit,clock,'session:2');
  assert.deepEqual(await restored.dispatcher.dispatch({...claim,commandId:'claim:again'}),{ok:false,reason:'LOCKED'});
  assert.equal(restored.dispatcher.getSnapshot().data.currencies.gold,d.getSnapshot().data.currencies.gold);
 }
});
test('cancel/no-fill/failed videos preserve the pending prize, then a new confirmed attempt can claim',async()=>{
 for(const status of ['cancelled','failed','unavailable'] as const){
  const {game,binding}=await setup(),d=game.dispatcher;
  await d.dispatch({type:'RecordWheelAd',commandId:'ad:result',result:{...binding,status}});
  assert.deepEqual(await d.dispatch({type:'CompleteSpin',commandId:'claim:1',spinId:'spin:1',operationId:binding.id}),{ok:false,reason:'LOCKED'});
  assert.equal(d.getSnapshot().data.wheel.pendingSpin?.status,'reserved');assert.equal(d.getSnapshot().data.currencies.gold,'100');
  assert.equal((await d.dispatch({type:'BeginWheelAd',commandId:'ad:retry',spinId:'spin:1'})).ok,true);
  const next=Object.values(d.getSnapshot().data.rewardedOperations!).find(op=>op.status==='reserved')!;
  assert.notEqual(next.id,binding.id);
  assert.equal((await d.dispatch({type:'RecordWheelAd',commandId:'ad:retry-result',result:{...next,status:'completed'}})).ok,true);
  assert.equal((await d.dispatch({type:'CompleteSpin',commandId:'claim:retry',spinId:'spin:1',operationId:next.id})).ok,true);
  assert.equal(d.getSnapshot().data.currencies.gold,'200');
 }
});
test('failed claim persistence keeps confirmed eligibility and retry cannot double pay',async()=>{
 const {game,store,binding}=await setup(),d=game.dispatcher;
 await d.dispatch({type:'RecordWheelAd',commandId:'ad:result',result:{...binding,status:'completed'}});
 store.failNext='write';
 const claim={type:'CompleteSpin' as const,commandId:'claim:1',spinId:'spin:1',operationId:binding.id};
 assert.deepEqual(await d.dispatch(claim),{ok:false,reason:'SAVE_FAILED'});
 assert.equal(d.getSnapshot().data.wheel.pendingSpin?.status,'reserved');assert.equal(d.getSnapshot().data.currencies.gold,'100');
 assert.equal(d.getSnapshot().data.rewardedOperations?.[binding.id]?.status,'confirmed');
 assert.equal((await d.dispatch(claim)).ok,true);assert.equal(d.getSnapshot().data.currencies.gold,'200');
});
