import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import {equipmentById,equipmentSlots,equipmentRewardCatalog,type EquipmentDefinition} from '../content/EquipmentConfig';
import {grantReward} from '../systems/RewardService';
import {priorMeta} from './MetaTransaction';
export const equipmentPrice=(d:EquipmentDefinition)=>String(Number(d.heroDefinitionId.replace('hero_tier_',''))*50+equipmentSlots.indexOf(d.slotType)*25);
export type BuyEquipment=Command&{type:'BuyEquipment';heroId:string;definitionId:string;expectedCost:string};
/** Customer-requested direct gold store. Purchase + equip share one save commit. */
export function buyEquipment(state:GameState,c:BuyEquipment):Reduction{
 const source=`equipmentBuy:${c.heroId}:${c.definitionId}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const hero=state.data.heroes.find(h=>h.id===c.heroId),d=equipmentById.get(c.definitionId);
 if(!hero||!d||d.heroDefinitionId!==hero.definitionId||c.expectedCost!==equipmentPrice(d))return {ok:false,reason:'INVALID_COMMAND'};
 if(state.data.equipment.some(i=>equipmentById.get(i.definitionId)?.visualId===d.visualId&&(!i.ownerHeroId||i.ownerHeroId===hero.id)))return {ok:false,reason:'LOCKED'};
 const cost=BigInt(equipmentPrice(d)),balance=BigInt(state.data.currencies.gold);
 if(balance<cost)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 state.data.currencies.gold=(balance-cost).toString();
 const before=new Set(state.data.equipment.map(i=>i.id));
 grantReward(state,c.commandId,source,[{kind:'item',id:d.id,amount:'1'}],{currencies:['gold','gem','orb'],items:equipmentRewardCatalog,freeSpinId:'fortune'});
 const owner=state.data.heroes.find(h=>h.id===c.heroId)!;
 const item=state.data.equipment.find(i=>!before.has(i.id))!;
 for(const old of state.data.equipment)if(old.ownerHeroId===hero.id&&old.slotType===d.slotType){old.ownerHeroId=null;owner.equippedItemIds=owner.equippedItemIds.filter(id=>id!==old.id);}
 item.ownerHeroId=hero.id;owner.equippedItemIds.push(item.id);
 return {ok:true,events:[{type:'equipment.purchased',payload:{heroId:hero.id,itemId:item.id,cost:cost.toString()}},{type:'equipment.changed',payload:{heroId:hero.id}},{type:'hero.statsChanged',payload:{heroId:hero.id}}]};
}
