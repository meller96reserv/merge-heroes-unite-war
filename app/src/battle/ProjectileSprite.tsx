import {useEffect} from 'react';import {Group,Circle,Path,RoundedRect,BlurMask} from '@shopify/react-native-skia';import {useSharedValue,useDerivedValue,withTiming,cancelAnimation,Easing} from 'react-native-reanimated';import type {ProjectileView} from './ProjectileView';
import art from '../../assets/art/effects/projectile-manifest.json';
/** Disposable original vector effect. Completion has no gameplay callback. */
export function ProjectileSprite({view,reducedMotion=false,lowQuality=false}:{view:ProjectileView;reducedMotion?:boolean;lowQuality?:boolean}){
 const progress=useSharedValue(0),angle=Math.atan2(view.to.y-view.from.y,view.to.x-view.from.x);
 const transform=useDerivedValue(()=>[{translateX:view.from.x+(view.to.x-view.from.x)*progress.value},{translateY:view.from.y+(view.to.y-view.from.y)*progress.value-(view.kind==='magic'?Math.sin(Math.PI*progress.value)*15:0)},{rotate:angle}]);
 const opacity=useDerivedValue(()=>Math.min(1,(1-progress.value)*5));
 useEffect(()=>{progress.value=withTiming(1,{duration:Math.max(1,view.durationMs),easing:Easing.linear});return()=>cancelAnimation(progress);},[view.id]);
 if(reducedMotion)return null;
 const profile=art.profiles[view.kind],color=profile.trail;
 return <Group transform={transform} opacity={opacity}>
 {!lowQuality&&<RoundedRect x={-30} y={-2} width={30} height={4} r={2} color={color} opacity={0.25}/>}<RoundedRect x={-20} y={-2} width={20} height={4} r={2} color={color} opacity={0.5}/>
 {!lowQuality&&<Circle cx={0} cy={0} r={8} color={color}><BlurMask blur={5} style="normal"/></Circle>}
 {view.kind==='magic'?<><Circle cx={0} cy={0} r={profile.radius+1.5} color={profile.outline}/><Circle cx={0} cy={0} r={profile.radius} color={profile.fill}/><Circle cx={1} cy={-1} r={profile.coreRadius} color="white"/></>:<><Path path={profile.path} color={profile.outline} style="stroke" strokeWidth={2}/><Path path={profile.path} color={profile.fill}/></>}
 </Group>;
}
