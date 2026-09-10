import {useEffect,useRef} from 'react';
import {useSharedValue,useDerivedValue,withTiming,withSequence,cancelAnimation,Easing} from 'react-native-reanimated';

/** A single shared value owns each scale; rapid revisions replace the old tween. */
export function useButtonMotion(pressed:boolean,selected=false,reduced=false){
 const scale=useSharedValue(reduced?1:selected?1.04:1);
 useEffect(()=>{
  cancelAnimation(scale);scale.value=withTiming(reduced?1:pressed?0.96:selected?1.04:1,{duration:reduced?0:pressed?80:200,easing:Easing.out(Easing.quad)});
  return()=>cancelAnimation(scale);
 },[pressed,selected,reduced]);
 return useDerivedValue(()=>[{scale:scale.value}]);
}
export function useCounterMotion(value:string,reduced=false){
 const last=useRef(value),scale=useSharedValue(1);
 useEffect(()=>{
  if(last.current===value){if(reduced)scale.value=1;return;}last.current=value;cancelAnimation(scale);
  scale.value=reduced?1:1.07;
  if(!reduced)scale.value=withTiming(1,{duration:280,easing:Easing.out(Easing.quad)});
  return()=>cancelAnimation(scale);
 },[value,reduced]);
 return useDerivedValue(()=>[{scale:scale.value}]);
}
export function useNoticeMotion(visible:boolean,reduced=false){
 const scale=useSharedValue(0);
 useEffect(()=>{
  cancelAnimation(scale);scale.value=reduced?(visible?1:0):visible?withSequence(withTiming(1.1,{duration:180}),withTiming(1,{duration:100})):withTiming(0,{duration:100});
  return()=>cancelAnimation(scale);
 },[visible,reduced]);
 return useDerivedValue(()=>[{scale:scale.value}]);
}
