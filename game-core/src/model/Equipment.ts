import type {GameState,Snapshot} from './GameState';
export type Equipment=GameState['data']['equipment'][number];
/** Both directions are saved and validated, never reconstructed from visual slots. */
export function assertEquipment(state:GameState|Snapshot){
 const items=new Map(state.data.equipment.map(i=>[i.id,i]));
 if(items.size!==state.data.equipment.length)throw Error('Duplicate item ID');
 const assigned=new Set<string>();
 for(const h of state.data.heroes){
  const slots=new Set<string>();
  for(const id of h.equippedItemIds){const item=items.get(id);
   if(!item||assigned.has(id)||item.ownerHeroId!==h.id||slots.has(item.slotType))throw Error('Invalid item ownership');
   assigned.add(id);slots.add(item.slotType);
  }
 }
 for(const item of items.values())if(!Number.isSafeInteger(item.level)||item.level<1||(item.ownerHeroId!==null&&!assigned.has(item.id)))throw Error('Invalid owned item');
}
