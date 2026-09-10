import {useEffect,type ReactNode} from 'react';
import {Group} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withRepeat,withSequence,withTiming,cancelAnimation} from 'react-native-reanimated';
export function AttentionPulse({active,reduced=false,x,y,children}:{active:boolean;reduced?:boolean;x:number;y:number;children:ReactNode}){
 const scale=useSharedValue(1);
 useEffect(()=>{cancelAnimation(scale);scale.value=1;if(active&&!reduced)scale.value=withRepeat(withSequence(withTiming(1.045,{duration:500}),withTiming(1,{duration:700})),-1,false);return()=>cancelAnimation(scale);},[active,reduced]);
 const transform=useDerivedValue(()=>[{scale:scale.value}]);return <Group origin={{x,y}} transform={transform}>{children}</Group>;
}
