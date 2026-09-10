import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import type {GameRuntime} from '../game/GameRuntime';
import type {Insets} from '../ui/ResponsiveLayout';
import {dailyPanel} from '../ui/DailyPanel';
import {DailyRewardPanel} from '../components/DailyRewardPanel';
import {runMetaAction} from '../ui/MetaActions';
import {getAudio} from '../audio/audioService';
import {useMetaRewardMotion} from '../presentation/useMetaRewardMotion';
import {useCountdown} from '../ui/useCountdown';
export function DailyScreen({game,width,height,insets,onBack}:{game:GameRuntime;width:number;height:number;insets:Insets;onBack:()=>void}){
 const state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),pending=useRef(false),alive=useRef(true);
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;};},[]);
 const view=dailyPanel(state,Date.now()),remaining=useCountdown(view.nextAt),fx=useMetaRewardMotion(game,{x:215,y:465},state.data.settings.reducedMotion?'reduced':'full');
 const cta=view.pending!==null?'CLAIM':view.available?'GET FREE GOLD':'BACK TO BATTLE';
 const action=async()=>{
  if(pending.current)return;if(!view.available){onBack();return;}pending.current=true;setBusy(true);setNotice('');
  const command=view.pending!==null?{type:'ClaimDaily' as const,commandId:`dailyClaim:${view.pending}`,period:view.pending}:{type:'ReserveDaily' as const,commandId:game.nextId('reserveDaily')};
  try{const {result,command:actual}=await runMetaAction(game,command);if(alive.current){if(!result.ok){setNotice('Could not save your bonus. Please try again.');getAudio().emit('ui.error');}else if(actual.type==='ClaimDaily'){setNotice('1,000 gold added to your adventure!');getAudio().emit('reward.daily');}}}finally{pending.current=false;if(alive.current)setBusy(false);}
 };
 return <DailyRewardPanel width={width} height={height} insets={insets} gold={view.gold} cta={cta} subtitle={view.available?'we give you daily bonus!':`Next bonus in ${Math.ceil(remaining/3600000)}h`} busy={busy} notice={notice} onAction={()=>void action()} onBack={onBack} reduced={state.data.settings.reducedMotion} fx={fx}/>;
}
