import test from 'node:test';import assert from 'node:assert/strict';
import {purchaseUnitCost,scaledPurchaseCost,observedPurchasePrices} from '../../game-core/src/content/EconomyConfig';
import {offers,heroes} from '../../game-core/src/content/PlayableConfig';
import {enhanceCost,upgradeCost} from '../../game-core/src/content/EquipmentConfig';
import {quotePurchase} from '../../game-core/src/selectors/PurchaseQuote';
import {initialGame} from '../../app/src/game/initialGame';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {draft,type GameState} from '../../game-core/src/model/GameState';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
test('observed first 30 prices survive; rewards buy useful recruits without skipping late progression',()=>{
 assert.equal(observedPurchasePrices.reduce((n,x)=>n+Number(x),0),53);
 for(let n=0;n<30;n++)assert.equal(purchaseUnitCost(BigInt(n)).toString(),observedPurchasePrices[n]);
 const total=(count:number)=>Array.from({length:count},(_,i)=>purchaseUnitCost(BigInt(i))).reduce((a,b)=>a+b,0n);
 assert.ok(total(32)<=100n);assert.ok(total(64)>100n); // Accessible start; cannot instantly buy a tier 7.
 assert.ok(total(128)<1000n);assert.ok(total(256)>1000n);
 assert.ok(total(256)<10000n);assert.ok(total(512)>10000n); // Even the large wheel gold grant is not a tier 10 shortcut.
 assert.ok(purchaseUnitCost(512n)>purchaseUnitCost(256n)*2n);
 assert.equal(scaledPurchaseCost({buy_tier_1:30},4),scaledPurchaseCost({buy_tier_2:15},4));
 assert.equal(scaledPurchaseCost({buy_tier_3:10},2),String(purchaseUnitCost(40n)+purchaseUnitCost(41n)));
 assert.ok(BigInt(enhanceCost(10))>BigInt(enhanceCost(1))*50n);assert.ok(BigInt(upgradeCost(20))>BigInt(upgradeCost(0))*50n);
});
test('shared price debit, failed save, duplicate receipt and current-save reload preserve all ownership and money',async()=>{
 const s=initialGame(1000);s.data.currencies.gold='100000';s.data.progression.purchaseCounts={buy_tier_1:180,buy_tier_2:20};
 s.data.unlocks.unlockedIds=['discover_2','discover_3'];let fail=true,saved!:GameState;
 const game=new GameRuntime(s,async value=>{if(fail){fail=false;throw Error('write');}saved=structuredClone(value);});
 const d=game.dispatcher,before=d.getSnapshot(),q=quotePurchase(before,offers[0]!,heroes);assert.ok(q.ok);
 const c={type:'BuyHero' as const,offerId:'buy_tier_1',commandId:'paced:one'};
 assert.equal((await d.dispatch(c)).ok,false);assert.equal(d.getSnapshot(),before);
 assert.equal((await d.dispatch(c)).ok,true);assert.equal(d.getSnapshot().data.currencies.gold,String(100000n-BigInt(q.cost)));
 const after=d.getSnapshot();await d.dispatch(c);assert.deepEqual(d.getSnapshot(),after);
 const reloaded=new GameRuntime(decodeSave(encodeSave(saved)),async()=>{});await reloaded.dispatcher.dispatch(c);assert.deepEqual(reloaded.dispatcher.getSnapshot().data,after.data);
 assert.equal(quotePurchase(reloaded.dispatcher.getSnapshot(),offers[0]!,heroes).cost,scaledPurchaseCost(after.data.progression.purchaseCounts,1));
 const invalid=draft(after);invalid.data.progression.purchaseCounts.buy_tier_2=-1;assert.equal(quotePurchase(invalid,offers[0]!,heroes).ok,false);
});
