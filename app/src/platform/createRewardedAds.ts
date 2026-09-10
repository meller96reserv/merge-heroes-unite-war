import {requireOptionalNativeModule} from 'expo-modules-core';
import {Platform} from 'react-native';
import {StartIoRewarded} from './StartIoRewarded';
import type {RewardedNativeModule} from './PlatformRequests';
export const createRewardedAds=()=>new StartIoRewarded(requireOptionalNativeModule<RewardedNativeModule>('MergeNative'),Platform.OS==='android'?process.env.EXPO_PUBLIC_STARTIO_ANDROID_APP_ID:process.env.EXPO_PUBLIC_STARTIO_IOS_APP_ID,__DEV__&&process.env.EXPO_PUBLIC_STARTIO_TEST_ADS==='1');
