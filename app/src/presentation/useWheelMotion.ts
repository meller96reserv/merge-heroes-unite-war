import {useEffect,useRef,useState} from 'react';
import {useSharedValue,useDerivedValue,useAnimatedReaction,withTiming,withSequence,cancelAnimation} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {planWheelSpin,wheelEasing,type WheelSpinRequest} from './WheelMotion';
/** Presentation callback only; a saved outcome and confirmed ad own any claim. */
export function useWheelMotion(request:WheelSpinRequest|null,reduced=false,onTick?:()=>void){
 const angle=useSharedValue(0),pointer=useSharedValue(0),active=useSharedValue(false),tickAt=useSharedValue(0),segmentCount=useSharedValue(12),run=useSharedValue(0);
 const generation=useRef(0),tickCallback=useRef(onTick),[settledId,setSettledId]=useState<string|null>(null);tickCallback.current=onTick;
 const tick=(token:number)=>{if(generation.current===token)tickCallback.current?.();};
 useAnimatedReaction(()=>Math.floor(angle.value/(360/segmentCount.value)),(current,previous)=>{
  if(!active.value||previous===null||current===previous)return;
  const now=Date.now();if(now-tickAt.value<45)return;tickAt.value=now;
  pointer.value=withSequence(withTiming(-Math.PI/30,{duration:20}),withTiming(0,{duration:60}));scheduleOnRN(tick,run.value);
 });
 useEffect(()=>{
  const token=++generation.current;run.value=token;cancelAnimation(angle);cancelAnimation(pointer);pointer.value=0;active.value=false;
  if(!request)return;
  const plan=planWheelSpin(angle.value,request);setSettledId(null);segmentCount.value=plan.segments;angle.value=plan.from;tickAt.value=0;
  const finish=()=>{if(generation.current===token){active.value=false;setSettledId(plan.id);}};
  if(reduced){angle.value=plan.to;finish();}
  else {active.value=true;angle.value=withTiming(plan.to,{duration:plan.durationMs,easing:wheelEasing},done=>{if(done)scheduleOnRN(finish);});}
  return()=>{generation.current++;active.value=false;cancelAnimation(angle);cancelAnimation(pointer);angle.value=plan.to;pointer.value=0;};
 },[request?.id,reduced]);
 const transform=useDerivedValue(()=>[{rotate:angle.value*Math.PI/180}]),pointerTransform=useDerivedValue(()=>[{rotate:pointer.value}]);
 return {transform,pointerTransform,settledId};
}
