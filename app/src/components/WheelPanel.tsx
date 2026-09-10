import {useEffect,useState} from 'react';
import {View} from 'react-native';
import {Canvas,Group} from '@shopify/react-native-skia';
import {AttentionPulse} from '../presentation/AttentionPulse';
import {Sprite,Label} from '../rendering/Art';
import {GameButton} from '../ui/GameButton';
import {layout,type Insets} from '../ui/ResponsiveLayout';
import {MotionButton} from '../presentation/UiMotionViews';
import {useWheelMotion} from '../presentation/useWheelMotion';
import type {WheelSpinRequest} from '../presentation/WheelMotion';
export type WheelPhase='available'|'spinning'|'result'|'cooldown'|'claiming'|'error';
export function cooldownLabel(ms:number){const seconds=Math.max(0,Math.ceil(ms/1000));return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(v=>String(v).padStart(2,'0')).join(':');}
// Centers reconstructed from Figma 2:643 design context; labels remain live text.
const labels=[
 ['MEGA WIN!',169.49,95.89,92.84,14.155],['3 FREE SPINS',164.36,255.24,-90,14],
 ['300',121.865,249.30,-60.39,14.155],['100',206.05,102.24,119.61,14.155],
 ['FAIL',90.069,217.47,-29.73,14.155],['FAIL',237.53,134.03,150.27,14.155],
 ['5 000',79.835,175.70,-0.14,14.155],['500',248.69,175.83,179.86,14.155],
 ['150',90.93,133.845,29.67,14.155],['1 000',235.545,217.70,-150.33,14.155],
 ['800',122.546,102.40,60.38,14.155],['200',205.869,249.54,-119.62,14.155],
 ['10 000',156.42,92.846,92.84,11.796],
] as const;
export type WheelPanelProps={width:number;height:number;insets?:Insets;phase:WheelPhase;remainingMs:number;free?:boolean;rewardText?:string;claimReady?:boolean;error?:string;spin:WheelSpinRequest|null;skipSpin?:boolean;reducedMotion?:boolean;onBack:()=>void;onAction:()=>void;onSettled?:(id:string)=>void;onTick?:()=>void};
export function WheelPanel({width,height,insets,phase,remainingMs,free=true,rewardText,claimReady=false,error,spin,skipSpin=false,reducedMotion=false,onBack,onAction,onSettled,onTick}:WheelPanelProps){
 const l=layout(width,height,insets),[pressed,setPressed]=useState(''),motion=useWheelMotion(spin,reducedMotion||skipSpin,onTick);
 useEffect(()=>{if(motion.settledId)onSettled?.(motion.settledId);},[motion.settledId]);
 const buttonY=l.virtualHeight-162,wheelScale=Math.min(1,Math.max(0.5,(l.virtualHeight-300)/400)),wheelTop=Math.min(Math.max(132,296+(l.virtualHeight-932)/2),buttonY-36-341*wheelScale),wheelLeft=215-164*wheelScale;
 const disabled=phase==='spinning'||phase==='claiming'||phase==='cooldown',cta=phase==='spinning'?'SPINNING…':phase==='claiming'?'PLEASE WAIT…':phase==='result'?claimReady?'CLAIM REWARD':'WATCH & CLAIM':phase==='error'?'TRY AGAIN':free?'FREE SPIN':'SPIN';
 return <View testID="wheel-screen" style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Sprite id="background_floating_islands__941x1672" x={0} y={0} width={430} height={l.virtualHeight} fit="cover"/>
 <Label text="WHEEL OF LUCK" x={216} y={94} size={24} bold center outline={2}/>
 {remainingMs>0&&phase!=='cooldown'&&<Label text={`NEXT FREE SPIN  ${cooldownLabel(remainingMs)}`} x={215} y={124} size={12} small center outline={1}/>}
 <MotionButton x={38} y={86.5} pressed={pressed==='back'} reducedMotion={reducedMotion}><Group origin={{x:38,y:86.5}} transform={[{rotate:-Math.PI/2}]}><Sprite id="ui_icon_upgrade_arrow__1302x1413" x={18.5} y={65.5} width={39} height={42} fit="fill"/></Group></MotionButton>
 <Group transform={[{translateX:wheelLeft},{translateY:wheelTop},{scale:wheelScale}]}>
 <Group origin={{x:164,y:176.9}} transform={motion.transform}>
 <Sprite id="ui_wheel_sectors__figma_2_634" x={27.1306} y={39.9946} width={273.6647} height={273.8134} fit="fill"/>
 {labels.map(([text,x,y,angle,size])=><Group key={text+angle} transform={[{translateX:x},{translateY:y},{rotate:angle*Math.PI/180}]}><Label text={text} x={0} y={size*0.34} size={size} bold center outline={1.25}/></Group>)}
 </Group>
 <Sprite id="ui_frame_purple_orb__1428x1440" x={134} y={140} width={59.49} height={59.49} fit="fill"/>
 <Sprite id="ui_wheel_outer_ring__1940x1924" x={-7} y={10} width={341} height={341} fit="fill"/>
 <Group origin={{x:164,y:9}} transform={motion.pointerTransform}><Sprite id="ui_icon_blue_triangle__1484x1322" x={131} y={0} width={66} height={59} fit="fill"/></Group>
 </Group>
 {phase==='cooldown'&&<Label text={cooldownLabel(remainingMs)} x={215} y={buttonY-15} size={12} small center/>}
 {rewardText&&(phase==='result'||phase==='claiming')&&<Label text={rewardText} x={215} y={buttonY-43} size={28} bold center outline={2} maxWidth={350}/>}
 {error&&<Label text={error} x={215} y={buttonY-20} size={13} small center outline={1} maxWidth={355}/>}
 <AttentionPulse active={phase==='result'&&pressed!=='action'} reduced={reducedMotion} x={215} y={buttonY+30.5}><MotionButton x={215} y={buttonY+30.5} pressed={pressed==='action'} reducedMotion={reducedMotion}><Group opacity={disabled?0.5:1}><Sprite id="ui_button_orange__2542x1359" x={58} y={buttonY} width={314} height={61.34} fit="fill"/><Label text={cta} x={215} y={buttonY+42} size={phase==='result'?31:36} bold center outline={2} maxWidth={290}/></Group></MotionButton></AttentionPulse>
 </Group></Group></Canvas>
 <GameButton label="Back from wheel" rect={l.toScreen({x:15,y:64,width:46,height:46})} onPress={onBack} onVisualChange={s=>setPressed(s==='pressed'?'back':'')}/>
 <GameButton label={cta} testID="wheel-action" state={disabled?'disabled':'normal'} rect={l.toScreen({x:58,y:buttonY,width:314,height:62})} onPress={onAction} onVisualChange={s=>setPressed(s==='pressed'?'action':'')}/>
 </View>;
}
