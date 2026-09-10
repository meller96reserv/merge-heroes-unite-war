import {test} from 'node:test';import assert from 'node:assert/strict';
import {GameRuntime} from '../../../app/src/game/GameRuntime';import {BattleRuntime} from '../../../app/src/battle/BattleRuntime';
import {createState} from '../../src/model/GameState';import {heroes} from '../../src/content/PlayableConfig';import {MemorySaveStore,FakeClock} from '../../src/ports';import {TransactionCoordinator} from '../../src/systems/TransactionCoordinator';import {recoverSave} from '../../src/persistence/SaveRecovery';import {BattleSystem} from '../../src/systems/BattleSystem';import {BossSystem} from '../../src/systems/BossSystem';import {spawnEncounter} from '../../src/systems/EncounterSpawner';import {battleConfig} from '../../src/content/BattleConfig';import {stages,stageEnemies} from '../../src/content/StageConfig';
function fixture(tier=4,stage='stage_1_1'){
 const state=createState({dataVersion:'playable-v1',initialGold:'100',utcMs:0,firstStage:stage,unlockedSlots:5}),hero=heroes.instantiate(`hero_tier_${tier}`,'hero1',0);hero.deployed=true;state.data.heroes=[hero];state.data.board[0]!.unitId=hero.id;state.data.progression.discoveredTiers=[tier];
 const store=new MemorySaveStore(),commit=new TransactionCoordinator(store,new FakeClock(10),'test').commit,game=new GameRuntime(state,commit),battle=new BattleRuntime(game);return {state,store,commit,game,battle};
}
async function until(battle:BattleRuntime,predicate:()=>boolean,frame=50,max=10000){for(let i=0;i<max;i++){if(predicate())return;battle.advance(frame);await new Promise(r=>setImmediate(r));}throw Error('Stage simulation stalled');}
test('six-stage chain yields identical durable results at 16/33/100ms cadence; terminal farm never repeats first-clear',async()=>{
 let expected:unknown;
 for(const frame of [16,33,100]){
  const {game,battle,store,commit}=fixture();await until(battle,()=>game.dispatcher.getSnapshot().data.progression.highestClearedOrdinal===6,frame);
  const completed=game.dispatcher.getSnapshot();assert.equal(completed.data.currencies.gold,'310');assert.equal(completed.data.stages.currentStageId,'stage_1_6');assert.equal(completed.data.board.filter(s=>s.unlocked).length,15);assert.equal(completed.data.transactionReceipts.filter(r=>r.source.startsWith('stageFirstClear:')).length,6);
  if(expected)assert.deepEqual(completed,expected);else expected=completed;
  battle.dispose();const recovery=recoverSave(await store.readCandidates('test'),['playable-v1']);if(recovery.status!=='recovered')throw Error('Missing chapter save');const reopened=new GameRuntime(recovery.state,commit),resumed=new BattleRuntime(reopened);
  await until(resumed,()=>reopened.dispatcher.getSnapshot().data.stages.encounterSequence>completed.data.stages.encounterSequence,frame);assert.equal(reopened.dispatcher.getSnapshot().data.currencies.gold,'320');assert.equal(reopened.dispatcher.getSnapshot().data.transactionReceipts.filter(r=>r.source.startsWith('stageFirstClear:')).length,6);resumed.dispose();
 }
});
test('failed boss survives save/reopen; retry creates new identity and rejects an uncommitted stale kill',async()=>{
 const {game,battle,store,commit}=fixture(1,'stage_1_3');await until(battle,()=>game.dispatcher.getSnapshot().data.stages.bossRetryAvailable);battle.dispose();const recovery=recoverSave(await store.readCandidates('test'),['playable-v1']);if(recovery.status!=='recovered')throw Error('Missing boss failure');const reopened=new GameRuntime(recovery.state,commit),resumed=new BattleRuntime(reopened),sequence=reopened.dispatcher.getSnapshot().data.stages.encounterSequence;
 assert.equal((await reopened.dispatcher.dispatch({type:'RetryBoss',commandId:'retry:afterReopen',stageId:'stage_1_3',expectedSequence:sequence})).ok,true);assert.equal(resumed.engine.snapshot().encounter.sequence,sequence+1);assert.equal(resumed.engine.snapshot().hits.length,0);
 const encounterId='stage_1_3:0:0',entityId=`${encounterId}:enemy:0`;assert.equal((await reopened.dispatcher.dispatch({type:'ClaimBattleRewards',commandId:'stale:kill',encounterId,waveOrdinal:0,rewards:[{entityId,encounterId,source:`kill:${encounterId}:${entityId}`,rewardId:'chief'}],cleared:true,rng:[1,2,3,4]})).ok,false);assert.equal(reopened.dispatcher.getSnapshot().data.currencies.gold,'100');resumed.dispose();
});
test('actual scheduled hit wins exactly on boss deadline; the previous tick deadline fails with no first-clear',()=>{
 for(const [timerMs,expected] of [[1150,'won'],[1100,'failed']] as const){
  const {state,battle:unused}=fixture(1);unused.dispose();const enemy={...stageEnemies[0]!,stats:{...stageEnemies[0]!.stats,hp:10}};
  const battle=new BattleSystem(spawnEncounter('stage_1_3',0,0,[{enemyId:enemy.id,count:1}],[enemy],50),battleConfig,[1,2,3,4]);battle.syncRoster(state,heroes);const timer=new BossSystem({...stages.get('stage_1_3').boss!,timerMs},50);
  while(timer.status==='fighting'){battle.step();timer.afterHits(battle.tick,battle.snapshot().encounter.entities.filter(e=>e.side==='enemy').every(e=>e.hp===0));}
  assert.equal(timer.status,expected);assert.equal(battle.pending,expected==='won');assert.equal(state.data.progression.highestClearedOrdinal,0);assert.equal(state.data.currencies.gold,'100');
 }
});
test('active application boundary rejects wrong wave, nonexistent entity, altered reward and incomplete clear',async()=>{
 for(const change of ['wave','entity','reward','incomplete']){
  const {game,battle}=fixture();const encounterId=`stage_1_1:0:${change==='wave'?1:0}`,entityId=`${encounterId}:enemy:${change==='entity'?5:0}`;
  const result=await game.dispatcher.dispatch({type:'ClaimBattleRewards',commandId:`invalid:${change}`,encounterId,waveOrdinal:change==='wave'?1:0,rewards:change==='incomplete'?[]:[{encounterId,entityId,source:`kill:${encounterId}:${entityId}`,rewardId:change==='reward'?'chief':'early_boar'}],cleared:true,rng:[1,2,3,4]});
  assert.equal(result.ok,false);assert.equal(game.dispatcher.getSnapshot().data.currencies.gold,'100');assert.equal(game.dispatcher.getSnapshot().data.stages.encounterSequence,0);battle.dispose();
 }
});
