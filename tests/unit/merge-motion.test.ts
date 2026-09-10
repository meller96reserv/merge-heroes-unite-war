import {test} from 'node:test';import assert from 'node:assert/strict';
import {MergeMotion,mergeMarker} from '../../app/src/presentation/MergeMotion';
import {GameRuntime} from '../../app/src/game/GameRuntime';import {createState} from '../../game-core/src/model/GameState';import {heroes} from '../../game-core/src/content/PlayableConfig';
function setup(commit:(state:any)=>Promise<void>){
 const s=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0,unlockedSlots:5});s.data.heroes=[heroes.instantiate('hero_tier_1','a',0),heroes.instantiate('hero_tier_1','b',1)];s.data.board[0]!.unitId='a';s.data.board[1]!.unitId='b';s.data.progression.discoveredTiers=[1];
 const game=new GameRuntime(s,commit),motion=new MergeMotion();let previous=game.dispatcher.getSnapshot();
 const off=game.dispatcher.events.subscribe(events=>{const next=game.dispatcher.getSnapshot();motion.ingest(previous,next,events);previous=next;});
 return {game,motion,off};
}
test('merge presentation begins after durable commit, deduplicates replay and cancellation preserves the result and reward',async()=>{
 let save!:(value?:unknown)=>void;const pending=new Promise(resolve=>{save=resolve;}),{game,motion,off}=setup(async()=>{await pending;});
 const command={type:'MergeHeroes' as const,commandId:'merge1',sourceId:'a',targetId:'b'},dispatch=game.dispatcher.dispatch(command);await Promise.resolve();assert.equal(motion.getSnapshot().length,0);assert.equal(game.dispatcher.getSnapshot().data.heroes.length,2);
 save();assert.equal((await dispatch).ok,true);assert.equal(motion.getSnapshot().length,1);const lease=motion.getSnapshot()[0]!,v=lease.value.visual!;assert.equal(v.id,'merge1:0');assert.equal(v.sourceSlot,0);assert.equal(v.targetSlot,1);assert.equal(v.tier,2);
 const after=game.dispatcher.getSnapshot();assert.equal(after.data.currencies.gold,'140');await game.dispatcher.dispatch(command);assert.equal(motion.getSnapshot().length,1);
 for(const marker of [90,180,270,390,649]){assert.equal(mergeMarker(marker).done,false);assert.deepEqual(game.dispatcher.getSnapshot(),after);}
 motion.clear();motion.release(lease);assert.equal(motion.getSnapshot().length,0);assert.deepEqual(game.dispatcher.getSnapshot(),after);off();motion.dispose();assert.equal(game.dispatcher.events.listenerCount,0);assert.equal(motion.stats.active,0);
});
test('failed saves never create merge ghosts, hide board heroes or grant discovery',async()=>{
 const {game,motion,off}=setup(async()=>{throw Error('storage unavailable');}),before=game.dispatcher.getSnapshot();
 assert.equal((await game.dispatcher.dispatch({type:'MergeHeroes',commandId:'failed',sourceId:'a',targetId:'b'})).ok,false);assert.equal(motion.getSnapshot().length,0);assert.deepEqual(game.dispatcher.getSnapshot(),before);off();motion.dispose();
});
test('timeline joins convergence, shrink, reveal and settle at 650ms',()=>{
 assert.equal(mergeMarker(180).converge,1);assert.equal(mergeMarker(270).oldOpacity,0);assert.equal(mergeMarker(270).reveal,0);assert.equal(mergeMarker(390).reveal,1);assert.equal(mergeMarker(650).settle,1);assert.equal(mergeMarker(650).done,true);
});
