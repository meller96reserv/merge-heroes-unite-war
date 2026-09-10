import {relicBonus} from '../content/RelicConfig';
import type {GameState,Snapshot,HeroInstance} from '../model/GameState';
import type {HeroDefinition} from '../model/Hero';
import {equipmentById} from '../content/EquipmentConfig';
export function heroLevel(state:GameState|Snapshot,definitionId:string){return state.data.heroLevels?.[definitionId]??0;}
/** Tier is already represented by baseStats. Permanent archetype levels survive merges. */
export function heroStats(state:GameState|Snapshot,definition:HeroDefinition,hero?:Snapshot['data']['heroes'][number]){
 const level=heroLevel(state,definition.id)+(hero?.upgradeLevel??0),base=definition.baseStats;
 let attackBp=10000+level*1000+relicBonus(state.data.relics??{},'attack'),hpBp=10000+level*1000+relicBonus(state.data.relics??{},'hp'),defense=base.defense;
 for(const id of [...(hero?.equippedItemIds??[])].sort()){
  const item=state.data.equipment.find(i=>i.id===id),d=item&&equipmentById.get(item.definitionId);
  if(!item||!d||item.ownerHeroId!==hero?.id||d.heroDefinitionId!==definition.id)continue;
  if(['weapon','offhand','ring'].includes(d.slotType))attackBp+=item.level*500;
  else{hpBp+=item.level*500;defense+=item.level;}
 }
 const attack=Math.floor(base.attack*attackBp/10000),hp=Math.floor(base.hp*hpBp/10000);
 if(!Number.isSafeInteger(attack)||!Number.isSafeInteger(hp)||!Number.isSafeInteger(defense))throw Error('Stat overflow');
 return {...base,attack,hp,defense};
}
