import type {GameState,Snapshot} from '../model/GameState';
import type {Command,Reduction} from './Dispatcher';
import {scaledPurchaseCost} from '../content/EconomyConfig';
import {grantReward} from '../systems/RewardService';
import {priorMeta} from './MetaTransaction';
export type SellHero=Command&{type:'SellHero';heroId:string;expectedGold:string};
/** PROPOSED sale: half the current equivalent recruitment value. Selling the
 * final hero leaves enough gold for one basic recruit, avoiding an empty-board lock. */
export function heroSaleGold(state:GameState|Snapshot,heroId:string):string{
 const h=state.data.heroes.find(h=>h.id===heroId);if(!h)return '0';
 const basic=BigInt(scaledPurchaseCost(state.data.progression.purchaseCounts,1));
 let refund=basic*(1n<<BigInt(h.tier-1))/2n;if(refund<1n)refund=1n;
 if(state.data.heroes.length===1){const missing=basic-BigInt(state.data.currencies.gold);if(missing>refund)refund=missing;}
 return refund.toString();
}
export function sellHero(state:GameState,c:SellHero):Reduction{
 const source=`heroSale:${c.heroId}`,prior=priorMeta(state,c.commandId,source);if(prior)return prior;
 const hero=state.data.heroes.find(h=>h.id===c.heroId);
 if(!hero||state.data.player.tutorialState!=='completed')return {ok:false,reason:'LOCKED'};
 const gold=heroSaleGold(state,c.heroId);if(c.expectedGold!==gold)return {ok:false,reason:'STALE_REVISION'};
 for(const item of state.data.equipment)if(item.ownerHeroId===hero.id)item.ownerHeroId=null;
 const slot=state.data.board.find(s=>s.unitId===hero.id);if(slot)slot.unitId=null;
 state.data.heroes=state.data.heroes.filter(h=>h.id!==hero.id);
 const grants=[{kind:'currency' as const,id:'gold',amount:gold}];
 grantReward(state,c.commandId,source,grants,{currencies:['gold','gem','orb'],items:{},freeSpinId:'fortune'});
 return {ok:true,events:[{type:'hero.sold',payload:{heroId:hero.id,gold,grants}},{type:'board.changed',payload:{}}]};
}
