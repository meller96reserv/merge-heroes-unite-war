import {useEffect,useMemo,useRef,useSyncExternalStore} from 'react';
import type {GameRuntime} from '../game/GameRuntime';
import type {EffectMode} from './EffectPrimitives';
import {MetaRewardMotion} from './MetaRewardMotion';
/** Mount inside the active Skia screen; closing it releases every pending burst. */
export function useMetaRewardMotion(game:GameRuntime|null,anchor:{x:number;y:number},mode:EffectMode,paused=false){
 const motion=useMemo(()=>new MetaRewardMotion(),[game]),options=useRef({anchor,mode,paused});options.current={anchor,mode,paused};
 useEffect(()=>{
  if(!game)return;
  const unsubscribe=game.dispatcher.events.subscribe(batch=>{const o=options.current;if(!o.paused)motion.ingest(batch,o.anchor,o.mode);});
  return()=>{unsubscribe();motion.clear();};
 },[game,motion]);
 useEffect(()=>{motion.clear();},[motion,anchor.x,anchor.y,mode,paused]);
 return {motion,records:useSyncExternalStore(motion.subscribe,motion.getSnapshot,motion.getSnapshot)};
}
