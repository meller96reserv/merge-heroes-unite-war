import type {GameState} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import type {HeroCatalog} from '../model/Hero';
import {Amount} from '../model/Amount';
import {maxHeroLevel,upgradeCost} from '../content/EquipmentConfig';
import {heroLevel} from '../selectors/HeroStats';
import {metaReceipt,priorMeta} from './MetaTransaction';
export type UpgradeHero=Command&{type:'UpgradeHero';definitionId:string;expectedLevel:number};
export function upgradeHero(state:GameState,c:UpgradeHero,catalog:HeroCatalog):Reduction{
 const source=`upgrade:${c.definitionId}:${c.expectedLevel}:${c.commandId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const definition=catalog.all().find(h=>h.id===c.definitionId);if(!definition)return {ok:false,reason:'INVALID_COMMAND'};
 if(!state.data.heroes.some(h=>h.definitionId===definition.id)&&!state.data.progression.discoveredTiers.includes(definition.tier))return {ok:false,reason:'LOCKED'};
 const level=heroLevel(state,definition.id);if(level!==c.expectedLevel)return {ok:false,reason:'STALE_REVISION'};if(level>=maxHeroLevel)return {ok:false,reason:'MAX_TIER'};
 const cost=Amount.from(upgradeCost(level)),balance=Amount.from(state.data.currencies.orb??'0');if(balance.compare(cost)<0)return {ok:false,reason:'INSUFFICIENT_GOLD'};
 state.data.currencies.orb=balance.subtract(cost).toString();(state.data.heroLevels??={})[definition.id]=level+1;
 metaReceipt(state,c.commandId,source);return {ok:true,events:[{type:'upgrade.committed',payload:{definitionId:definition.id,level:level+1}},{type:'hero.statsChanged',payload:{definitionId:definition.id}}]};
}
