import {test} from 'node:test'; import assert from 'node:assert/strict';
import {createState} from '../src/model/GameState';
import {grantReward, type RewardCatalog} from '../src/systems/RewardService';
import {Dispatcher} from '../src/commands/Dispatcher';
import {TransactionCoordinator} from '../src/systems/TransactionCoordinator';
import {FakeClock, MemorySaveStore} from '../src/ports';
const catalog: RewardCatalog = {currencies: ['gold','gem'], items: {sword: {slotType: 'weapon'}}, freeSpinId: 'fortune'};
const initial = () => createState({dataVersion:'test',initialGold:'9',utcMs:0});
test('mixed grants are exact, atomic and source-idempotent even with another command ID', () => {
  const s = initial(), grants = [{kind:'currency',id:'gold',amount:'9007199254740993'},{kind:'item',id:'sword',amount:'2'},{kind:'freeSpin',id:'fortune',amount:'3'}] as const;
  const first = grantReward(s,'claim1','source1',grants,catalog), before = JSON.stringify(s);
  assert.equal(s.data.currencies.gold,'9007199254741002'); assert.equal(s.data.equipment.length,2); assert.equal(s.data.wheel.freeSpins,3);
  assert.equal(grantReward(s,'claim2','source1',[],catalog).receipt,first.receipt); assert.equal(JSON.stringify(s),before);
  assert.throws(() => grantReward(s,'claim3','source2',[{kind:'currency',id:'gold',amount:'2'},{kind:'item',id:'missing',amount:'1'}],catalog));
  assert.equal(JSON.stringify(s),before);
  s.data.transactionReceipts=[]; assert.equal(grantReward(s,'claim4','source1',grants,catalog).duplicate,true);
  assert.equal(s.data.currencies.gold,'9007199254741002');
});
test('failed durable reward emits nothing; retry and reentrant duplicate pay once', async () => {
  const store=new MemorySaveStore(), coordinator=new TransactionCoordinator(store,new FakeClock(),'test');
  const d=new Dispatcher(initial(),(s,c)=>{const r=grantReward(s,c.commandId,'source',[{kind:'currency',id:'gold',amount:'5'}],catalog);return {ok:true,events:r.duplicate?[]:[{type:'RewardGranted',payload:r.receipt}]};},coordinator.commit);
  let events=0; d.events.subscribe(batch=>{events+=batch.length; if(batch.length) void d.dispatch({type:'claim',commandId:'claim2'});});
  store.failNext='flush'; assert.deepEqual(await d.dispatch({type:'claim',commandId:'claim1'}),{ok:false,reason:'SAVE_FAILED'}); assert.equal(d.getSnapshot().data.currencies.gold,'9'); assert.equal(events,0);
  assert.equal((await d.dispatch({type:'claim',commandId:'claim1'})).ok,true);
  await d.dispatch({type:'claim',commandId:'claim2'}); assert.equal(events,1); assert.equal(d.getSnapshot().data.currencies.gold,'14'); assert.equal(d.getSnapshot().data.transactionReceipts.length,1);
});
