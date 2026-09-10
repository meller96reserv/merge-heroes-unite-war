import {Amount} from '../model/Amount';
import type {Snapshot} from '../model/GameState';
export const canAfford = (state: Snapshot, currency: string, cost: string) => Amount.from(state.data.currencies[currency] ?? '0').compare(Amount.from(cost)) >= 0;
export const occupancy = (state: Snapshot) => ({occupied: state.data.board.filter(s => s.unitId !== null).length, capacity: state.data.board.filter(s => s.unlocked).length});
export const firstEmptySlot = (state: Snapshot) => [...state.data.board].sort((a,b) => a.slotId - b.slotId).find(s => s.unlocked && s.unitId === null)?.slotId ?? null;
export const canClaimSource = (state: Snapshot, source: string) => !Object.hasOwn(state.data.sourceWatermarks, source) && !state.data.transactionReceipts.some(r => r.source === source);
export function deployedDps(state: Snapshot, stats: (definitionId: string, upgradeLevel: number) => {damage: number; intervalMs: number}): number {
  return state.data.heroes.filter(h => h.deployed).reduce((sum, hero) => {
    const {damage, intervalMs} = stats(hero.definitionId, hero.upgradeLevel);
    if (!Number.isSafeInteger(damage) || damage < 0 || !Number.isSafeInteger(intervalMs) || intervalMs <= 0) throw Error('Invalid combat stats');
    return sum + damage * 1000 / intervalMs;
  }, 0);
}
