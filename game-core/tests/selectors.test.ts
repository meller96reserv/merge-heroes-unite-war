import {test} from 'node:test';import assert from 'node:assert/strict';
import {createState,snapshot} from '../src/model/GameState';
import {canAfford,occupancy,firstEmptySlot,deployedDps,canClaimSource} from '../src/selectors';
test('selectors preserve state and derive numeric values from authoritative inputs',()=>{
 const s=createState({dataVersion:'test',initialGold:'9007199254740993',utcMs:0,unlockedSlots:10});
 s.data.heroes=[{id:'h1',definitionId:'turtle',slotId:0,tier:1,upgradeLevel:0,deployed:true,equippedItemIds:[]}];s.data.board[0]!.unitId='h1';s.data.sourceWatermarks.claim=1;
 const frozen=snapshot(s),before=JSON.stringify(frozen);
 assert.equal(canAfford(frozen,'gold','9007199254740993'),true);assert.equal(canAfford(frozen,'gold','9007199254740994'),false);
 assert.deepEqual(occupancy(frozen),{occupied:1,capacity:10});assert.equal(firstEmptySlot(frozen),1);assert.equal(deployedDps(frozen,()=>({damage:10,intervalMs:500})),20);
 assert.equal(canClaimSource(frozen,'claim'),false);assert.equal(canClaimSource(frozen,'fresh'),true);assert.equal(JSON.stringify(frozen),before);
});
