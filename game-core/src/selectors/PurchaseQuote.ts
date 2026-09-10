import {scaledPurchaseCost} from '../content/EconomyConfig';
import type {Snapshot} from '../model/GameState';
import type {HeroCatalog} from '../model/Hero';
import {Amount} from '../model/Amount';
import {firstEmptySlot,canAfford} from './index';
export type PurchaseOffer = Readonly<{id:string; currencyId:string; grantDefinitionId:string; prices:readonly string[]; afterTable:'reject'|'repeatLastProposed'; holdEnabled:boolean; holdIntervalMs:number; sharedGrowthUnits?:1|2|4}>;
export type PurchaseQuote = {ok:true; offerId:string; definitionId:string; cost:string; currencyId:string; slotId:number; purchaseCount:number} | {ok:false; reason:'LOCKED'|'BOARD_FULL'|'INSUFFICIENT_GOLD'|'INVALID_COMMAND'; cost:string | null};
export function quotePurchase(state:Snapshot,offer:PurchaseOffer,catalog:HeroCatalog):PurchaseQuote {
 const definition=catalog.get(offer.grantDefinitionId),count=state.data.progression.purchaseCounts[offer.id]??0;
 if(!Number.isSafeInteger(count)||count<0||!offer.prices.length)return {ok:false,reason:'INVALID_COMMAND',cost:null};
 let cost:string|undefined;
 try{cost=offer.sharedGrowthUnits?scaledPurchaseCost(state.data.progression.purchaseCounts,offer.sharedGrowthUnits):offer.prices[count]??(offer.afterTable==='repeatLastProposed'?offer.prices.at(-1):undefined);}catch{return {ok:false,reason:'INVALID_COMMAND',cost:null};}
 if(cost===undefined)return {ok:false,reason:'LOCKED',cost:null};
 Amount.from(cost);
 if(definition.unlockId&&!state.data.unlocks.unlockedIds.includes(definition.unlockId))return {ok:false,reason:'LOCKED',cost};
 const slotId=firstEmptySlot(state);if(slotId===null)return {ok:false,reason:'BOARD_FULL',cost};
 if(!canAfford(state,offer.currencyId,cost))return {ok:false,reason:'INSUFFICIENT_GOLD',cost};
 return {ok:true,offerId:offer.id,definitionId:definition.id,cost,currencyId:offer.currencyId,slotId,purchaseCount:count};
}
