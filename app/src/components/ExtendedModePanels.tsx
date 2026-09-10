import {Group,RoundedRect,Skia} from '@shopify/react-native-skia';
import {Sprite,Label,type VisualId} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';
import {relicDefinitions} from '../../../game-core/src/content/RelicConfig';
import {dragons} from '../../../game-core/src/modes/DragonMode';
export const relicRect=(i:number)=>({x:48+i%4*85,y:81+Math.floor(i/4)*120,width:80,height:110});
export const dragonRect=(i:number)=>({x:43,y:94+i*165,width:344,height:145});
export function RelicCollection({counts,pressed,busy,reduced}:{counts:Readonly<Record<string,number>>;pressed:string;busy:boolean;reduced:boolean}){
 return <Group><Sprite id="ui_frame_equipment_gold__1035x1545" x={14} y={28} width={403} height={633} fit="fill"/>
 {relicDefinitions.map((d,i)=>{const r=relicRect(i);return <MotionButton key={d.id} x={r.x+40} y={r.y+55} pressed={pressed===d.id} reducedMotion={reduced}>
 <Sprite id="ui_frame_magic_gold__1289x1762" {...r}/><Sprite id={d.visualId as VisualId} x={r.x+13} y={r.y+21} width={54} height={76}/>
 <Sprite id={d.badge==='UR'?'ui_frame_heart_wings__1728x1616':d.badge==='SR'?'ui_frame_purple_shield__1628x1719':'ui_frame_orange_wings__1714x1662'} x={r.x-7} y={r.y} width={26} height={25}/><Label text={d.badge} x={r.x+6} y={r.y+16} size={8} center/>
 <Label text={`Lv.${Math.min(20,counts[d.id]??0)}`} x={r.x+40} y={r.y+103} size={11} center outline={1} color={counts[d.id]?'#d8ffc2':'#c2c9d1'}/>
 </MotionButton>;})}
 {[1,10].map((count,i)=><MotionButton key={count} x={147+i*137} y={596.5} pressed={pressed===`open${count}`} reducedMotion={reduced}><Group opacity={busy?0.6:1}><Sprite id={i?'ui_button_gold__2378x1300':'ui_button_orange__2542x1359'} x={81+i*137} y={561} width={132} height={71} fit="fill"/><Label text={busy?'OPENING…':`OPEN x${count}`} x={147+i*137} y={587} size={20} center outline={1}/><Sprite id={i?'currency_gem_blue__300x252':'currency_gold_coin__254x262'} x={111+i*137} y={593} width={32} height={32}/><Label text="100" x={147+i*137} y={614} size={20}/></Group></MotionButton>)}
 </Group>;
}
export function DungeonPanel({pressed,clears,reduced}:{pressed:string;clears:Readonly<Record<string,number>>;reduced:boolean}){
 return <Group><Group clip={{x:23,y:0,width:384,height:665}}><Sprite id="ui_panel_plain_navy__1126x2000" x={1} y={-34} width={428} height={718} fit="fill"/></Group>
 <Sprite id="ui_banner_stage_blue__3876x605" x={83} y={11} width={265} height={65} fit="fill"/><Label text="DUNGEON" x={215} y={54} size={36} bold center outline={2}/>
 {dragons.map((d,i)=>{const r=dragonRect(i),clip=Skia.RRectXY(Skia.XYWHRect(r.x,r.y,r.width,r.height),19,19);return <MotionButton key={d.id} x={r.x+r.width/2} y={r.y+r.height/2} pressed={pressed===d.id} reducedMotion={reduced}>
 <Group clip={clip}><Sprite id={d.banner as VisualId} x={r.x-r.width*[.2334,.2353,.2459][i]!} y={r.y+r.height*[-.0207,-.0897,-.0276][i]!} width={r.width*1.2645} height={r.height*[1.0483,1.1379,1.0552][i]!} fit="fill"/></Group>
 <RoundedRect {...r} r={19} color="#585858" style="stroke" strokeWidth={5}/><Label text={d.name.toUpperCase()} x={72} y={r.y+35} size={16} bold outline={2}/>
 <RoundedRect x={64} y={r.y+98} width={113} height={26} r={11} color="red"/><RoundedRect x={64} y={r.y+98} width={113} height={26} r={11} color="black" style="stroke" strokeWidth={1}/><Label text={`HP ${d.hp.toLocaleString('en-US')}`} x={120} y={r.y+116} size={16} bold center outline={1}/>
 {!!clears[d.id]&&<Label text={`${clears[d.id]} WINS`} x={354} y={r.y+126} size={14} bold outline={1} center/>}
 </MotionButton>;})}
 </Group>;
}
