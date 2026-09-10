import {useEffect,useState,useSyncExternalStore} from 'react';import type {GameRuntime} from './GameRuntime';import {getGameRuntime} from './loadGameRuntime';import {createState,snapshot} from '../../../game-core/src/model/GameState';
const empty=snapshot(createState({dataVersion:'loading',initialGold:'0',utcMs:0,unlockedSlots:5}));
const readEmpty=()=>empty,subscribeEmpty=()=>()=>{};
export function useGame(enabled:boolean){
 const [game,setGame]=useState<GameRuntime|null>(null),[error,setError]=useState('');
 useEffect(()=>{let active=true;if(enabled)getGameRuntime().then(g=>{if(active)setGame(g);},()=>{if(active)setError('Your progress could not be loaded. Please reopen the game to try again.');});return()=>{active=false;};},[enabled]);
 const state=useSyncExternalStore(game?.dispatcher.subscribe??subscribeEmpty,game?.dispatcher.getSnapshot??readEmpty,readEmpty);
 return {game,state,error};
}
