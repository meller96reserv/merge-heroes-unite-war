import {Group} from '@shopify/react-native-skia';
import {Sprite,Label} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';import {AttentionPulse} from '../presentation/AttentionPulse';
export function WheelEntry({pressed=false,reducedMotion=false,remainingMs,pending=false}:{pressed?:boolean;reducedMotion?:boolean;remainingMs?:number;pending?:boolean}){
 const seconds=Math.max(0,Math.ceil((remainingMs??0)/1000)),timer=[Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(v=>String(v).padStart(2,'0')).join(':');
 return <Group><AttentionPulse x={134.5} y={112.5} active={remainingMs!==undefined&&(seconds===0||pending)&&!pressed} reduced={reducedMotion}><MotionButton x={134.5} y={112.5} pressed={pressed} reducedMotion={reducedMotion}><Sprite id="ui_wheel_reward_illustration__1774x1837" x={108} y={86} width={53} height={53}/></MotionButton></AttentionPulse>
 {remainingMs!==undefined&&<Label text={seconds>0?(pending?'Tap · ':'')+timer:'Tap'} x={134.5} y={153} size={11} small center outline={1} maxWidth={85}/>}</Group>;
}
