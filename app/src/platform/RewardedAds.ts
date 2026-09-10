import {createRewardedAds} from './createRewardedAds';
import type {RewardedBinding,RewardedResult} from '../../../game-core/src/rewards/RewardedOperation';
import {getAudioLifecycle} from '../audio/audioService';
export interface RewardedAds {
 isShowing():boolean;
 show(binding:RewardedBinding):Promise<RewardedResult['status']>;
 readonly testLabel?:string;
}
/** Unconfigured/native inventory and normal Web never simulate completion. */
export const unavailableRewardedAds:RewardedAds={isShowing:()=>false,show:async()=> 'unavailable'};
const adapter:RewardedAds=(__DEV__ ? require('../debug/rewardedFixture').controlledRewardedAds():null)??createRewardedAds();
export const rewardedAds:RewardedAds={isShowing:()=>adapter.isShowing(),testLabel:adapter.testLabel,show:binding=>getAudioLifecycle().during('rewarded-video',()=>adapter.show(binding))};
