import type {GameState} from '../model/GameState';
import type {Clock} from '../ports';
import type {Command,Reduction,Intent} from './Dispatcher';
import {SeededRng} from '../ports/SeededRng';
import {reserveRewardedOperation,recordRewardedResult,consumeRewardedOperation,type RewardedResult} from '../rewards/RewardedOperation';
import {grantReward,type RewardCatalog} from '../systems/RewardService';
export type StageBoost=NonNullable<GameState['data']['stageBoosts']>[string];
/** Bonus is additional money. Old unclaimed selections receive the same floor
 * without rerolling their multiplier or changing any already-claimed receipt. */
export function boostBonusBase(earnedGold:string):string{return (BigInt(earnedGold)<1000n?1000n:BigInt(earnedGold)).toString();}
export function stageBoostAmounts(boost:Pick<StageBoost,'baseGold'|'bonusBaseGold'|'multiplier'>&Partial<Pick<StageBoost,'status'>>){
 const base=BigInt(boost.baseGold),multiplier=BigInt(boost.multiplier??1);
 const bonus=boost.bonusBaseGold!==undefined?BigInt(boost.bonusBaseGold)*multiplier:boost.status==='claimed'?base*(multiplier-1n):BigInt(boostBonusBase(boost.baseGold))*multiplier;
 return {bonus:bonus.toString(),total:(base+bonus).toString()};
}
export const BOOST_OFFER_MS=2000;
export type ReserveStageBoost=Command&{type:'ReserveStageBoost';boostId:string};
export type BeginStageBoostAd=Command&{type:'BeginStageBoostAd';boostId:string};
export type RecordStageBoostAd=Command&{type:'RecordStageBoostAd';result:RewardedResult};
export type ClaimStageBoost=Command&{type:'ClaimStageBoost';boostId:string;operationId:string};
const utc=(state:GameState,clock:Pick<Clock,'utcMs'>)=>{const value=clock.utcMs();if(!Number.isSafeInteger(value)||value<Math.max(state.updatedAt,state.lastActiveAt))throw Error('Invalid boost clock');return value;};

/** Internal stage-clear hook only. The already-earned base is derived from
 * receipts of this winning boundary, never from a view or SDK amount. */
export function registerStageBoost(state:GameState,clear:{encounterId:string;stageId:string;commandId:string},clock:Pick<Clock,'utcMs'>):Intent[] {
 const id=`boost:${clear.encounterId}`;
 if(!Object.hasOwn(state.data.sourceWatermarks,`stageAdvance:${clear.encounterId}`)||!Object.hasOwn(state.data.sourceWatermarks,`encounter:${clear.encounterId}:clear`))throw Error('Uncommitted stage clear');
 if(state.data.stageBoosts?.[id])return [];
 const now=utc(state,clock);if(!Number.isSafeInteger(now+BOOST_OFFER_MS))throw Error('Invalid offer expiry');
 let base=0n;
 for(const receipt of state.data.transactionReceipts)if(receipt.id.startsWith(`${clear.commandId}.kill.`)||receipt.id===`${clear.commandId}.firstClear`)for(const grant of receipt.grants)if(grant.kind==='currency'&&grant.id==='gold')base+=BigInt(grant.amount);
 const records=state.data.stageBoosts??{};
 // Expired, unselected offers carry no promised bonus. Reserved prizes remain.
 for(const [key,record] of Object.entries(records))if(record.status==='available'&&record.offerEndsAt<=now)delete records[key];
 const boost:StageBoost={id,encounterId:clear.encounterId,stageId:clear.stageId,baseGold:base.toString(),bonusBaseGold:boostBonusBase(base.toString()),createdAt:now,offerEndsAt:now+BOOST_OFFER_MS,status:'available',multiplier:null};
 records[id]=boost;state.data.stageBoosts=records;
 return [{type:'stageBoost.available',payload:{boostId:id,baseGold:boost.baseGold,offerEndsAt:boost.offerEndsAt}}];
}
export function reserveStageBoost(state:GameState,command:ReserveStageBoost,clock:Pick<Clock,'utcMs'>):Reduction {
 const boost=state.data.stageBoosts?.[command.boostId];if(!boost||boost.status==='claimed')return {ok:false,reason:'LOCKED'};
 if(boost.status==='reserved'){boost.bonusBaseGold??=boostBonusBase(boost.baseGold);return {ok:true,events:[]};}
 const now=utc(state,clock);if(now<boost.createdAt||now>=boost.offerEndsAt)return {ok:false,reason:'LOCKED'};
 // PROPOSED uniform integer outcomes. Product range is required; hidden
 // reference weights are unknown. This draw shares the durable reward stream.
 boost.bonusBaseGold??=boostBonusBase(boost.baseGold);
 const rng=new SeededRng(state.data.rng.rewardState);boost.multiplier=rng.below(10)+1;state.data.rng.rewardState=[...rng.snapshot()];boost.status='reserved';
 return {ok:true,events:[{type:'stageBoost.reserved',payload:{boostId:boost.id,multiplier:boost.multiplier}}]};
}
export function beginStageBoostAd(state:GameState,command:BeginStageBoostAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 const boost=state.data.stageBoosts?.[command.boostId];if(!boost||boost.status!=='reserved'||boost.multiplier===null)return {ok:false,reason:'LOCKED'};
 boost.bonusBaseGold??=boostBonusBase(boost.baseGold);
 const existing=Object.values(state.data.rewardedOperations??{}).find(op=>op.placement==='stageBoost'&&op.outcomeId===boost.id&&(op.status==='confirmed'||(op.status==='reserved'&&op.sessionId===sessionId&&op.expiresAt>clock.utcMs())));
 if(existing)return {ok:true,events:[]};
 if(!Number.isSafeInteger(state.data.nextInstanceSequence+1))return {ok:false,reason:'INVALID_STATE'};
 const op=reserveRewardedOperation(state,{id:`ad:${state.data.nextInstanceSequence++}`,placement:'stageBoost',outcomeId:boost.id,sessionId},clock);
 return {ok:true,events:[{type:'rewarded.reserved',payload:{operationId:op.id,placement:op.placement}}]};
}
export function recordStageBoostAd(state:GameState,command:RecordStageBoostAd,sessionId:string,clock:Pick<Clock,'utcMs'>):Reduction {
 const boost=state.data.stageBoosts?.[command.result.outcomeId];
 if(!boost||boost.status!=='reserved'||command.result.placement!=='stageBoost'||!recordRewardedResult(state,command.result,sessionId,clock))return {ok:false,reason:'LOCKED'};
 return {ok:true,events:[{type:'rewarded.result',payload:{operationId:command.result.id,status:command.result.status}}]};
}
export function claimStageBoost(state:GameState,command:ClaimStageBoost,catalog:RewardCatalog):Reduction {
 const boost=state.data.stageBoosts?.[command.boostId],source=`stageBoost:${command.boostId}`,receipt=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(receipt)return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 if(!boost||boost.status!=='reserved'||boost.multiplier===null||Object.hasOwn(state.data.sourceWatermarks,source))return {ok:false,reason:'LOCKED'};
 if(!consumeRewardedOperation(state,command.operationId,'stageBoost',boost.id))return {ok:false,reason:'LOCKED'};
 // Also covers a legacy confirmed video recovered directly into Claim.
 boost.bonusBaseGold??=boostBonusBase(boost.baseGold);
 const {total,bonus}=stageBoostAmounts(boost),grants=[{kind:'currency' as const,id:'gold',amount:bonus.toString()}];
 boost.status='claimed';if(grantReward(state,command.commandId,source,grants,catalog).duplicate)throw Error('Stage boost already consumed');
 return {ok:true,events:[{type:'stageBoost.claimed',payload:{boostId:boost.id,multiplier:boost.multiplier,totalGold:total.toString(),grants}},{type:'reward.committed',payload:{source}}]};
}
