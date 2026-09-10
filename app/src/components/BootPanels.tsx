import {useEffect,useRef,useState} from 'react';
import {View,Text,Platform,useWindowDimensions} from 'react-native';
import {Canvas,Group,RoundedRect} from '@shopify/react-native-skia';
import {prepareVisualResources} from '../rendering/ResourceCache';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Sprite,Label} from '../rendering/Art';
import {layout} from '../ui/ResponsiveLayout';
import {GameButton} from '../ui/GameButton';
import {MotionButton} from '../presentation/UiMotionViews';
import {getGameRuntime} from '../game/loadGameRuntime';
import {services} from '../platform/services';
import {openLegalDocument,type LegalDocument} from '../platform/LegalLinks';
import BattleScreen from '../screens/BattleScreen';
/** Progress counts completed mandatory asset/save loads. No fabricated timer,
 * fake remote outage or loyalty grant; retry preserves original save bytes. */
export function BootPanels(){
 const releaseBootArt=useRef<(()=>void)|undefined>(undefined);
 const {width,height}=useWindowDimensions(),insets=useSafeAreaInsets(),l=layout(width,height,insets);
 const [phase,setPhase]=useState<'loading'|'ready'|'error'|'playing'>('loading'),[progress,setProgress]=useState(0),[attempt,setAttempt]=useState(0),[pressed,setPressed]=useState(''),[notice,setNotice]=useState(''),[reduced,setReduced]=useState(false);
 useEffect(()=>{
  let active=true,unbind:(()=>void)|undefined;setPhase('loading');setProgress(0);
  let visual=0,saveReady=false;const completed=()=>{if(active)setProgress(visual*.95+(saveReady?.05:0));};
  void Promise.all([getGameRuntime().then(game=>{if(active){setReduced(game.dispatcher.getSnapshot().data.settings.reducedMotion);unbind=services.audioLifecycle().bind(game);}saveReady=true;completed();}),prepareVisualResources(value=>{visual=value;completed();}).then(release=>{if(active)releaseBootArt.current=release;else release();})]).then(()=>{
   if(!active)return;services.audio().setLoop('music','music.main');services.audio().setLoop('ambience','ambience.main');if(Platform.OS!=='web')void services.audioLifecycle().unlock();setPhase('ready');
  }).catch(error=>{if(active)setPhase('error');});
  return()=>{active=false;unbind?.();releaseBootArt.current?.();releaseBootArt.current=undefined;};
 },[attempt]);
 useEffect(()=>{if(phase==='playing'){releaseBootArt.current?.();releaseBootArt.current=undefined;}},[phase]);
 const legal=async(document:LegalDocument)=>{if(!await openLegalDocument(document))setNotice('This document is not available yet. Please try again later.');};
 if(phase==='playing')return <BattleScreen/>;
 const v=l.virtualHeight,compact=Math.min(1,v/900),logoW=300*compact,logoH=238*compact,logoY=49*compact,buttonY=v-227;
 const retry=()=>{setNotice('');setAttempt(n=>n+1);};
 return <View testID="boot-screen" style={{flex:1,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:v*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Sprite id="background_floating_islands__941x1672" x={0} y={0} width={430} height={v} fit="cover"/>
 {phase==='error'?<Group><Group clip={{x:52,y:197*compact,width:328,height:435}}><Sprite id="ui_panel_plain_navy__1126x2000" x={33.2} y={197*compact-22.1} width={365.59} height={469.4} fit="fill"/></Group><Label text="PLEASE WAIT" x={215.5} y={238*compact} size={24} bold center/><Sprite id="ui_icon_close__figma_2_121" x={331} y={220*compact} width={17.23} height={17.23}/><Sprite id="decoration_raccoon_castle__1254x1254" x={127} y={267*compact} width={177} height={175}/>{['Your progress is safe.','We could not finish loading the game.','Please try again.'].map((text,i)=><Label key={text} text={text} x={215} y={197*compact+286+i*25} size={20} center/>)}<MotionButton x={215} y={197*compact+389} pressed={pressed==='retry'} reducedMotion={reduced}><Sprite id="ui_button_gold__2378x1300" x={105} y={197*compact+363} width={220} height={52} fit="fill"/><Label text="RETRY" x={215} y={197*compact+399} size={28} bold center outline={2}/></MotionButton></Group>:<Group>
 <Group clip={{x:(430-logoW)/2,y:logoY,width:logoW,height:logoH}}><Sprite id="branding_logo__1448x1086_variant2" x={(430-logoW)/2-logoW*.0322} y={logoY} width={logoW*1.0578} height={logoH} fit="fill"/></Group>
 {phase==='loading'?<Group><Group clip={{x:43,y:300*compact,width:344,height:147*compact}}><Sprite id="branding_welcome_text__2172x724" x={0} y={300*compact} width={441} height={147*compact} fit="fill"/></Group><Label text="Loading…" x={215} y={v-135} size={24} bold center outline={2}/><RoundedRect x={51} y={v-109} width={328} height={32} r={16} color="#ffa000"/><RoundedRect x={57} y={v-103} width={316*Math.max(.015,progress)} height={20} r={10} color="#006fff"/></Group>:<Group>
 <Sprite id="branding_hero_collage__1536x1024" x={(430-392*compact)/2} y={365*compact} width={392*compact} height={262*compact} fit="fill"/>
 <MotionButton x={215} y={buttonY+39} pressed={pressed==='play'} reducedMotion={reduced}><Sprite id="ui_button_gold__2378x1300" x={51} y={buttonY} width={328} height={78} fit="fill"/><Label text="LET'S PLAY" x={215} y={buttonY+50} size={36} bold center outline={2}/></MotionButton>
 <Label text={'By tapping “Let’s Play” you confirm that'} x={215} y={v-107} size={20} center outline={1.5}/><Label text="you 18+ and" x={215} y={v-85} size={20} center outline={1.5}/>
 <Label text="our" x={113.5} y={v-56} size={16} outline={1}/><Label text="Terms Of Use" x={138} y={v-56} size={16} outline={1}/><Label text="&" x={221} y={v-56} size={16} outline={1}/><Label text="Privacy Policy" x={236} y={v-56} size={16} outline={1}/><RoundedRect x={138} y={v-53} width={78} height={1} r={0} color="white"/><RoundedRect x={236} y={v-53} width={80} height={1} r={0} color="white"/>
 </Group>}</Group>}
 </Group></Group></Canvas>
 {phase==='ready'&&<><GameButton testID="lets-play" label="LET'S PLAY" rect={l.toScreen({x:51,y:buttonY,width:328,height:78})} onPress={()=>{void services.audioLifecycle().unlock();setPhase('playing');}} onVisualChange={s=>setPressed(s==='pressed'?'play':'')}/><GameButton label="Terms of Use" rect={l.toScreen({x:134,y:v-78,width:84,height:44})} onPress={()=>void legal('terms')}/><GameButton label="Privacy Policy" rect={l.toScreen({x:232,y:v-78,width:88,height:44})} onPress={()=>void legal('privacy')}/></>}
 {phase==='error'&&<><GameButton label="Retry loading" rect={l.toScreen({x:105,y:197*compact+363,width:220,height:52})} onPress={retry} onVisualChange={s=>setPressed(s==='pressed'?'retry':'')}/><GameButton label="Close and retry loading" rect={l.toScreen({x:318,y:207*compact,width:44,height:44})} onPress={retry}/></>}
 {!!notice&&<View style={{position:'absolute',bottom:insets.bottom+8,left:l.offsetX+20,width:l.playWidth-40,padding:10,backgroundColor:'#102d43',borderRadius:10}}><Text accessibilityRole="alert" style={{color:'white',textAlign:'center'}}>{notice}</Text></View>}
 <View testID="boot-status" accessibilityLabel={phase} style={{position:'absolute',width:1,height:1,opacity:0}}/>
 </View>;
}
