import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {BattleRuntime} from '../../app/src/battle/BattleRuntime';
import {createState,type GameState} from '../../game-core/src/model/GameState';
import {autoMergeActive} from '../../game-core/src/commands/ActivateAutoMerge';
import {runMetaAction} from '../../app/src/ui/MetaActions';
import {autoActivation,heroes} from '../../game-core/src/content/PlayableConfig';
const initial=()=>createState({dataVersion:'playable-v1',initialGold:'1000',utcMs:1000,unlockedSlots:5});
test('visible auto activation/debit/cascade is atomic, retryable and persistent, with no renewed grant on replay',async()=>{
 let now=1000,fail=false,writes=0,saved!:GameState;
 const game=new GameRuntime(initial(),async s=>{if(fail){fail=false;throw Error('write');}writes++;saved=structuredClone(s);},{utcMs:()=>now});
 for(let i=0;i<2;i++)assert.equal((await game.dispatcher.dispatch({type:'BuyHero',commandId:`buy:${i}`,offerId:'buy_tier_1'})).ok,true);
 const before=game.dispatcher.getSnapshot(),balance=BigInt(before.data.currencies.gold!);
 const command={type:'ActivateAutoMerge' as const,commandId:'auto:one',mode:'currency' as const,utcMs:now};
 fail=true;assert.deepEqual((await runMetaAction(game,command)).result,{ok:false,reason:'SAVE_FAILED'});assert.equal(game.dispatcher.getSnapshot(),before);
 const retried=await runMetaAction(game,{...command,commandId:'auto:two'});assert.equal(retried.command.commandId,'auto:one');assert.equal(retried.result.ok,true);
 const after=game.dispatcher.getSnapshot();assert.equal(after.data.heroes.length,1);assert.equal(after.data.heroes[0]!.tier,2);assert.equal(after.data.heroes[0]!.deployed,true);
 assert.equal(BigInt(after.data.currencies.gold!),balance-100n+5n);assert.equal(autoMergeActive(after,now),true);
 const restarted=new GameRuntime(saved,async s=>{saved=structuredClone(s);},{utcMs:()=>now});await restarted.dispatcher.dispatch(command);assert.equal(restarted.dispatcher.getSnapshot().data.currencies.gold,after.data.currencies.gold);assert.equal(restarted.dispatcher.getSnapshot().data.autoMerge.expiresAtUtcMs,1000+autoActivation.durationMs);
 await restarted.dispatcher.dispatch({type:'SetAutoMerge',commandId:'auto:pause',enabled:false});assert.equal(autoMergeActive(restarted.dispatcher.getSnapshot(),now),false);
 await restarted.dispatcher.dispatch({type:'SetAutoMerge',commandId:'auto:resume',enabled:true});assert.equal(autoMergeActive(restarted.dispatcher.getSnapshot(),now),true);
 for(let i=2;i<4;i++)await restarted.dispatcher.dispatch({type:'BuyHero',commandId:`buy:${i}`,offerId:'buy_tier_1'});assert.equal(restarted.dispatcher.getSnapshot().data.heroes.length,1);assert.equal(restarted.dispatcher.getSnapshot().data.heroes[0]!.tier,3);
 now+=autoActivation.durationMs;await restarted.dispatcher.dispatch({type:'BuyHero',commandId:'buy:expired',offerId:'buy_tier_1'});assert.equal(autoMergeActive(restarted.dispatcher.getSnapshot(),now),false);
 now=1000;assert.equal(autoMergeActive(restarted.dispatcher.getSnapshot(),now),false);assert.deepEqual(await restarted.dispatcher.dispatch({type:'SetAutoMerge',commandId:'auto:rollback',enabled:true}),{ok:false,reason:'LOCKED'});assert.ok(writes>0);
});
test('insufficient funds cannot activate auto; speed persists and only accepts 1 or 2',async()=>{
 const s=initial();s.data.currencies.gold='99';const g=new GameRuntime(s,async()=>{});
 assert.deepEqual(await g.dispatcher.dispatch({type:'ActivateAutoMerge',commandId:'auto',mode:'currency',utcMs:1000}),{ok:false,reason:'INSUFFICIENT_GOLD'});assert.equal(g.dispatcher.getSnapshot().data.currencies.gold,'99');
 assert.equal((await g.dispatcher.dispatch({type:'UpdateSettings',commandId:'speed',settingsRevision:0,patch:{battleSpeed:2}})).ok,true);assert.equal(g.dispatcher.getSnapshot().data.settings.battleSpeed,2);
 assert.deepEqual(await g.dispatcher.dispatch({type:'UpdateSettings',commandId:'badSpeed',settingsRevision:1,patch:{battleSpeed:3 as 2}}),{ok:false,reason:'INVALID_COMMAND'});
});
test('2x advances combat twice while victory offer remains two real seconds',()=>{
 const s=initial();s.data.settings.battleSpeed=2;const h=heroes.instantiate('hero_tier_1','first',0);h.deployed=true;s.data.heroes=[h];s.data.board[0]!.unitId=h.id;
 const game=new GameRuntime(s,async()=>{}),battle=new BattleRuntime(game);battle.advance(50);assert.equal(battle.engine.tick,2);
 // Actual committed stage event, rather than manipulating a presentation timer.
 game.dispatcher.events.publish([{type:'stage.cleared',payload:{stageId:'stage_1_1'},eventId:'clear:1',transactionId:'clear',revision:1,simulationTick:0}]);
 for(let i=0;i<39;i++)battle.advance(50);assert.ok(battle.getSnapshot().victory);battle.advance(50);assert.equal(battle.getSnapshot().victory,undefined);battle.dispose();
});
