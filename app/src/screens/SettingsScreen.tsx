import {useEffect,useMemo,useRef,useState,useSyncExternalStore} from 'react';
import {AppState} from 'react-native';
import type {GameRuntime} from '../game/GameRuntime';
import {SettingsController} from '../ui/SettingsController';
import {SettingsPanel} from '../components/SettingsPanel';
import type {Insets} from '../ui/ResponsiveLayout';
import {notificationPermission} from '../platform/NotificationPermission';
import {openLegalDocument,type LegalDocument} from '../platform/LegalLinks';
import {getAudio} from '../audio/audioService';
export function SettingsScreen({game,width,height,insets,onBack}:{game:GameRuntime;width:number;height:number;insets:Insets;onBack:()=>void;}){
 const controller=useMemo(()=>new SettingsController(game),[game]),state=useSyncExternalStore(game.dispatcher.subscribe,game.dispatcher.getSnapshot),view=useSyncExternalStore(controller.subscribe,controller.getSnapshot);
 const alive=useRef(true),[requesting,setRequesting]=useState(false),[notice,setNotice]=useState(''),[permission,setPermission]=useState(notificationPermission.current);
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;controller.dispose();};},[controller]);
 useEffect(()=>{const refresh=()=>{setPermission(notificationPermission.current());void notificationPermission.refresh?.().then(p=>{if(alive.current)setPermission(p);});};refresh();const sub=AppState.addEventListener('change',refresh);globalThis.addEventListener?.('focus',refresh);return()=>{sub.remove();globalThis.removeEventListener?.('focus',refresh);};},[]);
 useEffect(()=>{if(view.error)getAudio().emit('ui.error');},[view.error]);
 const notifications=async()=>{
  if(requesting||view.pending)return;
  if(state.data.settings.notifications){setNotice('');await controller.set({notifications:false});return;}
  setRequesting(true);const permission=await notificationPermission.request();
  if(!alive.current)return;setRequesting(false);setPermission(permission);
  if(permission==='granted'){setNotice('');await controller.set({notifications:true});}
  else {getAudio().emit('ui.error');setNotice(permission==='denied'?'Notifications are blocked. You can allow them in system settings.':'Notifications are unavailable on this device.');}
 };
 const legal=async(document:LegalDocument)=>{if(!await openLegalDocument(document)&&alive.current){setNotice('This document is currently unavailable. Please try again later.');getAudio().emit('ui.error');}};
 return <SettingsPanel width={width} height={height} insets={insets} settings={{...state.data.settings,analyticsConsent:state.data.analyticsConsent==='granted',notifications:state.data.settings.notifications&&permission==='granted'}} busy={view.pending>0||requesting} notice={view.error||notice||(state.data.settings.notifications&&permission!=='granted'?'Notifications are blocked by system settings.':'')} onBack={onBack} onChange={patch=>{setNotice('');void controller.set(patch);}} onNotifications={()=>void notifications()} onLegal={document=>void legal(document)}/>;
}
