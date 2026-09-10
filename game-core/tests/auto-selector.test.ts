import {test} from 'node:test';import assert from 'node:assert/strict';import {mergeFixture,rules} from './merge-rules.test';import {selectAutoPair,type AutoRules} from '../src/systems/AutoMergeSelector';
test('ambiguous triple chooses stable low destination and stops for disabled, expired or locked entitlement',()=>{
 const {s,catalog}=mergeFixture();s.data.heroes.push(catalog.instantiate('tier1','c',2));s.data.board[2]!.unitId='c';s.data.autoMerge={enabled:true,entitlementId:'e',expiresAtUtcMs:3600000,lastObservedWallUtcMs:0};const config:AutoRules={...rules,autoPolicy:'slotOrder',autoUnlockId:null};
 assert.deepEqual(selectAutoPair(s,config,catalog,0),{sourceId:'b',targetId:'a'});s.data.heroes.reverse();assert.deepEqual(selectAutoPair(s,config,catalog,0),{sourceId:'b',targetId:'a'});
 assert.equal(selectAutoPair(s,config,catalog,3600000),null);assert.equal(selectAutoPair(s,{...config,autoPolicy:'disabled'},catalog,0),null);assert.equal(selectAutoPair(s,{...config,autoUnlockId:'locked'},catalog,0),null);
});
