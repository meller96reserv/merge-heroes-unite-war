import type {RewardedBinding} from '../../../game-core/src/rewards/RewardedOperation';
import type {RewardedAds} from './RewardedAds';
import {validatedRewardedResult,type RewardedNativeModule} from './PlatformRequests';
import {RequestCoordinator} from './RequestCoordinator';
export class StartIoRewarded implements RewardedAds {
 private operations=new RequestCoordinator();private initialized:Promise<boolean>|null=null;
 constructor(private native:RewardedNativeModule|null,private appId:string|undefined,private testMode=false){}
 isShowing=()=>this.operations.busy;
 async show(binding:RewardedBinding){
  const native=this.native;if(!native||!this.appId||!/^\d{5,12}$/.test(this.appId))return 'unavailable' as const;
  try{return await this.operations.run(JSON.stringify(binding),async(signal)=>{
   this.initialized??=native.initialize(this.appId!,this.testMode).catch(()=>false);
   if(!await this.initialized){this.initialized=null;return 'unavailable' as const;}
   if(signal.aborted)return 'cancelled' as const;
   return validatedRewardedResult(await native.showRewarded(binding.id,binding.placement),binding);
  },()=>native.cancelRewarded(binding.id));}catch{return 'failed' as const;}
 }
}
