import {useEffect} from 'react';import {AppState} from 'react-native';
import type {GameRuntime} from '../game/GameRuntime';
import {haptics} from './hapticService';import {hapticEvents} from './Haptics';
export function useGameHaptics(game:GameRuntime|null,enabled:boolean){
 useEffect(()=>{haptics.enabled=enabled;},[enabled]);
 useEffect(()=>{
  if(!game)return;
  haptics.active=AppState.currentState==='active';
  const state=AppState.addEventListener('change',s=>{haptics.active=s==='active';});
  const blur=()=>{haptics.active=false;},focus=()=>{haptics.active=AppState.currentState==='active';};
  globalThis.addEventListener?.('blur',blur);globalThis.addEventListener?.('focus',focus);
  const unsubscribe=game.dispatcher.events.subscribe(batch=>{
   haptics.enabled=game.dispatcher.getSnapshot().data.settings.haptics;
   const event=batch.filter(e=>hapticEvents[e.type]).sort((a,b)=>hapticEvents[b.type]!.priority-hapticEvents[a.type]!.priority)[0];
   if(event)haptics.emit(event.type,event.transactionId);
  });
  return()=>{unsubscribe();state.remove();globalThis.removeEventListener?.('blur',blur);globalThis.removeEventListener?.('focus',focus);haptics.active=false;};
 },[game]);
}
