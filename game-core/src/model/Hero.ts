import {freeze} from '../events/EventBus';
import type {HeroInstance} from './GameState';
export type {HeroInstance};
export type HeroDefinition = Readonly<{
  id: string; family: string; tier: number; rarityId: string | null;
  attackType: 'melee' | 'ranged' | 'magic';
  baseStats: {attack: number; defense: number; hp: number; attackIntervalMs: number; critChanceBp: number; critMultiplierBp: number};
  visualId: string; portraitId: string; animationProfile: string; audioProfile: string;
  projectileId: string | null; unlockId: string | null; evidenceIds: readonly string[];
}>;
export class HeroCatalog {
  private definitions = new Map<string, HeroDefinition>();
  constructor(definitions: readonly HeroDefinition[]) {
    for (const definition of definitions) {
      const {id, tier, baseStats: s} = definition;
      if (!id || this.definitions.has(id) || !definition.family || !definition.visualId || !Number.isSafeInteger(tier) || tier < 1) throw Error('Invalid hero definition');
      if (Object.values(s).some(n => !Number.isSafeInteger(n) || n < 0) || s.hp < 1 || s.attackIntervalMs < 1 || s.critChanceBp > 10000 || s.critMultiplierBp < 10000 || s.critMultiplierBp > 100000) throw Error('Invalid hero stats');
      this.definitions.set(id, freeze(JSON.parse(JSON.stringify(definition)) as HeroDefinition));
    }
  }
  get(id: string): HeroDefinition {const result=this.definitions.get(id); if (!result) throw Error('Missing hero definition'); return result;}
  all(): readonly HeroDefinition[] {return [...this.definitions.values()];}
  instantiate(definitionId: string, id: string, slotId: number): HeroInstance {
    const d = this.get(definitionId);
    if (!id || !Number.isInteger(slotId) || slotId < 0 || slotId >= 15) throw Error('Invalid owned hero');
    return {id, definitionId, slotId, tier: d.tier, upgradeLevel: 0, deployed: false, equippedItemIds: []};
  }
}
