import {test} from 'node:test';import assert from 'node:assert/strict';
import {createState,assertState} from '../../src/model/GameState';
import {SeededRng} from '../../src/ports/SeededRng';
import {grantReward} from '../../src/systems/RewardService';
import {Dispatcher} from '../../src/commands/Dispatcher';
import {TransactionCoordinator} from '../../src/systems/TransactionCoordinator';
import {MemorySaveStore,FakeClock} from '../../src/ports';
import {occupancy,canClaimSource} from '../../src/selectors';
test('64 generated boards and 1024 reward/reject/retry commands preserve ownership, balance and watermarks',async()=>{
 const random=new SeededRng([31,41,59,26]);let accepted=0;
 for(let seed=0;seed<64;seed++){
  const s=createState({dataVersion:'generated-v1',initialGold:'100',utcMs:0,unlockedSlots:5+random.below(11)});
  for(const slot of s.data.board)if(slot.unlocked&&random.below(2)){
   const id=`hero_${s.data.nextInstanceSequence++}`;slot.unitId=id;s.data.heroes.push({id,slotId:slot.slotId,tier:1+random.below(9),definitionId:'fixture',upgradeLevel:0,deployed:false,equippedItemIds:[]});
  }
  assertState(s);const occupied=occupancy(s).occupied,store=new MemorySaveStore();
  const dispatcher=new Dispatcher(s,(draft,c:{type:string;commandId:string;source:string;reject:boolean})=>{
   if(c.reject){draft.data.currencies.gold='0';draft.data.rng.rewardState=[9,9,9,9];return {ok:false,reason:'LOCKED'};}
   const r=grantReward(draft,c.commandId,c.source,[{kind:'currency',id:'gold',amount:'7'}],{currencies:['gold'],items:{},freeSpinId:'fortune'});
   return {ok:true,events:r.duplicate?[]:[{type:'reward',payload:r.receipt}]};
  },new TransactionCoordinator(store,new FakeClock(),'generated').commit);
  const granted=new Set<string>();
  for(let i=0;i<16;i++){
   const source=`source_${random.below(8)}`,reject=random.below(4)===0,fail=random.below(7)===0;
   const before=JSON.stringify(dispatcher.getSnapshot());if(fail)store.failNext='write';
   const result=await dispatcher.dispatch({type:'grant',commandId:`case_${i}`,source,reject});
   if(result.ok){accepted++;granted.add(source);}else assert.equal(JSON.stringify(dispatcher.getSnapshot()),before);
   store.failNext=null;const state=dispatcher.getSnapshot();assertState(state);assert.equal(occupancy(state).occupied,occupied);assert.equal(state.data.currencies.gold,String(100+granted.size*7));
   for(const key of granted){assert.equal(canClaimSource(state,key),false);assert.ok(state.data.sourceWatermarks[key]!>0);}
  }
 }
 assert.ok(accepted>500);
});
