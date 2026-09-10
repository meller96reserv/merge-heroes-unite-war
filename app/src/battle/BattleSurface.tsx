import {memo,useSyncExternalStore} from 'react';
import {Canvas,Group} from '@shopify/react-native-skia';
import {View} from 'react-native';
import {BattleWorld,type BattleLayout} from '../components/BattleBoard';
import type {BattleRuntime} from './BattleRuntime';
import {BattleActors} from './BattleActors';

/** Static supplied scenery has no animation mapper. This caches its native
 * surface independently instead of painting the full texture on every strike. */
export const BattleBackdrop=memo(function BattleBackdrop({l,width,height,fixture=false}:{l:BattleLayout;width:number;height:number;fixture?:boolean}){
 return <Canvas pointerEvents="none" style={{position:'absolute',width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}><BattleWorld l={l} actors={fixture?undefined:<Group/>}/></Group></Group></Canvas>;
});

/** Same shared Skia actors; a bounded surface and direct subscription keep
 * projectile frames/leases out of the page, board, buttons and native gestures.
 * Reanimated keeps smooth transforms on the UI thread between fixed core ticks. */
export const BattleSurface=memo(function BattleSurface({battle,l,reducedMotion}:{battle:BattleRuntime;l:BattleLayout;reducedMotion:boolean}){
 const snapshot=useSyncExternalStore(battle.subscribe,battle.getSnapshot),top=238;
 const {entities}=snapshot.combat.encounter;
 return <>
 <Canvas pointerEvents="none" style={{position:'absolute',left:l.offsetX,top:l.offsetY+top*l.scale,width:l.playWidth,height:Math.max(1,l.boostY-top+3)*l.scale}}><Group transform={[{scale:l.scale},{translateY:-top}]}><BattleActors snapshot={snapshot} l={l} reducedMotion={reducedMotion} releaseDamage={battle.releaseDamageLabel}/></Group></Canvas>
 <View testID="battle-status" accessible accessibilityLabel={`Enemy health ${entities.filter(e=>e.side==='enemy').reduce((n,e)=>n+e.hp,0)}; Attacks ${entities.filter(e=>e.side==='hero').reduce((n,e)=>n+e.attackSequence,0)}`} style={{position:'absolute',width:1,height:1,opacity:0}}/>
 </>;
});
