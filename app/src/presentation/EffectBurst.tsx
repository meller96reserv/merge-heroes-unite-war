import {useEffect} from 'react';
import {Group,Circle,Path} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withTiming,cancelAnimation,Easing,type SharedValue} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {effectProfile,type EffectKind,type EffectMode,type BurstLease} from './EffectPrimitives';
const star='M 0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z';
function Particle({progress,index,count,radius,color,outline,shape}:{progress:SharedValue<number>;index:number;count:number;radius:number;color:string;outline:string;shape:string}){
 const angle=index*Math.PI*2/count-0.5;
 const transform=useDerivedValue(()=>[{translateX:Math.cos(angle)*radius*progress.value},{translateY:Math.sin(angle)*radius*progress.value+progress.value*progress.value*8},{scale:Math.max(0,1-progress.value*0.75)},{rotate:angle+progress.value*0.6}]);
 return <Group transform={transform}>{shape==='puff'?<><Circle r={4} color={outline}/><Circle r={3} color={color}/></>:<><Path path={star} color={outline} style="stroke" strokeWidth={1.4}/><Path path={star} color={color}/></>}</Group>;
}
export function BurstDrawing({kind,mode,x,y,progress}:{kind:EffectKind;mode:EffectMode;x:number;y:number;progress:SharedValue<number>}){
 const p=effectProfile(kind,mode),opacity=useDerivedValue(()=>Math.max(0,(1-progress.value)*0.8));
 const radius=useDerivedValue(()=>p.spatial?5+progress.value*p.radius:8);
 return <Group transform={[{translateX:x},{translateY:y}]} opacity={opacity}>
 <Circle r={radius} color={p.color} style="stroke" strokeWidth={kind==='crit'?3:1.5}/>
 {Array.from({length:p.count},(_,i)=><Particle key={i} progress={progress} index={i} {...p}/>)}
 </Group>;
}
export function EffectBurst({lease,release}:{lease:BurstLease;release:(lease:BurstLease)=>void}){
 const b=lease.value.burst!,profile=effectProfile(b.kind,b.mode),progress=useSharedValue(0);
 useEffect(()=>{const done=()=>release(lease);progress.value=0;progress.value=withTiming(1,{duration:profile.durationMs,easing:Easing.out(Easing.quad)},finished=>{if(finished)scheduleOnRN(done);});return()=>cancelAnimation(progress);},[lease]);
 return <BurstDrawing {...b} progress={progress}/>;
}
