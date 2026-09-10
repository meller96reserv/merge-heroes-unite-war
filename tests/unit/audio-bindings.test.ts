import test from 'node:test';import assert from 'node:assert/strict';
import {AudioEventBindings} from '../../app/src/audio/AudioEventBindings';
import {createState,snapshot} from '../../game-core/src/model/GameState';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {BattleRuntime} from '../../app/src/battle/BattleRuntime';
import {heroes} from '../../game-core/src/content/PlayableConfig';
import type {DomainEvent} from '../../game-core/src/events/EventBus';
const harness=()=>{const played:{event:string;id?:string}[]=[];const bindings=new AudioEventBindings({emit:(event,options)=>{played.push({event,id:options?.id});return 'played';}});return {played,bindings};};
test('actual committed purchase/merge/discovery play once; failed save and replay cannot sound like a grant',async()=>{
 const {played,bindings}=harness(),initial=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0});let fail=false;
 const game=new GameRuntime(initial,async()=>{if(fail)throw Error('injected');});let previous=game.dispatcher.getSnapshot();
 game.dispatcher.events.subscribe(batch=>{const next=game.dispatcher.getSnapshot();bindings.committed(previous,next,batch);bindings.committed(previous,next,batch);previous=next;});
 await game.dispatcher.dispatch({type:'BuyHero',commandId:'buy:1',offerId:'buy_tier_1'});
 await game.dispatcher.dispatch({type:'BuyHero',commandId:'buy:2',offerId:'buy_tier_1'});
 assert.equal(played.filter(e=>e.event==='hero.spawn').length,2);assert.equal(played.filter(e=>e.event==='economy.goldSpend').length,2);
 fail=true;const h=game.dispatcher.getSnapshot().data.heroes;
 const merge={type:'MergeHeroes' as const,commandId:'merge:1',sourceId:h[0]!.id,targetId:h[1]!.id};
 await game.dispatcher.dispatch(merge);assert.equal(played.filter(e=>e.event==='merge.low').length,0);
 fail=false;await game.dispatcher.dispatch(merge);await game.dispatcher.dispatch(merge);
 assert.equal(played.filter(e=>e.event==='merge.low').length,1);assert.equal(played.filter(e=>e.event==='economy.goldGain').length,1);
});
test('real simulation attack families/hits play once across encounters; hidden combat remains silent',()=>{
 for(const [tier,family] of [[1,'melee'],[2,'magic'],[3,'ranged']] as const){
  const {played,bindings}=harness(),state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0});
  const hero=heroes.instantiate(`hero_tier_${tier}`,'hero1',0);hero.deployed=true;state.data.heroes=[hero];state.data.board[0]!.unitId=hero.id;
  for(let sequence=0;sequence<2;sequence++){
   state.data.stages.encounterSequence=sequence;
   const game=new GameRuntime(state,async()=>{}),battle=new BattleRuntime(game);
   for(let tick=0;tick<23;tick++){
    const events=battle.engine.step(),view={...battle.getSnapshot(),combat:battle.engine.snapshot(),events,paused:false};
    bindings.battle(view);bindings.battle(view);
   }
   const before=played.length;bindings.battleVisible=false;
   const last=battle.getSnapshot();bindings.battle({...last,paused:false,events:[{type:'attack.intent',payload:{id:`hidden:${sequence}`,actorId:'hero1'}}]});assert.equal(played.length,before);
   bindings.battleVisible=true;bindings.battle({...last,paused:false,events:[{type:'attack.intent',payload:{id:`hidden:${sequence}`,actorId:'hero1'}}]});assert.equal(played.length,before);battle.dispose();
  }
  assert.equal(played.filter(e=>e.event===`combat.${family}`).length,2);assert.equal(played.filter(e=>e.event==='combat.hit').length,2);
 }
});
test('hidden stage rewards do not intrude on wheel but a wheel claim still sounds',()=>{
 const {played,bindings}=harness();bindings.battleVisible=false;
 const state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0}),before=snapshot(state);
 state.data.transactionReceipts.push({id:'stage',source:'stageFirstClear:stage_1_1',generation:1,grants:[{kind:'currency',id:'gold',amount:'5'}]});
 const event:DomainEvent={type:'stage.cleared',eventId:'stage:1',transactionId:'stage',revision:1,simulationTick:0,payload:{}};
 bindings.committed(before,snapshot(state),[event]);assert.equal(played.length,0);
 const middle=snapshot(state);state.data.transactionReceipts.push({id:'wheel',source:'wheel:spin1',generation:2,grants:[{kind:'currency',id:'gold',amount:'100'}]});
 bindings.committed(middle,snapshot(state),[{...event,type:'wheel.claimed',eventId:'wheel:1',transactionId:'wheel'}]);assert.equal(played[0]?.event,'economy.goldGain');
});
