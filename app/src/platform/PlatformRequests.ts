import type {RewardedBinding,RewardedResult} from '../../../game-core/src/rewards/RewardedOperation';
export type NativeRewardedResult={operationId:string;placement:string;status:RewardedResult['status'];completed:boolean};
export interface RewardedNativeModule {
 initialize(appId:string,testMode:boolean):Promise<boolean>;
 showRewarded(operationId:string,placement:string):Promise<unknown>;
 cancelRewarded(operationId:string):void;
}
/** Dismissal, malformed or wrong-operation results are never reward authority. */
export function validatedRewardedResult(value:unknown,binding:RewardedBinding):RewardedResult['status']{
 if(!value||typeof value!=='object')return 'failed';const r=value as Partial<NativeRewardedResult>;
 if(r.operationId!==binding.id||r.placement!==binding.placement)return 'failed';
 if(r.status==='completed')return r.completed===true?'completed':'failed';
 return r.status==='cancelled'||r.status==='unavailable'||r.status==='failed'?r.status:'failed';
}
