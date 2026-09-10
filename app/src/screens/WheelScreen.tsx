import {useEffect,useMemo,useSyncExternalStore} from 'react';
import {Text,View} from 'react-native';
import type {GameRuntime} from '../game/GameRuntime';
import type {Insets} from '../ui/ResponsiveLayout';
import {WheelPanel} from '../components/WheelPanel';
import {WheelController,wheelView} from '../ui/WheelController';
import {useCountdown} from '../ui/useCountdown';
import {rewardedAds} from '../platform/RewardedAds';
import {haptics} from '../platform/hapticService';
import {getAudio} from '../audio/audioService';
import {wheelSegment} from '../../../game-core/src/systems/WheelOutcome';

export function WheelScreen({game,width,height,insets,onBack}:{game:GameRuntime;width:number;height:number;insets:Insets;onBack:()=>void}){
 const state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot);
 const controller=useMemo(()=>new WheelController(game,rewardedAds,{land:()=>{haptics.emit('wheel.landed',game.nextId('wheelLand'));const pending=game.dispatcher.getSnapshot().data.wheel.pendingSpin;if(pending)getAudio().emit('wheel.result',{id:pending.id,neutral:wheelSegment(pending.outcomeId).grants.length===0});}}),[game]);
 useEffect(()=>()=>controller.dispose(),[controller]);
 const viewState=useSyncExternalStore(controller.subscribe,controller.getSnapshot);
 useEffect(()=>{if(viewState.error)getAudio().emit('ui.error');},[viewState.error]);
 const remainingMs=useCountdown(state.data.wheel.nextFreeAt),view=wheelView(state,viewState,remainingMs);
 return <View><WheelPanel width={width} height={height} insets={insets} {...view} reducedMotion={state.data.settings.reducedMotion} onBack={onBack} onAction={()=>void controller.action()} onSettled={controller.settled} onTick={()=>getAudio().emit('wheel.tick')}/>
 {__DEV__&&rewardedAds.testLabel&&<Text style={{position:'absolute',bottom:8,color:'#fff',alignSelf:'center',fontSize:10}}>{rewardedAds.testLabel}</Text>}
 <View accessible testID="wheel-status" accessibilityLabel={`${view.phase}; ${view.rewardText}; Free spins ${state.data.wheel.freeSpins}; ${view.error}`} style={{position:'absolute',width:1,height:1,opacity:0}}/>
 </View>;
}
