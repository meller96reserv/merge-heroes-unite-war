import {useEffect,useMemo} from 'react';
import type {GameRuntime} from '../game/GameRuntime';
import type {BattleRuntime} from '../battle/BattleRuntime';
import {AudioEventBindings} from './AudioEventBindings';
import {getAudio} from './audioService';
/** Direct subscriptions avoid dropping short combat batches between React renders. */
export function useGameAudio(game:GameRuntime|null,battle:BattleRuntime|null,battleVisible:boolean){
 const bindings=useMemo(()=>new AudioEventBindings(getAudio()),[game,battle]);
 bindings.battleVisible=battleVisible;
 useEffect(()=>{
  if(!game)return;
  let previous=game.dispatcher.getSnapshot();
  const off=game.dispatcher.events.subscribe(batch=>{const next=game.dispatcher.getSnapshot();bindings.committed(previous,next,batch);previous=next;});
  return()=>{off();bindings.clear();};
 },[game,bindings]);
 useEffect(()=>{if(!battle)return;bindings.battle(battle.getSnapshot());return battle.subscribe(()=>bindings.battle(battle.getSnapshot()));},[battle,bindings]);
}
