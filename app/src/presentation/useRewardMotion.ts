import {useEffect,useMemo,useRef,useSyncExternalStore} from 'react';
import {RewardMotion} from './RewardMotion';
import type {GameRuntime} from '../game/GameRuntime';
export function useRewardMotion(game:GameRuntime|null,boardTop:number,reducedMotion:boolean){
 const motion=useMemo(()=>new RewardMotion(),[game]),options=useRef({boardTop,reducedMotion});options.current={boardTop,reducedMotion};
 useEffect(()=>{
  if(!game)return;
  let previous=game.dispatcher.getSnapshot();
  const unsubscribe=game.dispatcher.events.subscribe(batch=>{
   const next=game.dispatcher.getSnapshot(),discovery=batch.some(e=>e.type==='tier.discovered'),{boardTop,reducedMotion}=options.current;
   motion.ingest(previous,next,discovery?{x:215,y:boardTop+50}:{x:330,y:boardTop-130},reducedMotion);previous=next;
  });
  return()=>{unsubscribe();motion.clear();};
 },[game,motion]);
 useEffect(()=>{motion.clear();},[motion,boardTop,reducedMotion]);
 return {motion,records:useSyncExternalStore(motion.subscribe,motion.getSnapshot,motion.getSnapshot)};
}
