import {test} from 'node:test';import assert from 'node:assert/strict';
import {createBoard,assertBoard,unlockBoard,type BoardConfig} from '../src/model/Board';import {createState} from '../src/model/GameState';
test('15 stable slots start with five open; only explicit unlocks open others; duplicates reject',()=>{
 const config:BoardConfig={slotCount:15,columns:5,initialUnlocked:5,deploymentCap:3,slotUnlockIds:Array.from({length:15},(_,i)=>i<5?null:`slot_${i}`)};
 const s=createState({dataVersion:'test',initialGold:'100',utcMs:0});s.data.board=createBoard(config);assertBoard(s);assert.equal(s.data.board.filter(s=>s.unlocked).length,5);
 s.data.unlocks.unlockedIds=['slot_9'];assert.deepEqual(unlockBoard(s,config),[9]);assert.deepEqual(unlockBoard(s,config),[]);assert.equal(s.data.board[8]!.unlocked,false);
 s.data.board[1]!.slotId=0;assert.throws(()=>assertBoard(s));assert.throws(()=>createBoard({...config,slotUnlockIds:[]}));
});
