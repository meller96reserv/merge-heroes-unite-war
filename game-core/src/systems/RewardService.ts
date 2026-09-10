import {Amount} from '../model/Amount';
import type {GameState} from '../model/GameState';
export type Grant = GameState['data']['transactionReceipts'][number]['grants'][number];
export type Receipt = GameState['data']['transactionReceipts'][number];
export type RewardCatalog = {currencies: readonly string[]; items: Readonly<Record<string, {slotType: string}>>; freeSpinId: string};
/** Operates on the dispatcher's draft. Only its durable commit can publish a grant. */
export function grantReward(state: GameState, commandId: string, source: string, grants: readonly Grant[], catalog: RewardCatalog): {receipt: Receipt | null; duplicate: boolean} {
  if (!source || !commandId) throw Error('Missing reward identity');
  const data = state.data;
  const cached = data.transactionReceipts.find(r => r.source === source);
  if (cached) return {receipt: cached, duplicate: true};
  // A retained watermark also protects sources whose detailed receipt was compacted.
  if (Object.hasOwn(data.sourceWatermarks, source)) return {receipt: null, duplicate: true};
  if (data.transactionReceipts.some(r => r.id === commandId)) throw Error('Reward command identity conflict');
  const next = JSON.parse(JSON.stringify(data)) as GameState['data'];
  for (const grant of grants) {
    const amount = Amount.from(grant.amount);
    switch (grant.kind) {
      case 'currency':
        if (!catalog.currencies.includes(grant.id)) throw Error('Unknown currency');
        next.currencies[grant.id] = Amount.from(next.currencies[grant.id] ?? '0').add(amount).toString();
        break;
      case 'item': {
        const definition = catalog.items[grant.id];
        if (!definition || amount.compare(Amount.from('1000')) > 0) throw Error('Invalid item grant');
        const count = Number(grant.amount);
        if (!Number.isSafeInteger(next.nextInstanceSequence + count)) throw Error('Instance sequence exhausted');
        for (let i = 0; i < count; i++) next.equipment.push({id: `item_${next.nextInstanceSequence++}`, definitionId: grant.id, level: 1, ownerHeroId: null, slotType: definition.slotType});
        break;
      }
      case 'freeSpin': {
        if (grant.id !== catalog.freeSpinId) throw Error('Unknown spin entitlement');
        const count = Number(grant.amount);
        if (!Number.isSafeInteger(count) || !Number.isSafeInteger(next.wheel.freeSpins + count)) throw Error('Spin count overflow');
        next.wheel.freeSpins += count;
        break;
      }
      default: throw Error('Unknown grant kind');
    }
  }
  const receipt: Receipt = {id: commandId, source, generation: state.generation + 1, grants: grants.map(g => ({...g}))};
  next.transactionReceipts.push(receipt);
  next.sourceWatermarks[source] = state.revision + 1;
  state.data = next;
  return {receipt, duplicate: false};
}
