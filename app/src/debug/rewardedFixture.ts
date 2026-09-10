import type {RewardedAds} from '../platform/RewardedAds';
import type {RewardedResult} from '../../../game-core/src/rewards/RewardedOperation';
/** Explicit DEV-only service fixture. No SDK, no production query switch. */
export function controlledRewardedAds():RewardedAds|null {
 if(!__DEV__||typeof location==='undefined')return null;
 const mode=new URLSearchParams(location.search).get('rewarded');
 if(!['completed','cancelled','failed','unavailable'].includes(mode??''))return null;
 let showing=false;
 return {testLabel:`REWARDED TEST: ${mode}`,isShowing:()=>showing,show:async()=>{
  showing=true;
  try{await new Promise(resolve=>setTimeout(resolve,500));return mode as RewardedResult['status'];}finally{showing=false;}
 }};
}
