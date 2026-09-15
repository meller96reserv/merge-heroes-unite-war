import type {Snapshot,GameState} from '../model/GameState';
export const DAILY_MS=86400000,DAILY_GOLD='5000';
export function dailyPeriod(utc:number){if(!Number.isSafeInteger(utc)||utc<0)throw Error('Invalid daily clock');return Math.floor(utc/DAILY_MS);}
export function dailyEligibility(state:Snapshot|GameState,utc:number){
 const day=dailyPeriod(utc),last=state.data.daily.lastClaimedPeriod,pending=state.data.daily.pendingPeriod;
 const available=pending!=null||(utc>=Math.max(state.updatedAt,state.lastActiveAt)&&(last===null||day>last));
 return {day,pending:pending??null,available,nextAt:((last??day)+1)*DAILY_MS};
}

/** Old pending entitlements retain the amount promised before v3. */
export function dailyGold(state:Snapshot|GameState):string{return state.data.daily.pendingPeriod!=null?state.data.daily.pendingGold??'1000':DAILY_GOLD;}
