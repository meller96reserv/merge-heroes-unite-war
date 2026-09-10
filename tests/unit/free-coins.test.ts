import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {recoverSave} from '../../game-core/src/persistence/SaveRecovery';
const setup=()=>{const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'free-coins').commit;return {clock,store,commit,game:new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),commit,clock,'session:1')};};
async function begin(game:GameRuntime){assert.equal((await game.dispatcher.dispatch({type:'BeginFreeCoinsAd',commandId:game.nextId('begin')})).ok,true);return Object.values(game.dispatcher.getSnapshot().data.rewardedOperations!).find(op=>op.placement==='freeCoins'&&['reserved','confirmed'].includes(op.status))!;}
test('1000 gold per completed video, unlimited independent videos at the same time and no duplicate grants',async()=>{
 const {game}=setup(),d=game.dispatcher;
 for(let i=0;i<40;i++){
  const op=await begin(game),claim={type:'ClaimFreeCoins' as const,commandId:`coinsClaim:${op.id}`,operationId:op.id};
  assert.deepEqual(await d.dispatch(claim),{ok:false,reason:'LOCKED'});
  assert.equal((await d.dispatch({type:'RecordFreeCoinsAd',commandId:game.nextId('result'),result:{...op,status:'completed'}})).ok,true);
  const [a,b]=await Promise.all([d.dispatch(claim),d.dispatch(claim)]);assert.equal(a.ok,true);assert.equal(b.ok&&b.duplicate,true);
  assert.deepEqual(await d.dispatch({...claim,commandId:game.nextId('duplicate')}),{ok:false,reason:'LOCKED'});
  assert.equal(d.getSnapshot().data.currencies.gold,String(100+(i+1)*1000));
 }
 assert.equal(d.getSnapshot().data.transactionReceipts.filter(r=>r.source.startsWith('freeCoins:')).length,40);
});
test('cancel, no fill, failure, stale session and wrong placement never authorize coins',async()=>{
 for(const status of ['cancelled','unavailable','failed'] as const){
  const {game,clock,store,commit}=setup(),d=game.dispatcher,op=await begin(game);
  assert.equal((await d.dispatch({type:'RecordFreeCoinsAd',commandId:'result:wrong',result:{...op,placement:'wheel',status:'completed'}})).ok,false);
  assert.equal((await d.dispatch({type:'RecordFreeCoinsAd',commandId:'result:cancel',result:{...op,status}})).ok,true);
  assert.equal((await d.dispatch({type:'ClaimFreeCoins',commandId:'claim',operationId:op.id})).ok,false);
  const next=await begin(game);assert.notEqual(next.id,op.id);
  const saved=recoverSave(await store.readCandidates('free-coins'),['playable-v1']);assert.equal(saved.status,'recovered');if(saved.status!=='recovered')throw Error('recovery');
  const restored=new GameRuntime(saved.state,commit,clock,'session:2');
  assert.equal((await restored.dispatcher.dispatch({type:'RecordFreeCoinsAd',commandId:'late',result:{...next,status:'completed'}})).ok,false);
  assert.equal(restored.dispatcher.getSnapshot().data.currencies.gold,'100');
 }
});
test('write/verify/flush claim failure keeps confirmed eligibility; restart and retry can pay only once',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const {game,store,clock,commit}=setup(),d=game.dispatcher,op=await begin(game);
  await d.dispatch({type:'RecordFreeCoinsAd',commandId:'completed',result:{...op,status:'completed'}});
  const claim={type:'ClaimFreeCoins' as const,commandId:`coinsClaim:${op.id}`,operationId:op.id};store.failNext=point;
  assert.deepEqual(await d.dispatch(claim),{ok:false,reason:'SAVE_FAILED'});assert.equal(d.getSnapshot().data.currencies.gold,'100');assert.equal(d.getSnapshot().data.rewardedOperations![op.id]!.status,'confirmed');
  assert.equal((await d.dispatch(claim)).ok,true);
  const saved=recoverSave(await store.readCandidates('free-coins'),['playable-v1']);if(saved.status!=='recovered')throw Error('recovery');
  const restored=new GameRuntime(saved.state,commit,clock,'session:2');assert.equal((await restored.dispatcher.dispatch(claim)).ok,true);assert.equal(restored.dispatcher.getSnapshot().data.currencies.gold,'1100');
 }
});
