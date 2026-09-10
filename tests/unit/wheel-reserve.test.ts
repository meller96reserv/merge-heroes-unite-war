import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,draft} from '../../game-core/src/model/GameState';
import {Dispatcher} from '../../game-core/src/commands/Dispatcher';
import {reserveSpin,type ReserveSpin} from '../../game-core/src/commands/ReserveSpin';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {decodeSave,encodeSave} from '../../game-core/src/persistence/SaveCodec';
import {WHEEL_COOLDOWN_MS} from '../../game-core/src/systems/WheelOutcome';

const initial=()=>createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000});
const command:ReserveSpin={type:'ReserveSpin',commandId:'reserve:1'};
test('reserve is durable, consumes RNG once, and pending/duplicate/restart cannot reroll',async()=>{
 const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'wheel').commit;
 const reducer=(s:ReturnType<typeof initial>,c:ReserveSpin)=>reserveSpin(s,c,clock);
 const dispatcher=new Dispatcher(initial(),reducer,commit);
 const [a,b]=await Promise.all([dispatcher.dispatch(command),dispatcher.dispatch(command)]);
 assert.equal(a.ok,true);assert.equal(b.ok&&b.duplicate,true);
 const saved=draft(dispatcher.getSnapshot()),pending=saved.data.wheel.pendingSpin;
 assert.equal(saved.data.wheel.nextFreeAt,1000+WHEEL_COOLDOWN_MS);
 assert.equal(saved.data.currencies.gold,'100');
 const reloaded=decodeSave((await store.readCandidates('wheel'))[0]!.bytes);
 const restored=new Dispatcher(reloaded,reducer,commit);
 assert.equal((await restored.dispatch(command)).ok,true);
 assert.deepEqual(await restored.dispatch({...command,commandId:'reserve:2'}),{ok:false,reason:'LOCKED'});
 assert.deepEqual(restored.getSnapshot().data.wheel.pendingSpin,pending);
 assert.deepEqual(restored.getSnapshot().data.rng.rewardState,saved.data.rng.rewardState);
 clock.advance(WHEEL_COOLDOWN_MS*2);
 assert.deepEqual(await restored.dispatch({...command,commandId:'reserve:3'}),{ok:false,reason:'LOCKED'});
});
test('cooldown boundary, bonus entitlement and rollback preserve eligibility',()=>{
 const state=initial(),clock=new FakeClock(1000);
 state.data.wheel.nextFreeAt=1000+WHEEL_COOLDOWN_MS;
 const before=encodeSave(state);
 assert.equal(reserveSpin(state,command,clock).ok,false);assert.equal(encodeSave(state),before);
 state.data.wheel.freeSpins=3;
 clock.wall=999;assert.equal(reserveSpin(state,command,clock).ok,false);
 clock.wall=2000;assert.equal(reserveSpin(state,command,clock).ok,true);
 assert.equal(state.data.wheel.freeSpins,2);assert.equal(state.data.wheel.nextFreeAt,2000+WHEEL_COOLDOWN_MS);
 const boundary=initial();boundary.data.wheel.nextFreeAt=clock.wall;
 assert.equal(reserveSpin(boundary,command,clock).ok,true);
});
test('write/verify/flush failure installs nothing; retry and recovery preserve the selected result',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'wheel').commit;
  const dispatcher=new Dispatcher(initial(),(s,c:ReserveSpin)=>reserveSpin(s,c,clock),commit);
  const before=dispatcher.getSnapshot();store.failNext=point;
  assert.deepEqual(await dispatcher.dispatch(command),{ok:false,reason:'SAVE_FAILED'});
  assert.deepEqual(dispatcher.getSnapshot(),before);
  const candidate=(await store.readCandidates('wheel'))[0];
  assert.equal((await dispatcher.dispatch(command)).ok,true);
  if(candidate) assert.deepEqual(decodeSave(candidate.bytes).data.wheel,dispatcher.getSnapshot().data.wheel);
  assert.equal(dispatcher.getSnapshot().data.transactionReceipts.length,1);
 }
});
