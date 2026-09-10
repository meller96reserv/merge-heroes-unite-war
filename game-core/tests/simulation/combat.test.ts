import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BattleSystem} from '../../src/systems/BattleSystem';
import {battleConfig} from '../../src/content/BattleConfig';
import {combatEntity, type CombatStats} from '../../src/model/CombatEntity';
import {SimulationClock} from '../../src/systems/SimulationClock';
import {chapterRecovery} from '../../src/systems/RecoveryPolicy';
import {HitQueue} from '../../src/systems/HitQueue';
import {DamageResolver} from '../../src/systems/DamageResolver';
import type {AttackIntent} from '../../src/systems/AttackSystem';
import type {Intent} from '../../src/commands/Dispatcher';
import {DamageLabelPool} from '../../../app/src/battle/DamageLabel';
const stats:CombatStats={attack:10,defense:0,hp:10000,attackIntervalMs:1000,critChanceBp:2500,critMultiplierBp:15000};
const entity=(id:string,side:'hero'|'enemy',overrides:Partial<CombatStats>={})=>combatEntity({id,side,definitionId:id,encounterId:'fixture',spawnOrdinal:0,stats:{...stats,...overrides},stepMs:50,hitDelayMs:150,canAttack:side==='hero',rewardId:side==='enemy'?'kill':null});
const intent=(id:string):AttackIntent=>({id,actorId:'hero',targetId:'enemy',encounterId:'fixture',createdTick:0,hitTick:3,sequence:1,attack:10,critChanceBp:0,critMultiplierBp:10000});
test('UT007/008/020: twenty seeded hits are identical across 120/60/30/10 FPS and reduced cosmetic budgets',()=>{
 const run=(cadence:number[],capacity:number)=>{
  const battle=new BattleSystem({id:'fixture',sequence:0,tick:0,complete:false,entities:[entity('hero','hero'),entity('enemy','enemy')]},battleConfig,[1,2,3,4]);
  const clock=new SimulationClock(),labels=new DamageLabelPool(capacity),events:Intent[]=[];
  let elapsed=0,frame=0;
  while(elapsed<20150){const dt=Math.min(cadence[frame++%cadence.length]!,20150-elapsed);elapsed+=dt;clock.advance(dt,()=>{const emitted=battle.step();events.push(...emitted);labels.ingest(emitted);});}
  assert.ok(labels.snapshot().length<=capacity);
  const hits=events.filter(e=>e.type==='damage.applied');assert.equal(hits.length,20);
  assert.ok(hits.some(e=>(e.payload as any).crit));assert.ok(hits.some(e=>!(e.payload as any).crit));
  assert.equal(battle.snapshot().encounter.entities[1]!.hp,10000-hits.reduce((n,e)=>n+(e.payload as any).applied,0));
  return {events,state:battle.snapshot()};
 };
 const expected=run([1000/120],12);
 for(const [cadence,capacity] of [[[16,17,17],3],[[33,34,33],0],[[100],1],[[10,70,25,45],12]] as [number[],number][])assert.deepEqual(run(cadence,capacity),expected);
});
test('UT009: mutual lethal hits resolve once in the same tick and wait for durable reward acknowledgement',()=>{
 const hero=entity('hero','hero',{hp:10,attackIntervalMs:50,critChanceBp:0}),enemy=entity('enemy','enemy',{hp:10,attackIntervalMs:50,critChanceBp:0});
 hero.hitDelayTicks=0;enemy.hitDelayTicks=0;enemy.canAttack=true;
 const battle=new BattleSystem({id:'fixture',sequence:0,tick:0,complete:false,entities:[hero,enemy]},battleConfig,[1,2,3,4],{...chapterRecovery,id:'explicit-counterattack-fixture',enemyCounterattacks:true});
 const events=battle.step();assert.equal(events.filter(e=>e.type==='damage.applied').length,2);assert.equal(events.filter(e=>e.type==='enemy.died').length,1);assert.equal(events.filter(e=>e.type==='hero.died').length,1);
 assert.equal(battle.pending,true);assert.equal(battle.complete,false);assert.deepEqual(battle.step(),[]);
 assert.throws(()=>battle.acknowledgeRewards([]));const sources=battle.snapshot().pendingRewards.map(r=>r.source);assert.equal(sources.length,1);assert.equal(battle.acknowledgeRewards(sources)[0]!.type,'encounter.cleared');assert.deepEqual(battle.acknowledgeRewards(sources),[]);
});
test('UT010/020: zero targets and suspended clocks neither attack nor invent elapsed combat',()=>{
 const battle=new BattleSystem({id:'fixture',sequence:0,tick:0,complete:false,entities:[entity('enemy','enemy')]},battleConfig,[1,2,3,4]),clock=new SimulationClock();
 clock.advance(100,()=>assert.deepEqual(battle.step(),[]));const before=battle.snapshot();clock.suspend();clock.advance(100000,()=>assert.fail());assert.deepEqual(battle.snapshot(),before);clock.resume();clock.advance(49,()=>assert.fail());clock.advance(1,()=>assert.deepEqual(battle.step(),[]));assert.equal(battle.tick,3);
});
test('UT010: stale target/encounter and saturated hit pool fail without retargeting or partial enqueue',()=>{
 const q=new HitQueue(1),hero=entity('hero','hero'),enemy=entity('enemy','enemy');q.enqueue([intent('one')]);const pending=q.snapshot();assert.throws(()=>q.enqueue([intent('two')]));assert.deepEqual(q.snapshot(),pending);
 assert.deepEqual(q.drain(3,'fixture',[hero]),[]);assert.equal(enemy.hp,10000);q.enqueue([intent('two')]);assert.deepEqual(q.drain(3,'different-encounter',[hero,enemy]),[]);
 q.enqueue([intent('three')]);enemy.hp=0;assert.deepEqual(q.drain(3,'fixture',[hero,enemy]),[]);
});
test('UT007: zero damage consumes no RNG; maximum safe hit clamps HP; overflow leaves target unchanged',()=>{
 const resolver=new DamageResolver(battleConfig),target=entity('enemy','enemy');
 assert.equal(resolver.resolve({...intent('zero'),attack:0,critChanceBp:10000},target,()=>assert.fail())!.applied,0);
 assert.throws(()=>resolver.resolve({...intent('overflow'),attack:Number.MAX_SAFE_INTEGER,critMultiplierBp:15000},target,()=>assert.fail()));assert.equal(target.hp,10000);
 assert.equal(resolver.resolve({...intent('huge'),attack:Number.MAX_SAFE_INTEGER},target,()=>assert.fail())!.applied,10000);assert.equal(target.hp,0);
});
