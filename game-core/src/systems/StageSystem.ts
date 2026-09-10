import type {GameState} from '../model/GameState';
import type {StageCatalog,StageDefinition} from '../model/Stage';
import type {Intent} from '../commands/Dispatcher';
export type ClearedWave={encounterId:string;stageId:string;sequence:number;waveOrdinal:number;commandId:string};
/** Runs inside the same private candidate as the kill/clear receipt, before durable installation. */
export function advanceStage(state:GameState,clear:ClearedWave,catalog:StageCatalog,onFirstClear?:(state:GameState,stage:StageDefinition,commandId:string)=>Intent[]):Intent[]{
 const identity=`${clear.stageId}:${clear.sequence}:${clear.waveOrdinal}`,watermarks=state.data.sourceWatermarks,key=`stageAdvance:${identity}`;
 if(clear.encounterId!==identity||Object.hasOwn(watermarks,key)||!Object.hasOwn(watermarks,`encounter:${identity}:clear`))return [];
 const current=state.data.stages;
 if(current.currentStageId!==clear.stageId||current.encounterSequence!==clear.sequence+1||(current.waveOrdinal??0)!==clear.waveOrdinal)return [];
 const stage=catalog.get(clear.stageId);
 if(!Number.isInteger(clear.waveOrdinal)||clear.waveOrdinal<0||clear.waveOrdinal>=stage.waves.length)throw Error('Invalid cleared wave');
 const events:Intent[]=[];
 if(clear.waveOrdinal+1<stage.waves.length){
  current.waveOrdinal=clear.waveOrdinal+1;
  events.push({type:'wave.changed',payload:{stageId:stage.id,waveOrdinal:current.waveOrdinal}});
 }else{
  if(onFirstClear)events.push(...onFirstClear(state,stage,clear.commandId));
  // RewardService replaces data atomically, so reacquire stage state afterwards.
  const next=state.data.stages;
  next.waveOrdinal=0;
  const farming=next.bossRetryAvailable&&next.farmStageId===stage.id;
  next.currentStageId=farming?stage.id:stage.nextStageId??stage.id;
  if(stage.boss){next.bossRetryAvailable=false;next.farmStageId=null;}
  events.push({type:'stage.cleared',payload:{stageId:stage.id,ordinal:stage.ordinal,farming}});
  if(next.currentStageId!==stage.id)events.push({type:'stage.changed',payload:{stageId:next.currentStageId}});
 }
 state.data.sourceWatermarks[key]=state.revision+1;
 return events;
}
