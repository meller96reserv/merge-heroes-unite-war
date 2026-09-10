import {useMemo} from 'react';
import {Group,Path,Skia,RoundedRect} from '@shopify/react-native-skia';
import {Label,Sprite} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';
import {AttentionPulse} from '../presentation/AttentionPulse';
/** Simple code-drawn video pictogram for the ad-required surfaces, which have
 * no supplied Figma artboard/glyph. All authored Figma imagery stays unchanged. */
export function VideoIcon({x,y,size=24}:{x:number;y:number;size?:number}){
 const triangle=useMemo(()=>Skia.Path.Make().moveTo(9,4).lineTo(9,14).lineTo(17,9).close(),[]);
 return <Group transform={[{translateX:x},{translateY:y},{scale:size/24}]}><RoundedRect x={0} y={0} width={24} height={18} r={4} color="white"/><Path path={triangle} color="#593126"/></Group>;
}
export function WinRewardBanner({gold,boost,pressed,reduced}:{gold:string;boost:boolean;pressed:boolean;reduced:boolean}){
 return <Group><RoundedRect x={50} y={254} width={330} height={boost?114:65} r={14} color="#102d43" opacity={.97}/><RoundedRect x={50} y={254} width={330} height={boost?114:65} r={14} color="#ffd56a" style="stroke" strokeWidth={2}/><Label text="YOU WIN!" x={215} y={282} size={30} bold center color="#ffe6a0"/><Label text={`+${gold} GOLD`} x={215} y={307} size={24} center maxWidth={300}/>
 {boost&&<AttentionPulse x={215} y={340} active={!pressed} reduced={reduced}><MotionButton x={215} y={340} pressed={pressed} reducedMotion={reduced}><Sprite id="ui_button_orange__2542x1359" x={83} y={315} width={264} height={49} fit="fill"/><VideoIcon x={107} y={330}/><Label text="BOOST REWARD" x={233} y={348} size={26} bold center outline={1.5}/></MotionButton></AttentionPulse>}
 </Group>;
}
