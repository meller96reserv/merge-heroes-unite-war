import {useEffect,useMemo} from 'react';
import {useSharedValue,useDerivedValue,withTiming,withSequence,withRepeat,cancelAnimation,Easing} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {AnimationDirector} from './AnimationDirector';
import {heroMotionProfile,heroFoot} from './HeroMotion';
export function useHeroMotion(id:string,artId:string,rect:{x:number;y:number;width:number;height:number},reducedMotion:boolean,idle=true,enabled=true) {
 const profile=heroMotionProfile(artId),director=useMemo(()=>new AnimationDirector(),[]);
 const scale=useSharedValue(enabled&&!reducedMotion?0:1),opacity=useSharedValue(enabled?0:1),breath=useSharedValue(0);
 const transform=useDerivedValue(()=>[{translateY:-breath.value*profile.hoverPx},{scale:scale.value},{scaleY:1+breath.value*profile.breathScale}]);
 useEffect(()=>{
  director.setMode(reducedMotion?'reduced':'full');
  const reset=()=>{scale.value=1;opacity.value=1;breath.value=0;};
  const mount=director.mount(id,reset);
  const cancel=()=>{[scale,opacity,breath].forEach(cancelAnimation);};
  if(!enabled){reset();return()=>{director.unmount(mount);cancel();};}
  director.play(mount,'hero.spawn','spawn',ticket=>{
   const idleAfterSpawn=()=>{
    if(!director.finish(ticket)||!idle)return;
    director.play(mount,'hero.idle','idle',idleTicket=>{
     if(idleTicket.profile.spatial)breath.value=withRepeat(withTiming(1,{duration:profile.idleMs/2,easing:Easing.inOut(Easing.sin)}),-1,true);
     return()=>cancelAnimation(breath);
    });
   };
   opacity.value=0;scale.value=reducedMotion?1:0;
   opacity.value=withTiming(1,{duration:reducedMotion?140:120});
   if(reducedMotion)scale.value=withTiming(1,{duration:140},finished=>{if(finished)scheduleOnRN(idleAfterSpawn);});
   else scale.value=withSequence(withTiming(profile.overshoot,{duration:120,easing:Easing.out(Easing.cubic)}),withTiming(1,{duration:160,easing:Easing.out(Easing.quad)},finished=>{if(finished)scheduleOnRN(idleAfterSpawn);}));
   return cancel;
  });
  return()=>{director.unmount(mount);cancel();};
 },[director,id,artId,reducedMotion,idle,enabled]);
 return {transform,opacity,pivot:heroFoot(artId,rect)};
}
