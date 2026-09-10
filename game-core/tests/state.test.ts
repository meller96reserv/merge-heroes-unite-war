import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {createState,snapshot,assertState} from '../src/model/GameState';
test('TASK-0071 normalized schema-compatible state and owned/board/deployed invariants',()=>{
 const s=createState({dataVersion:'proposed-v1',initialGold:'100',utcMs:1});assertState(s);assert.equal(s.data.board.length,15);assert.ok(!('route' in s.data));
 s.data.heroes.push({id:'hero:1',definitionId:'hero_tier_1',slotId:0,tier:1,upgradeLevel:0,deployed:true,equippedItemIds:[]});s.data.board[0]!.unitId='hero:1';assertState(s);
 const snap=snapshot(s);s.data.currencies.gold='99';assert.equal(snap.data.currencies.gold,'100');assert.ok(Object.isFrozen(snap.data.heroes[0]));
 for(const change of [(x:any)=>x.data.board[0].unitId=null,(x:any)=>x.data.board[1].unitId='hero:1',(x:any)=>x.data.heroes.push({...x.data.heroes[0]}),(x:any)=>x.data.board[0].unlocked=false,(x:any)=>x.data.currencies.gold='-1']){
  const bad=structuredClone(s);change(bad);assert.throws(()=>assertState(bad));
 }
 assert.throws(()=>assertState(s,0));fs.writeFileSync('analysis/reports/core-state/state-fixture.json',JSON.stringify(s,null,2)+'\n');
});
