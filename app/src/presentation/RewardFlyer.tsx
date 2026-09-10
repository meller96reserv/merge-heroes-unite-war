import {useEffect} from 'react';
import {Group} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withTiming,withDelay,cancelAnimation,Easing} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {Sprite} from '../rendering/Art';
import type {RewardLease} from './RewardMotion';
export function RewardFlyer({lease,release}:{lease:RewardLease;release:(lease:RewardLease)=>void}){
 const flyer=lease.value.flyer!,p=useSharedValue(0),target=flyer.currency==='gold'?{x:88,y:45}:{x:252,y:44};
 const transform=useDerivedValue(()=>{
  const t=p.value,a=1-t,bendX=flyer.x+(flyer.ordinal-2)*28,bendY=flyer.y-90;
  return [{translateX:a*a*flyer.x+2*a*t*bendX+t*t*target.x},{translateY:a*a*flyer.y+2*a*t*bendY+t*t*target.y},{scale:1-0.35*t}];
 });
 const opacity=useDerivedValue(()=>Math.min(1,(1-p.value)*6));
 useEffect(()=>{const done=()=>release(lease);p.value=0;p.value=withDelay(flyer.ordinal*35,withTiming(1,{duration:flyer.currency==='gold'?560:650,easing:Easing.in(Easing.quad)},finished=>{if(finished)scheduleOnRN(done);}));return()=>cancelAnimation(p);},[lease]);
 return <Group transform={transform} opacity={opacity}><Sprite id={flyer.currency==='gold'?'currency_gold_coin__254x262':'currency_gem_blue__300x252'} x={-10} y={-10} width={20} height={20}/></Group>;
}
