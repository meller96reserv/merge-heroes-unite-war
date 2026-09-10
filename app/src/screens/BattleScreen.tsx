import {runMetaAction} from '../ui/MetaActions';
import {autoMergeActive} from '../../../game-core/src/commands/ActivateAutoMerge';
import {autoActivation} from '../../../game-core/src/content/PlayableConfig';
import {GameModal as Modal} from '../ui/GameModal';
import {redDots} from '../../../game-core/src/selectors/RedDots';
import {bindNotifications} from '../platform/NotificationService';
import {ExtendedModeScreen} from './ExtendedModeScreen';
import {DailyScreen} from './DailyScreen';
import {dailyEligibility} from '../../../game-core/src/systems/DailyService';
import {HeroScreen} from './HeroScreen';
import {RewardedController,emptyRewardedView} from '../rewards/RewardedController';
import {RewardScreen} from '../rewards/RewardScreen';
import {WinRewardBanner} from '../rewards/RewardViews';
import {rewardedAds} from '../platform/RewardedAds';
import {MotionButton} from '../presentation/UiMotionViews';
import {useTransitionMotion} from '../presentation/TransitionMotion';
import {useMetaRewardMotion} from '../presentation/useMetaRewardMotion';
import {EffectBurst} from '../presentation/EffectBurst';
import {useGameHaptics} from '../platform/useGameHaptics';
import {useCountdown} from '../ui/useCountdown';
import {WheelScreen} from './WheelScreen';
import {SettingsScreen} from './SettingsScreen';
import {getAudio,getAudioLifecycle} from '../audio/audioService';
import {useGameAudio} from '../audio/useGameAudio';
import {useMergeMotion} from '../presentation/useMergeMotion';
import {useRewardMotion} from '../presentation/useRewardMotion';
import {RewardFlyer} from '../presentation/RewardFlyer';
import {MergeOverlay} from '../presentation/MergeOverlay';
import {stageHud} from '../ui/StageHud';
import {unlocks} from '../../../game-core/src/content/UnlockConfig';
import {useBattle} from '../battle/useBattle';import {BattleSurface,BattleBackdrop} from '../battle/BattleSurface';
import {useEffect,useMemo,useRef,useState,useSyncExternalStore} from 'react';
import {NavigationCoordinator} from '../ui/NavigationCoordinator';
import {AppState,View,Text,Pressable,useWindowDimensions,StyleSheet} from 'react-native';
import {Canvas,Group,RoundedRect} from '@shopify/react-native-skia';
import {Gesture,GestureDetector} from 'react-native-gesture-handler';
import Animated,{useSharedValue,useDerivedValue,withTiming,cancelAnimation} from 'react-native-reanimated';
import {scheduleOnRN} from 'react-native-worklets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {layout} from '../ui/ResponsiveLayout';import {Hud} from '../components/Hud';import {BattleBoard,PurchaseFixture,TierBadge} from '../components/BattleBoard';
import {BottomNavigation,tabs} from '../components/BottomNavigation';import {Sprite,Label,heroArt} from '../rendering/Art';import {GameButton} from '../ui/GameButton';import {currentFixture} from '../debug/currentFixture';
import {useGame} from '../game/useGame';import {BoardPresenter,rejectionText,type Drag} from '../ui/BoardPresenter';import {PurchaseHold} from '../input/PurchaseHold';
import {offers,heroes} from '../../../game-core/src/content/PlayableConfig';import {quotePurchase} from '../../../game-core/src/selectors/PurchaseQuote';
const noSubscription=()=>()=>{},emptyRewards=()=>emptyRewardedView;
export default function BattleScreen(){
 const {width,height}=useWindowDimensions(),insets=useSafeAreaInsets(),fixture=currentFixture,l=useMemo(()=>layout(width,height,insets,fixture?.slots??15),[width,height,insets.top,insets.bottom,insets.left,insets.right,fixture?.slots]);
 const {game,state,error}=useGame(!fixture),{battle,battleState}=useBattle(game),presenter=useMemo(()=>game?new BoardPresenter(game):null,[game]);
 useGameHaptics(game,state.data.settings.haptics);
 useEffect(()=>{if(game)return getAudioLifecycle().bind(game);},[game]);
 const wheelRemaining=useCountdown(state.data.wheel.nextFreeAt);
 const merging=useMergeMotion(game,state.data.settings.reducedMotion);
 const rewards=useRewardMotion(game,l.boardTop,state.data.settings.reducedMotion);
 useEffect(()=>{merging.motion.clear();},[merging.motion,width,height]);
 const [selected,setSelected]=useState(2),[pressed,setPressed]=useState(-1),[pressedAction,setPressedAction]=useState(''),[pressedBuy,setPressedBuy]=useState(-1),[drag,setDrag]=useState<Drag|null>(null),[toast,setToast]=useState('');
 const navigation=useMemo(()=>new NavigationCoordinator(),[]),nav=useSyncExternalStore(navigation.subscribe,navigation.getSnapshot);
 const wheelOpen=nav.route.name==='wheel',setWheelOpen=(open:boolean)=>{if(open)navigation.navigate('wheel');else navigation.back();};
 const [autoPanel,setAutoPanel]=useState(false),[boostBusy,setBoostBusy]=useState(false),[boostError,setBoostError]=useState('');
 const autoRemaining=useCountdown(state.data.autoMerge.expiresAtUtcMs??0);
 const autoEligible=autoRemaining>0&&Math.max(Date.now(),state.data.autoMerge.lastObservedWallUtcMs)<(state.data.autoMerge.expiresAtUtcMs??0);
 const autoActive=autoMergeActive(state,Date.now());
 const message=nav.top&&!nav.top.closing?nav.top.text??'':'';
 const setMessage=(text:string)=>{if(!text){setAutoPanel(false);setBoostError('');}if(text)navigation.enqueue({id:'information',kind:'information',text,priority:0});else if(nav.top)navigation.closePopup(nav.top.id);};
 const wheelRoute=useTransitionMotion(wheelOpen?'wheel':null,state.data.settings.reducedMotion,'route');
 const wheelActive=wheelRoute.presented!==null;
 const settingsRoute=useTransitionMotion(nav.route.name==='settings'?'settings':null,state.data.settings.reducedMotion,'route'),settingsActive=settingsRoute.presented!==null;
 const rewarded=useMemo(()=>game?new RewardedController(game,rewardedAds):null,[game]);
 const rewardView=useSyncExternalStore(rewarded?.subscribe??noSubscription,rewarded?.getSnapshot??emptyRewards);
 useEffect(()=>()=>rewarded?.dispose(),[rewarded]);
 const rewardRoute=useTransitionMotion(nav.route.name==='shop'?'shop':nav.route.name==='boost'?nav.route.entityId??null:null,state.data.settings.reducedMotion,'route'),rewardActive=rewardRoute.presented!==null;
 const winBoost=battleState?.victory?.boostId?state.data.stageBoosts?.[battleState.victory.boostId]:null;
 const boostRemaining=useCountdown(winBoost?.offerEndsAt??0),offerBoost=!!winBoost&&winBoost.status==='available'&&boostRemaining>0;
 const pendingBoost=Object.values(state.data.stageBoosts??{}).find(b=>b.status==='reserved');
 const closeReward=()=>{if(rewardRoute.presented&&rewardRoute.presented!=='shop')rewarded?.settled(rewardRoute.presented);navigation.back();setSelected(2);};
 const heroRoute=useTransitionMotion(nav.route.name==='heroes'||nav.route.name==='upgrades'?nav.route.name:null,state.data.settings.reducedMotion,'route'),heroActive=heroRoute.presented!==null;
 const dailyRoute=useTransitionMotion(nav.route.name==='daily'?'daily':null,state.data.settings.reducedMotion,'route'),dailyActive=dailyRoute.presented!==null;
 const extendedRoute=useTransitionMotion(nav.route.name==='relic'||nav.route.name==='dungeon'?nav.route.name:null,state.data.settings.reducedMotion,'route'),extendedActive=extendedRoute.presented!==null;
 const isBossMusic=!!battleState?.boss&&!wheelActive&&!settingsActive&&!rewardActive&&!heroActive&&!dailyActive&&!extendedActive;
 useEffect(()=>{getAudio().setLoop('music',isBossMusic?'music.boss':'music.main');getAudio().setLoop('ambience','ambience.main');},[isBossMusic]);
 const modal=useTransitionMotion(message||null,state.data.settings.reducedMotion),infoActive=modal.presented!==null,modalActive=infoActive||wheelActive||settingsActive||rewardActive||heroActive||dailyActive||extendedActive;
 useEffect(()=>{if(!infoActive&&nav.top?.closing)navigation.finishPopupExit(nav.top.id);},[infoActive,nav.top,navigation]);
 useGameAudio(game,battle,!modalActive);
 const panelOpen=wheelOpen||nav.route.name==='settings'||nav.route.name==='shop'||nav.route.name==='boost'||heroActive||dailyActive||extendedActive||!!message,previousPanelOpen=useRef(false);
 useEffect(()=>{if(panelOpen!==previousPanelOpen.current){getAudio().emit(panelOpen?'ui.popupOpen':'ui.popupClose');previousPanelOpen.current=panelOpen;}},[panelOpen]);
 const metaRewards=useMetaRewardMotion(game,{x:215,y:l.boardTop+80},state.data.settings.reducedMotion?'reduced':'full',modalActive);
 const hold=useRef(new PurchaseHold()).current,toastTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const dx=useSharedValue(0),dy=useSharedValue(0),dragTransform=useDerivedValue(()=>[{translateX:dx.value},{translateY:dy.value}]);
 const showToast=(text:string)=>{setToast(text);if(toastTimer.current)clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),2200);};
 const selectWinBoost=async()=>{
  if(!rewarded||!winBoost||modalActive)return;const token=navigation.beginRoute();
  const ok=await rewarded.selectBoost(winBoost.id);
  if(ok)navigation.finishRoute(token,{name:'boost',entityId:winBoost.id});
  else{navigation.cancelRoute(token);showToast(rewarded.getSnapshot().error);}
 };
 const feedback=(result:{ok:boolean;reason?:string}|null)=>{if(result&&!result.ok){getAudio().emit('ui.error');showToast(rejectionText[result.reason??'']??'Please try that move again.');}};
 const cancelInput=()=>{merging.motion.clear();rewards.motion.clear();metaRewards.motion.clear();hold.cancel();presenter?.cancel();setDrag(null);setPressedBuy(-1);cancelAnimation(dx);cancelAnimation(dy);dx.value=0;dy.value=0;};
 useEffect(()=>{
  const subscription=AppState.addEventListener('change',status=>{navigation.setFocused(status==='active');if(status!=='active')cancelInput();});
  const blur=()=>cancelInput();globalThis.addEventListener?.('blur',blur);
  return()=>{cancelAnimation(dx);cancelAnimation(dy);subscription.remove();globalThis.removeEventListener?.('blur',blur);hold.cancel();presenter?.cancel();if(toastTimer.current)clearTimeout(toastTimer.current);};
 },[presenter,hold]);
 useEffect(()=>{presenter?.input.setLayer('modal',modalActive);if(modalActive)cancelInput();},[modalActive,presenter]);
 useEffect(()=>{if(!game)return;return game.dispatcher.events.subscribe(batch=>{const discovered=batch.find(e=>e.type==='tier.discovered');if(discovered){const p=discovered.payload as {tier:number};showToast(`New hero! Level ${p.tier} unlocked`);}});},[game]);
 useEffect(()=>game?bindNotifications(game,navigation):undefined,[game,navigation]);
 const stageView=stageHud(state,battleState),announcing=useRef(false);
 useEffect(()=>{
  if(!game||modalActive||battleState?.victory||announcing.current)return;
  const pending=unlocks.pending(state);if(!pending.length)return;
  announcing.current=true;showToast(`${pending.length} new board spaces unlocked!`);
  void game.dispatcher.dispatch({type:'AnnounceUnlocks',commandId:game.nextId('announce'),ids:pending.map(r=>r.id)}).finally(()=>{announcing.current=false;});
 },[game,state.revision,modalActive,battleState?.victory]);
 const challengeBoss=async()=>{
  if(!game||!stageView.retryStageId||battleState?.rewardStatus!=='idle')return;
  feedback(await game.dispatcher.dispatch({type:'RetryBoss',commandId:game.nextId('retryBoss'),stageId:stageView.retryStageId,expectedSequence:state.data.stages.encounterSequence}));
 };
 const tiers=useMemo(()=>fixture?.tiers??state.data.board.map(slot=>state.data.heroes.find(h=>h.id===slot.unitId)?.tier??0),[fixture,state.data.board,state.data.heroes]);
 const deployed=useMemo(()=>state.data.board.map(slot=>state.data.heroes.find(h=>h.id===slot.unitId)?.deployed??false),[state.data.board,state.data.heroes]);
 const boardUnlocked=useMemo(()=>state.data.board.map(s=>s.unlocked),[state.data.board]),boardIds=useMemo(()=>state.data.board.map(s=>s.unitId),[state.data.board]);
 const mergeHidden=useMemo(()=>merging.records.map(r=>r.value.visual!.newId),[merging.records]);
 const dropTargets=useMemo(()=>presenter?.targets(),[presenter,drag,state.revision]);
 const orderedOffers=[offers[1]!,offers[0]!,offers[2]!],quotes=orderedOffers.map(o=>quotePurchase(state,o,heroes));
 const begin=(x:number,y:number)=>{const slot=presenter?.hit(x,y,l);if(slot!==undefined&&slot!==null&&slot>=0)setDrag(presenter!.begin(slot));};
 const finish=async(x:number,y:number)=>{
  const target=presenter?.hit(x,y,l)??null,result=await presenter?.drop(target);setDrag(null);dx.value=0;dy.value=0;feedback(result??null);
 };
 const cancelDrag=()=>{presenter?.cancel();dx.value=withTiming(0,{duration:140});dy.value=withTiming(0,{duration:140});setDrag(null);};
 const tap=async(x:number,y:number)=>{const slot=presenter?.hit(x,y,l);if(slot!==undefined&&slot!==null&&slot>=0){if(!state.data.board[slot]?.unlocked){showToast(presenter!.lockedHint(slot));return;}feedback(await presenter!.tap(slot));}};
 const scale=l.scale;
 const pan=Gesture.Pan().enabled(!!game&&!modalActive&&!fixture).minDistance(5).maxPointers(1)
  .onStart(e=>{dx.value=e.translationX/scale;dy.value=e.translationY/scale;scheduleOnRN(begin,e.absoluteX-e.translationX,e.absoluteY-e.translationY);})
  .onUpdate(e=>{dx.value=e.translationX/scale;dy.value=e.translationY/scale;})
  .onEnd((e,success)=>{if(success)scheduleOnRN(finish,e.absoluteX,e.absoluteY);})
  .onFinalize((_e,success)=>{if(!success)scheduleOnRN(cancelDrag);});
 const tapGesture=Gesture.Tap().enabled(!!game&&!modalActive&&!fixture).maxDistance(5).onEnd((e,success)=>{if(success)scheduleOnRN(tap,e.absoluteX,e.absoluteY);});
 const buy=async(index:number)=>{
  if(!game)return false;const offer=orderedOffers[index]!;
  const result=await game.dispatcher.dispatch({type:'BuyHero',commandId:game.nextId('buy'),offerId:offer.id});feedback(result);return result.ok;
 };
 const toggleSpeed=async()=>{if(!game||boostBusy)return;setBoostBusy(true);try{const speed=(state.data.settings.battleSpeed??1)===1?2:1;const {result}=await runMetaAction(game,{type:'UpdateSettings',commandId:game.nextId('speed'),settingsRevision:state.data.settings.revision??0,patch:{battleSpeed:speed}});feedback(result);if(result.ok)showToast(`Battle speed: ${game.dispatcher.getSnapshot().data.settings.battleSpeed??1}×`);}finally{setBoostBusy(false);}};
 const toggleAuto=async()=>{if(!game||boostBusy)return;setBoostBusy(true);setBoostError('');try{
  const {result}=await runMetaAction(game,autoEligible?{type:'SetAutoMerge',commandId:game.nextId('autoToggle'),enabled:!autoActive}:{type:'ActivateAutoMerge',commandId:game.nextId('auto'),mode:'currency',utcMs:Date.now()});
  if(result.ok)setMessage('');else{setBoostError(result.reason==='INSUFFICIENT_GOLD'?'You need 100 gold. Earn more in Battle or the Shop.':'Could not save. Try again to finish this activation.');getAudio().emit('ui.error');}
 }finally{setBoostBusy(false);}};
 const info=(name:string)=>{if(name==='Speed boost'&&game){void toggleSpeed();return;}if(name==='Auto merge'&&game){setAutoPanel(true);setBoostError('');setMessage('AUTO MERGE');return;}if(name==='Gold boost'&&game){navigation.navigate('shop');return;}if((name==='Dungeon'||name==='Relics')&&game){navigation.navigate(name==='Dungeon'?'dungeon':'relic');return;}if(name==='Daily reward'&&game){navigation.navigate('daily');return;}if(name==='Heroes'&&game){navigation.navigate('heroes');return;}if(name==='Shop'&&game){navigation.navigate('shop');return;}if(name==='Settings'&&game){navigation.navigate('settings');return;}if(name==='Lucky wheel'&&game){setWheelOpen(true);return;}setMessage(name==='Heroes'?'Your heroes grow stronger with every merge.':name==='Shop'?'Recruit heroes using the purchase cards on the battle screen.':name==='Dungeon'||name==='Relics'?'Continue your adventure to unlock this area.':name==='Boss'?'Defeat the stage enemies to challenge the boss.':'Buy heroes, drag matching heroes together, and build your team.');};
 const dragRect=drag?l.board[drag.slotId]:null;
 return <View style={styles.root} testID="battle-screen">
 {__DEV__&&<View testID="merge-motion-state" accessibilityLabel={String(merging.records.length)}/>}
 {__DEV__&&<View testID="reward-motion-state" accessibilityLabel={String(rewards.records.length)}/>}
 {__DEV__&&<View testID="meta-motion-state" accessibilityLabel={String(metaRewards.records.length)}/>}
 {__DEV__&&<View testID="cascade-motion-state" accessibilityLabel={JSON.stringify(merging.records.map(r=>({intensity:r.value.visual!.intensity,pitch:r.value.visual!.pitch})))}/>}
 <View collapsable={false} style={{width,height}} accessibilityElementsHidden={modalActive} importantForAccessibility={modalActive?'no-hide-descendants':'auto'} aria-hidden={modalActive}><BattleBackdrop l={l} width={width} height={height} fixture={!!fixture}/>{battle&&<BattleSurface battle={battle} l={l} reducedMotion={state.data.settings.reducedMotion}/>}<Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:height-insets.top-insets.bottom}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Hud wheelRemainingMs={fixture?undefined:state.data.wheel.freeSpins>0?0:wheelRemaining} wheelPending={state.data.wheel.pendingSpin?.status==='reserved'} reducedMotion={!!fixture||state.data.settings.reducedMotion} gold={fixture?.gold??state.data.currencies.gold??'0'} gems={fixture?.gems??state.data.currencies.gem??'0'} stage={fixture?.stage??stageView.label} progress={fixture?1:stageView.progress} barLabel={fixture?undefined:stageView.barLabel} pressed={pressedAction}/>
 {!fixture&&<MotionButton x={215} y={112} pressed={pressedAction==='Daily reward'} reducedMotion={state.data.settings.reducedMotion}><Sprite id="reward_gold_chest__1254x1254_variant2" x={192} y={89} width={46} height={46}/><Label text={dailyEligibility(state,Date.now()).available?'DAILY!':'DAILY'} x={215} y={148} size={12} bold center outline={1}/></MotionButton>}
 {!fixture&&<Group>
 <Label text={stageView.boss?`BOSS · ${stageView.remainingSeconds??0}s`:stageView.farming?'FARMING · GROW YOUR TEAM':stageView.waveLabel} x={215} y={243} size={16} center outline={1} color={stageView.boss?'#ffde84':'#ffffff'}/>
 {battleState?.victory&&<WinRewardBanner gold={battleState.victory.gold} boost={offerBoost} pressed={pressedAction==='Boost Reward'} reduced={state.data.settings.reducedMotion}/>}
 {state.data.dungeon?.active&&<MotionButton x={215} y={281} pressed={pressedAction==='Leave dungeon'} reducedMotion={state.data.settings.reducedMotion}><RoundedRect x={135} y={261} width={160} height={35} r={10} color="#9a3b47"/><Label text="LEAVE DUNGEON" x={215} y={285} size={19} bold center/></MotionButton>}
 {pendingBoost&&!battleState?.victory&&<MotionButton x={215} y={326} pressed={pressedAction==='Victory reward'} reducedMotion={state.data.settings.reducedMotion}><RoundedRect x={130} y={307} width={170} height={38} r={10} color="#7958ba"/><RoundedRect x={130} y={307} width={170} height={38} r={10} color="#ffda95" style="stroke" strokeWidth={1.5}/><Label text="VICTORY REWARD" x={215} y={333} size={21} bold center/></MotionButton>}
 {stageView.retryStageId&&!battleState?.victory&&<Group origin={{x:215,y:282}} transform={[{scale:pressedAction==='Challenge boss'?0.96:1}]} opacity={battleState?.rewardStatus==='idle'?1:0.6}><RoundedRect x={130} y={262} width={170} height={39} r={10} color="#c93237"/><RoundedRect x={130} y={262} width={170} height={39} r={10} color="#ffda95" style="stroke" strokeWidth={1.5}/><Label text="CHALLENGE BOSS" x={215} y={288} size={21} bold center/></Group>}
 </Group>}
 {[['ui_icon_hourglass__1343x1364',94,'Speed boost'],['ui_icon_crystal_snowflake__1318x1341',188,'Auto merge'],['ui_icon_gold_pile__1134x1163',282,'Gold boost']].map(([id,x,name])=><MotionButton key={id} x={Number(x)+27} y={l.boostY+27.5} pressed={pressedAction===name} reducedMotion={!!fixture||state.data.settings.reducedMotion}><Sprite id={id as any} x={Number(x)} y={l.boostY} width={54} height={55}/></MotionButton>)}
 {!fixture&&<Group><Label text={`${state.data.settings.battleSpeed??1}×`} x={121} y={l.boostY+56} size={14} bold center color="#ffdf89"/><Label text={autoActive?`${Math.ceil(autoRemaining/60000)} MIN`:autoEligible?'PAUSED':'AUTO'} x={215} y={l.boostY+56} size={12} bold center color={autoActive?'#9bffa8':'#ffdf89'}/><Label text="+1000" x={309} y={l.boostY+56} size={13} bold center color="#ffdf89"/></Group>}
 <BattleBoard hiddenIds={mergeHidden} reducedMotion={state.data.settings.reducedMotion} l={l} tiers={tiers} dragIndex={drag?.slotId} targets={dropTargets} unlocked={fixture?undefined:boardUnlocked} deployed={fixture?undefined:deployed} ids={fixture?undefined:boardIds}/>
 {!fixture&&<Label text={state.data.heroes.length?'TAP TO FIGHT · DRAG TO MERGE':'BUY YOUR FIRST HERO TO START BATTLE'} x={215} y={l.buyY-7} size={10} small center color="#d9ebfa"/>}
 {merging.records.map(lease=><MergeOverlay key={lease.value.visual!.id} lease={lease} l={l} release={merging.motion.release} reducedMotion={state.data.settings.reducedMotion}/>)}
 <PurchaseFixture reducedMotion={!!fixture||state.data.settings.reducedMotion} l={l} prices={fixture?undefined:quotes.map(q=>q.cost??'—')} tiers={fixture?undefined:[2,1,3]} locked={fixture?undefined:quotes.map(q=>!q.ok&&q.reason==='LOCKED')} pressed={pressedAction==='Buy hero'} pressedIndex={pressedBuy}/><BottomNavigation notices={[...(redDots(state,Date.now()).heroes?[1]:[]),...(redDots(state,Date.now()).battle?[2]:[])]} y={l.navY} selected={selected} pressed={pressed} reducedMotion={!!fixture||state.data.settings.reducedMotion}/>
 {drag&&dragRect&&<Group transform={dragTransform}><RoundedRect x={dragRect.x+4} y={dragRect.y+24} width={60} height={35} r={15} color="#071b33" opacity={0.3}/><Sprite id={heroArt[drag.tier-1]!} x={dragRect.x+8} y={dragRect.y-12} width={56} height={58}/><TierBadge tier={drag.tier} x={dragRect.x+26} y={dragRect.y+26}/></Group>}
 {rewards.records.map(lease=><RewardFlyer key={`${lease.slot}:${lease.generation}`} lease={lease} release={rewards.motion.release}/>)}
 {metaRewards.records.map(lease=><EffectBurst key={`${lease.slot}:${lease.generation}`} lease={lease} release={metaRewards.motion.release}/>)}
 </Group></Group></Canvas>
 {!fixture&&<GestureDetector gesture={Gesture.Race(pan,tapGesture)}><View testID="board-input" style={{position:'absolute',left:l.offsetX,top:l.offsetY+l.boardTop*l.scale,width:l.playWidth,height:207*l.scale}}>
 {l.board.map((r,i)=><View key={i} testID={`board-slot-${i}`} accessible accessibilityRole="button" accessibilityLabel={`Slot ${i+1}: ${!state.data.board[i]?.unlocked?'locked':tiers[i]?`level ${tiers[i]} hero${deployed[i]?', deployed':''}`:'empty'}`} onAccessibilityTap={()=>void presenter?.tap(i).then(feedback)} style={{position:'absolute',left:r.x*l.scale,top:(r.y-l.boardTop)*l.scale,width:r.width*l.scale,height:r.height*l.scale}}/>)}</View></GestureDetector>}
 {tabs.map((name,i)=><GameButton key={name} label={name} hapticEvent="ui.tab" state={selected===i?'selected':'normal'} rect={l.toScreen({x:7+84*i,y:l.navY,width:79,height:80})} onPress={()=>{setSelected(i);if(i!==2)info(name);}} onVisualChange={s=>setPressed(s==='pressed'?i:-1)}/>)}
 {[['Daily reward',192,86,46,53],['Settings',269,86,53,53],['Lucky wheel',108,86,53,53],['Boss',362,179,54,54],['Speed boost',94,l.boostY,54,55],['Auto merge',188,l.boostY,54,55],['Gold boost',282,l.boostY,54,55]].map(([name,x,y,w,h])=><GameButton key={name} label={String(name)} rect={l.toScreen({x:Number(x),y:Number(y),width:Number(w),height:Number(h)})} onPress={()=>name==='Boss'&&stageView.retryStageId?void challengeBoss():info(String(name))} onVisualChange={s=>setPressedAction(s==='pressed'?String(name):'')}/>)}
 {[99,172,263].map((x,i)=>{const middle=i===1,r=l.toScreen({x,y:l.buyY+(middle?0:9),width:middle?86:68,height:middle?77:60});return <Pressable key={i} testID={`buy-${i}`} accessibilityRole="button" accessibilityLabel={middle?'Buy hero':`Buy level ${i===0?2:3} hero`} disabled={!fixture&&!game} onPressIn={()=>setPressedBuy(i)} delayLongPress={350} onLongPress={fixture?undefined:()=>{hold.start(i,()=>buy(i),orderedOffers[i]!.holdIntervalMs);}} onPressOut={()=>{hold.release(i);setPressedBuy(-1);}} onPress={fixture?()=>info('Buy hero'):()=>void buy(i)} style={{position:'absolute',left:r.x,top:r.y,width:r.width,height:r.height}}/>;})}
 {stageView.retryStageId&&!battleState?.victory&&<GameButton label="Challenge boss" state={battleState?.rewardStatus==='idle'?'normal':'loading'} onVisualChange={s=>setPressedAction(s==='pressed'?'Challenge boss':'')} rect={l.toScreen({x:130,y:262,width:170,height:39})} onPress={()=>void challengeBoss()}/>}
 {state.data.dungeon?.active&&!modalActive&&<GameButton label="Leave dungeon" rect={l.toScreen({x:135,y:261,width:160,height:35})} state={battleState?.rewardStatus==='idle'?'normal':'loading'} onVisualChange={s=>setPressedAction(s==='pressed'?'Leave dungeon':'')} onPress={()=>{if(game&&state.data.dungeon?.active)void game.dispatcher.dispatch({type:'LeaveDragon',commandId:game.nextId('leaveDragon'),attemptId:state.data.dungeon.active.id}).then(feedback);}}/>}
 {offerBoost&&!modalActive&&<GameButton label="Boost Reward" state={rewardView.busy?'loading':'normal'} rect={l.toScreen({x:83,y:315,width:264,height:49})} onPress={()=>void selectWinBoost()} onVisualChange={s=>setPressedAction(s==='pressed'?'Boost Reward':'')}/>}
 {pendingBoost&&!battleState?.victory&&!modalActive&&<GameButton label="Victory reward" rect={l.toScreen({x:130,y:307,width:170,height:38})} onPress={()=>navigation.navigate('boost',pendingBoost.id)} onVisualChange={s=>setPressedAction(s==='pressed'?'Victory reward':'')}/>}
 {!fixture&&<View testID="stage-status" accessible accessibilityLabel={`Stage ${stageView.label}; ${stageView.boss?'Boss '+stageView.remainingSeconds+' seconds':stageView.waveLabel}; ${stageView.farming?'Farming':'Fighting'}`} style={styles.status}/>}
 {!fixture&&<View testID="game-status" accessible accessibilityLabel={`Coins ${state.data.currencies.gold}; Heroes ${state.data.heroes.length}; Stage ${stageView.label}`} style={styles.status}/>}
 {battleState?.rewardStatus==='failed'&&<View style={[styles.rewardError,{top:l.offsetY+245*l.scale,left:l.offsetX+30*l.scale,width:l.playWidth-60*l.scale}]}><Text style={styles.toastText}>Your reward is waiting. Save it to continue.</Text><Pressable accessibilityRole="button" accessibilityLabel="Retry saving reward" onPress={()=>void battle?.retryRewards()} style={({pressed})=>[styles.retry,{opacity:pressed?0.8:1,transform:[{scale:pressed?0.97:1}]}]}><Text style={styles.closeText}>Retry saving reward</Text></Pressable></View>}
 {!!toast&&!modalActive&&<View pointerEvents="none" style={[styles.toast,{top:l.offsetY+238*l.scale,left:l.offsetX+20*l.scale,width:l.playWidth-40*l.scale}]}><Text accessibilityLiveRegion="polite" style={styles.toastText}>{toast}</Text></View>}
 {!fixture&&!game&&<View style={styles.backdrop}><Text style={styles.message}>{error||'Preparing your heroes…'}</Text></View>}
 </View>
 <Modal visible={infoActive} transparent animationType="none" onRequestClose={()=>{setMessage('');setSelected(2);}}><Animated.View style={[styles.backdrop,modal.backdropStyle]}><Animated.View accessibilityViewIsModal style={[styles.modal,modal.panelStyle]}><Text style={styles.message}>{modal.presented}</Text>{autoPanel&&<><Text style={[styles.message,{fontSize:15,marginTop:14}]}>{autoEligible?`${Math.ceil(autoRemaining/60000)} minutes remaining. ${autoActive?'Your matching heroes merge automatically.':'Automatic merging is paused.'}`:'Merge matching heroes automatically for 60 minutes. Your team keeps its equipment and deployed position.'}</Text>{!!boostError&&<Text accessibilityLiveRegion="polite" style={[styles.message,{color:'#ffb4a3',fontSize:14,marginTop:12}]}>{boostError}</Text>}<Pressable accessibilityRole="button" accessibilityLabel={autoEligible?autoActive?'Pause auto merge':'Resume auto merge':'Activate auto merge for 100 gold'} disabled={boostBusy} onPress={()=>void toggleAuto()} style={({pressed})=>[styles.close,{backgroundColor:'#a0e992',opacity:boostBusy?0.6:pressed?0.8:1}]}><Text style={styles.closeText}>{boostBusy?'Saving…':autoEligible?autoActive?'Pause auto merge':'Resume auto merge':`ACTIVATE · ${autoActivation.costAmount} GOLD`}</Text></Pressable></>}<Pressable accessibilityRole="button" onPress={()=>{setMessage('');setSelected(2);}} style={({pressed})=>[styles.close,{opacity:pressed?0.8:1}]}><Text style={styles.closeText}>Back to battle</Text></Pressable></Animated.View></Animated.View></Modal>
 <Modal visible={extendedActive} transparent animationType="none" onRequestClose={()=>navigation.back()}>{extendedActive&&game&&<Animated.View accessibilityViewIsModal style={[{flex:1,backgroundColor:'#111c37'},extendedRoute.panelStyle]}><ExtendedModeScreen game={game} width={width} height={height} insets={insets} mode={extendedRoute.presented as 'relic'|'dungeon'} onNavigate={name=>{navigation.navigate(name);if(name==='battle')setSelected(2);}}/></Animated.View>}</Modal>
 <Modal visible={dailyActive} transparent animationType="none" onRequestClose={()=>navigation.back()}>{dailyActive&&game&&<DailyScreen game={game} width={width} height={height} insets={insets} onBack={()=>navigation.back()}/>}</Modal>
 <Modal visible={heroActive} transparent animationType="none" onRequestClose={()=>navigation.back()}>{heroActive&&game&&<Animated.View accessibilityViewIsModal style={[{flex:1,backgroundColor:'#111c37'},heroRoute.panelStyle]}><HeroScreen game={game} width={width} height={height} insets={insets} mode={heroRoute.presented as 'heroes'|'upgrades'} onNavigate={name=>{if(name==='battle'){navigation.navigate('battle');setSelected(2);}else if(name==='dungeon'||name==='relic'){info(name==='dungeon'?'Dungeon':'Relics');}else navigation.navigate(name);}}/></Animated.View>}</Modal>
 <Modal visible={rewardActive} transparent animationType="none" onRequestClose={closeReward}>{rewardActive&&game&&rewarded&&<Animated.View accessibilityViewIsModal style={[{flex:1,backgroundColor:'#111c37'},rewardRoute.panelStyle]}><RewardScreen game={game} controller={rewarded} width={width} height={height} insets={insets} mode={rewardRoute.presented==='shop'?'freeCoins':'stageBoost'} boostId={rewardRoute.presented==='shop'?undefined:rewardRoute.presented??undefined} onBack={closeReward}/></Animated.View>}</Modal>
 <Modal visible={settingsActive} transparent animationType="none" onRequestClose={()=>navigation.back()}>{settingsActive&&game&&<Animated.View accessibilityViewIsModal style={[{flex:1,backgroundColor:'#111c37'},settingsRoute.panelStyle]}><SettingsScreen game={game} width={width} height={height} insets={insets} onBack={()=>navigation.back()}/></Animated.View>}</Modal>
 <Modal visible={wheelActive} transparent animationType="none" onRequestClose={()=>setWheelOpen(false)}>{wheelActive&&game&&<Animated.View accessibilityViewIsModal style={[{flex:1,backgroundColor:'#111c37'},wheelRoute.panelStyle]}><WheelScreen game={game} width={width} height={height} insets={insets} onBack={()=>setWheelOpen(false)}/></Animated.View>}</Modal>
 </View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#111c37'},rewardError:{position:'absolute',backgroundColor:'#132f46',borderColor:'#ffd778',borderWidth:2,borderRadius:14,padding:12},retry:{backgroundColor:'#ffd778',padding:10,borderRadius:8,marginTop:10},status:{position:'absolute',width:1,height:1,opacity:0},toast:{position:'absolute',backgroundColor:'rgba(10,31,48,.93)',borderColor:'#82adb4',borderWidth:1,borderRadius:12,padding:12},toastText:{color:'#fff3c7',fontSize:15,fontWeight:'700',textAlign:'center'},backdrop:{position:'absolute',inset:0,backgroundColor:'rgba(5,12,29,.72)',justifyContent:'center',alignItems:'center',padding:24},modal:{backgroundColor:'#132f46',borderColor:'#7196ae',borderWidth:2,borderRadius:18,padding:24,maxWidth:350},message:{color:'white',fontSize:18,textAlign:'center',lineHeight:26},close:{marginTop:24,backgroundColor:'#ffcf67',borderRadius:10,padding:16},closeText:{color:'#242032',textAlign:'center',fontWeight:'800'}});
