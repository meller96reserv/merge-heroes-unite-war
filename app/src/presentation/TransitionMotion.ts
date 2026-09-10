import {useLayoutEffect,useRef,useState} from 'react';
import {useSharedValue,useAnimatedStyle,withTiming,cancelAnimation,Easing} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';

/** Retains the exiting surface/input owner until its own generation completes.
 * Route/load identity changes invalidate every callback from the previous view.
 */
export function useTransitionMotion(identity:string|null,reduced=false,kind:'modal'|'route'='modal'){
 const [retained,setRetained]=useState(identity),generation=useRef(0),progress=useSharedValue(0);
 useLayoutEffect(()=>{
  const token=++generation.current;cancelAnimation(progress);
  if(identity!==null)setRetained(identity);
  const finish=()=>{if(generation.current===token&&identity===null)setRetained(null);};
  progress.value=withTiming(identity===null?0:1,{duration:reduced?100:identity===null?180:280,easing:Easing.out(Easing.cubic)},done=>{if(done)scheduleOnRN(finish);});
  return()=>{generation.current++;cancelAnimation(progress);};
 },[identity,reduced,kind]);
 const backdropStyle=useAnimatedStyle(()=>({opacity:progress.value}));
 const panelStyle=useAnimatedStyle(()=>({opacity:0.01+0.99*progress.value,transform:reduced?[]:kind==='modal'?[{translateY:16*(1-progress.value)},{scale:0.96+0.04*progress.value}]:[{translateY:10*(1-progress.value)}]}));
 return {presented:identity??retained,backdropStyle,panelStyle};
}
