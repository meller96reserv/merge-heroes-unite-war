import {applicationLifecycle} from '../platform/Lifecycle';
import {useEffect} from 'react';
import {AppState,Platform} from 'react-native';
import {getAudio,getAudioLifecycle} from './audioService';
/** Root lifetime only; app, window and ad focus are independent owners. */
export function useAudioSession(){
 useEffect(()=>{
  const audio=getAudio(),lifecycle=getAudioLifecycle();void audio.initialize();
  const gate=(name:'app'|'focus'|'visibility'|'platformFocus',open:boolean)=>{lifecycle.setGate(name,open);applicationLifecycle.setGate(name,open);};
  const app=(state:string)=>gate('app',state==='active');app(AppState.currentState);
  const sub=AppState.addEventListener('change',app);
  const unlock=()=>{void lifecycle.unlock();},blur=()=>gate('focus',false),focus=()=>gate('focus',true);
  const visibility=()=>gate('visibility',typeof document==='undefined'||document.visibilityState!=='hidden');
  // Android's notification drawer can remove focus without changing AppState.
  const nativeBlur=Platform.OS==='android'?AppState.addEventListener('blur',()=>gate('platformFocus',false)):null;
  const nativeFocus=Platform.OS==='android'?AppState.addEventListener('focus',()=>gate('platformFocus',true)):null;
  globalThis.addEventListener?.('pointerdown',unlock);globalThis.addEventListener?.('keydown',unlock);
  globalThis.addEventListener?.('blur',blur);globalThis.addEventListener?.('focus',focus);
  if(typeof document!=='undefined')document.addEventListener('visibilitychange',visibility);
  visibility();return()=>{sub.remove();nativeBlur?.remove();nativeFocus?.remove();globalThis.removeEventListener?.('pointerdown',unlock);globalThis.removeEventListener?.('keydown',unlock);globalThis.removeEventListener?.('blur',blur);globalThis.removeEventListener?.('focus',focus);if(typeof document!=='undefined')document.removeEventListener('visibilitychange',visibility);lifecycle.dispose();audio.dispose();};
 },[]);
}
