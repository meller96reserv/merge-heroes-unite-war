import {useEffect,type ReactNode} from 'react';
import {BackHandler,View,StyleSheet} from 'react-native';
/** In-tree overlay keeps Skia surfaces in the focused application window.
 * A separate Android Dialog window can suspend the shared Skia renderer. */
export function GameModal({visible,onRequestClose,children}:{visible:boolean;transparent?:boolean;animationType?:string;onRequestClose:()=>void;children:ReactNode}){
 useEffect(()=>{
  if(!visible)return;const back=()=>{onRequestClose();return true;};
  const subscription=BackHandler.addEventListener('hardwareBackPress',back);
  const key=(event:Event)=>{if((event as KeyboardEvent).key==='Escape'){event.preventDefault();onRequestClose();}};
  globalThis.addEventListener?.('keydown',key);return()=>{subscription.remove();globalThis.removeEventListener?.('keydown',key);};
 },[visible,onRequestClose]);
 if(!visible)return null;
 return <View collapsable={false} accessibilityViewIsModal style={[StyleSheet.absoluteFill,{zIndex:100}]}>{children}</View>;
}
