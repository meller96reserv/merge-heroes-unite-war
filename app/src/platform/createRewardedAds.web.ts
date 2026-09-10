import type {RewardedAds} from './RewardedAds';
export const createRewardedAds=():RewardedAds=>({isShowing:()=>false,show:async()=> 'unavailable'});
