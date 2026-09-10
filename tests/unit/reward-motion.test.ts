import {test} from 'node:test';import assert from 'node:assert/strict';
import {RewardMotion} from '../../app/src/presentation/RewardMotion';import {createState,snapshot} from '../../game-core/src/model/GameState';
import {grantReward} from '../../game-core/src/systems/RewardService';import {rewardCatalog} from '../../game-core/src/content/PlayableConfig';

test('only new committed receipt revisions animate; cancel, repeat and reduced motion cannot change reward state',()=>{
 const state=createState({dataVersion:'test',initialGold:'100',utcMs:0}),before=snapshot(state),motion=new RewardMotion();
 grantReward(state,'grant','test-reward',[{kind:'currency',id:'gold',amount:'1000'}],rewardCatalog);state.revision++;
 const committed=snapshot(state),expected=JSON.stringify(committed);motion.ingest(before,before,{x:1,y:2});assert.equal(motion.stats.active,0);
 motion.ingest(before,committed,{x:1,y:2});assert.equal(motion.stats.active,5);const old=motion.getSnapshot()[0]!;
 motion.clear();motion.ingest(before,committed,{x:1,y:2});motion.release(old);assert.equal(motion.stats.active,0);assert.equal(JSON.stringify(committed),expected);
 const reduced=new RewardMotion();reduced.ingest(before,committed,{x:1,y:2},true);assert.equal(reduced.stats.active,0);assert.equal(committed.data.currencies.gold,'1100');
});
