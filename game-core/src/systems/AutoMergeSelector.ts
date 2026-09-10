import type {Snapshot} from '../model/GameState';import type {HeroCatalog} from '../model/Hero';import {checkMerge,type MergeRules} from './MergeRules';import {autoMergeActive} from '../commands/ActivateAutoMerge';
export type AutoRules=MergeRules&{autoPolicy:'disabled'|'slotOrder';autoUnlockId:string|null};
/** PROPOSED slotOrder-v1: lowest eligible destination, then lowest eligible source. */
export function selectAutoPair(state:Snapshot,rules:AutoRules,catalog:HeroCatalog,utcMs:number):{sourceId:string;targetId:string}|null {
 if(rules.autoPolicy==='disabled'||!autoMergeActive(state,utcMs)||(rules.autoUnlockId&&!state.data.unlocks.unlockedIds.includes(rules.autoUnlockId)))return null;
 const heroes=[...state.data.heroes].sort((a,b)=>a.slotId-b.slotId||a.id.localeCompare(b.id));
 for(let destination=0;destination<heroes.length;destination++)for(let source=destination+1;source<heroes.length;source++){
  const a=heroes[source]!,b=heroes[destination]!;if(checkMerge(state,a.id,b.id,rules,catalog).ok)return {sourceId:a.id,targetId:b.id};
 }
 return null;
}
