import type {GameState} from '../model/GameState';
import type {Clock} from '../ports';
import type {Command,Reduction} from './Dispatcher';
import {reserveRewardedOperation,recordRewardedResult,consumeRewardedOperation,type RewardedResult} from '../rewards/RewardedOperation';
import {grantReward,type RewardCatalog} from '../systems/RewardService';
export const FREE_COINS_GOLD='1000';
export type BeginFreeCoinsAd=Command&{type:'BeginFreeCoinsAd'};
export type RecordFreeCoinsAd=Command&{type:'RecordFreeCoinsAd';result:RewardedResult};
export type ClaimFreeCoins=Command&{type:'ClaimFreeCoins';operationId:string};

export function beginFreeCoinsAd(state:GameState,_command:BeginFreeCoinsAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 const pending=Object.values(state.data.rewardedOperations??{}).find(op=>op.placement==='freeCoins'&&(op.status==='confirmed'||(op.status==='reserved'&&op.sessionId===sessionId&&op.expiresAt>clock.utcMs())));
 if(pending)return {ok:true,events:[]};
 if(!Number.isSafeInteger(state.data.nextInstanceSequence+2))return {ok:false,reason:'INVALID_STATE'};
 const operation=reserveRewardedOperation(state,{id:`ad:${state.data.nextInstanceSequence++}`,placement:'freeCoins',outcomeId:`coins:${state.data.nextInstanceSequence++}`,sessionId},clock);
 return {ok:true,events:[{type:'rewarded.reserved',payload:{operationId:operation.id,placement:operation.placement}}]};
}
export function recordFreeCoinsAd(state:GameState,command:RecordFreeCoinsAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 if(command.result.placement!=='freeCoins'||!recordRewardedResult(state,command.result,sessionId,clock))return {ok:false,reason:'LOCKED'};
 return {ok:true,events:[{type:'rewarded.result',payload:{operationId:command.result.id,status:command.result.status}}]};
}
export function claimFreeCoins(state:GameState,command:ClaimFreeCoins,catalog:RewardCatalog):Reduction {
 const operation=state.data.rewardedOperations?.[command.operationId];
 if(!operation||operation.placement!=='freeCoins')return {ok:false,reason:'LOCKED'};
 const source=`freeCoins:${operation.outcomeId}`,receipt=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(receipt)return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 if(Object.hasOwn(state.data.sourceWatermarks,source)||!consumeRewardedOperation(state,operation.id,'freeCoins',operation.outcomeId))return {ok:false,reason:'LOCKED'};
 const grants=[{kind:'currency' as const,id:'gold',amount:FREE_COINS_GOLD}];
 if(grantReward(state,command.commandId,source,grants,catalog).duplicate)throw Error('Free coins already consumed');
 return {ok:true,events:[{type:'freeCoins.claimed',payload:{operationId:operation.id,grants}},{type:'reward.committed',payload:{source}}]};
}
