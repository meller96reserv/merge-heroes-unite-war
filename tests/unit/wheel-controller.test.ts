import test from 'node:test';import assert from 'node:assert/strict';
import {WheelController,wheelView} from '../../app/src/ui/WheelController';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState} from '../../game-core/src/model/GameState';
import {FakeClock,MemorySaveStore} from '../../game-core/src/ports';
import {TransactionCoordinator} from '../../game-core/src/systems/TransactionCoordinator';
import type {RewardedAds} from '../../app/src/platform/RewardedAds';

const setup=()=>{const clock=new FakeClock(1000),store=new MemorySaveStore();return {store,game:new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),new TransactionCoordinator(store,clock,'wheel-controller').commit,clock,'session:1')};};
test('reserve -> motion -> failed video -> reopen -> confirmed claim is one real controller flow',async()=>{
 const {game}=setup();let ads=0;
 const unavailable:RewardedAds={isShowing:()=>false,show:async()=>{ads++;return 'unavailable';}};
 const controller=new WheelController(game,unavailable);
 await Promise.all([controller.action(),controller.action()]);
 const pending=game.dispatcher.getSnapshot().data.wheel.pendingSpin!;
 assert.equal(wheelView(game.dispatcher.getSnapshot(),controller.getSnapshot(),43_200_000).phase,'spinning');
 await controller.action();assert.equal(ads,0);assert.equal(game.dispatcher.getSnapshot().data.currencies.gold,'100');
 controller.settled(pending.id);await controller.action();
 assert.equal(ads,1);assert.match(controller.getSnapshot().error,/saved/);
 assert.equal(game.dispatcher.getSnapshot().data.wheel.pendingSpin?.status,'reserved');
 controller.dispose();
 const resumed=new WheelController(game,{isShowing:()=>false,show:async()=>{ads++;return 'completed';}});
 assert.equal(wheelView(game.dispatcher.getSnapshot(),resumed.getSnapshot(),43_200_000).phase,'result');
 await resumed.action();assert.equal(ads,2);
 assert.equal(game.dispatcher.getSnapshot().data.wheel.pendingSpin?.status,'committed');
 assert.equal(game.dispatcher.getSnapshot().data.transactionReceipts.filter(r=>r.source===`wheel:${pending.id}`).length,1);
});
test('failed post-video save retries the confirmed claim without another video, including after view close',async()=>{
 const {game,store}=setup();let videos=0;
 const ads:RewardedAds={isShowing:()=>false,show:async()=>{videos++;return 'completed';}};
 const controller=new WheelController(game,ads);await controller.action();
 controller.settled(game.dispatcher.getSnapshot().data.wheel.pendingSpin!.id);
 const unsubscribe=game.dispatcher.events.subscribe(batch=>{if(batch.some(e=>e.type==='rewarded.result'))store.failNext='write';});
 await controller.action();unsubscribe();assert.equal(videos,1);
 assert.equal(game.dispatcher.getSnapshot().data.currencies.gold,'100');
 assert.equal(wheelView(game.dispatcher.getSnapshot(),controller.getSnapshot(),43_200_000).claimReady,true);
 controller.dispose();const reopened=new WheelController(game,ads);await reopened.action();
 assert.equal(videos,1);assert.equal(game.dispatcher.getSnapshot().data.wheel.pendingSpin?.status,'committed');
});
