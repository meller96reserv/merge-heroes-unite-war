import type {Snapshot} from '../../../game-core/src/model/GameState';
import {heroStats,heroLevel} from '../../../game-core/src/selectors/HeroStats';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
import {heroNames,maxHeroLevel,upgradeCost} from '../../../game-core/src/content/EquipmentConfig';
export function heroUpgradeRows(state:Snapshot){
 const figmaOrder=[8,2,10,7,6,1,3,4,5,9];
 const owned=new Set(state.data.heroes.map(h=>h.tier));
 return [...figmaOrder].sort((a,b)=>Number(owned.has(b))-Number(owned.has(a))).map(tier=>{
  const definition=heroes.get(`hero_tier_${tier}`),hero=state.data.heroes.find(h=>h.definitionId===definition.id),level=heroLevel(state,definition.id),cost=upgradeCost(level);
  return {definition,name:heroNames[tier-1]!,level:level+1,cost,stats:heroStats(state,definition,hero),max:level>=maxHeroLevel,locked:!hero&&!state.data.progression.discoveredTiers.includes(tier),affordable:BigInt(state.data.currencies.orb??'0')>=BigInt(cost)};
 });
}
