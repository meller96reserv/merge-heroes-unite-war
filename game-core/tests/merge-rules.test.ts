import {test} from 'node:test';import assert from 'node:assert/strict';import {checkMerge,type MergeRules} from '../src/systems/MergeRules';import {HeroCatalog} from '../src/model/Hero';import {createState} from '../src/model/GameState';import {definition} from './hero.test';
export const rules:MergeRules={manualEnabled:true,compatibility:'sameFamilyAndTier',pairs:[{sourceDefinitionId:'tier1',targetDefinitionId:'tier1',resultDefinitionId:'tier2'}],maxTier:2,deployedPolicy:'preserveDestination'};
export const mergeFixture=()=>{
 const catalog=new HeroCatalog([definition(),definition('tier2',2),definition('other',1,'other')]),s=createState({dataVersion:'test',initialGold:'0',utcMs:0});
 s.data.heroes=[catalog.instantiate('tier1','a',0),catalog.instantiate('tier1','b',1)];s.data.board[0]!.unitId='a';s.data.board[1]!.unitId='b';s.data.nextInstanceSequence=3;return {s,catalog};
};
test('merge compatibility validates result map, family, self/max and deployed policy without mutation',()=>{
 const {s,catalog}=mergeFixture(),before=JSON.stringify(s);assert.deepEqual(checkMerge(s,'a','b',rules,catalog),{ok:true,resultDefinitionId:'tier2',destinationSlot:1,deployed:false});assert.equal(JSON.stringify(s),before);
 assert.equal(checkMerge(s,'a','a',rules,catalog).ok,false);assert.equal(checkMerge(s,'a','b',{...rules,pairs:[]},catalog).ok,false);
 s.data.heroes[1]!.definitionId='other';assert.equal(checkMerge(s,'a','b',rules,catalog).ok,false);s.data.heroes[1]!.definitionId='tier1';s.data.heroes[1]!.deployed=true;
 assert.equal(checkMerge(s,'a','b',{...rules,deployedPolicy:'reject'},catalog).ok,false);assert.deepEqual(checkMerge(s,'a','b',rules,catalog),{ok:true,resultDefinitionId:'tier2',destinationSlot:1,deployed:true});
 s.data.heroes[1]!.tier=2;assert.equal((checkMerge(s,'a','b',rules,catalog) as {reason:string}).reason,'MAX_TIER');
});
