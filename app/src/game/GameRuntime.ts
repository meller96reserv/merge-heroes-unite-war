import {activateAutoMerge,setAutoMergeEnabled,type ActivateAutoMerge} from '../../../game-core/src/commands/ActivateAutoMerge';
import {runAutoMerge} from '../../../game-core/src/systems/AutoMergeSystem';
import type {Command} from '../../../game-core/src/commands/Dispatcher';
import {SaveCoordinator} from '../../../game-core/src/persistence/SaveCoordinator';
import {startDragon,leaveDragon,finishDragon,type StartDragon,type LeaveDragon,type FinishDragon} from '../../../game-core/src/modes/DragonMode';
import {openRelics,type OpenRelics} from '../../../game-core/src/systems/SummonService';
import {reserveDaily,claimDaily,type ReserveDaily,type ClaimDaily} from '../../../game-core/src/commands/ClaimDaily';
import {equipItem,type EquipItem} from '../../../game-core/src/commands/EquipItem';
import {enhanceItem,type EnhanceItem} from '../../../game-core/src/commands/EnhanceItem';
import {upgradeHero,type UpgradeHero} from '../../../game-core/src/commands/UpgradeHero';
import {openEquipment,type OpenEquipment} from '../../../game-core/src/commands/OpenEquipment';
import {claimBattleRewards,type ClaimBattleRewards} from '../../../game-core/src/systems/KillRewardService';
import {battleConfig} from '../../../game-core/src/content/BattleConfig';
import {stages,stageEnemies,stageKillRewards,firstClearRewards} from '../../../game-core/src/content/StageConfig';
import {advanceStage} from '../../../game-core/src/systems/StageSystem';
import {claimStageFirstClear} from '../../../game-core/src/systems/StageRewardService';
import {failBoss,retryBoss,type FailBoss,type RetryBoss} from '../../../game-core/src/commands/RetryBoss';
import {unlocks} from '../../../game-core/src/content/UnlockConfig';
import type {AnnounceUnlocks} from '../../../game-core/src/systems/UnlockService';
import {unlockBoard} from '../../../game-core/src/model/Board';
import {Dispatcher,type Reduction} from '../../../game-core/src/commands/Dispatcher';
import {purchaseHero,type PurchaseHero} from '../../../game-core/src/commands/PurchaseHero';import {mergeHeroes,type MergeHeroes} from '../../../game-core/src/commands/MergeHeroes';import {deployHero,type DeployHero} from '../../../game-core/src/commands/DeployHero';import {moveHero,type MoveHero} from '../../../game-core/src/commands/MoveHero';
import {type GameState} from '../../../game-core/src/model/GameState';import {heroes,offers,boardConfig,mergeRules,autoActivation,discoveryRewards,rewardCatalog} from '../../../game-core/src/content/PlayableConfig';
import {discoveryService} from '../../../game-core/src/systems/DiscoveryService';
import {reserveSpin,type ReserveSpin} from '../../../game-core/src/commands/ReserveSpin';
import type {Clock} from '../../../game-core/src/ports';
import {updateSettings,type UpdateSettings} from '../../../game-core/src/commands/UpdateSettings';
import {beginFreeCoinsAd,recordFreeCoinsAd,claimFreeCoins,type BeginFreeCoinsAd,type RecordFreeCoinsAd,type ClaimFreeCoins} from '../../../game-core/src/commands/ClaimFreeCoins';
import {registerStageBoost,reserveStageBoost,beginStageBoostAd,recordStageBoostAd,claimStageBoost,type ReserveStageBoost,type BeginStageBoostAd,type RecordStageBoostAd,type ClaimStageBoost} from '../../../game-core/src/commands/ClaimStageBoost';
import {beginWheelAd,recordWheelAd,completeSpin,type BeginWheelAd,type RecordWheelAd,type CompleteSpin} from '../../../game-core/src/commands/CompleteSpin';
export type SetAutoMerge=Command&{type:'SetAutoMerge';enabled:boolean};
export type GameCommand=ActivateAutoMerge|SetAutoMerge|StartDragon|LeaveDragon|FinishDragon|OpenRelics|ReserveDaily|ClaimDaily|EquipItem|EnhanceItem|UpgradeHero|OpenEquipment|PurchaseHero|MergeHeroes|DeployHero|MoveHero|ClaimBattleRewards|FailBoss|RetryBoss|AnnounceUnlocks|ReserveSpin|BeginWheelAd|RecordWheelAd|CompleteSpin|UpdateSettings|BeginFreeCoinsAd|RecordFreeCoinsAd|ClaimFreeCoins|ReserveStageBoost|BeginStageBoostAd|RecordStageBoostAd|ClaimStageBoost;
const wallClock:Pick<Clock,'utcMs'>={utcMs:()=>Date.now()};
const discovery=discoveryService(discoveryRewards,rewardCatalog);
const discover:typeof discovery=(state,tier,id)=>{const events=discovery(state,tier,id);const key=`discover_${tier}`;if(!state.data.unlocks.unlockedIds.includes(key))state.data.unlocks.unlockedIds.push(key);return events;};
function reduceCommand(state:GameState,command:GameCommand,clock:Pick<Clock,'utcMs'>,sessionId:string):Reduction {
 switch(command.type){
  case 'ActivateAutoMerge':return activateAutoMerge(state,{...command,utcMs:clock.utcMs()},autoActivation);
  case 'SetAutoMerge':return setAutoMergeEnabled(state,command.enabled,clock.utcMs());
  case 'StartDragon':return startDragon(state,command);
  case 'LeaveDragon':return leaveDragon(state,command);
  case 'FinishDragon':return finishDragon(state,command,rewardCatalog,clock,battleConfig.stepMs);
  case 'OpenRelics':return openRelics(state,command);
  case 'ReserveDaily':return reserveDaily(state,command,clock);
  case 'ClaimDaily':return claimDaily(state,command,rewardCatalog);
  case 'EquipItem':return equipItem(state,command);
  case 'EnhanceItem':return enhanceItem(state,command);
  case 'UpgradeHero':return upgradeHero(state,command,heroes);
  case 'OpenEquipment':return openEquipment(state,command);
  case 'ReserveStageBoost':return reserveStageBoost(state,command,clock);
  case 'BeginStageBoostAd':return beginStageBoostAd(state,command,sessionId,clock);
  case 'RecordStageBoostAd':return recordStageBoostAd(state,command,sessionId,clock);
  case 'ClaimStageBoost':return claimStageBoost(state,command,rewardCatalog);
  case 'BeginFreeCoinsAd':return beginFreeCoinsAd(state,command,sessionId,clock);
  case 'RecordFreeCoinsAd':return recordFreeCoinsAd(state,command,sessionId,clock);
  case 'ClaimFreeCoins':return claimFreeCoins(state,command,rewardCatalog);
  case 'UpdateSettings':return updateSettings(state,command);
  case 'ReserveSpin':return reserveSpin(state,command,clock);
  case 'BeginWheelAd':return beginWheelAd(state,command,sessionId,clock);
  case 'RecordWheelAd':return recordWheelAd(state,command,sessionId,clock);
  case 'CompleteSpin':return completeSpin(state,command,rewardCatalog);
  case 'ClaimBattleRewards':{
   const stageId=state.data.stages.currentStageId,sequence=state.data.stages.encounterSequence;
   const waveOrdinal=state.data.stages.waveOrdinal??0,encounterId=`${stageId}:${sequence}:${waveOrdinal}`;
   if(command.encounterId===encounterId){
    const wave=stages.get(stageId).waves[waveOrdinal];if(!wave)return {ok:false,reason:'INVALID_STATE'};
    const enemy=stageEnemies.find(e=>e.id===wave.enemyId)!;
    const expectedIds=Array.from({length:wave.count},(_,i)=>`${encounterId}:enemy:${i}`);
    if(command.rewards.some(r=>!expectedIds.includes(r.entityId)||r.rewardId!==enemy.rewardId))return {ok:false,reason:'INVALID_COMMAND'};
    if(command.cleared&&enemy.rewardId&&expectedIds.some(id=>!command.rewards.some(r=>r.entityId===id)&&!Object.hasOwn(state.data.sourceWatermarks,`kill:${encounterId}:${id}`)))return {ok:false,reason:'INVALID_COMMAND'};
   }
   const result=claimBattleRewards(state,command,stageKillRewards,rewardCatalog);
   if(result.ok&&result.events.some(e=>e.type==='battle.boundaryCommitted')){
    result.events.push(...advanceStage(state,{stageId,sequence,encounterId:command.encounterId,waveOrdinal:command.waveOrdinal,commandId:command.commandId},stages,(s,stage,id)=>claimStageFirstClear(s,stage,id,firstClearRewards,rewardCatalog)));
    if(result.events.some(e=>e.type==='stage.cleared'))result.events.push(...registerStageBoost(state,{encounterId:command.encounterId,stageId,commandId:command.commandId},clock));
   }
   return result;
  }
  case 'FailBoss':return failBoss(state,command,stages,rewardCatalog,battleConfig.stepMs);
  case 'RetryBoss':return retryBoss(state,command,stages,rewardCatalog);
  case 'AnnounceUnlocks':return unlocks.announce(state,command);
  case 'BuyHero':{
   const result=purchaseHero(state,command,offers,heroes);
   if(result.ok&&result.events.length){const newest=state.data.heroes.at(-1)!;if(state.data.heroes.filter(h=>h.deployed).length<boardConfig.deploymentCap)newest.deployed=true;}
   return result;
  }
  case 'MergeHeroes':return mergeHeroes(state,command,mergeRules,heroes,discover);
  case 'DeployHero':return deployHero(state,command,boardConfig.deploymentCap);
  case 'MoveHero':return moveHero(state,command);
 }
}
export function reduceGame(state:GameState,command:GameCommand,clock:Pick<Clock,'utcMs'>=wallClock,sessionId='session:standalone'):Reduction {
 const result=reduceCommand(state,command,clock,sessionId);
 if(result.ok&&result.events.length&&['ActivateAutoMerge','SetAutoMerge','BuyHero','MergeHeroes','MoveHero','DeployHero'].includes(command.type)){
  const now=Math.max(clock.utcMs(),state.data.autoMerge.lastObservedWallUtcMs);state.data.autoMerge.lastObservedWallUtcMs=now;
  const cascade=runAutoMerge(state,command.commandId,now,mergeRules,heroes,discover);if(!cascade.ok)return cascade;result.events.push(...cascade.events);
 }
 if(result.ok&&result.events.length){result.events.push(...unlocks.evaluate(state));const slots=unlockBoard(state,boardConfig);if(slots.length)result.events.push({type:'board.slotsUnlocked',payload:{slots}});}
 return result;
}
export class GameRuntime {
 readonly dispatcher:Dispatcher<GameCommand>;readonly saves:SaveCoordinator;private sequence=0;
 constructor(state:GameState,commit:(state:GameState)=>Promise<void>,clock:Pick<Clock,'utcMs'>=wallClock,readonly sessionId=`session:${Date.now()}:${Math.random().toString(36).slice(2)}`){this.saves=new SaveCoordinator(commit);this.dispatcher=new Dispatcher(state,(s,c)=>reduceGame(s,c,clock,sessionId),this.saves.commit);}
 async flush(){await this.dispatcher.flush();await this.saves.flush();}
 nextId(kind:string){return `${kind}:${this.dispatcher.getSnapshot().revision}:${++this.sequence}`;}
}
