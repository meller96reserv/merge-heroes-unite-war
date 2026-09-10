import {Canvas,Group} from '@shopify/react-native-skia';
import {View,Text} from 'react-native';
import {useState} from 'react';
import {Sprite,Label} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';
import {AttentionPulse} from '../presentation/AttentionPulse';
import {GameButton} from '../ui/GameButton';
import {layout,type Insets} from '../ui/ResponsiveLayout';
import {EffectBurst} from '../presentation/EffectBurst';
import type {useMetaRewardMotion} from '../presentation/useMetaRewardMotion';
export function DailyRewardPanel({width,height,insets,gold,cta,subtitle,busy,notice,onAction,onBack,reduced,fx}:{width:number;height:number;insets:Insets;gold:string;cta:string;subtitle:string;busy:boolean;notice:string;onAction:()=>void;onBack:()=>void;reduced:boolean;fx:ReturnType<typeof useMetaRewardMotion>}){
 const l=layout(width,height,insets),top=(l.virtualHeight-435)/2,[pressed,setPressed]=useState('');
 return <View testID="daily-reward-screen" style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Sprite id="background_floating_islands__941x1672" x={0} y={0} width={430} height={l.virtualHeight} fit="cover"/>
 <Group clip={{x:51,y:top,width:328,height:435}}><Sprite id="ui_panel_plain_navy__1126x2000" x={32.2} y={top-22.1} width={365.59} height={469.4} fit="fill"/></Group>
 <Label text="DAILY BONUS!" x={216} y={top+58} size={36} bold center/>
 <Label text={subtitle} x={216} y={top+100} size={24} bold center maxWidth={302}/>
 <Sprite id="reward_gold_chest__1254x1254_variant2" x={135} y={top+141} width={161} height={162}/>
 <Sprite id="ui_button_gold__2378x1300" x={118} y={top+265} width={195} height={54} fit="fill"/><Label text={`+${gold}`} x={215.5} y={top+304} size={36} bold center outline={2}/>
 <AttentionPulse x={215.5} y={top+382} active={!busy&&cta==='GET FREE GOLD'} reduced={reduced}><MotionButton x={215.5} y={top+382} pressed={pressed==='action'} reducedMotion={reduced}><Group opacity={busy?0.6:1}><Sprite id="ui_button_orange__2542x1359" x={70} y={top+343} width={291} height={78} fit="fill"/><Label text={busy?'SAVING…':cta} x={215.5} y={top+394} size={36} bold center outline={2} maxWidth={260}/></Group></MotionButton></AttentionPulse>
 <MotionButton x={38} y={66} pressed={pressed==='back'} reducedMotion={reduced}><Group origin={{x:38,y:66}} transform={[{rotate:-Math.PI/2}]}><Sprite id="ui_icon_upgrade_arrow__1302x1413" x={18} y={45} width={40} height={42}/></Group></MotionButton>
 {fx.records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={fx.motion.release}/>)}
 </Group></Group></Canvas>
 <GameButton label="Back from daily reward" rect={l.toScreen({x:15,y:43,width:46,height:46})} onVisualChange={s=>setPressed(s==='pressed'?'back':'')} onPress={onBack}/>
 <GameButton label={cta} testID="daily-action" rect={l.toScreen({x:70,y:top+343,width:291,height:78})} state={busy?'loading':'normal'} onVisualChange={s=>setPressed(s==='pressed'?'action':'')} onPress={onAction}/>
 {!!notice&&<View accessibilityRole="alert" style={{position:'absolute',top:l.offsetY+(top+445)*l.scale,left:l.offsetX+35*l.scale,width:360*l.scale,backgroundColor:'#102b43ef',padding:9,borderRadius:10}}><Text style={{color:'#fff1c4',textAlign:'center'}}>{notice}</Text></View>}
 </View>;
}
