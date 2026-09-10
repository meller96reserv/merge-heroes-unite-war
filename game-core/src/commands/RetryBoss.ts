import type {Command,Reduction} from './Dispatcher';import type {GameState} from '../model/GameState';import type {StageCatalog} from '../model/Stage';import {grantReward,type RewardCatalog} from '../systems/RewardService';import {SeededRng} from '../ports/SeededRng';
export type FailBoss=Command&{type:'FailBoss';stageId:string;sequence:number;waveOrdinal:number;tick:number;rng:readonly number[]};
export type RetryBoss=Command&{type:'RetryBoss';stageId:string;expectedSequence:number};
export function failBoss(state:GameState,c:FailBoss,stages:StageCatalog,catalog:RewardCatalog,stepMs:number):Reduction {
 const stage=stages.get(c.stageId),encounterId=`${c.stageId}:${c.sequence}:${c.waveOrdinal}`,source=`bossFailed:${encounterId}`,current=state.data.stages;
 if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 if(!stage.boss||current.currentStageId!==stage.id||current.encounterSequence!==c.sequence||(current.waveOrdinal??0)!==c.waveOrdinal||!Number.isSafeInteger(c.tick)||c.tick<Math.ceil(stage.boss.timerMs/stepMs))return {ok:false,reason:'INVALID_COMMAND'};
 if(!Number.isSafeInteger(current.encounterSequence+1))return {ok:false,reason:'INVALID_STATE'};
 new SeededRng(c.rng);grantReward(state,`${c.commandId}.failure`,source,[],catalog);
 state.data.rng.combatState=[...c.rng];
 state.data.stages={currentStageId:stage.boss.retryPolicy==='automatic'?stage.id:stage.boss.farmStageId,encounterSequence:c.sequence+1,waveOrdinal:0,bossRetryAvailable:stage.boss.retryPolicy==='manual',farmStageId:stage.boss.farmStageId};
 return {ok:true,events:[{type:'boss.failed',payload:{stageId:stage.id,encounterId,farmStageId:stage.boss.farmStageId}}]};
}
export function retryBoss(state:GameState,c:RetryBoss,stages:StageCatalog,catalog:RewardCatalog):Reduction {
 const source=`bossRetry:${c.stageId}:${c.expectedSequence}`;
 if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 const stage=stages.get(c.stageId),current=state.data.stages;
 if(!stage.boss||stage.boss.retryPolicy!=='manual'||!current.bossRetryAvailable||current.farmStageId!==stage.boss.farmStageId||current.currentStageId!==stage.boss.farmStageId||current.encounterSequence!==c.expectedSequence)return {ok:false,reason:'INVALID_COMMAND'};
 if(!Number.isSafeInteger(c.expectedSequence+1))return {ok:false,reason:'INVALID_STATE'};
 grantReward(state,`${c.commandId}.retry`,source,[],catalog);
 state.data.stages={currentStageId:stage.id,encounterSequence:c.expectedSequence+1,waveOrdinal:0,bossRetryAvailable:false,farmStageId:stage.boss.farmStageId};
 return {ok:true,events:[{type:'boss.retryStarted',payload:{stageId:stage.id,sequence:state.data.stages.encounterSequence}}]};
}
