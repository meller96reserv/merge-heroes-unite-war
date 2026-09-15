import {activateAutoMerge,setAutoMergeEnabled,type ActivateAutoMerge} from '../core/commands/ActivateAutoMerge';
import {runAutoMerge} from '../core/systems/AutoMergeSystem';
import {advanceAccountProgression,deploymentCapacity} from '../core/systems/AccountProgression';
import {advanceTutorial,finishTutorial,tutorialActive,type FinishTutorial} from '../core/systems/TutorialService';
import type {Command} from '../core/commands/Dispatcher';
import {SaveCoordinator} from '../core/persistence/SaveCoordinator';
import {startDragon,leaveDragon,finishDragon,type StartDragon,type LeaveDragon,type FinishDragon} from '../core/modes/DragonMode';
import {openRelics,type OpenRelics} from '../core/systems/SummonService';
import {reserveDaily,claimDaily,type ReserveDaily,type ClaimDaily} from '../core/commands/ClaimDaily';
import {equipItem,type EquipItem} from '../core/commands/EquipItem';
import {enhanceItem,type EnhanceItem} from '../core/commands/EnhanceItem';
import {upgradeHero,type UpgradeHero} from '../core/commands/UpgradeHero';
import {openEquipment,type OpenEquipment} from '../core/commands/OpenEquipment';
import {sellHero,type SellHero} from '../core/commands/SellHero';
import {buyEquipment,type BuyEquipment} from '../core/commands/BuyEquipment';
import {claimBattleRewards,type ClaimBattleRewards} from '../core/systems/KillRewardService';
import {battleConfig} from '../core/content/BattleConfig';
import {stages,stageEnemies,stageKillRewards,firstClearRewards} from '../core/content/StageConfig';
import {advanceStage} from '../core/systems/StageSystem';
import {claimStageFirstClear} from '../core/systems/StageRewardService';
import {failBoss,retryBoss,type FailBoss,type RetryBoss} from '../core/commands/RetryBoss';
import {unlocks} from '../core/content/UnlockConfig';
import type {AnnounceUnlocks} from '../core/systems/UnlockService';
import {unlockBoard} from '../core/model/Board';
import {Dispatcher,type Reduction} from '../core/commands/Dispatcher';
import {purchaseHero,type PurchaseHero} from '../core/commands/PurchaseHero';import {mergeHeroes,type MergeHeroes} from '../core/commands/MergeHeroes';import {deployHero,type DeployHero} from '../core/commands/DeployHero';import {moveHero,type MoveHero} from '../core/commands/MoveHero';
import {type GameState} from '../core/model/GameState';import {heroes,offers,boardConfig,mergeRules,autoActivation,discoveryRewards,rewardCatalog} from '../core/content/PlayableConfig';
import {discoveryService} from '../core/systems/DiscoveryService';
import {reserveSpin,type ReserveSpin} from '../core/commands/ReserveSpin';
import type {Clock} from '../core/ports';
import {updateSettings,type UpdateSettings} from '../core/commands/UpdateSettings';
import {beginFreeCoinsAd,recordFreeCoinsAd,claimFreeCoins,type BeginFreeCoinsAd,type RecordFreeCoinsAd,type ClaimFreeCoins} from '../core/commands/ClaimFreeCoins';
import {registerStageBoost,reserveStageBoost,beginStageBoostAd,recordStageBoostAd,claimStageBoost,type ReserveStageBoost,type BeginStageBoostAd,type RecordStageBoostAd,type ClaimStageBoost} from '../core/commands/ClaimStageBoost';
import {beginWheelAd,recordWheelAd,completeSpin,dismissEmptySpin,type DismissEmptySpin,type BeginWheelAd,type RecordWheelAd,type CompleteSpin} from '../core/commands/CompleteSpin';
export type SetAutoMerge=Command&{type:'SetAutoMerge';enabled:boolean};
export type GameCommand=SellHero|FinishTutorial|ActivateAutoMerge|SetAutoMerge|StartDragon|LeaveDragon|FinishDragon|OpenRelics|ReserveDaily|ClaimDaily|EquipItem|EnhanceItem|UpgradeHero|OpenEquipment|BuyEquipment|PurchaseHero|MergeHeroes|DeployHero|MoveHero|ClaimBattleRewards|FailBoss|RetryBoss|AnnounceUnlocks|ReserveSpin|BeginWheelAd|RecordWheelAd|CompleteSpin|DismissEmptySpin|UpdateSettings|BeginFreeCoinsAd|RecordFreeCoinsAd|ClaimFreeCoins|ReserveStageBoost|BeginStageBoostAd|RecordStageBoostAd|ClaimStageBoost;
const wallClock:Pick<Clock,'utcMs'>={utcMs:()=>Date.now()};
const discovery=discoveryService(discoveryRewards,rewardCatalog);
const discover:typeof discovery=(state,tier,id)=>{const events=discovery(state,tier,id);const key=`discover_${tier}`;if(!state.data.unlocks.unlockedIds.includes(key))state.data.unlocks.unlockedIds.push(key);return events;};
function reduceCommand(state:GameState,command:GameCommand,clock:Pick<Clock,'utcMs'>,sessionId:string):Reduction {
 switch(command.type){
  case 'SkipTutorial':case 'CompleteTutorial':return finishTutorial(state,command);
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
  case 'SellHero':return sellHero(state,command);
  case 'BuyEquipment':return buyEquipment(state,command);
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
  case 'DismissEmptySpin':return dismissEmptySpin(state,command,rewardCatalog);
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
   if(result.ok&&result.events.length){const newest=state.data.heroes.at(-1)!;if(!tutorialActive(state)&&state.data.heroes.filter(h=>h.deployed).length<deploymentCapacity(state))newest.deployed=true;}
   return result;
  }
  case 'MergeHeroes':return mergeHeroes(state,command,mergeRules,heroes,discover);
  case 'DeployHero':return deployHero(state,command);
  case 'MoveHero':return moveHero(state,command);
 }
}
export function reduceGame(state:GameState,command:GameCommand,clock:Pick<Clock,'utcMs'>=wallClock,sessionId='session:standalone'):Reduction {
 const result=reduceCommand(state,command,clock,sessionId);
 if(result.ok&&result.events.length&&['ActivateAutoMerge','SetAutoMerge','BuyHero','MergeHeroes','MoveHero','DeployHero'].includes(command.type)){
  const now=Math.max(clock.utcMs(),state.data.autoMerge.lastObservedWallUtcMs);state.data.autoMerge.lastObservedWallUtcMs=now;
  const cascade=runAutoMerge(state,command.commandId,now,mergeRules,heroes,discover);if(!cascade.ok)return cascade;result.events.push(...cascade.events);
 }
 if(result.ok&&result.events.length){
  result.events.push(...advanceAccountProgression(state,result.events),...advanceTutorial(state,result.events),...unlocks.evaluate(state));
  const slots=unlockBoard(state,boardConfig);if(slots.length)result.events.push({type:'board.slotsUnlocked',payload:{slots}});
  const capacity=deploymentCapacity(state);
  if(state.data.progression.deploymentCapacity!==capacity){state.data.progression.deploymentCapacity=capacity;result.events.push({type:'deployment.capacityUnlocked',payload:{capacity}});}
 }
 return result;
}
export class GameRuntime {
 readonly dispatcher:Dispatcher<GameCommand>;readonly saves:SaveCoordinator;private sequence=0;
 constructor(state:GameState,commit:(state:GameState)=>Promise<void>,clock:Pick<Clock,'utcMs'>=wallClock,readonly sessionId=`session:${Date.now()}:${Math.random().toString(36).slice(2)}`){this.saves=new SaveCoordinator(commit);this.dispatcher=new Dispatcher(state,(s,c)=>reduceGame(s,c,clock,sessionId),this.saves.commit);}
 async flush(){await this.dispatcher.flush();await this.saves.flush();}
 nextId(kind:string){return `${kind}:${this.dispatcher.getSnapshot().revision}:${++this.sequence}`;}
}
