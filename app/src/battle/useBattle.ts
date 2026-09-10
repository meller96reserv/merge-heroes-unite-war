import {applicationLifecycle} from '../platform/Lifecycle';
import {LifecycleCoordinator} from '../platform/LifecycleCoordinator';
import {useEffect,useMemo,useSyncExternalStore} from 'react';import {BattleRuntime} from './BattleRuntime';import type {GameRuntime} from '../game/GameRuntime';
const empty=()=>null,subscribeEmpty=()=>()=>{};
export function useBattle(game:GameRuntime|null){
 const battle=useMemo(()=>game?new BattleRuntime(game):null,[game]);
 useEffect(()=>{
  if(!battle||!game)return;const lifecycle=new LifecycleCoordinator(battle,()=>game.flush());
  const update=()=>lifecycle.setActive(applicationLifecycle.getSnapshot());update();const unsubscribe=applicationLifecycle.subscribe(update);
  return()=>{unsubscribe();lifecycle.dispose();battle.dispose();};
 },[battle]);
 const state=useSyncExternalStore(battle?.subscribe??subscribeEmpty,battle?.getHudSnapshot??empty,empty);
 return {battle,battleState:state};
}
