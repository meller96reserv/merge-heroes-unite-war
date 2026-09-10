import {redDots} from '../../../game-core/src/selectors/RedDots';
import {runMetaAction} from '../ui/MetaActions';
import {useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {Canvas,Group,RoundedRect} from '@shopify/react-native-skia';
import {View,ScrollView,Text} from 'react-native';
import {Sprite,Label,type VisualId} from '../rendering/Art';
import {Hud} from '../components/Hud';
import {BottomNavigation,tabs} from '../components/BottomNavigation';
import {HeroEquipmentPanel,equipmentPosition} from '../components/HeroEquipmentPanel';
import {HeroUpgradesPanel} from '../components/HeroUpgradesPanel';
import {equipmentPanel,equipmentInventory} from '../ui/EquipmentPanel';
import {heroUpgradeRows} from '../ui/HeroUpgradesPanel';
import {layout,type Insets,type Rect} from '../ui/ResponsiveLayout';
import {GameButton} from '../ui/GameButton';
import {MotionButton} from '../presentation/UiMotionViews';
import type {GameRuntime,GameCommand} from '../game/GameRuntime';
import {equipmentById,type EquipmentSlot} from '../../../game-core/src/content/EquipmentConfig';
import type {RouteName} from '../ui/NavigationCoordinator';
import {getAudio} from '../audio/audioService';
import {useMetaRewardMotion} from '../presentation/useMetaRewardMotion';
import {EffectBurst} from '../presentation/EffectBurst';
export function HeroScreen({game,width,height,insets,mode,onNavigate}:{game:GameRuntime;width:number;height:number;insets:Insets;mode:'heroes'|'upgrades';onNavigate:(name:RouteName)=>void}){
 const state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot),l=layout(width,height,insets),scale=l.scale;
 const [definitionId,setDefinitionId]=useState(()=>state.data.heroes[0]?.definitionId??'hero_tier_1'),[selectedHeroId,setSelectedHeroId]=useState<string>(),[pressed,setPressed]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[slot,setSlot]=useState<EquipmentSlot|null>(null),[selectedItem,setSelectedItem]=useState<string|null>(null);
 const alive=useRef(true),pending=useRef(false);useEffect(()=>{alive.current=true;return()=>{alive.current=false;};},[]);
 const view=equipmentPanel(state,definitionId,selectedHeroId),rows=heroUpgradeRows(state),reduced=state.data.settings.reducedMotion,upgrades=mode==='upgrades';
 const inventory=slot?equipmentInventory(state,definitionId,slot):[],item=inventory.find(i=>i.item.id===selectedItem),bodyHeight=Math.max(200,l.navY-180),contentHeight=upgrades?rows.length*127+30:667;
 const fx=useMetaRewardMotion(game,{x:215,y:380},reduced?'reduced':'full');
 const bodyScale=upgrades?scale:Math.min(scale,bodyHeight*scale/contentHeight);
 const bodyRect=(r:Rect)=>({x:r.x*bodyScale,y:r.y*bodyScale,width:r.width*bodyScale,height:r.height*bodyScale});
 const local=(r:Rect)=>({x:r.x*scale,y:r.y*scale,width:r.width*scale,height:r.height*scale});
 const visual=(id:string)=>(s:string)=>setPressed(s==='pressed'?id:'');
 const send=async(command:GameCommand,success:string)=>{
  if(pending.current)return;pending.current=true;setBusy(true);setNotice('');
  try{const {result:r,command:actual}=await runMetaAction(game,command);if(alive.current){setNotice(r.ok?(actual===command?success:'Pending action saved.'):r.reason==='INSUFFICIENT_GOLD'?'Not enough currency. Earn more in battle.':r.reason==='SAVE_FAILED'?'Could not save. Tap again to finish this action.':r.reason==='LOCKED'?'Unequip this item from its current hero first.':'Selection changed. Please try again.');if(r.ok)getAudio().emit(actual.type==='OpenEquipment'?'reward.chest':actual.type==='EquipItem'?'equipment.equip':'equipment.upgrade');else getAudio().emit('ui.error');}}
  finally{pending.current=false;if(alive.current)setBusy(false);}
 };
 const open=(count:1|10)=>{if(view.hero)void send({type:'OpenEquipment',commandId:game.nextId('openEquipment'),heroId:view.hero.id,count},`${count} new equipment ${count===1?'item':'items'} added. Tap a slot to equip.`);else setNotice('Merge heroes to discover this character.');};
 const openSlot=(value:EquipmentSlot)=>{setSlot(value);setSelectedItem(view.slots.find(s=>s.slot===value)?.item?.id??null);setNotice('');};
 const selectTier=(delta:number)=>{const tier=(view.definition.tier-1+delta+10)%10+1;setDefinitionId(`hero_tier_${tier}`);setSelectedHeroId(undefined);setSlot(null);setNotice('');};
 const nav=(name:RouteName)=>{setSlot(null);setNotice('');onNavigate(name);};
 const navigateTab=(i:number)=>nav((['shop','heroes','battle','dungeon','relic'] as RouteName[])[i]!);
 return <View testID={upgrades?'hero-upgrades-screen':'equipment-screen'} style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale}]}>
 <Group clip={{x:0,y:0,width:430,height:l.virtualHeight}}><Sprite id={upgrades?'background_floating_islands__941x1672':'background_castle_platform__941x1672'} x={-47} y={upgrades?-151:0.5} width={524} height={l.virtualHeight*(upgrades?1.162:1.0386)} fit="fill"/></Group>
 <Hud stage="" progress={0} showStage={false} gold={state.data.currencies.gold??'0'} gems={state.data.currencies.gem??'0'} pressed={pressed} reducedMotion={reduced} wheelRemainingMs={Math.max(0,state.data.wheel.nextFreeAt-Date.now())} wheelPending={state.data.wheel.pendingSpin?.status==='reserved'}/>
 {upgrades&&<Group><Sprite id="currency_blue_orb__545x554" x={183} y={89} width={25} height={25}/><Label text={state.data.currencies.orb??'0'} x={222} y={109} size={22} center outline={1} maxWidth={39}/></Group>}
 <BottomNavigation notices={[...(redDots(state,Date.now()).heroes?[1]:[]),...(redDots(state,Date.now()).battle?[2]:[])]} y={l.navY} selected={upgrades?0:1} pressed={tabs.findIndex(n=>n===pressed)} reducedMotion={reduced}/>
 </Group></Group></Canvas>
 <ScrollView testID="hero-content-scroll" style={{position:'absolute',left:l.offsetX+(upgrades?28*scale:(430*scale-430*bodyScale)/2),top:l.offsetY+164*scale,width:(upgrades?384:430)*bodyScale,height:bodyHeight*scale}} contentContainerStyle={{height:contentHeight*bodyScale}} showsVerticalScrollIndicator={false}>
 <Canvas pointerEvents="none" style={{width:(upgrades?384:430)*bodyScale,height:contentHeight*bodyScale}}><Group transform={[{scale:bodyScale}]}>
 {upgrades?<Group><Group clip={{x:0,y:0,width:384,height:contentHeight}}><Sprite id="ui_panel_plain_navy__1126x2000" x={-22} y={-34} width={428} height={contentHeight+87} fit="fill"/></Group><HeroUpgradesPanel rows={rows} pressed={pressed} busy={busy} reduced={reduced}/></Group>:<HeroEquipmentPanel view={view} pressed={pressed} busy={busy} reduced={reduced} gem={state.data.currencies.gem??'0'}/>}
 {fx.records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={fx.motion.release}/>)}
 </Group></Canvas>
 {upgrades?rows.map((r,i)=><GameButton key={r.definition.id} label={`Upgrade ${r.name}, ${r.max?'maximum level':r.locked?'merge to discover':`${r.cost} orbs`}`} testID={`upgrade-${r.definition.tier}`} state={busy?'loading':r.max?'disabled':'normal'} rect={bodyRect({x:275,y:67+i*127,width:72,height:55})} onVisualChange={visual(r.definition.id)} onPress={()=>r.locked?setNotice('Merge heroes to discover this character.'):void send({type:'UpgradeHero',commandId:game.nextId('upgrade'),definitionId:r.definition.id,expectedLevel:r.level-1},`${r.name} upgraded to level ${r.level+1}.`)}/>):<>
 {view.slots.map((s,i)=><GameButton key={s.slot} label={`${s.slot} equipment`} testID={`equipment-slot-${s.slot}`} rect={bodyRect(equipmentPosition(i))} onVisualChange={visual(s.slot)} onPress={()=>openSlot(s.slot)}/>)}
 <GameButton label="Previous hero" rect={bodyRect({x:92,y:36,width:75,height:68})} onVisualChange={visual('hero-0')} onPress={()=>selectTier(-1)}/>
 <GameButton label="Select next owned copy" rect={bodyRect({x:170,y:20,width:91,height:84})} onVisualChange={visual('hero-1')} onPress={()=>{const copies=state.data.heroes.filter(h=>h.definitionId===definitionId),i=copies.findIndex(h=>h.id===view.hero?.id);setSelectedHeroId(copies[(i+1)%copies.length]?.id);setNotice(copies.length?`Selected hero ${((i+1)%copies.length)+1} of ${copies.length}`:'Merge to discover this hero.');}}/>
 <GameButton label="Next hero" rect={bodyRect({x:264,y:36,width:75,height:68})} onVisualChange={visual('hero-2')} onPress={()=>selectTier(1)}/>
 <GameButton label="Enhance equipment" rect={bodyRect({x:274,y:428,width:102,height:55})} onVisualChange={visual('enhance')} onPress={()=>openSlot(view.slots.find(s=>s.item)?.slot??'weapon')}/>
 <GameButton label="Hero upgrades" rect={bodyRect({x:274,y:494,width:102,height:55})} onVisualChange={visual('upgrades')} onPress={()=>nav('upgrades')}/>
 <GameButton label="Open 10 equipment, 100 gems" testID="open-equipment-10" state={busy?'loading':'normal'} rect={bodyRect({x:217,y:586,width:132,height:71})} onVisualChange={visual('open')} onPress={()=>open(10)}/>
 </>}
 </ScrollView>
 {tabs.map((name,i)=><GameButton key={name} label={name} rect={l.toScreen({x:7+84*i,y:l.navY,width:79,height:80})} onVisualChange={visual(name)} onPress={()=>navigateTab(i)}/>)}
 <GameButton label="Settings" rect={l.toScreen({x:269,y:86,width:53,height:53})} onVisualChange={visual('Settings')} onPress={()=>nav('settings')}/>
 <GameButton label="Lucky wheel" rect={l.toScreen({x:108,y:86,width:53,height:53})} onVisualChange={visual('Lucky wheel')} onPress={()=>nav('wheel')}/>
 {!!notice&&!slot&&<View accessibilityRole="alert" style={{position:'absolute',left:l.offsetX+25*scale,top:l.offsetY+139*scale,width:380*scale,backgroundColor:'#102d45ee',borderRadius:8,padding:8}}><Text style={{color:'#fff0c6',fontSize:12,textAlign:'center'}}>{notice}</Text></View>}
 {slot&&<View testID="equipment-inventory" style={{position:'absolute',inset:0,backgroundColor:'#071426e8',alignItems:'center',justifyContent:'center'}}>
 <View style={{width:390*scale,height:Math.min(640,l.virtualHeight-40)*scale,backgroundColor:'#0d2946',borderWidth:2,borderColor:'#f3c879',borderRadius:18,overflow:'hidden'}}>
 <Canvas pointerEvents="none" style={{width:390*scale,height:110*scale}}><Group transform={[{scale}]}><Label text={`${slot.toUpperCase()} EQUIPMENT`} x={180} y={39} size={26} bold center/><Label text={view.hero?'Select an item to equip or enhance':'Merge to discover this hero'} x={195} y={68} size={13} small center maxWidth={345}/><Label text={`Gold ${state.data.currencies.gold??'0'} · Gems ${state.data.currencies.gem??'0'}`} x={195} y={94} size={17} center/><Label text="×" x={363} y={34} size={36} center/></Group></Canvas>
 <GameButton label="Close equipment inventory" rect={local({x:342,y:0,width:48,height:48})} onPress={()=>setSlot(null)}/>
 <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
 <View style={{height:Math.max(150,Math.ceil(inventory.length/3)*132)*scale}}>
 <Canvas pointerEvents="none" style={{width:390*scale,height:Math.max(150,Math.ceil(inventory.length/3)*132)*scale}}><Group transform={[{scale}]}>
 {!inventory.length&&<Group><Sprite id="ui_frame_magic_gold__1289x1762" x={157} y={4} width={76} height={104}/><Label text="No items yet. Open equipment below." x={195} y={140} size={13} small center/></Group>}
 {inventory.map(({item,definition},i)=>{const x=14+i%3*126,y=Math.floor(i/3)*132;return <Group key={item.id}><RoundedRect x={x} y={y} width={112} height={122} r={10} color={selectedItem===item.id?'#376079':'#14324e'}/>{selectedItem===item.id&&<RoundedRect x={x} y={y} width={112} height={122} r={10} color="#ffe49a" style="stroke" strokeWidth={2}/>}<Sprite id={definition.visualId as VisualId} x={x+23} y={y+5} width={66} height={76}/><Label text={definition.name.toUpperCase()} x={x+56} y={y+97} size={12} center maxWidth={102}/><Label text={`Lv.${item.level}${item.ownerHeroId===view.hero?.id?' · EQUIPPED':item.ownerHeroId?' · IN USE':''}`} x={x+56} y={y+114} size={12} center maxWidth={100}/></Group>;})}
 </Group></Canvas>
 {inventory.map(({item},i)=><GameButton key={item.id} label={`${equipmentById.get(item.definitionId)!.name}, level ${item.level}${item.ownerHeroId?' equipped':''}`} testID={`inventory-${item.id}`} rect={local({x:14+i%3*126,y:Math.floor(i/3)*132,width:112,height:122})} onPress={()=>{setSelectedItem(item.id);setNotice('');}}/>)}
 </View></ScrollView>
 <View style={{height:180*scale}}><Canvas pointerEvents="none" style={{width:390*scale,height:180*scale}}><Group transform={[{scale}]}>
 {[['equip',12,item?.item.ownerHeroId===view.hero?.id?'UNEQUIP':'EQUIP'],['enhance',200,item?.max?'MAX LEVEL':`ENHANCE ${item?.cost??'—'}`]].map(([id,x,text])=><MotionButton key={id} x={Number(x)+86} y={33} pressed={pressed===id} reducedMotion={reduced}><Group opacity={item&&!busy?1:0.45}><Sprite id="ui_button_orange__2542x1359" x={Number(x)} y={6} width={176} height={54} fit="fill"/><Label text={String(text)} x={Number(x)+88} y={40} size={20} center maxWidth={160}/></Group></MotionButton>)}
 <MotionButton x={195} y={98} pressed={pressed==='openOne'} reducedMotion={reduced}><Sprite id="ui_button_orange__2542x1359" x={65} y={72} width={260} height={51} fit="fill"/><Label text="OPEN x1 · 10 GEMS" x={195} y={105} size={22} center/></MotionButton>
 </Group></Canvas>
 <GameButton label={item?.item.ownerHeroId===view.hero?.id?'Unequip selected item':'Equip selected item'} state={!item||busy||!view.hero?'disabled':'normal'} rect={local({x:12,y:6,width:176,height:54})} onVisualChange={visual('equip')} onPress={()=>{if(item&&view.hero)void send({type:'EquipItem',commandId:game.nextId('equip'),heroId:view.hero.id,itemId:item.item.ownerHeroId===view.hero.id?null:item.item.id,slot},'Loadout saved.');}}/>
 <GameButton label={`Enhance selected item, ${item?.cost??0} gold`} state={!item||busy||item.max?'disabled':'normal'} rect={local({x:200,y:6,width:176,height:54})} onVisualChange={visual('enhance')} onPress={()=>{if(item)void send({type:'EnhanceItem',commandId:game.nextId('enhance'),itemId:item.item.id,expectedLevel:item.item.level},'Equipment enhanced.');}}/>
 <GameButton label="Open 1 equipment, 10 gems" state={busy||!view.hero?'disabled':'normal'} rect={local({x:65,y:72,width:260,height:51})} onVisualChange={visual('openOne')} onPress={()=>open(1)}/>
 {!!notice&&<Text accessibilityRole="alert" style={{position:'absolute',top:132*scale,left:14*scale,width:362*scale,color:'#fff0c6',textAlign:'center',fontSize:12*scale}}>{notice}</Text>}
 </View></View></View>}
 </View>;
}
