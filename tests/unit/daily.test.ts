import test from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState,draft} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import {dailyEligibility,DAILY_MS} from '../../game-core/src/systems/DailyService';
import {decodeSave,encodeSave} from '../../game-core/src/persistence/SaveCodec';
function setup(){const clock=new FakeClock(DAILY_MS-1000),store=new MemorySaveStore(),commit=new TransactionCoordinator(store,clock,'daily').commit,game=new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'0',utcMs:clock.wall}),commit,clock);return {game,clock,store,commit};}
test('reserve then claim grants 1000 once, survives reload and cannot regrant with another command',async()=>{
 const {game,clock,commit}=setup(),d=game.dispatcher;await d.dispatch({type:'ReserveDaily',commandId:'reserve'});assert.equal(d.getSnapshot().data.currencies.gold,'0');
 const restart=new GameRuntime(decodeSave(encodeSave(draft(d.getSnapshot()))),commit,clock);const c={type:'ClaimDaily' as const,commandId:'dailyClaim:0',period:0};await restart.dispatcher.dispatch(c);await restart.dispatcher.dispatch(c);await restart.dispatcher.dispatch({...c,commandId:'again'});assert.equal(restart.dispatcher.getSnapshot().data.currencies.gold,'1000');assert.equal(restart.dispatcher.getSnapshot().data.daily.attendanceIndex,1);
 assert.equal(dailyEligibility(restart.dispatcher.getSnapshot(),clock.wall).available,false);
});
test('reserved yesterday survives midnight; next day available, rollback never reserves older entitlement',async()=>{
 const {game,clock}=setup(),d=game.dispatcher;await d.dispatch({type:'ReserveDaily',commandId:'r0'});clock.advance(2000);await d.dispatch({type:'ClaimDaily',commandId:'c0',period:0});assert.equal(dailyEligibility(d.getSnapshot(),clock.wall).available,true);await d.dispatch({type:'ReserveDaily',commandId:'r1'});await d.dispatch({type:'ClaimDaily',commandId:'c1',period:1});assert.equal(d.getSnapshot().data.currencies.gold,'2000');clock.wall=1000;assert.equal((await d.dispatch({type:'ReserveDaily',commandId:'rollback'})).ok,false);
});
test('unreserved, wrong-period and failed durable claims cannot mint coins; exact retry succeeds',async()=>{
 const {game,store}=setup(),d=game.dispatcher;assert.equal((await d.dispatch({type:'ClaimDaily',commandId:'unreserved',period:0})).ok,false);await d.dispatch({type:'ReserveDaily',commandId:'reserve'});assert.equal((await d.dispatch({type:'ClaimDaily',commandId:'wrong',period:1})).ok,false);
 store.failNext='verify';const c={type:'ClaimDaily' as const,commandId:'dailyClaim:0',period:0};assert.deepEqual(await d.dispatch(c),{ok:false,reason:'SAVE_FAILED'});assert.equal(d.getSnapshot().data.currencies.gold,'0');assert.equal(d.getSnapshot().data.daily.pendingPeriod,0);assert.equal((await d.dispatch(c)).ok,true);assert.equal(d.getSnapshot().data.currencies.gold,'1000');
});
