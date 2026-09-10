import test from 'node:test';import assert from 'node:assert/strict';
import {Dispatcher,type Command} from '../src/commands/Dispatcher';import {createState} from '../src/model/GameState';import {MemorySaveStore,FakeClock} from '../src/ports';import {TransactionCoordinator,decodeCandidate} from '../src/systems/TransactionCoordinator';
const reduce=(s:ReturnType<typeof createState>,c:Command)=>{
 s.data.currencies.gold='90';s.data.sourceWatermarks.purchase=1;s.data.transactionReceipts.push({id:c.commandId,source:'test-purchase',generation:s.generation+1,grants:[]});return {ok:true as const,events:[{type:'purchased',payload:{amount:'10'}}]};
};
test('TASK-0073 write/read/flush failure preserves authoritative state/RNG/events and stable retry',async()=>{
 for(const point of ['write','verify','flush'] as const){
  const store=new MemorySaveStore(),clock=new FakeClock(10),coordinator=new TransactionCoordinator(store,clock,'test'),d=new Dispatcher(createState({dataVersion:'fixture',initialGold:'100',utcMs:1}),reduce,coordinator.commit);let emitted=0;d.events.subscribe(()=>emitted++);const before=JSON.stringify(d.getSnapshot());store.failNext=point;
  assert.deepEqual(await d.dispatch({type:'buy',commandId:'buy:1'}),{ok:false,reason:'SAVE_FAILED'});assert.equal(JSON.stringify(d.getSnapshot()),before);assert.equal(emitted,0);
  assert.ok((await d.dispatch({type:'buy',commandId:'buy:1'})).ok);assert.equal(d.getSnapshot().data.currencies.gold,'90');assert.equal(emitted,1);
  const bytes=(await store.readCandidates('test'))[0]!.bytes;assert.deepEqual(decodeCandidate(bytes),d.getSnapshot());
  await d.dispatch({type:'buy',commandId:'buy:1'});assert.equal(emitted,1);assert.equal(d.getSnapshot().data.transactionReceipts.length,1);
 }
});
test('TASK-0073 pending durability barrier publishes nothing before acknowledgement',async()=>{
 const store=new MemorySaveStore();let release!:()=>void;const original=store.flush.bind(store);store.flush=()=>new Promise<void>(resolve=>{release=()=>{void original().then(resolve);};});
 const d=new Dispatcher(createState({dataVersion:'fixture',initialGold:'100',utcMs:1}),reduce,new TransactionCoordinator(store,new FakeClock(10),'test').commit);let events=0;d.events.subscribe(()=>events++);
 const pending=d.dispatch({type:'buy',commandId:'buy:pending'});for(let i=0;i<30&&!release;i++)await Promise.resolve();assert.equal(d.getSnapshot().data.currencies.gold,'100');assert.equal(events,0);release();await pending;assert.equal(events,1);
});
test('retry after acknowledged bytes but failed flush reuses timestamp under generation CAS; unrelated candidate cannot overwrite',async()=>{
 const store=new MemorySaveStore(),clock=new FakeClock(10),write=store.writeCandidate.bind(store);
 store.writeCandidate=async(ns,slot,bytes)=>{for(const prior of await store.readCandidates(ns))if(decodeCandidate(prior.bytes).generation>=decodeCandidate(bytes).generation&&prior.bytes!==bytes)throw Error('Generation conflict');await write(ns,slot,bytes);};
 const coordinator=new TransactionCoordinator(store,clock,'test'),d=new Dispatcher(createState({dataVersion:'fixture',initialGold:'100',utcMs:1}),reduce,coordinator.commit);store.failNext='flush';assert.equal((await d.dispatch({type:'buy',commandId:'buy:retry'})).ok,false);const saved=(await store.readCandidates('test'))[0]!.bytes;clock.advance(999);
 assert.equal((await d.dispatch({type:'buy',commandId:'different'})).ok,false);assert.equal((await store.readCandidates('test'))[0]!.bytes,saved);
 assert.equal((await d.dispatch({type:'buy',commandId:'buy:retry'})).ok,true);assert.equal((await store.readCandidates('test'))[0]!.bytes,saved);assert.equal(d.getSnapshot().updatedAt,10);
});
