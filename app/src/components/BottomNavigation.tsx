import {useEffect} from 'react';
import {Group,Rect} from '@shopify/react-native-skia';
import {useSharedValue,withTiming,cancelAnimation} from 'react-native-reanimated';
import {Sprite} from '../rendering/Art';import type {AssetId} from '../assets/registry';
import {MotionButton,NotificationDot} from '../presentation/UiMotionViews';
export const tabs=['Shop','Heroes','Battle','Dungeon','Relics'] as const;
const icons:AssetId[]=['ui_nav_shop__438x436','ui_nav_heroes_helmet__1902x1550','ui_icon_battle_swords__1402x1456','ui_nav_dungeon__1494x1139','ui_nav_crystal_relic__1407x1332'];
function NavigationTab({index,y,selected,pressed,notice,reducedMotion}:{index:number;y:number;selected:boolean;pressed:boolean;notice:boolean;reducedMotion:boolean}){
 const x=7+84*index,opacity=useSharedValue(selected?1:0);
 useEffect(()=>{opacity.value=withTiming(selected?1:0,{duration:reducedMotion?0:200});return()=>cancelAnimation(opacity);},[selected,reducedMotion]);
 return <MotionButton x={x+39.5} y={y+40} pressed={pressed} selected={selected} reducedMotion={reducedMotion}>
 <Sprite id="ui_panel_dark_square__1576x1595" x={x} y={y} width={79} height={80} fit="fill"/>
 <Group opacity={opacity}><Sprite id="ui_panel_blue_square__1448x1614" x={x} y={y} width={79} height={80} fit="fill"/></Group>
 <Rect x={x} y={y} width={79} height={80} style="stroke" color="black" strokeWidth={1}/><Sprite id={icons[index]!} x={x+11} y={y+9} width={58} height={60}/>
 <NotificationDot x={x+69} y={y+9} visible={notice} reducedMotion={reducedMotion}/></MotionButton>;
}
export function BottomNavigation({y,selected=2,pressed=-1,notices=[],reducedMotion=false}:{y:number;selected?:number;pressed?:number;notices?:readonly number[];reducedMotion?:boolean}){
 return <Group>{tabs.map((name,i)=><NavigationTab key={name} index={i} y={y} selected={selected===i} pressed={pressed===i} notice={notices.includes(i)} reducedMotion={reducedMotion}/>)}</Group>;
}
