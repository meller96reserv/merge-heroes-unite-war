import type {Snapshot} from '../../../game-core/src/model/GameState';
import {equipmentById,equipmentSlots,enhanceCost,maxEquipmentLevel,type EquipmentSlot} from '../../../game-core/src/content/EquipmentConfig';
import {heroStats,heroLevel} from '../../../game-core/src/selectors/HeroStats';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
export function equipmentPanel(state:Snapshot,definitionId:string,heroId?:string){
 const definition=heroes.get(definitionId),hero=state.data.heroes.find(h=>h.id===heroId&&h.definitionId===definitionId)??state.data.heroes.find(h=>h.definitionId===definitionId);
 const slots=equipmentSlots.map(slot=>({slot,item:state.data.equipment.find(i=>i.ownerHeroId===hero?.id&&i.slotType===slot)}));
 return {definition,hero,slots,stats:heroStats(state,definition,hero),level:heroLevel(state,definitionId)+1};
}
export function equipmentInventory(state:Snapshot,definitionId:string,slot:EquipmentSlot){
 return state.data.equipment.filter(i=>{const d=equipmentById.get(i.definitionId);return d?.heroDefinitionId===definitionId&&d.slotType===slot;}).map(item=>({item,definition:equipmentById.get(item.definitionId)!,cost:enhanceCost(item.level),max:item.level>=maxEquipmentLevel}));
}
