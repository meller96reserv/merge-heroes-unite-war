import type {GameState} from '../model/GameState';
import type {Clock} from '../ports';
import {reserveRewardedOperation,recordRewardedResult,consumeRewardedOperation,type RewardedResult} from '../rewards/RewardedOperation';
import {wheelSegment} from '../systems/WheelOutcome';
import {grantReward,type RewardCatalog} from '../systems/RewardService';
import type {Command,Reduction} from './Dispatcher';

export type BeginWheelAd=Command&{type:'BeginWheelAd';spinId:string};
export type RecordWheelAd=Command&{type:'RecordWheelAd';result:RewardedResult};
export type CompleteSpin=Command&{type:'CompleteSpin';spinId:string;operationId:string};
export type DismissEmptySpin=Command&{type:'DismissEmptySpin';spinId:string};

/** Empty sectors carry no reward, so require no video. Positive prizes can never use this path. */
export function dismissEmptySpin(state:GameState,command:DismissEmptySpin,catalog:RewardCatalog):Reduction {
 const source=`wheel:${command.spinId}`,receipt=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(receipt)return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 const pending=state.data.wheel.pendingSpin;
 if(!pending||pending.id!==command.spinId||pending.status!=='reserved'||pending.rewardId!==pending.outcomeId||wheelSegment(pending.outcomeId).grants.length||Object.hasOwn(state.data.sourceWatermarks,source))return {ok:false,reason:'LOCKED'};
 pending.status='committed';
 if(grantReward(state,command.commandId,source,[],catalog).duplicate)throw Error('Wheel entitlement already consumed');
 return {ok:true,events:[{type:'wheel.dismissed',payload:{spinId:pending.id}}]};
}

export function beginWheelAd(state:GameState,command:BeginWheelAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 const pending=state.data.wheel.pendingSpin;
 if(!pending||pending.status!=='reserved'||pending.id!==command.spinId) return {ok:false,reason:'LOCKED'};
 const existing=Object.values(state.data.rewardedOperations??{}).find(op=>op.placement==='wheel'&&op.outcomeId===pending.id&&(op.status==='confirmed'||(op.status==='reserved'&&op.sessionId===sessionId&&op.expiresAt>clock.utcMs())));
 if(existing) return {ok:true,events:[]};
 if(!Number.isSafeInteger(state.data.nextInstanceSequence+1)) return {ok:false,reason:'INVALID_STATE'};
 const operation=reserveRewardedOperation(state,{id:`ad:${state.data.nextInstanceSequence++}`,placement:'wheel',outcomeId:pending.id,sessionId},clock);
 return {ok:true,events:[{type:'rewarded.reserved',payload:{operationId:operation.id,placement:'wheel'}}]};
}

export function recordWheelAd(state:GameState,command:RecordWheelAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 const pending=state.data.wheel.pendingSpin;
 if(!pending||pending.status!=='reserved'||command.result.placement!=='wheel'||pending.id!==command.result.outcomeId||!recordRewardedResult(state,command.result,sessionId,clock)) return {ok:false,reason:'LOCKED'};
 return {ok:true,events:[{type:'rewarded.result',payload:{operationId:command.result.id,status:command.result.status}}]};
}

export function completeSpin(state:GameState,command:CompleteSpin,catalog:RewardCatalog):Reduction {
 const source=`wheel:${command.spinId}`,receipt=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(receipt) return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 const pending=state.data.wheel.pendingSpin;
 if(!pending||pending.id!==command.spinId||pending.status!=='reserved'||pending.rewardId!==pending.outcomeId||Object.hasOwn(state.data.sourceWatermarks,source)) return {ok:false,reason:'LOCKED'};
 const outcome=wheelSegment(pending.outcomeId);
 if(!consumeRewardedOperation(state,command.operationId,'wheel',pending.id)) return {ok:false,reason:'LOCKED'};
 pending.status='committed';
 const granted=grantReward(state,command.commandId,source,outcome.grants,catalog);
 if(granted.duplicate) throw Error('Wheel entitlement already consumed');
 return {ok:true,events:[{type:'wheel.claimed',payload:{spinId:pending.id,outcomeId:pending.outcomeId,grants:outcome.grants}},{type:'reward.committed',payload:{source}}]};
}
