import type {GameState} from '../core/model/GameState';
import {dataVersion} from '../core/content/PlayableConfig';
import {stages} from '../core/content/StageConfig';

const mapping=['stage_1_1','stage_1_9','stage_1_10','stage_2_4','stage_2_9','stage_2_10','stage_3_4','stage_3_9','stage_3_10'];
/** One bounded content update using the existing A/B commit barrier. No economy reset. */
export function migrateProgress(state:GameState):boolean {
 if(state.dataVersion===dataVersion)return false;
 if(state.dataVersion!=='playable-v1')throw Error('Unsupported stage content');
 const mapped=(id:string)=>mapping[Number(id.replace('stage_1_',''))-1]??'stage_1_1';
 const current=state.data.stages;
 current.currentStageId=mapped(current.currentStageId);
 if(current.farmStageId)current.farmStageId=mapped(current.farmStageId);
 current.waveOrdinal=0;
 current.encounterSequence++;
 const old=state.data.progression.highestClearedOrdinal;
 const highest=old>0?stages.get(mapping[Math.min(9,old)-1]!).ordinal:0;
 state.data.progression.highestClearedOrdinal=highest;
 // Earlier checkpoints were already passed; their replacement cannot pay a
 // second first-clear reward. Old receipts and source watermarks stay intact.
 for(const stage of stages.all())if(stage.ordinal<=highest)state.data.sourceWatermarks['stageFirstClear:'+stage.id]=state.revision;
 state.dataVersion=dataVersion;
 return true;
}
