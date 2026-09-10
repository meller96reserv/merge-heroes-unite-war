import {Platform} from 'react-native';
import * as ExpoHaptics from 'expo-haptics';
import type {HapticDriver} from './Haptics';
export const hapticDriver:HapticDriver={available:Platform.OS==='android'||Platform.OS==='ios',play:async kind=>{
 if(Platform.OS==='android')return ExpoHaptics.performAndroidHapticsAsync(kind==='success'?ExpoHaptics.AndroidHaptics.Confirm:kind==='medium'?ExpoHaptics.AndroidHaptics.Gesture_End:kind==='selection'?ExpoHaptics.AndroidHaptics.Segment_Tick:ExpoHaptics.AndroidHaptics.Context_Click);
 if(kind==='selection')return ExpoHaptics.selectionAsync();
 if(kind==='success')return ExpoHaptics.notificationAsync(ExpoHaptics.NotificationFeedbackType.Success);
 return ExpoHaptics.impactAsync(kind==='medium'?ExpoHaptics.ImpactFeedbackStyle.Medium:ExpoHaptics.ImpactFeedbackStyle.Light);
}};
