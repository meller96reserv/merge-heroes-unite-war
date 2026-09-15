import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import {equipmentSlots,type EquipmentSlot} from '../content/EquipmentConfig';
import {compatibleItem} from '../systems/EquipmentRules';
import {metaReceipt,priorMeta} from './MetaTransaction';
export type EquipItem=Command&{type:'EquipItem';heroId:string;itemId:string|null;slot:EquipmentSlot};
export function equipItem(state:GameState,c:EquipItem):Reduction{
 const source=`equip:${c.heroId}:${c.slot}:${c.itemId}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const hero=state.data.heroes.find(h=>h.id===c.heroId);
 if(!hero||!equipmentSlots.includes(c.slot)||c.itemId!==null&&!compatibleItem(state,c.heroId,c.itemId,c.slot))return {ok:false,reason:'INVALID_COMMAND'};
 const incoming=state.data.equipment.find(i=>i.id===c.itemId);
 if(incoming?.ownerHeroId&&incoming.ownerHeroId!==hero.id)return {ok:false,reason:'LOCKED'};
 for(const item of state.data.equipment)if(item.ownerHeroId===hero.id&&item.slotType===c.slot){item.ownerHeroId=null;hero.equippedItemIds=hero.equippedItemIds.filter(id=>id!==item.id);}
 if(incoming){incoming.ownerHeroId=hero.id;hero.equippedItemIds.push(incoming.id);}
 metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'equipment.changed',payload:{heroId:hero.id,itemId:c.itemId}},{type:'hero.statsChanged',payload:{heroId:hero.id}}]};
}
