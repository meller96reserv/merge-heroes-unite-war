import {formatAmount} from '../../../game-core/src/selectors/NumberFormatter';
import {useEffect,useMemo,useState,useSyncExternalStore} from 'react';
import {View} from 'react-native';
import {Canvas,Group,Path,Circle,Skia} from '@shopify/react-native-skia';
import type {GameRuntime} from '../game/GameRuntime';
import type {RewardedController} from './RewardedController';
import {Label,Sprite} from '../rendering/Art';
import {layout,type Insets} from '../ui/ResponsiveLayout';
import {GameButton} from '../ui/GameButton';
import {MotionButton,CounterPulse} from '../presentation/UiMotionViews';
import {AttentionPulse} from '../presentation/AttentionPulse';
import {useWheelMotion} from '../presentation/useWheelMotion';
import {VideoIcon} from './RewardViews';
import {getAudio} from '../audio/audioService';
import {haptics} from '../platform/hapticService';
import {rewardedAds} from '../platform/RewardedAds';
export function RewardScreen({game,controller,width,height,insets,mode,boostId,onBack}:{game:GameRuntime;controller:RewardedController;width:number;height:number;insets:Insets;mode:'freeCoins'|'stageBoost';boostId?:string;onBack:()=>void}){
 const state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot),view=useSyncExternalStore(controller.subscribe,controller.getSnapshot),l=layout(width,height,insets),[pressed,setPressed]=useState('');
 const reduced=state.data.settings.reducedMotion,shop=mode==='freeCoins',boost=boostId?state.data.stageBoosts?.[boostId]:null;
 const spinning=!!boost&&view.animatedBoostId===boost.id&&view.settledBoostId!==boost.id;
 const request=boost?.multiplier?{id:boost.id,kind:'boost' as const,segments:10,landingAngleDegrees:(360-(boost.multiplier-1)*36)%360}:null;
 const motion=useWheelMotion(request,!spinning||reduced,()=>getAudio().emit('wheel.tick'));
 useEffect(()=>{if(motion.settledId&&spinning){controller.settled(motion.settledId);getAudio().emit('wheel.result',{id:`boost-result:${motion.settledId}`});haptics.emit('wheel.landed',motion.settledId);}},[motion.settledId,spinning,controller]);
 useEffect(()=>{if(view.error&&view.placement===mode)getAudio().emit('ui.error');},[view.error,view.placement,mode]);
 const confirmed=Object.values(state.data.rewardedOperations??{}).some(op=>op.placement===mode&&(shop||op.outcomeId===boostId)&&op.status==='confirmed');
 const claimed=!shop&&boost?.status==='claimed',disabled=view.busy||spinning||(!shop&&!boost);
 const cta=disabled?spinning?'SPINNING…':'PLEASE WAIT…':claimed?'BACK TO BATTLE':confirmed?'CLAIM REWARD':shop?'FREE COINS':'CLAIM!';
 const notice=view.placement===mode?view.error:'';
 const top=Math.max(150,Math.min(210,l.virtualHeight/2-225)),buttonY=Math.min(l.virtualHeight-155,top+425),centerY=top+209;
 const paths=useMemo(()=>Array.from({length:10},(_,i)=>Skia.Path.Make().moveTo(0,0).arcToOval({x:-139,y:-139,width:278,height:278},-108+i*36,36,false).close()),[]);
 const back=()=>{if(boost)controller.settled(boost.id);onBack();};
 return <View testID={shop?'shop-screen':'stage-boost-screen'} style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Sprite id="background_floating_islands__941x1672" x={0} y={0} width={430} height={l.virtualHeight} fit="cover"/>
 <Label text={shop?'SHOP':'BOOST REWARD'} x={215} y={102} size={shop?48:36} bold center outline={2}/>
 <MotionButton x={38} y={86.5} pressed={pressed==='back'} reducedMotion={reduced}><Group origin={{x:38,y:86.5}} transform={[{rotate:-Math.PI/2}]}><Sprite id="ui_icon_upgrade_arrow__1302x1413" x={18.5} y={65.5} width={39} height={42} fit="fill"/></Group></MotionButton>
 <Sprite id="ui_frame_currency__figma_2_487" x={142.5} y={123} width={145} height={54} fit="fill"/><Sprite id="currency_gold_coin__254x262" x={153} y={134} width={32} height={32}/><CounterPulse value={state.data.currencies.gold??'0'} x={237} y={150} reducedMotion={reduced}><Label text={state.data.currencies.gold??'0'} x={237} y={158} size={30} bold center maxWidth={91}/></CounterPulse>
 {shop?<Group><Group clip={{x:51,y:top,width:328,height:405}}><Sprite id="ui_panel_plain_navy__1126x2000" x={32.2} y={top-20.57} width={365.59} height={437.04} fit="fill"/></Group><Label text="FREE COINS" x={215} y={top+56} size={36} bold center/><Sprite id="ui_icon_gold_pile__1134x1163" x={140} y={top+80} width={150} height={158}/><Label text="+1,000" x={215} y={top+275} size={52} bold center color="#ffe79d" outline={2}/><Label text="GOLD" x={215} y={top+303} size={24} center/><Label text="Every completed video earns 1,000 coins" x={215} y={top+344} size={13} small center maxWidth={280}/>{view.lastClaim?.placement==='freeCoins'&&<Label text="1,000 COINS ADDED!" x={215} y={top+375} size={22} bold center color="#b7f6c4"/>}</Group>:boost?<Group>
 <Group transform={[{translateX:215},{translateY:centerY}]}><Group transform={motion.transform}>{paths.map((path,i)=><Group key={i}><Path path={path} color={['#f9cc62','#945fd5','#427db9','#ed9452','#dd657a'][i%5]}/><Path path={path} color="#ffefb2" style="stroke" strokeWidth={1}/><Group transform={[{rotate:i*Math.PI/5}]}><Label text={`x${i+1}`} x={0} y={-101} size={23} bold center outline={1}/></Group></Group>)}</Group>
 <Sprite id="ui_wheel_outer_ring__1940x1924" x={-170} y={-167} width={341} height={341} fit="fill"/>
 <Circle cx={0} cy={0} r={73} color="#122c50"/><Circle cx={0} cy={0} r={73} color="#f8d991" style="stroke" strokeWidth={3}/>
 <Label text={spinning?'BOOSTING…':`x${boost.multiplier??1}`} x={0} y={spinning?5:-22} size={spinning?20:34} bold center color="#ffe6a0"/>
 {!spinning&&<Group><Label text={formatAmount((BigInt(boost.baseGold)*BigInt(boost.multiplier??1)).toString())} x={0} y={12} size={35} bold center maxWidth={122}/><Label text="GOLD" x={0} y={39} size={20} center/></Group>}
 <Group origin={{x:0,y:-168}} transform={motion.pointerTransform}><Sprite id="ui_icon_blue_triangle__1484x1322" x={-33} y={-190} width={66} height={59} fit="fill"/></Group></Group>
 <Label text={claimed?'BONUS CLAIMED':`Base reward ${boost.baseGold} already earned`} x={215} y={centerY+194} size={14} small center outline={1} color="#fff4d7"/>
 </Group>:null}
 <AttentionPulse x={215} y={buttonY+30.5} active={!disabled&&!claimed&&pressed!=='action'} reduced={reduced}><MotionButton x={215} y={buttonY+30.5} pressed={pressed==='action'} reducedMotion={reduced}><Group opacity={disabled?0.55:1}><Sprite id="ui_button_orange__2542x1359" x={58} y={buttonY} width={314} height={61.34} fit="fill"/>{!claimed&&!confirmed&&!disabled&&<VideoIcon x={86} y={buttonY+21}/>}<Label text={cta} x={!claimed&&!confirmed&&!disabled?229:215} y={buttonY+42} size={claimed?28:32} bold center outline={2} maxWidth={274}/></Group></MotionButton></AttentionPulse>
 {!!notice&&<Label text={notice} x={215} y={buttonY+91} size={13} small center outline={1} maxWidth={360}/>}
 </Group></Group></Canvas>
 <GameButton label={shop?'Back from shop':'Back from boost'} rect={l.toScreen({x:15,y:64,width:46,height:46})} onPress={back} onVisualChange={s=>setPressed(s==='pressed'?'back':'')}/>
 <GameButton testID="rewarded-action" label={cta} rect={l.toScreen({x:58,y:buttonY,width:314,height:62})} state={disabled?'loading':'normal'} onPress={()=>claimed?back():void controller.claim(mode,boostId)} onVisualChange={s=>setPressed(s==='pressed'?'action':'')}/>
 {!!notice&&<View accessible accessibilityRole="alert" accessibilityLabel={notice} pointerEvents="none" style={{position:'absolute',left:l.offsetX+30*l.scale,top:l.offsetY+(buttonY+75)*l.scale,width:370*l.scale,height:28*l.scale}}/>}
 {__DEV__&&rewardedAds.testLabel&&<View testID="rewarded-test-mode" accessibilityLabel={rewardedAds.testLabel}/>}
 </View>;
}
