import type {GameState} from '../model/GameState';
import type {Command,Reduction} from '../commands/Dispatcher';
import type {Clock} from '../ports';
import {grantReward,type RewardCatalog,type Grant} from '../systems/RewardService';
import {priorMeta,metaReceipt} from '../commands/MetaTransaction';
import {SeededRng} from '../ports/SeededRng';
import {BOOST_OFFER_MS,boostBonusBase} from '../commands/ClaimStageBoost';
/** PROPOSED dragon-v3 pacing: supplied identities/rewards, shipped challenge HP.
 * TASK-0229: Shadow HP scales the former three-hero budget to two active heroes. */
export const dragons=[
 {id:'infernal',name:'Infernal Dragon',hp:900000,gold:'5000',gems:'100',orbs:'250',repeatGold:'100',repeatGems:'5',repeatOrbs:'5',visualId:'boss_infernal_dragon__1968x1659',banner:'background_dungeon_infernal_strip__2172x724'},
 {id:'frost',name:'Frost Dragon',hp:3600000,gold:'15000',gems:'250',orbs:'750',repeatGold:'200',repeatGems:'10',repeatOrbs:'15',visualId:'boss_frost_dragon__1995x1925',banner:'background_dungeon_frost_strip__2172x724'},
 {id:'shadow',name:'Shadow Dragon',hp:5333333,gold:'30000',gems:'500',orbs:'1500',repeatGold:'300',repeatGems:'15',repeatOrbs:'30',visualId:'boss_shadow_dragon__1974x1657',banner:'background_dungeon_shadow_bright_strip__2172x724'},
] as const;
export const DRAGON_TIMER_MS=45000;
export const dragonDefinition=(id:string)=>dragons.find(d=>d.id===id);
export function dragonReward(id:string,clears:number){const d=dragonDefinition(id);if(!d)throw Error('Unknown dragon');return clears>0?{gold:d.repeatGold,gems:d.repeatGems,orbs:d.repeatOrbs}:{gold:d.gold,gems:d.gems,orbs:d.orbs};}
export type StartDragon=Command&{type:'StartDragon';dragonId:string};
export type LeaveDragon=Command&{type:'LeaveDragon';attemptId:string};
/** Internal simulation settlement; UI can only start/leave, never submit a win. */
export type FinishDragon=Command&{type:'FinishDragon';attemptId:string;outcome:'won'|'failed';tick:number;defeated:boolean;rng:readonly number[]};
export function startDragon(state:GameState,c:StartDragon):Reduction{
 const source=`dragonStart:${c.dragonId}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const definition=dragonDefinition(c.dragonId);if(!definition)return {ok:false,reason:'INVALID_COMMAND'};
 if(state.data.dungeon?.active||!state.data.heroes.some(h=>h.deployed))return {ok:false,reason:'LOCKED'};
 const dungeon=state.data.dungeon??{sequence:0,active:null,clears:{},lastResult:null};if(!Number.isSafeInteger(dungeon.sequence+1))return {ok:false,reason:'INVALID_STATE'};
 dungeon.sequence++;const active={id:`dragon:${dungeon.sequence}`,dragonId:definition.id,sequence:dungeon.sequence};dungeon.active=active;dungeon.lastResult=null;state.data.dungeon=dungeon;
 metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'dungeon.started',payload:{attemptId:active.id,dragonId:c.dragonId}}]};
}
export function leaveDragon(state:GameState,c:LeaveDragon):Reduction{
 const source=`dragonLeave:${c.attemptId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const dungeon=state.data.dungeon,active=dungeon?.active;if(!dungeon||!active||active.id!==c.attemptId)return {ok:false,reason:'LOCKED'};
 dungeon.lastResult={id:active.id,dragonId:active.dragonId,outcome:'abandoned'};dungeon.active=null;metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'dungeon.left',payload:{attemptId:c.attemptId}}]};
}
export function finishDragon(state:GameState,c:FinishDragon,catalog:RewardCatalog,clock:Pick<Clock,'utcMs'>,stepMs:number):Reduction{
 const source=`dragonFinish:${c.attemptId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const dungeon=state.data.dungeon,active=dungeon?.active,definition=active&&dragonDefinition(active.dragonId);
 if(!dungeon||!active||!definition||active.id!==c.attemptId)return {ok:false,reason:'LOCKED'};
 if(!Number.isSafeInteger(c.tick)||c.tick<1||!Number.isSafeInteger(stepMs)||stepMs<1||!['won','failed'].includes(c.outcome))return {ok:false,reason:'INVALID_COMMAND'};
 if(c.outcome==='won'?(!c.defeated||c.tick*stepMs>DRAGON_TIMER_MS):(c.defeated||c.tick*stepMs<DRAGON_TIMER_MS))return {ok:false,reason:'INVALID_COMMAND'};
 new SeededRng(c.rng);const now=clock.utcMs();if(!Number.isSafeInteger(now)||now<0)return {ok:false,reason:'INVALID_STATE'};
 const reward=dragonReward(definition.id,dungeon.clears[definition.id]??0);
 const grants:Grant[]=c.outcome==='won'?[{kind:'currency',id:'gold',amount:reward.gold},{kind:'currency',id:'gem',amount:reward.gems},{kind:'currency',id:'orb',amount:reward.orbs}]:[];
 if(c.outcome==='won'&&!Number.isSafeInteger((dungeon.clears[definition.id]??0)+1))return {ok:false,reason:'INVALID_STATE'};
 grantReward(state,c.commandId,source,grants,catalog);
 const next=state.data.dungeon!;next.active=null;next.lastResult={id:active.id,dragonId:definition.id,outcome:c.outcome};if(c.outcome==='won')next.clears[definition.id]=(next.clears[definition.id]??0)+1;
 state.data.rng.combatState=[...c.rng];
 const events=[{type:c.outcome==='won'?'dungeon.completed':'dungeon.failed',payload:{attemptId:active.id,stageId:definition.name,grants}}];
 if(c.outcome==='won'){
  const id=`boost:${active.id}`,records=state.data.stageBoosts??{};
  for(const [key,r] of Object.entries(records))if(r.status==='available'&&r.offerEndsAt<=now)delete records[key];
  records[id]={id,encounterId:active.id,stageId:`dungeon_${definition.id}`,baseGold:reward.gold,bonusBaseGold:boostBonusBase(reward.gold),createdAt:now,offerEndsAt:now+BOOST_OFFER_MS,status:'available',multiplier:null};state.data.stageBoosts=records;
  return {ok:true,events:[...events,{type:'stageBoost.available',payload:{boostId:id,baseGold:reward.gold,offerEndsAt:now+BOOST_OFFER_MS}}]};
 }
 return {ok:true,events};
}
