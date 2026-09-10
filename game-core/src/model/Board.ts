import type {GameState, Snapshot} from './GameState';
export type BoardConfig = Readonly<{slotCount: 15; columns: 5; initialUnlocked: number; deploymentCap: number; slotUnlockIds: readonly (string | null)[]}>;
export function createBoard(config: BoardConfig): GameState['data']['board'] {
  if (config.slotCount !== 15 || config.columns !== 5 || !Number.isInteger(config.initialUnlocked) || config.initialUnlocked < 0 || config.initialUnlocked > 15 || config.slotUnlockIds.length !== 15) throw Error('Invalid board configuration');
  if (config.slotUnlockIds.some((id,i) => i >= config.initialUnlocked && !id)) throw Error('Missing slot unlock rule');
  return Array.from({length:15},(_,slotId)=>({slotId,unlocked:slotId<config.initialUnlocked,unitId:null}));
}
export function assertBoard(state: Snapshot): void {
  if (state.data.board.length !== 15 || new Set(state.data.board.map(s=>s.slotId)).size !== 15 || state.data.board.some(s=>!Number.isInteger(s.slotId)||s.slotId<0||s.slotId>14)) throw Error('Invalid board slots');
  const ids=new Set<string>();
  for(const slot of state.data.board) if(slot.unitId!==null){
    if(!slot.unlocked||ids.has(slot.unitId)||!state.data.heroes.some(h=>h.id===slot.unitId&&h.slotId===slot.slotId))throw Error('Invalid occupancy');
    ids.add(slot.unitId);
  }
  if(ids.size!==state.data.heroes.length)throw Error('Unplaced hero');
}
export function unlockBoard(state: GameState, config: BoardConfig): number[] {
  const unlocked:number[]=[];
  for(const slot of state.data.board){const key=config.slotUnlockIds[slot.slotId];if(!slot.unlocked&&key&&state.data.unlocks.unlockedIds.includes(key)){slot.unlocked=true;unlocked.push(slot.slotId);}}
  return unlocked;
}
