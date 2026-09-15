import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import {Amount} from '../model/Amount';
import {enhanceCost,maxEquipmentLevel,equipmentById} from '../content/EquipmentConfig';
import {metaReceipt,priorMeta} from './MetaTransaction';
export type EnhanceItem=Command&{type:'EnhanceItem';itemId:string;expectedLevel:number};
export function enhanceItem(state:GameState,c:EnhanceItem):Reduction{
 const source=`enhance:${c.itemId}:${c.expectedLevel}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const item=state.data.equipment.find(i=>i.id===c.itemId);
 if(!item||!equipmentById.has(item.definitionId))return {ok:false,reason:'INVALID_COMMAND'};
 if(item.level!==c.expectedLevel)return {ok:false,reason:'STALE_REVISION'};
 if(item.level>=maxEquipmentLevel)return {ok:false,reason:'MAX_TIER'};
 const cost=Amount.from(enhanceCost(item.level)),balance=Amount.from(state.data.currencies.gold??'0');if(balance.compare(cost)<0)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 state.data.currencies.gold=balance.subtract(cost).toString();item.level++;
 metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'item.enhanced',payload:{itemId:item.id,level:item.level}},{type:'hero.statsChanged',payload:{heroId:item.ownerHeroId}}]};
}
