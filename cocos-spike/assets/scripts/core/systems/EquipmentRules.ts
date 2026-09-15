import type {Snapshot,GameState} from '../model/GameState';
import {equipmentById,type EquipmentSlot} from '../content/EquipmentConfig';
export function compatibleItem(state:Snapshot|GameState,heroId:string,itemId:string,slot:EquipmentSlot){
 const hero=state.data.heroes.find(h=>h.id===heroId),item=state.data.equipment.find(i=>i.id===itemId),definition=item&&equipmentById.get(item.definitionId);
 return !!hero&&!!item&&!!definition&&definition.heroDefinitionId===hero.definitionId&&definition.slotType===slot&&item.slotType===slot;
}
