import {Amount} from '../model/Amount';import type {GameState} from '../model/GameState';import type {HeroCatalog} from '../model/Hero';
import {quotePurchase,type PurchaseOffer} from '../selectors/PurchaseQuote';import type {Command,Reduction} from './Dispatcher';
export type PurchaseHero = Command & {type:'BuyHero'; offerId:string};
export function purchaseHero(state:GameState,command:PurchaseHero,offers:readonly PurchaseOffer[],catalog:HeroCatalog):Reduction {
 const source=`purchase:${command.offerId}:${command.commandId}`,existing=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(existing)return existing.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 if(Object.hasOwn(state.data.sourceWatermarks,source))return {ok:true,events:[]};
 const offer=offers.find(o=>o.id===command.offerId);if(!offer)return {ok:false,reason:'INVALID_COMMAND'};
 const quote=quotePurchase(state,offer,catalog);if(!quote.ok)return {ok:false,reason:quote.reason};
 if(!Number.isSafeInteger(state.data.nextInstanceSequence+1)||!Number.isSafeInteger(quote.purchaseCount+1))return {ok:false,reason:'INVALID_STATE'};
 const id=`hero_${state.data.nextInstanceSequence}`,hero=catalog.instantiate(quote.definitionId,id,quote.slotId);
 if(state.data.heroes.some(h=>h.id===id))return {ok:false,reason:'INVALID_STATE'};
 state.data.nextInstanceSequence++;state.data.currencies[quote.currencyId]=Amount.from(state.data.currencies[quote.currencyId]??'0').subtract(Amount.from(quote.cost)).toString();
 state.data.progression.purchaseCounts[offer.id]=quote.purchaseCount+1;state.data.heroes.push(hero);state.data.board.find(s=>s.slotId===quote.slotId)!.unitId=id;
 state.data.transactionReceipts.push({id:command.commandId,source,generation:state.generation+1,grants:[]});state.data.sourceWatermarks[source]=state.revision+1;
 return {ok:true,events:[{type:'purchase.succeeded',payload:{instanceId:id,slotId:quote.slotId,cost:quote.cost,currencyId:quote.currencyId}},{type:'board.changed',payload:{}}]};
}
