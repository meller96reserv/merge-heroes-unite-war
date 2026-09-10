import {useState} from 'react';import {View,Text} from 'react-native';
import {Canvas,Group,Circle,Line,Image as SkiaImage,useImage} from '@shopify/react-native-skia';
import {art} from '../assets/registry';import {GameButton,buttonVisual,type ButtonState} from '../ui/GameButton';
import {MotionButton,NotificationDot} from '../presentation/UiMotionViews';
import {useWheelMotion} from '../presentation/useWheelMotion';
const states:ButtonState[]=['normal','pressed','disabled','loading','selected','locked'];
export default function ButtonFixture(){
 const image=useImage(art.ui_panel_blue_square__1448x1614);const [count,setCount]=useState(0),[info,setInfo]=useState(''),[pressed,setPressed]=useState<ButtonState|null>(null);
 const wheel=useWheelMotion(count?{id:`button-${count}`,landingAngleDegrees:90}:null);
 return <View style={{width:320,height:640}}><Canvas style={{width:320,height:560}}>{states.map((state,i)=>{const active=i===0&&pressed?pressed:state,v=buttonVisual(active);return <Group key={state} opacity={v.opacity}><MotionButton x={40} y={40+i*80} pressed={active==='pressed'} selected={active==='selected'}><SkiaImage image={image} x={8} y={8+i*80} width={64} height={64} fit="fill"/><NotificationDot x={68} y={12+i*80} visible={state==='selected'||i===0&&count>0}/></MotionButton></Group>;})}<Circle cx={160} cy={520} r={28} color="#45657e"/><Group origin={{x:160,y:520}} transform={wheel.transform}><Line p1={{x:160,y:520}} p2={{x:160,y:494}} color="#ffd56a" strokeWidth={5}/></Group></Canvas>
 {states.map((state,i)=><View key={state} style={{position:'absolute',left:0,top:i*80,width:320,height:80}}><Text style={{color:'white',position:'absolute',left:90,top:30}}>{state}{buttonVisual(state).label}</Text><GameButton rect={{x:8,y:8,width:64,height:64}} label={state} state={state} onPress={()=>setCount(n=>n+1)} onInfo={()=>setInfo('Unlock requirement')} onVisualChange={i===0?setPressed:undefined}/></View>)}
 <View testID="wheel-motion-state" accessibilityLabel={wheel.settledId??'moving'}/><Text testID="button-count" style={{color:'white'}}>Actions {count}</Text><Text style={{color:'white'}}>{info}</Text></View>;
}
