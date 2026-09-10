import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {BattleRuntime} from '../../app/src/battle/BattleRuntime';
import {createState,draft} from '../../game-core/src/model/GameState';
import {heroes} from '../../game-core/src/content/PlayableConfig';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
import {relicBonus} from '../../game-core/src/content/RelicConfig';
import {dragons} from '../../game-core/src/modes/DragonMode';
function setup(tier=1){const state=createState({dataVersion:'playable-v1',initialGold:'2000',utcMs:1000});state.data.currencies.gem='200';const h=heroes.instantiate(`hero_tier_${tier}`,'hero_1',0);h.deployed=true;state.data.heroes.push(h);state.data.board[0]!.unitId=h.id;state.data.nextInstanceSequence=2;if(tier===10)state.data.heroLevels={hero_tier_10:40};const clock=new FakeClock(1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'extended').commit;return {game:new GameRuntime(state,commit,clock),clock,store,commit};}
test('Relics x1/x10 debit their distinct currency, persist counts and retry without reroll',async()=>{
 const {game,store,clock,commit}=setup(),d=game.dispatcher;
 for(const count of [1,10] as const){const before=d.getSnapshot(),c={type:'OpenRelics' as const,commandId:`open${count}`,count};store.failNext='verify';assert.equal((await d.dispatch(c)).ok,false);assert.deepEqual(d.getSnapshot(),before);assert.equal((await d.dispatch(c)).ok,true);await d.dispatch(c);const s=d.getSnapshot();assert.equal(Object.values(s.data.relics!).reduce((a,b)=>a+b,0),count===1?1:11);assert.equal(s.data.currencies.gold,'1900');assert.equal(s.data.currencies.gem,count===1?'200':'100');
 const restored=new GameRuntime(decodeSave(encodeSave(draft(s))),commit,clock);await restored.dispatcher.dispatch(c);assert.deepEqual(restored.dispatcher.getSnapshot().data.lastRelicOpen,s.data.lastRelicOpen);assert.deepEqual(restored.dispatcher.getSnapshot().data.rng.rewardState,s.data.rng.rewardState);}
 assert.equal(relicBonus({relic_blue_feather:100},'attack'),4000);
 const poor=draft(d.getSnapshot());poor.data.currencies.gem='99';const p=new GameRuntime(poor,async()=>{});assert.equal((await p.dispatcher.dispatch({type:'OpenRelics',commandId:'poor',count:10})).ok,false);assert.deepEqual(p.dispatcher.getSnapshot().data.relics,poor.data.relics);
});
test('three dragons run shared simulation and reward once; chapter state stays unchanged, save/restart preserves attempt',async()=>{
 for(const dragon of dragons){const {game,clock,commit}=setup(10),d=game.dispatcher,chapter=d.getSnapshot().data.stages;
 assert.equal((await d.dispatch({type:'StartDragon',commandId:'start',dragonId:dragon.id})).ok,true);const attempt=d.getSnapshot().data.dungeon!.active!;
 const restarted=new GameRuntime(decodeSave(encodeSave(draft(d.getSnapshot()))),commit,clock),battle=new BattleRuntime(restarted);assert.equal(battle.getSnapshot().combat.encounter.entities.find(e=>e.side==='enemy')!.hp,dragon.hp);
 for(let i=0;i<185&&restarted.dispatcher.getSnapshot().data.dungeon!.active;i++){battle.advance(250);await new Promise(r=>setTimeout(r,0));}
 const state=restarted.dispatcher.getSnapshot();assert.equal(state.data.dungeon!.lastResult!.outcome,'won');assert.equal(state.data.dungeon!.clears[dragon.id],1);assert.equal(state.data.currencies.gold,String(2000+Number(dragon.gold)));assert.deepEqual(state.data.stages,chapter);assert.equal(state.data.stageBoosts![`boost:${attempt.id}`]!.baseGold,dragon.gold);
 const receipt=state.data.transactionReceipts.find(r=>r.source===`dragonFinish:${attempt.id}`)!;await restarted.dispatcher.dispatch({type:'FinishDragon',commandId:receipt.id,attemptId:attempt.id,outcome:'won',tick:1,defeated:true,rng:[1,2,3,4]});assert.equal(restarted.dispatcher.getSnapshot().data.currencies.gold,state.data.currencies.gold);battle.dispose();}
});
test('timeout and leave grant nothing; stale/early settlement and double entry reject',async()=>{
 const {game}=setup(),d=game.dispatcher,battle=new BattleRuntime(game);await d.dispatch({type:'StartDragon',commandId:'start',dragonId:'shadow'});const active=d.getSnapshot().data.dungeon!.active!;
 assert.equal((await d.dispatch({type:'StartDragon',commandId:'again',dragonId:'frost'})).ok,false);assert.equal((await d.dispatch({type:'FinishDragon',commandId:'early',attemptId:active.id,outcome:'failed',tick:1,defeated:false,rng:[1,2,3,4]})).ok,false);
 for(let i=0;i<185&&d.getSnapshot().data.dungeon!.active;i++){battle.advance(250);await new Promise(r=>setTimeout(r,0));}
 assert.equal(d.getSnapshot().data.dungeon!.lastResult!.outcome,'failed');assert.equal(d.getSnapshot().data.currencies.gold,'2000');await d.dispatch({type:'StartDragon',commandId:'next',dragonId:'infernal'});const next=d.getSnapshot().data.dungeon!.active!;await d.dispatch({type:'LeaveDragon',commandId:'leave',attemptId:next.id});assert.equal(d.getSnapshot().data.currencies.gold,'2000');assert.equal(d.getSnapshot().data.dungeon!.lastResult!.outcome,'abandoned');battle.dispose();
});
test('failed dragon reward write freezes the actual outcome and exact retry grants once',async()=>{
 const {game,store}=setup(10),d=game.dispatcher;await d.dispatch({type:'StartDragon',commandId:'start',dragonId:'infernal'});const battle=new BattleRuntime(game);store.failNext='verify';
 for(let i=0;i<100&&battle.getSnapshot().rewardStatus!=='failed';i++){battle.advance(250);await new Promise(r=>setTimeout(r,0));}
 assert.equal(battle.getSnapshot().rewardStatus,'failed');assert.ok(d.getSnapshot().data.dungeon!.active);assert.equal(d.getSnapshot().data.currencies.gold,'2000');await battle.retryRewards();assert.equal(d.getSnapshot().data.currencies.gold,'2500');assert.equal(d.getSnapshot().data.dungeon!.clears.infernal,1);battle.dispose();
});
