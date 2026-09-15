import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import type {Clock} from '../ports';
import {dailyEligibility,DAILY_GOLD,dailyGold} from '../systems/DailyService';
import {grantReward,type RewardCatalog} from '../systems/RewardService';
import {metaReceipt,priorMeta} from './MetaTransaction';
export type ReserveDaily=Command&{type:'ReserveDaily'};
export type ClaimDaily=Command&{type:'ClaimDaily';period:number};
export function reserveDaily(state:GameState,c:ReserveDaily,clock:Pick<Clock,'utcMs'>):Reduction{
 const source=`dailyReserve:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const eligibility=dailyEligibility(state,clock.utcMs());if(!eligibility.available)return {ok:false,reason:'LOCKED'};
 if(eligibility.pending!==null)return {ok:true,events:[]};
 state.data.daily.pendingPeriod=eligibility.day;state.data.daily.pendingGold=DAILY_GOLD;metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'daily.reserved',payload:{period:eligibility.day}}]};
}
export function claimDaily(state:GameState,c:ClaimDaily,catalog:RewardCatalog):Reduction{
 const source=`daily:${c.period}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 if(!Number.isSafeInteger(c.period)||state.data.daily.pendingPeriod!==c.period||c.period<0||(state.data.daily.lastClaimedPeriod!==null&&c.period<=state.data.daily.lastClaimedPeriod))return {ok:false,reason:'LOCKED'};
 if(!Number.isSafeInteger(state.data.daily.attendanceIndex+1))return {ok:false,reason:'INVALID_STATE'};
 const {receipt}=grantReward(state,c.commandId,source,[{kind:'currency',id:'gold',amount:dailyGold(state)}],catalog);
 state.data.daily.pendingPeriod=null;delete state.data.daily.pendingGold;state.data.daily.lastClaimedPeriod=c.period;state.data.daily.attendanceIndex++;
 return {ok:true,events:[{type:'daily.claimed',payload:{period:c.period,grants:receipt!.grants}},{type:'reward.committed',payload:{source,grants:receipt!.grants}}]};
}
