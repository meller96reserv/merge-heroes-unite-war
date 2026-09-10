import {Group,RoundedRect} from '@shopify/react-native-skia';
import {Sprite,Label,type VisualId} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';
import {equipmentById,heroNames} from '../../../game-core/src/content/EquipmentConfig';
import type {equipmentPanel} from '../ui/EquipmentPanel';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
import {art} from '../assets/registry';
export const equipmentPosition=(i:number)=>({x:i<3?7:343,y:35+(i%3)*120,width:80,height:110});
function portrait(definitionId:string){const d=heroes.get(definitionId),family=d.visualId.split('__')[0]!.replace('hero_','portrait_');return (Object.keys(art).find(id=>id.startsWith(family+'__'))??d.visualId) as VisualId;}
export function HeroEquipmentPanel({view,pressed,gem,busy,reduced}:{view:ReturnType<typeof equipmentPanel>;pressed:string;gem:string;busy:boolean;reduced:boolean}){
 const {definition,hero,slots,stats,level}=view,tier=definition.tier;
 return <Group>
 {[[(tier+8)%10+1,92,36,75,68],[tier,170,20,91,84],[tier%10+1,264,36,75,68]].map(([t,x,y,w,h],i)=><MotionButton key={i} x={x!+w!/2} y={y!+h!/2} pressed={pressed===`hero-${i}`} reducedMotion={reduced}><Sprite id={portrait(`hero_tier_${t}`)} x={x!} y={y!} width={w!} height={h!}/></MotionButton>)}
 <Sprite id={definition.visualId as VisualId} x={107} y={123} width={216} height={223}/>
 {slots.map(({slot,item},i)=>{const r=equipmentPosition(i);return <MotionButton key={slot} x={r.x+40} y={r.y+55} pressed={pressed===slot} reducedMotion={reduced}>
 <Sprite id="ui_frame_magic_gold__1289x1762" {...r}/>
 {item?<Sprite id={equipmentById.get(item.definitionId)!.visualId as VisualId} x={r.x+13} y={r.y+21} width={54} height={76}/>:<Group><Label text="+" x={r.x+40} y={r.y+63} size={36} center color="#b9c9d3"/><Label text={slot.toUpperCase()} x={r.x+40} y={r.y+87} size={12} center color="#d3e6f5" maxWidth={65}/></Group>}
 {item&&<Label text={`Lv.${item.level}`} x={r.x+40} y={r.y+101} size={13} center outline={1}/>}</MotionButton>;})}
 <Label text={hero?`Lv. ${level}/60`:'MERGE TO DISCOVER'} x={215} y={385} size={hero?32:22} bold center outline={2}/>
 <Label text={heroNames[tier-1]!.toUpperCase()} x={215} y={403} size={14} center outline={1}/>
 <Sprite id="ui_panel_gold_black_wide__3815x1593" x={45} y={418} width={340} height={142} fit="fill"/>
 <Sprite id="ui_icon_battle_swords__1402x1456" x={59} y={429} width={51} height={53}/>
 <Sprite id="ui_icon_crown__353x325" x={59} y={495} width={51} height={53}/>
 <Label text={`${stats.attack} DAMAGE`} x={193} y={463} size={20} bold center maxWidth={147}/>
 <Label text={`${stats.defense} ARMOR`} x={193} y={529} size={20} bold center maxWidth={147}/>
 {[['enhance',428],['upgrades',494]].map(([id,y])=><MotionButton key={id} x={325} y={Number(y)+27.5} pressed={pressed===id} reducedMotion={reduced}><Sprite id="ui_button_orange__2542x1359" x={274} y={Number(y)} width={102} height={55}/>{id==='enhance'?<Label text="ENHANCE" x={325} y={Number(y)+34} size={14} center outline={0.5}/>:<Group><Label text="EXP" x={296} y={Number(y)+34} size={14}/><Sprite id="ui_icon_upgrade_arrow__1302x1413" x={327} y={Number(y)+10} width={31} height={34}/></Group>}</MotionButton>)}
 <MotionButton x={283} y={621.5} pressed={pressed==='open'} reducedMotion={reduced}><Group opacity={hero&&!busy?1:0.5}><Sprite id="ui_button_orange__2542x1359" x={217} y={586} width={132} height={71}/><Label text={busy?'OPENING…':'OPEN x10'} x={283} y={612} size={20} center outline={1}/><Sprite id="currency_gem_blue__300x252" x={247} y={618} width={32} height={32}/><Label text="100" x={283} y={639} size={20}/></Group></MotionButton>
 </Group>;
}
