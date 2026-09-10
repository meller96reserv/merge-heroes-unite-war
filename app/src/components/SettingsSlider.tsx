import {useEffect} from 'react';
import {Platform,View} from 'react-native';
import {Gesture,GestureDetector} from 'react-native-gesture-handler';
import {Circle,RoundedRect,Group} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withTiming,cancelAnimation,type SharedValue} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import type {Rect} from '../ui/ResponsiveLayout';
export function useSettingsSlider(value:number,commit:(value:number)=>void,reduced:boolean,busy:boolean){
 const current=useSharedValue(value),held=useSharedValue(false),saved=useSharedValue(value);
 useEffect(()=>{saved.value=value;if(!held.value&&!busy)current.value=withTiming(value,{duration:reduced?0:120});},[value,reduced,busy]);
 useEffect(()=>()=>cancelAnimation(current),[]);
 return {current,held,saved,commit};
}
export function SliderTrack({x,y,value}:{x:number;y:number;value:SharedValue<number>}){
 const cx=useDerivedValue(()=>x+7+252*value.value);
 return <Group><RoundedRect x={x} y={y+3} width={266} height={8} r={4} color="white"/><Circle cx={cx} cy={y+7} r={7} color="#ff8000"/></Group>;
}
export function SliderInput({slider,rect,label,value,disabled=false}:{slider:ReturnType<typeof useSettingsSlider>;rect:Rect;label:string;value:number;disabled?:boolean}){
 const {current,held,saved,commit}=slider;
 const gesture=Gesture.Pan().enabled(!disabled).minDistance(0).maxPointers(1)
 .onStart(e=>{held.value=true;current.value=Math.max(0,Math.min(1,(e.x/rect.width*266-7)/252));})
 .onUpdate(e=>{current.value=Math.max(0,Math.min(1,(e.x/rect.width*266-7)/252));})
 .onEnd((_e,success)=>{if(success)scheduleOnRN(commit,Math.round(current.value*100)/100);})
 .onFinalize((_e,success)=>{held.value=false;if(!success)current.value=withTiming(saved.value,{duration:100});});
 const key=(name:string)=>{if(disabled)return false;const next=name==='Home'?0:name==='End'?1:['ArrowLeft','ArrowDown'].includes(name)?value-.1:['ArrowRight','ArrowUp'].includes(name)?value+.1:null;if(next===null)return false;commit(Math.max(0,Math.min(1,Math.round(next*100)/100)));return true;};
 const web=Platform.OS==='web'?{onKeyDown:(e:{nativeEvent:{key:string};preventDefault:()=>void})=>{if(key(e.nativeEvent.key))e.preventDefault();}}:{};
 return <GestureDetector gesture={gesture}><View {...web} testID={`settings-${label.toLowerCase()}`} tabIndex={disabled?-1:0} accessible accessibilityRole="adjustable" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value*100)} aria-disabled={disabled} accessibilityLabel={`${label} volume`} accessibilityValue={{min:0,max:100,now:Math.round(value*100)}} accessibilityState={{disabled}} accessibilityActions={[{name:'increment'},{name:'decrement'}]} onAccessibilityAction={e=>key(e.nativeEvent.actionName==='increment'?'ArrowUp':'ArrowDown')} style={{position:'absolute',left:rect.x,top:rect.y,width:rect.width,height:rect.height}}/></GestureDetector>;
}
