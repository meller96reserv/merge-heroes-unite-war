import {test} from 'node:test';import assert from 'node:assert/strict';
import {purchaseHero,type PurchaseHero} from '../src/commands/PurchaseHero';import {Dispatcher} from '../src/commands/Dispatcher';import {createState} from '../src/model/GameState';
import {HeroCatalog} from '../src/model/Hero';import {definition} from './hero.test';import {offer} from './purchase-quote.test';import {MemorySaveStore,FakeClock} from '../src/ports';import {TransactionCoordinator} from '../src/systems/TransactionCoordinator';
const catalog=new HeroCatalog([definition()]),offers=[{...offer,prices:['10'],afterTable:'repeatLastProposed' as const}];
test('20 queued purchases accept exactly five slots, no negative balance, and survive duplicate after reload',async()=>{
 const store=new MemorySaveStore(),commit=new TransactionCoordinator(store,new FakeClock(),'buy').commit,reduce=(s:ReturnType<typeof createState>,c:PurchaseHero)=>purchaseHero(s,c,offers,catalog);
 const d=new Dispatcher(createState({dataVersion:'test',initialGold:'100',utcMs:0,unlockedSlots:5}),reduce,commit);
 const results=await Promise.all(Array.from({length:20},(_,i)=>d.dispatch({type:'BuyHero',commandId:`buy_${i}`,offerId:'buy'})));
 assert.equal(results.filter(r=>r.ok).length,5);assert.equal(d.getSnapshot().data.currencies.gold,'50');assert.equal(d.getSnapshot().data.heroes.length,5);
 const reloaded=new Dispatcher(JSON.parse(JSON.stringify(d.getSnapshot())),reduce,commit);await reloaded.dispatch({type:'BuyHero',commandId:'buy_0',offerId:'buy'});
 assert.equal(reloaded.getSnapshot().data.currencies.gold,'50');assert.equal(reloaded.getSnapshot().data.heroes.length,5);
});
test('equal price buys once; one less and failed save leave every authoritative field unchanged',async()=>{
 for(const gold of ['9','10']){
  const store=new MemorySaveStore(),d=new Dispatcher(createState({dataVersion:'test',initialGold:gold,utcMs:0}),(s,c:PurchaseHero)=>purchaseHero(s,c,offers,catalog),new TransactionCoordinator(store,new FakeClock(),'buy').commit);
  const before=JSON.stringify(d.getSnapshot());store.failNext='write';assert.equal((await d.dispatch({type:'BuyHero',commandId:'p',offerId:'buy'})).ok,false);assert.equal(JSON.stringify(d.getSnapshot()),before);
  store.failNext=null;const r=await d.dispatch({type:'BuyHero',commandId:'p',offerId:'buy'});assert.equal(r.ok,gold==='10');assert.equal(d.getSnapshot().data.currencies.gold,gold==='10'?'0':'9');
 }
});
