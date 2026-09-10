import type {GameState,Snapshot} from '../model/GameState';import {Amount} from '../model/Amount';import type {Command,Reduction} from './Dispatcher';
export type AutoActivation={durationMs:number;costCurrencyId:string|null;costAmount:string;freeActivationPolicy:'developmentGrant'|'disabled'|'verifiedProvider'};
export type ActivateAutoMerge=Command&{type:'ActivateAutoMerge';mode:'development'|'currency';utcMs:number};
export function autoMergeActive(state:Snapshot,utcMs:number):boolean {
 const a=state.data.autoMerge;return Number.isSafeInteger(utcMs)&&utcMs>=0&&a.enabled&&a.entitlementId!==null&&a.expiresAtUtcMs!==null&&Math.max(utcMs,a.lastObservedWallUtcMs)<a.expiresAtUtcMs;
}
export function activateAutoMerge(state:GameState,command:ActivateAutoMerge,config:AutoActivation,developmentAllowed=false):Reduction {
 const source=`auto:${command.commandId}`;
 if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 if(!Number.isSafeInteger(command.utcMs)||command.utcMs<0||!Number.isSafeInteger(config.durationMs)||config.durationMs<=0)return {ok:false,reason:'INVALID_COMMAND'};
 const a=state.data.autoMerge,now=Math.max(command.utcMs,a.lastObservedWallUtcMs);
 if(a.expiresAtUtcMs!==null&&now<a.expiresAtUtcMs)return {ok:false,reason:'LOCKED'};
 if(command.mode==='development') {if(!developmentAllowed||config.freeActivationPolicy!=='developmentGrant')return {ok:false,reason:'LOCKED'};}
 else {
  if(!config.costCurrencyId)return {ok:false,reason:'LOCKED'};
  const funds=Amount.from(state.data.currencies[config.costCurrencyId]??'0'),cost=Amount.from(config.costAmount);
  if(funds.compare(cost)<0)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 }
 if(!Number.isSafeInteger(now+config.durationMs))return {ok:false,reason:'INVALID_STATE'};
 if(command.mode==='currency')state.data.currencies[config.costCurrencyId!]=Amount.from(state.data.currencies[config.costCurrencyId!]??'0').subtract(Amount.from(config.costAmount)).toString();
 state.data.autoMerge={enabled:true,entitlementId:source,expiresAtUtcMs:now+config.durationMs,lastObservedWallUtcMs:now};
 state.data.transactionReceipts.push({id:command.commandId,source,generation:state.generation+1,grants:[]});state.data.sourceWatermarks[source]=state.revision+1;
 return {ok:true,events:[{type:'auto.activated',payload:{expiresAtUtcMs:now+config.durationMs}}]};
}
/** Called within a durable command or checkpoint, never from animation. */
export function setAutoMergeEnabled(state:GameState,enabled:boolean,utcMs:number):Reduction {
 if(!Number.isSafeInteger(utcMs)||utcMs<0)return {ok:false,reason:'INVALID_COMMAND'};
 const a=state.data.autoMerge,now=Math.max(utcMs,a.lastObservedWallUtcMs),eligible=a.entitlementId!==null&&a.expiresAtUtcMs!==null&&now<a.expiresAtUtcMs;
 if(enabled&&!eligible)return {ok:false,reason:'LOCKED'};
 a.lastObservedWallUtcMs=now;a.enabled=enabled&&eligible;
 return {ok:true,events:[{type:'auto.changed',payload:{enabled:a.enabled}}]};
}
