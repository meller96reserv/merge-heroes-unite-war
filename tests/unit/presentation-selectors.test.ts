import test from 'node:test';import assert from 'node:assert/strict';
import {formatAmount} from '../../game-core/src/selectors/NumberFormatter';
import {redDots} from '../../game-core/src/selectors/RedDots';
import {createState,snapshot} from '../../game-core/src/model/GameState';
test('huge exact currency display and compact locale preserve authoritative input',()=>{
 const amount='9007199254740993123456789';assert.equal(formatAmount(amount),'9,007,199,254,740,993,123,456,789');assert.equal(formatAmount(amount,'en-US',true),'9e24');assert.equal(formatAmount('1234567','de-DE',true),'1,23M');assert.equal(formatAmount('199999','en-US',true),'199K');assert.equal(amount,'9007199254740993123456789');
});
test('claim indicators reflect saved cooldowns and pending claims without granting',()=>{
 const s=createState({dataVersion:'playable-v1',utcMs:1000,initialGold:'100',unlockedSlots:5});s.data.daily.lastClaimedPeriod=0;s.data.wheel.nextFreeAt=5000;
 assert.deepEqual(redDots(snapshot(s),1000),{daily:false,wheel:false,heroes:false,battle:false});s.data.daily.pendingPeriod=0;s.data.wheel.pendingSpin={id:'spin:1',outcomeId:'gold',rewardId:null,status:'reserved'};
 assert.equal(redDots(snapshot(s),500).daily,true);assert.equal(redDots(snapshot(s),500).wheel,true);assert.equal(s.data.currencies.gold,'100');
});
