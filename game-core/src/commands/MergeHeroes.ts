import type {GameState} from '../model/GameState';import type {HeroCatalog} from '../model/Hero';import type {Command,Reduction,Intent} from './Dispatcher';import {checkMerge,type MergeRules} from '../systems/MergeRules';
export type MergeHeroes = Command & {type:'MergeHeroes';sourceId:string;targetId:string};
export type DiscoverTier = (state:GameState,tier:number,transactionId:string)=>Intent[];
export function mergeHeroes(state:GameState,command:MergeHeroes,rules:MergeRules,catalog:HeroCatalog,discover:DiscoverTier,automatic=false):Reduction {
 const source=`merge:${command.sourceId}:${command.targetId}:${command.commandId}`,receipt=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(receipt)return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 if(!automatic&&!rules.manualEnabled)return {ok:false,reason:'LOCKED'};
 const result=checkMerge(state,command.sourceId,command.targetId,rules,catalog);if(!result.ok)return result;
 if(!Number.isSafeInteger(state.data.nextInstanceSequence+1))return {ok:false,reason:'INVALID_STATE'};
 const id=`hero_${state.data.nextInstanceSequence}`,hero=catalog.instantiate(result.resultDefinitionId,id,result.destinationSlot);
 if(state.data.heroes.some(h=>h.id===id))return {ok:false,reason:'INVALID_STATE'};
 // Consumed heroes return all equipment to inventory; archetype upgrades remain saved.
 for(const item of state.data.equipment)if(item.ownerHeroId===command.sourceId||item.ownerHeroId===command.targetId)item.ownerHeroId=null;
 hero.upgradeLevel=Math.max(...state.data.heroes.filter(h=>h.id===command.sourceId||h.id===command.targetId).map(h=>h.upgradeLevel));
 hero.deployed=result.deployed;state.data.nextInstanceSequence++;
 state.data.heroes=state.data.heroes.filter(h=>h.id!==command.sourceId&&h.id!==command.targetId);
 for(const slot of state.data.board)if(slot.unitId===command.sourceId||slot.unitId===command.targetId)slot.unitId=null;
 state.data.heroes.push(hero);state.data.board.find(s=>s.slotId===result.destinationSlot)!.unitId=id;
 const discovery=discover(state,hero.tier,command.commandId);
 state.data.transactionReceipts.push({id:command.commandId,source,generation:state.generation+1,grants:[]});state.data.sourceWatermarks[source]=state.revision+1;
 return {ok:true,events:[{type:'merge.completed',payload:{oldIds:[command.sourceId,command.targetId],newId:id,resultTier:hero.tier,destinationSlot:hero.slotId,automatic}},{type:'board.changed',payload:{}},...discovery]};
}
