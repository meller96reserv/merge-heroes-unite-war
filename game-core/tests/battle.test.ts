import {test} from 'node:test';import assert from 'node:assert/strict';import {BattleSystem,type BattleConfig} from '../src/systems/BattleSystem';import {spawnEncounter} from '../src/systems/EncounterSpawner';import {enemy} from './spawn.test';import {createState} from '../src/model/GameState';import {heroes} from '../src/content/PlayableConfig';import {SimulationClock} from '../src/systems/SimulationClock';
export const battleConfig:BattleConfig={stepMs:50,hitDelayMs:150,targetingPolicy:'spawnOrder',staleProjectilePolicy:'cancel',damageModel:'proposedSubtractDefense',rounding:'floor',minimumDamage:1};
export function battleFixture(){const state=createState({dataVersion:'playable-v1',initialGold:'0',utcMs:0});const hero=heroes.instantiate('hero_tier_1','hero1',0);hero.deployed=true;state.data.heroes=[hero];state.data.board[0]!.unitId=hero.id;const battle=new BattleSystem(spawnEncounter('stage1',1,0,[{enemyId:'boar',count:1}],[enemy],50),battleConfig,[1,2,3,4]);battle.syncRoster(state,heroes);return {battle,state};}
test('varied render frames produce identical attacks/hits/death and wait for durable acknowledgement before clear',()=>{
 const run=(frameMs:number)=>{
  const {battle}=battleFixture(),clock=new SimulationClock(),events:unknown[]=[];
  for(let elapsed=0;elapsed<5000;){const part=Math.min(frameMs,5000-elapsed);elapsed+=part;clock.advance(part,()=>{events.push(...battle.step());if(battle.pending){const snapshot=battle.snapshot();assert.throws(()=>battle.acknowledgeRewards([]));const tick=battle.tick;assert.deepEqual(battle.step(),[]);assert.equal(battle.tick,tick);events.push(...battle.acknowledgeRewards(snapshot.pendingRewards.map((r:any)=>r.source)));}});}
  return {events,snapshot:battle.snapshot()};
 };
 const expected=run(16);assert.deepEqual(run(33),expected);assert.deepEqual(run(100),expected);assert.equal(expected.snapshot.encounter.tick,83);assert.equal(expected.snapshot.encounter.complete,true);
 const events=expected.events as {type:string;payload:any}[];assert.equal(events.filter(e=>e.type==='enemy.died').length,1);assert.deepEqual(events.filter(e=>e.type==='attack.intent').map(e=>e.payload.createdTick),[20,40,60,80]);assert.equal(events.at(-1)!.type,'encounter.cleared');
});
test('suspension freezes combat; withdrawn source cannot land a queued projectile',()=>{
 const {battle,state}=battleFixture();battle.setSuspended(true);for(let i=0;i<100;i++)battle.step();assert.equal(battle.tick,0);battle.setSuspended(false);for(let i=0;i<20;i++)battle.step();assert.equal(battle.snapshot().hits.length,1);
 state.data.heroes[0]!.deployed=false;battle.syncRoster(state,heroes);for(let i=0;i<10;i++)battle.step();assert.equal(battle.snapshot().encounter.entities[0].hp,40);assert.equal(battle.snapshot().hits.length,0);
});
test('redeploying the same owned hero does not reuse attack IDs or revive cancelled hits',()=>{
 const {battle,state}=battleFixture();for(let i=0;i<20;i++)battle.step();
 state.data.heroes[0]!.deployed=false;battle.syncRoster(state,heroes);state.data.heroes[0]!.deployed=true;battle.syncRoster(state,heroes);
 for(let i=0;i<4;i++)battle.step();assert.equal(battle.snapshot().encounter.entities.find(e=>e.side==='enemy')!.hp,40);
 for(let i=0;i<19;i++)battle.step();assert.equal(battle.snapshot().encounter.entities.find(e=>e.side==='enemy')!.hp,30);assert.equal(battle.snapshot().encounter.entities.find(e=>e.side==='hero')!.attackSequence,2);
});
