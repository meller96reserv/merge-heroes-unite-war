import {test} from 'node:test';import assert from 'node:assert/strict';import {BossSystem} from '../src/systems/BossSystem';import {stages} from '../src/content/StageConfig';import {SimulationClock} from '../src/systems/SimulationClock';
const timer=()=>new BossSystem(stages.get('stage_1_3').boss!,50);
test('configured deadline is 160 ticks; lethal tie wins, later hit loses, terminal result stays exclusive',()=>{
 const win=timer();assert.equal(win.deadlineTick,160);assert.equal(win.afterHits(159,false),'fighting');assert.equal(win.remainingMs,50);assert.equal(win.afterHits(160,true),'won');assert.equal(win.afterHits(161,false),'won');
 const lose=timer();assert.equal(lose.afterHits(160,false),'failed');assert.equal(lose.afterHits(160,true),'failed');assert.equal(timer().afterHits(161,true),'failed');
});
test('foreground fixed ticks define the deadline; suspension and catch-up caps cannot consume background wall time',()=>{
 const boss=timer(),clock=new SimulationClock();let tick=0;const advance=(ms:number)=>clock.advance(ms,()=>boss.afterHits(++tick,false));advance(100);assert.equal(boss.remainingMs,7900);clock.suspend();advance(600000);assert.equal(boss.remainingMs,7900);clock.resume();advance(50);assert.equal(boss.remainingMs,7850);assert.throws(()=>boss.afterHits(1,false));
});
