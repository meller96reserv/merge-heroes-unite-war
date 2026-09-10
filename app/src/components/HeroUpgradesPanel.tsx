import {Group} from '@shopify/react-native-skia';
import {Sprite,Label,type VisualId} from '../rendering/Art';
import {MotionButton} from '../presentation/UiMotionViews';
import type {heroUpgradeRows} from '../ui/HeroUpgradesPanel';
export function HeroUpgradesPanel({rows,pressed,busy,reduced}:{rows:ReturnType<typeof heroUpgradeRows>;pressed:string;busy:boolean;reduced:boolean}){
 return <Group>{rows.map((r,i)=>{const y=14+i*127;return <Group key={r.definition.id}>
 <Sprite id="ui_panel_gold_navy_wide__2339x828" x={18} y={y} width={347} height={123}/>
 <Sprite id="background_grass_platform__754x329" x={39} y={y+68} width={82} height={36}/>
 <Sprite id={r.definition.visualId as VisualId} x={47} y={y+13} width={65} height={67}/>
 <Sprite id="ui_banner_name_purple__959x176" x={126} y={y+16} width={149} height={27}/>
 <Label text={r.name.toUpperCase()} x={200} y={y+35} size={16} bold center maxWidth={133}/>
 <Sprite id="ui_panel_stats_black__966x425" x={129} y={y+45} width={144} height={63}/>
 {(['ATK','HP','LVL'] as const).map((name,j)=><Group key={name}><Sprite id={['ui_icon_sword__525x536','ui_icon_heart__474x437','ui_icon_star__478x497'][j] as VisualId} x={137} y={y+47+j*20} width={17} height={17}/><Label text={name} x={162} y={y+61+j*20} size={14} bold/><Label text={String([r.stats.attack,r.stats.hp,r.level][j])} x={237} y={y+61+j*20} size={14} bold center maxWidth={48}/></Group>)}
 <MotionButton x={311} y={y+80.5} pressed={pressed===r.definition.id} reducedMotion={reduced}><Group opacity={r.locked||!r.affordable||r.max||busy?0.55:1}><Sprite id="ui_button_gold__2378x1300" x={275} y={y+53} width={72} height={55} fit="fill"/>{!r.locked&&!r.max&&<Sprite id="currency_blue_orb__545x554" x={300} y={y+58} width={22} height={22}/>}<Label text={r.locked?'LOCKED':r.max?'MAX':r.cost} x={311} y={y+(r.locked||r.max?85:99)} size={r.locked?12:16} center maxWidth={61}/></Group></MotionButton>
 </Group>;})}</Group>;
}
