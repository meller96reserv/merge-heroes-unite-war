import { Pressable } from 'react-native';
import type { Rect } from './ResponsiveLayout';
import { buttonVisual, type ButtonState } from './ButtonState';
import {haptics} from '../platform/hapticService';
import {getAudio} from '../audio/audioService';
export function GameButton({rect,label,state='normal',onPress,onInfo,onVisualChange,testID,hapticEvent='ui.primary'}:{rect:Rect;label:string;state?:ButtonState;onPress:()=>void;onInfo?:()=>void;onVisualChange?:(state:ButtonState)=>void;testID?:string;hapticEvent?:'ui.primary'|'ui.tab'}) {
  const visual=buttonVisual(state);
  return <Pressable testID={testID} accessibilityRole="button" accessibilityLabel={label}
    accessibilityState={{disabled:visual.blocked,selected:state==='selected',busy:state==='loading'}}
    disabled={visual.blocked} onPress={()=>{haptics.emit(hapticEvent);getAudio().emit(hapticEvent);if(state==='locked')onInfo?.();else onPress();}}
    onPressIn={()=>onVisualChange?.('pressed')} onPressOut={()=>onVisualChange?.(state)}
    style={{position:'absolute',left:rect.x,top:rect.y,width:rect.width,height:rect.height}} />;
}
