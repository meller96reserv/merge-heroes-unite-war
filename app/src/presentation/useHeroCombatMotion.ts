import {useEffect,useMemo,useRef} from 'react';
import {useSharedValue,useDerivedValue,withTiming,withSequence,cancelAnimation} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {AnimationDirector,type MotionMount} from './AnimationDirector';
import {heroAttackTiming,heroCombatProfile} from './HeroCombatMotion';
type Actor={id:string;encounterId:string;hp:number;alive:boolean;attackSequence:number;hitDelayMs:number;attackType:'melee'|'ranged'|'magic'};
export function useHeroCombatMotion(view:Actor,reducedMotion:boolean){
 const director=useMemo(()=>new AnimationDirector(),[]),mount=useRef<MotionMount|null>(null),last=useRef({sequence:view.attackSequence,hp:view.hp});
 const strike=useSharedValue(0),flash=useSharedValue(0),opacity=useSharedValue(view.alive?1:0),profile=heroCombatProfile[view.attackType];
 const transform=useDerivedValue(()=>[{translateX:strike.value*profile.lungePx},{rotate:strike.value*profile.tilt}]);
 useEffect(()=>{
  const reset=()=>{strike.value=0;flash.value=0;};
  // Owned hero IDs survive scene changes, but combat sequences and death state do not.
  // Start a fresh generation without replaying a reset counter or remounting idle/spawn.
  last.current={sequence:view.attackSequence,hp:view.hp};
  reset();opacity.value=view.alive?1:0;
  mount.current=director.mount(view.id,reset);
  return()=>{if(mount.current)director.unmount(mount.current);[strike,flash,opacity].forEach(cancelAnimation);mount.current=null;};
 },[director,view.id,view.encounterId]);
 useEffect(()=>{director.setMode(reducedMotion?'reduced':'full');strike.value=0;flash.value=0;},[director,reducedMotion]);
 useEffect(()=>{
  const m=mount.current;if(!m)return;
  const cleanup=()=>{[strike,flash,opacity].forEach(cancelAnimation);};
  if(!view.alive){
   director.play(m,'hero.death','death',ticket=>{
    const done=()=>{director.finish(ticket);};
    opacity.value=withTiming(0,{duration:ticket.profile.durationMs},finished=>{if(finished)scheduleOnRN(done);});return cleanup;
   });
  }else if(view.hp<last.current.hp){
   director.play(m,'hero.hit',`hit:${view.hp}`,ticket=>{
    const done=()=>{director.finish(ticket);};
    flash.value=withSequence(withTiming(0.65,{duration:40}),withTiming(0,{duration:100},finished=>{if(finished)scheduleOnRN(done);}));
    if(ticket.profile.spatial)strike.value=withSequence(withTiming(-0.3,{duration:40}),withTiming(0,{duration:100}));return cleanup;
   });
  }else if(view.attackSequence>last.current.sequence){
   director.play(m,'hero.attack',`attack:${view.attackSequence}`,ticket=>{
    const t=heroAttackTiming(view.hitDelayMs),done=()=>{director.finish(ticket);};
    if(ticket.profile.spatial)strike.value=withSequence(withTiming(-0.3,{duration:t.anticipationMs}),withTiming(1,{duration:t.releaseMs}),withTiming(0,{duration:t.recoveryMs},finished=>{if(finished)scheduleOnRN(done);}));
    else flash.value=withSequence(withTiming(0.12,{duration:40}),withTiming(0,{duration:100},finished=>{if(finished)scheduleOnRN(done);}));
    return cleanup;
   });
  }
  last.current={sequence:view.attackSequence,hp:view.hp};
 },[view.alive,view.hp,view.attackSequence,view.id,view.encounterId,reducedMotion]);
 return {transform,flash,opacity};
}
