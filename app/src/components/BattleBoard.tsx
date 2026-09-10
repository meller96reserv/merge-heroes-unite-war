import {MotionButton} from '../presentation/UiMotionViews';
import {backgroundPresentation} from '../presentation/BackgroundMotion';
import {memo,useEffect,useRef,type ReactNode} from 'react';
import {useSharedValue,useDerivedValue,withTiming,withSequence,cancelAnimation} from 'react-native-reanimated';
import {boardUnlockStage} from '../../../game-core/src/content/UnlockConfig';
import {BoardHero} from './BoardHero';
import {Group,Rect,RoundedRect} from '@shopify/react-native-skia';import {Sprite,Label,heroArt} from '../rendering/Art';import type {layout} from '../ui/ResponsiveLayout';import {measured} from '../ui/DesignTokens';
export type BattleLayout=ReturnType<typeof layout>;
function BoardIsland({x,y,slot,unlocked,reducedMotion}:{x:number;y:number;slot:number;unlocked:boolean;reducedMotion:boolean}){
 const previous=useRef(unlocked),glow=useSharedValue(0),scale=useSharedValue(1),opacity=useSharedValue(unlocked?1:.4);
 const transform=useDerivedValue(()=>[{scale:scale.value}]);
 useEffect(()=>{
  opacity.value=withTiming(unlocked?1:.4,{duration:220});
  if(unlocked&&!previous.current){glow.value=withSequence(withTiming(.9,{duration:120}),withTiming(0,{duration:600}));if(!reducedMotion)scale.value=withSequence(withTiming(1.13,{duration:180}),withTiming(1,{duration:240}));}
  previous.current=unlocked;return()=>{[glow,scale,opacity].forEach(cancelAnimation);};
 },[unlocked,reducedMotion]);
 return <Group origin={{x:x+34,y:y+26}} transform={transform}>
 <Group opacity={opacity}><Sprite id="background_stone_slot__348x265" x={x} y={y} width={68} height={52}/></Group>
 <Group opacity={glow}><RoundedRect x={x+3} y={y+5} width={62} height={36} r={12} style="stroke" strokeWidth={3} color="#ffdd83"/></Group>
 {!unlocked&&<><Label text="LOCKED" x={x+34} y={y+24} size={9} small center color="#c4d9eb"/><Label text={`BOSS 1-${boardUnlockStage(slot)}`} x={x+34} y={y+35} size={8} small center color="#ffdf98"/></>}
 </Group>;
}
export function TierBadge({tier,x,y}:{tier:number;x:number;y:number}){return <Group><RoundedRect x={x} y={y} width={12} height={12} r={6} color={measured.tier}/><RoundedRect x={x} y={y} width={12} height={12} r={6} color="black" style="stroke" strokeWidth={1}/><Label text={String(tier)} x={x+6} y={y+9} size={10} small center/></Group>;}
export const BattleBoard=memo(function BattleBoard({l,tiers,dragIndex=-1,unlocked,targets=[],deployed=[],ids,reducedMotion=false,hiddenIds=[]}:{l:BattleLayout;tiers:readonly number[];dragIndex?:number;unlocked?:readonly boolean[];targets?:readonly number[];deployed?:readonly boolean[];ids?:readonly (string|null)[];reducedMotion?:boolean;hiddenIds?:readonly string[]}){const exact=l.board.length===10;return <Group>
 <Rect x={0} y={l.boardTop-3} width={430} height={l.virtualHeight-l.boardTop+3} color={measured.boardTint}/>
 {l.board.map((r,i)=>{const tier=tiers[i]??0;const heroY=r.y+(exact?0:-3),platformY=r.y+(exact?41:22);return <Group key={i}>
 <BoardIsland x={r.x} y={platformY} slot={i} unlocked={unlocked?.[i]!==false} reducedMotion={reducedMotion}/>
 {targets.includes(i)&&<RoundedRect x={r.x+3} y={platformY+3} width={62} height={40} r={12} color="#9affc7" style="stroke" strokeWidth={2}/>}
 {deployed[i]&&<RoundedRect x={r.x+9} y={platformY+6} width={50} height={30} r={10} color="#fbd75b" style="stroke" strokeWidth={1.5}/>}
 {tier>0&&i!==dragIndex&&<Group opacity={hiddenIds.includes(ids?.[i]??'')?0:1}><BoardHero key={ids?.[i]??i} tier={tier} x={r.x} y={heroY} exact={exact} animated={!!ids} reducedMotion={reducedMotion}/><TierBadge tier={tier} x={r.x+26} y={platformY+8}/></Group>}
 </Group>;})}</Group>;});
export function BattleWorld({l,tiers=[8,9,7],actors}:{l:BattleLayout;tiers?:readonly number[];actors?:ReactNode}){
 const actorScale=Math.min(1,Math.max(0.35,(l.boostY-15-238)/139));
 const place=(x:number,y:number,width:number,height:number)=>({x:x+width*(1-actorScale)/2,y:l.boostY-21-(466-y)*actorScale,width:width*actorScale,height:height*actorScale});
 return <Group>
 <Sprite id="background_floating_islands__941x1672" {...backgroundPresentation(l)} fit="fill"/>
 {actors??<>{[[8,384,83,86],[77,358,104,108],[174,368,83,86]].map(([x,y,w,h],i)=>tiers[i]?<Sprite key={i} id={heroArt[tiers[i]!-1]!} {...place(x!,y!,w!,h!)}/>:null)}
 <Sprite id="enemy_ironhide_boar__1862x1681" {...place(262,327,146,132)}/></>}
 </Group>;
}
export function PurchaseFixture({l,prices=['50','120',''],tiers=[1,2,0],pressed=false,locked=[],pressedIndex=-1,reducedMotion=false}:{l:BattleLayout;prices?:readonly string[];tiers?:readonly number[];pressed?:boolean;locked?:readonly boolean[];pressedIndex?:number;reducedMotion?:boolean}){return <Group>{[99,172,263].map((x,i)=>{const middle=i===1,y=l.buyY+(middle?0:9),w=middle?86:68,h=middle?77:60,tier=tiers[i]??0;return <Group key={i} opacity={locked[i]?0.5:1}><MotionButton x={x+w/2} y={y+h/2} pressed={(middle&&pressed)||pressedIndex===i} reducedMotion={reducedMotion}><Sprite id="ui_frame_board_slot__244x219" x={x} y={y} width={w} height={h} fit="fill"/>{tier>0&&<><Sprite id={heroArt[tier-1]!} x={x+(middle?17:18)} y={y+(middle?8:5)} width={middle?52:38} height={middle?48:35}/><TierBadge tier={tier} x={x+(middle?9:5)} y={y+(middle?9:6)}/><Sprite id="currency_gold_coin__254x262" x={x+(middle?27:18)} y={y+h-22} width={11} height={11}/><Label text={prices[i]??''} x={x+(middle?41:32)} y={y+h-12} size={9} small maxWidth={37}/></>}</MotionButton></Group>;})}</Group>;}
