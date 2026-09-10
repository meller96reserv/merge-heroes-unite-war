import type {Command,Reduction,Intent} from '../commands/Dispatcher';
import type {GameState} from '../model/GameState';
import type {KillEntitlement} from './DeathSystem';
import {grantReward,type Grant,type RewardCatalog} from './RewardService';
import {SeededRng} from '../ports/SeededRng';
export type ClaimBattleRewards=Command&{type:'ClaimBattleRewards';encounterId:string;waveOrdinal:number;rewards:readonly KillEntitlement[];cleared:boolean;rng:readonly number[]};
export type KillRewards=Readonly<Record<string,readonly Grant[]>>;
/** Internal simulation command. Views cannot supply a reward amount or acknowledge a hit. */
export function claimBattleRewards(state:GameState,c:ClaimBattleRewards,rewards:KillRewards,catalog:RewardCatalog):Reduction {
 const clearSource=`encounter:${c.encounterId}:clear`;
 if(!Number.isSafeInteger(c.waveOrdinal)||c.waveOrdinal<0||c.rewards.length>32||new Set(c.rewards.map(r=>r.entityId)).size!==c.rewards.length)return {ok:false,reason:'INVALID_COMMAND'};
 for(const r of c.rewards)if(r.encounterId!==c.encounterId||r.source!==`kill:${c.encounterId}:${r.entityId}`||!r.entityId.startsWith(`${c.encounterId}:enemy:`)||!Object.hasOwn(rewards,r.rewardId))return {ok:false,reason:'INVALID_COMMAND'};
 const seen=(source:string)=>Object.hasOwn(state.data.sourceWatermarks,source);
 if(c.rewards.every(r=>seen(r.source))&&(!c.cleared||seen(clearSource)))return {ok:true,events:[]};
 const expected=`${state.data.stages.currentStageId}:${state.data.stages.encounterSequence}:${c.waveOrdinal}`;
 if(c.encounterId!==expected||c.waveOrdinal!==(state.data.stages.waveOrdinal??0))return {ok:false,reason:'INVALID_COMMAND'};
 if(c.cleared&&!Number.isSafeInteger(state.data.stages.encounterSequence+1))return {ok:false,reason:'INVALID_STATE'};
 new SeededRng(c.rng);
 const events:Intent[]=[];
 c.rewards.forEach((r,i)=>{
  const result=grantReward(state,`${c.commandId}.kill.${i}`,r.source,rewards[r.rewardId]!,catalog);
  if(!result.duplicate)events.push({type:'kill.rewardCommitted',payload:{source:r.source,grants:result.receipt!.grants}});
 });
 state.data.rng.combatState=[...c.rng];
 if(c.cleared&&!seen(clearSource)){
  grantReward(state,`${c.commandId}.clear`,clearSource,[],catalog);
  state.data.stages.encounterSequence++;
  events.push({type:'battle.boundaryCommitted',payload:{encounterId:c.encounterId,nextSequence:state.data.stages.encounterSequence}});
 }
 return {ok:true,events};
}
