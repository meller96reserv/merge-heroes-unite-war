import {useEffect,useMemo,useSyncExternalStore} from 'react';
import type {GameRuntime} from '../game/GameRuntime';
import {MergeMotion} from './MergeMotion';
export function useMergeMotion(game:GameRuntime|null,reducedMotion:boolean){
 const motion=useMemo(()=>new MergeMotion(),[game]);
 useEffect(()=>{
  if(!game)return;
  let previous=game.dispatcher.getSnapshot();
  const unsubscribe=game.dispatcher.events.subscribe(batch=>{const next=game.dispatcher.getSnapshot();motion.ingest(previous,next,batch);previous=next;});
  return()=>{unsubscribe();motion.clear();};
 },[game,motion]);
 useEffect(()=>{motion.clear();},[motion,reducedMotion]);

 return {motion,records:useSyncExternalStore(motion.subscribe,motion.getSnapshot,motion.getSnapshot)};
}
