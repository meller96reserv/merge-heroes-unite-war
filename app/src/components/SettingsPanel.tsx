import {useState} from 'react';
import {View,Pressable} from 'react-native';
import {Canvas,Group,RoundedRect,Circle,Rect} from '@shopify/react-native-skia';
import {Sprite,Label} from '../rendering/Art';
import {layout,type Insets} from '../ui/ResponsiveLayout';
import {GameButton} from '../ui/GameButton';
import {MotionButton} from '../presentation/UiMotionViews';
import {SliderInput,SliderTrack,useSettingsSlider} from './SettingsSlider';
import type {SettingsPreferences} from '../../../game-core/src/commands/UpdateSettings';
import type {LegalDocument} from '../platform/LegalLinks';
import {getAudio} from '../audio/audioService';
export type SettingsPanelProps={width:number;height:number;insets:Insets;settings:SettingsPreferences;busy:boolean;notice?:string;onChange:(patch:Partial<SettingsPreferences>)=>void;onNotifications:()=>void;onBack:()=>void;onLegal:(document:LegalDocument)=>void};
export function SettingsPanel({width,height,insets,settings,busy,notice,onChange,onNotifications,onBack,onLegal}:SettingsPanelProps){
 const l=layout(width,height,insets),[pressed,setPressed]=useState('');
 const reduced=settings.reducedMotion,soundY=214,musicY=292,vibrationY=354,notificationsY=408;
 const sound=useSettingsSlider(settings.sfxGain,value=>onChange({sfxGain:value}),reduced,busy),music=useSettingsSlider(settings.musicGain,value=>onChange({musicGain:value}),reduced,busy);
 const legalY=548,noticeY=624;
 const noticeLines:string[]=[];for(const word of (notice??'').split(' ')){const last=noticeLines.length-1;if(last<0||noticeLines[last]!.length+word.length>46)noticeLines.push(word);else noticeLines[last]+=' '+word;}
 const toggles=[{key:'haptics',label:'Vibration',y:vibrationY,on:settings.haptics,action:()=>onChange({haptics:!settings.haptics})},{key:'notifications',label:'Notifications',y:notificationsY,on:settings.notifications,action:onNotifications},{key:'analytics',label:'Usage analytics',y:462,on:settings.analyticsConsent===true,action:()=>onChange({analyticsConsent:!settings.analyticsConsent})}] as const;
 const feedback=(name:string)=>(state:string)=>setPressed(state==='pressed'?name:'');
 return <View testID="settings-screen" accessibilityLabel="Settings" style={{width,height,backgroundColor:'#111c37'}}>
 <Canvas pointerEvents="none" style={{width,height}}><Group clip={{x:l.offsetX,y:l.offsetY,width:l.playWidth,height:l.virtualHeight*l.scale}}><Group transform={[{translateX:l.offsetX},{translateY:l.offsetY},{scale:l.scale}]}>
 <Sprite id="background_floating_islands__941x1672" x={0} y={0} width={430} height={l.virtualHeight} fit="cover"/>
 <Group clip={{x:51,y:139,width:328,height:455}}><Sprite id="ui_panel_plain_navy__1126x2000" x={51-328*.0573} y={139-455*.0508} width={328*1.1146} height={455*1.0791} fit="fill"/></Group>
 <Label text="SETTINGS" x={215.5} y={102} size={48} bold center outline={2}/>
 <MotionButton x={38} y={86.5} pressed={pressed==='back'} reducedMotion={reduced}><Group origin={{x:38,y:86.5}} transform={[{rotate:-Math.PI/2}]}><Sprite id="ui_icon_upgrade_arrow__1302x1413" x={18.5} y={65.5} width={39} height={42} fit="fill"/></Group></MotionButton>
 <Label text="Sound" x={82} y={soundY-17} size={20}/><Label text="Music" x={82} y={musicY-17} size={20}/>
 <SliderTrack x={82} y={soundY} value={sound.current}/><SliderTrack x={82} y={musicY} value={music.current}/>
 {toggles.map(t=><Group key={t.key}><Label text={t.label} x={82} y={t.y+6} size={20}/><MotionButton x={327} y={t.y} pressed={pressed===t.key} reducedMotion={reduced}><RoundedRect x={306} y={t.y-11} width={42} height={22} r={11} color="#fff8f8"/><Circle cx={t.on?337:317} cy={t.y} r={7} color={t.on?'#ff8000':'#8f4800'}/></MotionButton></Group>)}
 <Label text="Optional · anonymous gameplay events" x={215} y={490} size={12} small center outline={1}/>
 {(['terms','privacy'] as const).map((document,i)=>{const x=122.5+i*175.5;return <MotionButton key={document} x={x} y={legalY} pressed={pressed===document} reducedMotion={reduced}><Label text={document==='terms'?'Terms Of Use':'Privacy Policy'} x={x} y={legalY+5} size={16} center outline={.5}/><Rect x={x-(i?41:38.5)} y={legalY+7} width={i?82:77} height={1} color="white"/></MotionButton>;})}
 {!!notice&&noticeLines.map((line,i)=><Label key={i} text={line} x={215} y={noticeY+i*18} size={13} small center outline={1} maxWidth={365}/>)}
 </Group></Group></Canvas>
 <SliderInput slider={sound} value={settings.sfxGain} label="Sound" disabled={busy} rect={l.toScreen({x:82,y:soundY-15,width:266,height:44})}/>
 <SliderInput slider={music} value={settings.musicGain} label="Music" disabled={busy} rect={l.toScreen({x:82,y:musicY-15,width:266,height:44})}/>
 {toggles.map(t=>{const r=l.toScreen({x:80,y:t.y-22,width:270,height:44});return <Pressable key={t.key} testID={`settings-${t.key}`} accessible accessibilityRole="switch" accessibilityLabel={t.label} accessibilityState={{checked:t.on,disabled:busy}} aria-checked={t.on} aria-disabled={busy} disabled={busy} onPressIn={()=>setPressed(t.key)} onPressOut={()=>setPressed('')} onPress={()=>{getAudio().emit('ui.primary');t.action();}} style={{position:'absolute',left:r.x,top:r.y,width:r.width,height:r.height}}/>;})}
 <GameButton label="Back from settings" rect={l.toScreen({x:15,y:64,width:46,height:46})} onPress={onBack} onVisualChange={feedback('back')}/>
 <GameButton label="Terms of Use" rect={l.toScreen({x:76,y:legalY-22,width:96,height:44})} onPress={()=>onLegal('terms')} onVisualChange={feedback('terms')}/>
 <GameButton label="Privacy Policy" rect={l.toScreen({x:252,y:legalY-22,width:100,height:44})} onPress={()=>onLegal('privacy')} onVisualChange={feedback('privacy')}/>
 {!!notice&&<View pointerEvents="none" accessible accessibilityRole="alert" accessibilityLabel={notice} style={{position:"absolute",left:l.offsetX+32*l.scale,top:l.offsetY+(noticeY-14)*l.scale,width:365*l.scale,height:noticeLines.length*18*l.scale}}/>}
 </View>;
}
