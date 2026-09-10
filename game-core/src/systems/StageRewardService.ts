import type {GameState} from '../model/GameState';import type {StageDefinition} from '../model/Stage';import type {Intent} from '../commands/Dispatcher';import {grantReward,type Grant,type RewardCatalog} from './RewardService';
/** Separate from repeatable kill tokens; highest clear never moves backwards. */
export function claimStageFirstClear(state:GameState,stage:StageDefinition,commandId:string,rewards:Readonly<Record<string,readonly Grant[]>>,catalog:RewardCatalog):Intent[]{
 if(stage.firstClearRewardId!==null&&!Object.hasOwn(rewards,stage.firstClearRewardId))throw Error('Missing first-clear reward');
 const grants=stage.firstClearRewardId===null?[]:rewards[stage.firstClearRewardId]!,source=`stageFirstClear:${stage.id}`;
 const result=grantReward(state,`${commandId}.firstClear`,source,grants,catalog);
 state.data.progression.highestClearedOrdinal=Math.max(state.data.progression.highestClearedOrdinal,stage.ordinal);
 return result.duplicate?[]:[{type:'stage.firstClearCommitted',payload:{stageId:stage.id,ordinal:stage.ordinal,source,grants:result.receipt!.grants}}];
}
