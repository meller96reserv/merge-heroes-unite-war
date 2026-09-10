import {test} from 'node:test';import assert from 'node:assert/strict';import {createState} from '../src/model/GameState';import {stages} from '../src/content/StageConfig';import {advanceStage} from '../src/systems/StageSystem';
test('only the matching recorded final death advances; duplicate/stale notifications do nothing',()=>{
 const s=createState({dataVersion:'playable-v1',initialGold:'0',utcMs:0}),clear={encounterId:'stage_1_1:0:0',stageId:'stage_1_1',sequence:0,waveOrdinal:0,commandId:'test'};
 assert.deepEqual(advanceStage(s,clear,stages),[]);s.data.sourceWatermarks['encounter:stage_1_1:0:0:clear']=1;s.data.stages.encounterSequence=1;
 assert.equal(advanceStage(s,clear,stages).at(-1)?.type,'stage.changed');assert.equal(s.data.stages.currentStageId,'stage_1_2');const before=structuredClone(s);assert.deepEqual(advanceStage(s,clear,stages),[]);assert.deepEqual(s,before);
});
test('sequential waves persist their cursor; manual farm stays put; terminal stage is repeatable',()=>{
 const s=createState({dataVersion:'playable-v1',initialGold:'0',utcMs:0,firstStage:'stage_1_2'});
 function clear(){const stageId=s.data.stages.currentStageId,waveOrdinal=s.data.stages.waveOrdinal??0,sequence=s.data.stages.encounterSequence++,encounterId=`${stageId}:${sequence}:${waveOrdinal}`;s.data.sourceWatermarks[`encounter:${encounterId}:clear`]=1;return advanceStage(s,{stageId,waveOrdinal,sequence,encounterId,commandId:`clear:${sequence}`},stages);}
 clear();assert.equal(s.data.stages.waveOrdinal,1);assert.equal(s.data.stages.currentStageId,'stage_1_2');clear();assert.equal(s.data.stages.waveOrdinal,0);assert.equal(s.data.stages.currentStageId,'stage_1_3');
 s.data.stages={currentStageId:'stage_1_2',encounterSequence:2,bossRetryAvailable:true,farmStageId:'stage_1_2'};clear();clear();assert.equal(s.data.stages.currentStageId,'stage_1_2');assert.equal(s.data.stages.bossRetryAvailable,true);
 s.data.stages={currentStageId:'stage_1_6',encounterSequence:4,bossRetryAvailable:false,farmStageId:null};clear();assert.equal(s.data.stages.currentStageId,'stage_1_6');assert.equal(s.data.stages.encounterSequence,5);
});
