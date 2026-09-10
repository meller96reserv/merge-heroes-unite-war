import {redDots} from '../../../game-core/src/selectors/RedDots';
import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {View,ScrollView,Text} from 'react-native';
import {Canvas,Group,RoundedRect} from '@shopify/react-native-skia';
import {Hud} from '../components/Hud';
import {BottomNavigation,tabs} from '../components/BottomNavigation';
import {RelicCollection,DungeonPanel,relicRect,dragonRect} from '../components/ExtendedModePanels';
import {Sprite,Label,type VisualId} from '../rendering/Art';
import {layout,type Insets,type Rect} from '../ui/ResponsiveLayout';
import {GameButton} from '../ui/GameButton';
import {MotionButton} from '../presentation/UiMotionViews';
import {useMetaRewardMotion} from '../presentation/useMetaRewardMotion';
import {EffectBurst} from '../presentation/EffectBurst';
import type {GameRuntime,GameCommand} from '../game/GameRuntime';
import type {RouteName} from '../ui/NavigationCoordinator';
import {relicDefinitions,relicById} from '../../../game-core/src/content/RelicConfig';
import {dragons,dragonDefinition} from '../../../game-core/src/modes/DragonMode';
import {runMetaAction} from '../ui/MetaActions';
import {getAudio} from '../audio/audioService';
export function ExtendedModeScreen({game,width,height,insets,mode,onNavigate}:{game:GameRuntime;width:number;height:number;insets:Insets;mode:'relic'|'dungeon';onNavigate:(name:RouteName)=>void}){
 const state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot),l=layout(width,height,insets),scale=l.scale,[pressed,setPressed]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[detail,setDetail]=useState<string|null>(null),[reveal,setReveal]=useState(false),[dragon,setDragon]=useState<string|null>(null),pending=useRef(false),alive=useRef(true);
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;};},[]);
 const reduced=state.data.settings.reducedMotion,relic=mode==='relic',fx=useMetaRewardMotion(game,{x:215,y:355},reduced?'reduced':'full');
 const bodyHeight=Math.max(200,l.navY-180),bodyScale=relic?Math.min(scale,bodyHeight*scale/667):scale;
 const bodyRect=(r:Rect)=>({x:r.x*bodyScale,y:r.y*bodyScale,width:r.width*bodyScale,height:r.height*bodyScale});
 const local=(r:Rect)=>({x:r.x*scale,y:r.y*scale,width:r.width*scale,height:r.height*scale}),visual=(id:string)=>(s:string)=>setPressed(s==='pressed'?id:'');
 const send=async(c:GameCommand)=>{if(pending.current)return;pending.current=true;setBusy(true);setNotice('');try{const {result,command}=await runMetaAction(game,c);if(!alive.current)return;if(!result.ok){setNotice(result.reason==='INSUFFICIENT_GOLD'?'Not enough currency. Earn more in Battle or Dungeon.':result.reason==='LOCKED'?'Deploy a hero in Battle before starting a challenge.':'Could not save. Tap again to finish this action.');getAudio().emit('ui.error');}else if(command.type==='OpenRelics'){setReveal(true);getAudio().emit('reward.chest');}else if(command.type==='StartDragon'){getAudio().emit('boss.intro');onNavigate('battle');}}finally{pending.current=false;if(alive.current)setBusy(false);}};
 const selected=detail?relicById.get(detail):undefined,challenge=dragon?dragonDefinition(dragon):undefined,result=state.data.dungeon?.lastResult;
 const shown=!!detail||reveal||!!dragon;
 return <View testID={relic?'relic-screen':'dungeon-screen'} style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale}]}>
 <Group clip={{x:0,y:0,width:430,height:l.virtualHeight}}><Sprite id={relic?'background_forest_glade__941x1672':'background_floating_islands__941x1672'} x={-47} y={-151} width={524} height={l.virtualHeight*1.162} fit="fill"/></Group>
 <Hud wheelRemainingMs={Math.max(0,state.data.wheel.nextFreeAt-Date.now())} wheelPending={state.data.wheel.pendingSpin?.status==='reserved'} showStage={false} gold={state.data.currencies.gold??'0'} gems={state.data.currencies.gem??'0'} stage="" progress={0} pressed={pressed} reducedMotion={reduced}/><BottomNavigation notices={[...(redDots(state,Date.now()).heroes?[1]:[]),...(redDots(state,Date.now()).battle?[2]:[])]} y={l.navY} selected={relic?4:3} pressed={tabs.findIndex(n=>n===pressed)} reducedMotion={reduced}/>
 {relic&&state.data.lastRelicOpen&&<Label text="LAST FIND" x={215} y={126} size={13} bold center outline={1}/>}{!relic&&result&&<Label text={result.outcome==='won'?'DRAGON DEFEATED!':result.outcome==='failed'?'GROW YOUR TEAM AND TRY AGAIN':'CHALLENGE ENDED'} x={215} y={153} size={15} bold center outline={1} maxWidth={370}/>}
 </Group></Group></Canvas>
 <ScrollView style={{position:'absolute',left:l.offsetX+(430*scale-430*bodyScale)/2,top:l.offsetY+164*scale,width:430*bodyScale,height:bodyHeight*scale}} contentContainerStyle={{height:667*bodyScale}} showsVerticalScrollIndicator={false}>
 <Canvas pointerEvents="none" style={{width:430*bodyScale,height:667*bodyScale}}><Group transform={[{scale:bodyScale}]}>{relic?<RelicCollection counts={state.data.relics??{}} pressed={pressed} busy={busy} reduced={reduced}/>:<DungeonPanel pressed={pressed} clears={state.data.dungeon?.clears??{}} reduced={reduced}/>}{fx.records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={fx.motion.release}/>)}</Group></Canvas>
 {relic?<>{relicDefinitions.map((d,i)=><GameButton key={d.id} label={`${d.name} relic, ${state.data.relics?.[d.id]??0} owned`} rect={bodyRect(relicRect(i))} onVisualChange={visual(d.id)} onPress={()=>setDetail(d.id)}/>)}{([1,10] as const).map((count,i)=><GameButton key={count} label={`Open ${count} relics, 100 ${i?'gems':'gold'}`} testID={`open-relic-${count}`} state={busy?'loading':'normal'} rect={bodyRect({x:81+i*137,y:561,width:132,height:71})} onVisualChange={visual(`open${count}`)} onPress={()=>void send({type:'OpenRelics',commandId:game.nextId('openRelics'),count})}/>)}</>:dragons.map((d,i)=><GameButton key={d.id} label={d.name} testID={`dungeon-${d.id}`} rect={bodyRect(dragonRect(i))} onVisualChange={visual(d.id)} onPress={()=>setDragon(d.id)}/>)}
 </ScrollView>
 {tabs.map((name,i)=><GameButton key={name} label={name} rect={l.toScreen({x:7+84*i,y:l.navY,width:79,height:80})} onVisualChange={visual(name)} onPress={()=>onNavigate((['shop','heroes','battle','dungeon','relic'] as RouteName[])[i]!)}/>)}
 <GameButton label="Settings" rect={l.toScreen({x:269,y:86,width:53,height:53})} onVisualChange={visual('Settings')} onPress={()=>onNavigate('settings')}/><GameButton label="Lucky wheel" rect={l.toScreen({x:108,y:86,width:53,height:53})} onVisualChange={visual('Lucky wheel')} onPress={()=>onNavigate('wheel')}/>
 {relic&&state.data.lastRelicOpen&&<GameButton label="Last relic find" rect={l.toScreen({x:177,y:86,width:76,height:50})} onPress={()=>setReveal(true)}/>}
 {!!notice&&!shown&&<View accessibilityRole="alert" style={{position:'absolute',left:l.offsetX+20*scale,top:l.offsetY+145*scale,width:390*scale,padding:9,backgroundColor:'#142941f0',borderRadius:8}}><Text style={{color:'#fff0c4',fontSize:12,textAlign:'center'}}>{notice}</Text></View>}
 {shown&&<View testID="meta-detail" style={{position:'absolute',inset:0,backgroundColor:'#071222e8',alignItems:'center',justifyContent:'center'}}><View style={{width:380*scale,height:Math.min(590,l.virtualHeight-40)*scale,backgroundColor:'#102c49',borderColor:'#e6bc6a',borderWidth:2,borderRadius:18,overflow:'hidden'}}>
 <Canvas pointerEvents="none" style={{width:380*scale,height:500*scale}}><Group transform={[{scale}]}>
 <Label text={selected?selected.name.toUpperCase():challenge?challenge.name.toUpperCase():'RELICS DISCOVERED'} x={190} y={46} size={28} bold center maxWidth={330}/><Label text="×" x={358} y={31} size={36} center/>
 {selected?<Group><Sprite id={selected.visualId as VisualId} x={108} y={90} width={164} height={196}/><Label text={`OWNED: ${state.data.relics?.[selected.id]??0}`} x={190} y={325} size={24} bold center/><Label text={`+${Math.min(20,state.data.relics?.[selected.id]??0)*2}% ALL HERO ${selected.stat==='attack'?'ATTACK':'HP'}`} x={190} y={367} size={23} bold center color="#a8efc2"/><Label text="Each copy adds 2%, up to 40%." x={190} y={405} size={14} small center/><Label text="Find more with Open x1 or Open x10." x={190} y={432} size={14} small center/></Group>:challenge?<Group><Sprite id={challenge.visualId as VisualId} x={65} y={68} width={250} height={232}/><Label text={`DEFEAT IN 45 SECONDS`} x={190} y={331} size={24} bold center/><Label text={`HP ${challenge.hp.toLocaleString('en-US')}`} x={190} y={365} size={28} center color="#ffd177"/><Label text={`${challenge.gold} GOLD · ${challenge.gems} GEMS`} x={190} y={404} size={23} center/><Label text={`${challenge.orbs} ORBS · FREE ENTRY`} x={190} y={434} size={21} center/></Group>:<Group>{state.data.lastRelicOpen?.relicIds.map((id,i)=>{const d=relicById.get(id)!,x=18+i%5*70,y=90+Math.floor(i/5)*166;return <Group key={i}><Sprite id={d.visualId as VisualId} x={x} y={y} width={62} height={99}/><Label text={d.name.toUpperCase()} x={x+31} y={y+124} size={12} center maxWidth={67}/></Group>;})}<Label text="BONUSES APPLIED TO YOUR HEROES" x={190} y={452} size={21} bold center maxWidth={340}/></Group>}
 </Group></Canvas>
 <View style={{position:'absolute',bottom:10*scale,left:45*scale,width:290*scale,height:65*scale}}><Canvas pointerEvents="none" style={{width:290*scale,height:65*scale}}><Group transform={[{scale}]}><MotionButton x={145} y={32} pressed={pressed==='detail'} reducedMotion={reduced}><Sprite id="ui_button_orange__2542x1359" x={0} y={0} width={290} height={65} fit="fill"/><Label text={busy?'SAVING…':challenge?'FIGHT!':'CONTINUE'} x={145} y={44} size={30} bold center outline={1}/></MotionButton></Group></Canvas><GameButton label={challenge?'Fight dragon':'Continue from relics'} testID="meta-detail-action" state={busy?'loading':'normal'} rect={local({x:0,y:0,width:290,height:65})} onVisualChange={visual('detail')} onPress={()=>challenge?void send({type:'StartDragon',commandId:game.nextId('startDragon'),dragonId:challenge.id}):(setDetail(null),setReveal(false))}/></View>
 <GameButton label="Close details" rect={local({x:335,y:0,width:45,height:45})} onPress={()=>{setDetail(null);setReveal(false);setDragon(null);}}/>
 {!!notice&&<Text accessibilityRole="alert" style={{position:'absolute',top:470*scale,left:10*scale,width:360*scale,color:'#ffddbd',textAlign:'center',fontSize:12}}>{notice}</Text>}
 </View></View>}
 </View>;
}
