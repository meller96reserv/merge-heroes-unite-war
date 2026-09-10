import test from 'node:test';
import assert from 'node:assert/strict';
import { EventBus, type DomainEvent } from '../src/events/EventBus';
import { FakeClock, FakeRNG, MemorySaveStore, RecordingServices } from '../src/ports';
const event = (id: string): DomainEvent<'test', {value:number}> => ({eventId:id,transactionId:id,revision:1,simulationTick:0,type:'test',payload:{value:1}});
test('TASK-0051 immutable copy, stable order, reentrant queue, observer isolation and disposal', () => {
  const errors: unknown[]=[]; const seen:string[]=[]; const bus=new EventBus(e=>errors.push(e));
  const original=event('first');
  const dispose=bus.subscribe(b=>{seen.push('A:'+b[0]!.eventId);if(b[0]!.eventId==='first')bus.publish([event('nested')]);});
  const bad=bus.subscribe(b=>{assert.equal(Reflect.set(b[0]!.payload as object,'value',99),false); throw Error('listener fails');});
  const last=bus.subscribe(b=>seen.push('B:'+b[0]!.eventId));
  bus.publish([original]);
  assert.deepEqual(seen,['A:first','B:first','A:nested','B:nested']);assert.equal(errors.length,2);assert.equal(original.payload.value,1);
  dispose();dispose();bad();last();assert.equal(bus.listenerCount,0);
  for(let i=0;i<10;i++){bus.subscribe(()=>{})();}assert.equal(bus.listenerCount,0);
});
test('TASK-0052 deterministic ports, namespace isolation, injected save failure leaves prior bytes', async()=>{
  const clock=new FakeClock(100);clock.advance(50);assert.deepEqual([clock.utcMs(),clock.monotonicMs()],[150,50]);assert.throws(()=>clock.advance(-1));
  const rng=new FakeRNG([4,7]);assert.deepEqual([rng.nextUint32(),rng.nextUint32(),rng.nextUint32(),rng.snapshot()],[4,7,4,3]);
  const store=new MemorySaveStore();await store.writeCandidate('guest','A','old');store.failNext='write';await assert.rejects(store.writeCandidate('guest','A','new'));
  assert.equal(await store.verifyCandidate('guest','A'),'old');assert.deepEqual(await store.readCandidates('other'),[]);
  const services=new RecordingServices();services.error('failed',null);services.track('opened',{count:1});assert.equal(services.errors.length,1);assert.equal(services.events.length,1);
});
