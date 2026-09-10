import {useEffect,useMemo,useRef} from 'react';
import {Group,Oval,RoundedRect} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withTiming,withSequence,withRepeat,cancelAnimation,Easing} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {Sprite,Label} from '../rendering/Art';
import {AnimationDirector,type MotionMount} from '../presentation/AnimationDirector';
import {enemyMotionProfile,enemyFoot} from '../presentation/EnemyMotion';
import type {EnemyView} from './EnemyView';
export function EnemySprite({view,release,reducedMotion=false}:{view:EnemyView;release:(id:string,lease:number)=>void;reducedMotion?:boolean}){
 const director=useMemo(()=>new AnimationDirector(),[]),mount=useRef<MotionMount|null>(null),latest=useRef(view),previousHP=useRef(view.hp);latest.current=view;
 const opacity=useSharedValue(0),scale=useSharedValue(1),recoil=useSharedValue(0),flash=useSharedValue(0),breath=useSharedValue(0),fall=useSharedValue(0);
 const r=view.rect,p=enemyMotionProfile(view.boss,reducedMotion),foot=enemyFoot(r);
 const transform=useDerivedValue(()=>[{translateX:recoil.value*p.recoilPx},{translateY:-fall.value*p.deathRise},{rotate:fall.value*p.deathTilt},{scale:scale.value},{scaleY:1+breath.value*p.breathScale-fall.value*p.deathSquash}]);
 const cancel=()=>{[opacity,scale,recoil,flash,breath,fall].forEach(cancelAnimation);};
 const idle=()=>{
  const m=mount.current;if(!m||latest.current.phase==='death')return;
  director.play(m,'enemy.idle',`idle:${latest.current.hp}`,ticket=>{
   if(ticket.profile.spatial)breath.value=withRepeat(withTiming(1,{duration:p.idleMs/2,easing:Easing.inOut(Easing.sin)}),-1,true);
   return()=>{cancelAnimation(breath);breath.value=0;};
  });
 };
 useEffect(()=>{
  director.setMode(reducedMotion?'reduced':'full');
  const m=director.mount(`${view.id}:${view.lease}`,()=>{opacity.value=latest.current.phase==='death'?0:1;scale.value=1;recoil.value=0;flash.value=0;breath.value=0;fall.value=0;});mount.current=m;
  if(view.phase==='alive')director.play(m,view.boss?'boss.intro':'enemy.spawn','spawn',ticket=>{
   const done=()=>{if(director.finish(ticket))idle();};
   opacity.value=0;scale.value=p.spawnScale;scale.value=withTiming(1,{duration:p.spawnMs,easing:Easing.out(Easing.cubic)});
   opacity.value=withTiming(1,{duration:p.spawnMs},finished=>{if(finished)scheduleOnRN(done);});return cancel;
  });
  return()=>{director.unmount(m);cancel();mount.current=null;};
 },[director,view.id,view.lease,reducedMotion]);
 useEffect(()=>{
  const m=mount.current;if(!m)return;
  if(view.phase==='death')director.play(m,view.boss?'boss.death':'enemy.death','death',ticket=>{
   const done=()=>{if(director.finish(ticket))release(view.id,view.lease);};
   opacity.value=1;fall.value=withTiming(1,{duration:p.deathMs,easing:Easing.out(Easing.quad)});
   opacity.value=withTiming(0,{duration:p.deathMs},finished=>{if(finished)scheduleOnRN(done);});return cancel;
  });
  else if(view.hp<previousHP.current)director.play(m,view.boss?'boss.hit':'enemy.hit',`hit:${view.hp}`,ticket=>{
   const done=()=>{if(director.finish(ticket))idle();};
   flash.value=withSequence(withTiming(0.6,{duration:p.flashMs}),withTiming(0,{duration:p.hitMs-p.flashMs},finished=>{if(finished)scheduleOnRN(done);}));
   if(!reducedMotion)recoil.value=withSequence(withTiming(1,{duration:p.flashMs}),withTiming(0,{duration:p.hitMs-p.flashMs}));return cancel;
  });
  previousHP.current=view.hp;
 },[view.hp,view.phase,view.id,view.lease,reducedMotion]);
 const barWidth=Math.min(104,r.width*0.8),barX=r.x+(r.width-barWidth)/2,barY=r.y-10;
 return <Group opacity={opacity}>
 <Oval x={foot.x-r.width*0.35} y={foot.y-2} width={r.width*0.7} height={8} color="#091823" opacity={0.25}/>
 <Group origin={foot} transform={transform}><Sprite id={view.visualId} {...r}/><Group opacity={flash}><Sprite id={view.visualId} {...r} white/></Group></Group>
 <RoundedRect x={barX} y={barY} width={barWidth} height={12} r={6} color="#191f30"/><RoundedRect x={barX+2} y={barY+2} width={(barWidth-4)*Math.max(0,view.hp/view.maxHp)} height={8} r={4} color={view.boss?'#df4f8e':'#ee5953'}/>
 <RoundedRect x={barX} y={barY} width={barWidth} height={12} r={6} color="#e8c989" style="stroke" strokeWidth={1}/><Label text={`${view.hp}/${view.maxHp}`} x={barX+barWidth/2} y={barY+9} size={8} small center/>
 </Group>;
}
