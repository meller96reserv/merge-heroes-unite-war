import type {ReactNode} from 'react';
import {Circle,Group} from '@shopify/react-native-skia';
import {Label} from '../rendering/Art';
import {useButtonMotion,useCounterMotion,useNoticeMotion} from './UiMotion';
export function MotionButton({x,y,pressed=false,selected=false,reducedMotion=false,children}:{x:number;y:number;pressed?:boolean;selected?:boolean;reducedMotion?:boolean;children:ReactNode}){
 const transform=useButtonMotion(pressed,selected,reducedMotion);return <Group origin={{x,y}} transform={transform} opacity={reducedMotion&&pressed?0.8:1}>{children}</Group>;
}
export function CounterPulse({x,y,value,reducedMotion=false,children}:{x:number;y:number;value:string;reducedMotion?:boolean;children:ReactNode}){
 const transform=useCounterMotion(value,reducedMotion);return <Group origin={{x,y}} transform={transform}>{children}</Group>;
}
export function NotificationDot({x,y,visible,reducedMotion=false}:{x:number;y:number;visible:boolean;reducedMotion?:boolean}){
 const transform=useNoticeMotion(visible,reducedMotion);return <Group origin={{x,y}} transform={transform}><Circle cx={x} cy={y} r={8} color="#ef4853"/><Circle cx={x} cy={y} r={8} color="#ffe3a3" style="stroke" strokeWidth={1.3}/><Label text="!" x={x} y={y+5} size={16} bold center/></Group>;
}
