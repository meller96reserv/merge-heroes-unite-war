import {test} from 'node:test';import assert from 'node:assert/strict';import {quotePurchase,type PurchaseOffer} from '../src/selectors/PurchaseQuote';
import {createState} from '../src/model/GameState';import {HeroCatalog} from '../src/model/Hero';import {definition} from './hero.test';
export const offer:PurchaseOffer={id:'buy',currencyId:'gold',grantDefinitionId:'tier1',prices:['10','12'],afterTable:'reject',holdEnabled:true,holdIntervalMs:200};
test('quotes expose exact funds, full/locked/table-end reasons with no mutation',()=>{
 const s=createState({dataVersion:'test',initialGold:'10',utcMs:0,unlockedSlots:5}),catalog=new HeroCatalog([definition()]),before=JSON.stringify(s);
 assert.deepEqual(quotePurchase(s,offer,catalog),{ok:true,offerId:'buy',definitionId:'tier1',cost:'10',currencyId:'gold',slotId:0,purchaseCount:0});assert.equal(JSON.stringify(s),before);
 s.data.currencies.gold='9';assert.equal(quotePurchase(s,offer,catalog).ok,false);
 s.data.board.forEach(slot=>slot.unlocked=false);assert.equal((quotePurchase(s,offer,catalog) as {reason:string}).reason,'BOARD_FULL');
 s.data.progression.purchaseCounts.buy=2;assert.equal((quotePurchase(s,offer,catalog) as {reason:string}).reason,'LOCKED');
});
