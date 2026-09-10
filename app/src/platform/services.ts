import {createSaveStore} from './createSaveStore';
import {getAudio,getAudioLifecycle} from '../audio/audioService';
import {haptics} from './hapticService';
import {rewardedAds} from './RewardedAds';
export interface AnalyticsPort {start():Promise<void>;event(name:string,parameters:Record<string,string|number|boolean>):void;}
let storage:ReturnType<typeof createSaveStore>|null=null;
let analytics:AnalyticsPort|null=null;
/** One application composition; domain authority and service lifetimes survive
 * screen changes. Optional native adapters are installed explicitly, never
 * replaced with simulated success in production. */
export const services={
 storage:()=>storage??=createSaveStore(),audio:getAudio,audioLifecycle:getAudioLifecycle,haptics,rewarded:rewardedAds,
 analytics:()=>analytics,
 installAnalytics(adapter:AnalyticsPort){if(analytics&&analytics!==adapter)throw Error('Analytics already configured');analytics=adapter;},
};
