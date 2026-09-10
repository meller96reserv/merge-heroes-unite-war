import {useEffect} from 'react';
import {Group,Circle} from '@shopify/react-native-skia';
import {useSharedValue,useDerivedValue,withTiming,cancelAnimation,Easing} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {Sprite,heroArt} from '../rendering/Art';
import type {BattleLayout} from '../components/BattleBoard';
import {mergeMarker,type MergeLease} from './MergeMotion';
export function MergeOverlay({lease,l,release,reducedMotion}:{lease:MergeLease;l:BattleLayout;release:(lease:MergeLease)=>void;reducedMotion:boolean}){
 const v=lease.value.visual!,source=l.board[v.sourceSlot]!,target=l.board[v.targetSlot]!,progress=useSharedValue(0);
 const a={x:source.x+34,y:source.y+21},z={x:target.x+34,y:target.y+21};
 const marker=useDerivedValue(()=>mergeMarker(progress.value*650));
 const sourceTransform=useDerivedValue(()=>{const t=marker.value.converge;return [{translateX:a.x+(z.x-a.x)*t},{translateY:a.y+(z.y-a.y)*t},{scale:1-0.8*(1-marker.value.oldOpacity)}];});
 const targetTransform=useDerivedValue(()=>[{translateX:z.x},{translateY:z.y},{scale:1-0.8*(1-marker.value.oldOpacity)}]);
 const oldOpacity=useDerivedValue(()=>reducedMotion?0:marker.value.oldOpacity);
 const reveal=useDerivedValue(()=>reducedMotion?progress.value:marker.value.reveal);
 const resultTransform=useDerivedValue(()=>[{translateX:z.x},{translateY:z.y},{scale:reducedMotion?1:progress.value*650<390?reveal.value*1.08:1.08-0.08*marker.value.settle}]);
 const glow=useDerivedValue(()=>reducedMotion?0:Math.sin(Math.max(0,Math.min(1,(progress.value*650-180)/470))*Math.PI)*0.5);
 const radius=useDerivedValue(()=>20+progress.value*(20+(v.intensity-1)*3));
 useEffect(()=>{const done=()=>release(lease);progress.value=0;progress.value=withTiming(1,{duration:reducedMotion?140:650,easing:Easing.linear},finished=>{if(finished)scheduleOnRN(done);});return()=>cancelAnimation(progress);},[lease,reducedMotion]);
 return <Group><Group opacity={glow}><Circle cx={z.x} cy={z.y} r={radius} color={v.intensity>=3?'#ffe488':'#8cfff2'} style="stroke" strokeWidth={3+(v.intensity-1)*0.5}/><Circle cx={z.x} cy={z.y} r={20} color="#ffe488" opacity={Math.min(0.6,0.35+(v.intensity-1)*0.08)}/></Group>
 <Group opacity={oldOpacity}><Group transform={sourceTransform}><Sprite id={heroArt[v.sourceTier-1]!} x={-22.5} y={-23.5} width={45} height={47}/></Group><Group transform={targetTransform}><Sprite id={heroArt[v.sourceTier-1]!} x={-22.5} y={-23.5} width={45} height={47}/></Group></Group>
 <Group opacity={reveal} transform={resultTransform}><Sprite id={heroArt[v.tier-1]!} x={-22.5} y={-23.5} width={45} height={47}/></Group></Group>;
}
