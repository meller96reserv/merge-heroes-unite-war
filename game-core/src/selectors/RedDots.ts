import type {Snapshot} from '../model/GameState';
import {dailyEligibility} from '../systems/DailyService';
export function redDots(state:Snapshot,utc:number){
 const s=state.data,w=s.wheel,valid=Number.isSafeInteger(utc)&&utc>=Math.max(state.updatedAt,state.lastActiveAt);
 return {daily:dailyEligibility(state,utc).available,wheel:w.pendingSpin?.status==='reserved'||valid&&(w.freeSpins>0||utc>=w.nextFreeAt),heroes:s.equipment.some(i=>i.ownerHeroId===null),battle:s.unlocks.unlockedIds.some(id=>!s.unlocks.announcedIds.includes(id)&&id.startsWith('slot_'))};
}
