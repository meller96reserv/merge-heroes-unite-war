import {UnlockService} from '../systems/UnlockService';
/** PROPOSED: clearing each chapter boss opens five more merge slots. */
export const unlocks=new UnlockService(Array.from({length:10},(_,i)=>({id:`slot_${i+5}`,condition:{kind:'stageAtLeast',value:i<5?10:20},popupKey:i<5?'second_row_unlocked':'third_row_unlocked',targetFeatureId:`board_slot_${i+5}`,tutorialStepId:null})));
export function boardUnlockStage(slotId:number):number|null {
 const c=unlocks.rules.find(r=>r.targetFeatureId===`board_slot_${slotId}`)?.condition;
 return c?.kind==='stageAtLeast'?c.value:null;
}
