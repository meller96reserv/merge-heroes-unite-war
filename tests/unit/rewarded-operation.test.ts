import test from 'node:test';import assert from 'node:assert/strict';
import {createState} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {Dispatcher,type Command} from '../../game-core/src/commands/Dispatcher';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
import {grantReward} from '../../game-core/src/systems/RewardService';
import {rewardCatalog} from '../../game-core/src/content/PlayableConfig';
import {reserveRewardedOperation,recordRewardedResult,consumeRewardedOperation,REWARDED_ATTEMPT_MS,type RewardedBinding} from '../../game-core/src/rewards/RewardedOperation';
const binding:RewardedBinding={id:'ad:1',placement:'wheel',outcomeId:'spin:1',sessionId:'session:1'};
const setup=()=>{const state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),clock=new FakeClock(1000);reserveRewardedOperation(state,binding,clock);return {state,clock};};
test('only the matching current SDK completion confirms; cancellation and stale callbacks grant nothing',()=>{
 for(const status of ['cancelled','failed','unavailable'] as const){
  const {state,clock}=setup();assert.equal(recordRewardedResult(state,{...binding,status},binding.sessionId,clock),true);
  assert.equal(consumeRewardedOperation(state,binding.id,'wheel',binding.outcomeId),false);assert.equal(state.data.currencies.gold,'100');
 }
 for(const change of [{id:'unknown'}, {placement:'freeCoins' as const}, {outcomeId:'spin:2'}, {sessionId:'session:2'}]){
  const {state,clock}=setup(),before=encodeSave(state);
  assert.equal(recordRewardedResult(state,{...binding,...change,status:'completed'},binding.sessionId,clock),false);assert.equal(encodeSave(state),before);
 }
 const {state,clock}=setup();
 assert.equal(recordRewardedResult(state,{...binding,status:'completed'},'session:after-restart',clock),false);
 clock.wall=999;assert.equal(recordRewardedResult(state,{...binding,status:'completed'},binding.sessionId,clock),false);
 clock.wall=1000+REWARDED_ATTEMPT_MS;assert.equal(recordRewardedResult(state,{...binding,status:'completed'},binding.sessionId,clock),false);
});
test('retry invalidates the old attempt, confirmed operation survives restart and consumes once',()=>{
 const {state,clock}=setup(),newBinding={...binding,id:'ad:2'};
 reserveRewardedOperation(state,newBinding,clock);
 assert.equal(recordRewardedResult(state,{...binding,status:'completed'},binding.sessionId,clock),false);
 assert.equal(recordRewardedResult(state,{...newBinding,status:'completed'},binding.sessionId,clock),true);
 assert.equal(recordRewardedResult(state,{...newBinding,status:'completed'},binding.sessionId,clock),false);
 const restored=decodeSave(encodeSave(state));
 assert.throws(()=>reserveRewardedOperation(restored,{...binding,id:'ad:3'},clock));
 assert.equal(consumeRewardedOperation(restored,'ad:2','freeCoins','spin:1'),false);
 assert.equal(consumeRewardedOperation(restored,'ad:2','wheel','spin:wrong'),false);
 assert.equal(consumeRewardedOperation(restored,'ad:2','wheel','spin:1'),true);
 assert.equal(consumeRewardedOperation(restored,'ad:2','wheel','spin:1'),false);
});
test('confirmed consumption and reward share the durable barrier through save failures/restart',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const {state,clock}=setup();recordRewardedResult(state,{...binding,status:'completed'},binding.sessionId,clock);
  const store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'rewarded').commit;
  const reducer=(s:typeof state,c:Command)=>{
   if(!consumeRewardedOperation(s,'ad:1','wheel','spin:1')) return {ok:false as const,reason:'LOCKED' as const};
   grantReward(s,c.commandId,'wheel:spin:1',[{kind:'currency',id:'gold',amount:'1000'}],rewardCatalog);
   return {ok:true as const,events:[{type:'reward.committed',payload:{}}]};
  };
  const dispatcher=new Dispatcher(state,reducer,commit);store.failNext=point;
  assert.deepEqual(await dispatcher.dispatch({type:'Claim',commandId:'claim:1'}),{ok:false,reason:'SAVE_FAILED'});
  assert.equal(dispatcher.getSnapshot().data.currencies.gold,'100');assert.equal(dispatcher.getSnapshot().data.rewardedOperations?.['ad:1']?.status,'confirmed');
  assert.equal((await dispatcher.dispatch({type:'Claim',commandId:'claim:1'})).ok,true);
  const restored=new Dispatcher(decodeSave(encodeSave(dispatcher.getSnapshot() as typeof state)),reducer,commit);
  assert.deepEqual(await restored.dispatch({type:'Claim',commandId:'claim:2'}),{ok:false,reason:'LOCKED'});
  assert.equal(restored.getSnapshot().data.currencies.gold,'1100');assert.equal(restored.getSnapshot().data.transactionReceipts.length,1);
 }
});
test('failed confirmation persistence never installs eligibility; retry preserves the exact operation',async()=>{
 const {state,clock}=setup(),store=new MemorySaveStore();
 const dispatcher=new Dispatcher(state,(s,c:Command)=>recordRewardedResult(s,{...binding,status:'completed'},binding.sessionId,clock)?{ok:true,events:[{type:'ad.confirmed',payload:{id:binding.id}}]}:{ok:false,reason:'LOCKED'},new TransactionCoordinator(store,clock,'confirm').commit);
 store.failNext='write';
 assert.deepEqual(await dispatcher.dispatch({type:'Confirm',commandId:'confirm:1'}),{ok:false,reason:'SAVE_FAILED'});
 assert.equal(dispatcher.getSnapshot().data.rewardedOperations?.[binding.id]?.status,'reserved');
 assert.equal((await dispatcher.dispatch({type:'Confirm',commandId:'confirm:1'})).ok,true);
 assert.equal(dispatcher.getSnapshot().data.rewardedOperations?.[binding.id]?.status,'confirmed');
 assert.equal(dispatcher.getSnapshot().data.currencies.gold,'100');
});
