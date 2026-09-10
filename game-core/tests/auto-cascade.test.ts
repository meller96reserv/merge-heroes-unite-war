import {test} from 'node:test';import assert from 'node:assert/strict';import {SeededRng} from '../src/ports/SeededRng';import {HeroCatalog} from '../src/model/Hero';import {definition} from './hero.test';import {createState,assertState} from '../src/model/GameState';import {runAutoMerge} from '../src/systems/AutoMergeSystem';import type {AutoRules} from '../src/systems/AutoMergeSelector';
test('1000 seeded cascades conserve tier mass, terminate and reproduce results independent of presentation',()=>{
 const catalog=new HeroCatalog(Array.from({length:6},(_,i)=>definition(`tier${i+1}`,i+1))),rng=new SeededRng([7,8,9,10]);
 const config:AutoRules={manualEnabled:true,compatibility:'sameFamilyAndTier',maxTier:6,deployedPolicy:'preserveDestination',autoPolicy:'slotOrder',autoUnlockId:null,pairs:Array.from({length:5},(_,i)=>({sourceDefinitionId:`tier${i+1}`,targetDefinitionId:`tier${i+1}`,resultDefinitionId:`tier${i+2}`}))};
 for(let i=0;i<1000;i++){
  const s=createState({dataVersion:'test',initialGold:'0',utcMs:0}),count=1+rng.below(15);s.data.autoMerge={enabled:true,entitlementId:'test',expiresAtUtcMs:3600000,lastObservedWallUtcMs:0};
  for(let slot=0;slot<count;slot++){const h=catalog.instantiate(`tier${1+rng.below(6)}`,`hero_${s.data.nextInstanceSequence++}`,slot);s.data.heroes.push(h);s.data.board[slot]!.unitId=h.id;}
  const copy=JSON.parse(JSON.stringify(s)),mass=s.data.heroes.reduce((sum,h)=>sum+2**h.tier,0);
  const a=runAutoMerge(s,'root',0,config,catalog,()=>[]),b=runAutoMerge(copy,'root',0,config,catalog,()=>[]);assert.deepEqual(a,b);assert.deepEqual(s,copy);assertState(s);
  assert.equal(s.data.heroes.reduce((sum,h)=>sum+2**h.tier,0),mass);assert.ok(s.data.heroes.length>=1);assert.ok(s.data.heroes.length<=count);
  const settled=JSON.stringify(s);runAutoMerge(s,'root',0,config,catalog,()=>[]);assert.equal(JSON.stringify(s),settled);
 }
});
