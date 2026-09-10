import {test} from 'node:test';import assert from 'node:assert/strict';
import {createState,assertState} from '../../src/model/GameState';import {heroes,offers,mergeRules} from '../../src/content/PlayableConfig';import {purchaseHero,type PurchaseHero} from '../../src/commands/PurchaseHero';import {mergeHeroes,type MergeHeroes} from '../../src/commands/MergeHeroes';import {runAutoMerge} from '../../src/systems/AutoMergeSystem';import {Dispatcher} from '../../src/commands/Dispatcher';import {MemorySaveStore,FakeClock} from '../../src/ports';import {TransactionCoordinator} from '../../src/systems/TransactionCoordinator';import {decodeSave} from '../../src/persistence/SaveCodec';
test('20 rapid purchases serialize with cascades, spend exact funds and survive interrupted observers',async()=>{
 const s=createState({dataVersion:'playable-v1',initialGold:'20',utcMs:0,unlockedSlots:5});s.data.autoMerge={enabled:true,entitlementId:'fixture',expiresAtUtcMs:3600000,lastObservedWallUtcMs:0};
 const rules={...mergeRules,autoPolicy:'slotOrder' as const,autoUnlockId:null},store=new MemorySaveStore();
 const d=new Dispatcher(s,(draft,c:PurchaseHero)=>{
  const result=purchaseHero(draft,c,offers,heroes);if(!result.ok||!result.events.length)return result;
  const cascade=runAutoMerge(draft,c.commandId,0,rules,heroes,()=>[]);if(!cascade.ok)return cascade;
  return {ok:true,events:[...result.events,...cascade.events]};
 },new TransactionCoordinator(store,new FakeClock(),'integration').commit);
 d.events.subscribe(()=>{throw Error('presentation interrupted');});
 const results=await Promise.all(Array.from({length:20},(_,i)=>d.dispatch({type:'BuyHero',commandId:`buy_${i}`,offerId:'buy_tier_1'})));
 assert.ok(results.every(r=>r.ok));const state=d.getSnapshot();assertState(state);assert.equal(state.data.currencies.gold,'0');assert.equal(state.data.heroes.reduce((sum,h)=>sum+2**h.tier,0),40);assert.equal(state.data.heroes.length,2);
 const before=JSON.stringify(state);assert.deepEqual(await d.dispatch({type:'BuyHero',commandId:'one-too-many',offerId:'buy_tier_1'}),{ok:false,reason:'INSUFFICIENT_GOLD'});assert.equal(JSON.stringify(d.getSnapshot()),before);
});
test('deployed pair merges on a full board; failed flush restores either whole transaction, never half a merge',async()=>{
 const s=createState({dataVersion:'playable-v1',initialGold:'1',utcMs:0,unlockedSlots:5});
 for(let i=0;i<5;i++){const h=heroes.instantiate('hero_tier_1',`hero_${s.data.nextInstanceSequence++}`,i);h.deployed=i<3;s.data.heroes.push(h);s.data.board[i]!.unitId=h.id;}
 const store=new MemorySaveStore(),d=new Dispatcher(s,(draft,c:MergeHeroes|PurchaseHero)=>c.type==='BuyHero'?purchaseHero(draft,c,offers,heroes):mergeHeroes(draft,c,mergeRules,heroes,()=>[]),new TransactionCoordinator(store,new FakeClock(),'integration').commit);
 assert.deepEqual(await d.dispatch({type:'BuyHero',commandId:'full',offerId:'buy_tier_1'}),{ok:false,reason:'BOARD_FULL'});assert.equal(d.getSnapshot().data.currencies.gold,'1');
 const before=JSON.stringify(d.getSnapshot()),merge:MergeHeroes={type:'MergeHeroes',commandId:'merge1',sourceId:'hero_1',targetId:'hero_2'};store.failNext='flush';assert.equal((await d.dispatch(merge)).ok,false);assert.equal(JSON.stringify(d.getSnapshot()),before);
 const candidate=decodeSave((await store.readCandidates('integration'))[0]!.bytes);assertState(candidate);assert.equal(candidate.data.heroes.length,4);assert.equal(candidate.data.heroes.find(h=>h.slotId===1)!.tier,2);assert.equal(candidate.data.heroes.find(h=>h.slotId===1)!.deployed,true);
 assert.equal((await d.dispatch(merge)).ok,true);assert.equal(d.getSnapshot().data.heroes.length,4);assertState(d.getSnapshot());
});
