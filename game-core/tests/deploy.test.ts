import {test} from 'node:test';import assert from 'node:assert/strict';import {mergeFixture} from './merge-rules.test';import {deployHero} from '../src/commands/DeployHero';
test('deployment retains ownership/slot; cap and missing hero reject; repeated withdrawal is harmless',()=>{
 const {s}=mergeFixture();const board=JSON.stringify(s.data.board);assert.equal(deployHero(s,{type:'DeployHero',commandId:'d1',heroId:'a',deployed:true},1).ok,true);
 const before=JSON.stringify(s);assert.equal(deployHero(s,{type:'DeployHero',commandId:'d2',heroId:'b',deployed:true},1).ok,false);assert.equal(JSON.stringify(s),before);
 deployHero(s,{type:'DeployHero',commandId:'w1',heroId:'a',deployed:false},1);const withdrawn=JSON.stringify(s);deployHero(s,{type:'DeployHero',commandId:'w2',heroId:'a',deployed:false},1);assert.equal(JSON.stringify(s),withdrawn);
 deployHero(s,{type:'DeployHero',commandId:'d1',heroId:'a',deployed:true},1);assert.equal(s.data.heroes[0]!.deployed,false);assert.equal(JSON.stringify(s.data.board),board);assert.equal(s.data.heroes.length,2);
 assert.equal(deployHero(s,{type:'DeployHero',commandId:'bad',heroId:'missing',deployed:true},1).ok,false);
});
