import {test} from 'node:test';import assert from 'node:assert/strict';import {createState} from '../src/model/GameState';import {encodeSave,decodeSave,checksum,validateSave} from '../src/persistence/SaveCodec';
test('canonical roundtrip validates entire schema, corruption, future data and malformed nested state',()=>{
 const s=createState({dataVersion:'proposed-v1',initialGold:'9007199254740993',utcMs:100});
 const bytes=encodeSave(s);assert.deepEqual(decodeSave(bytes,['proposed-v1']),s);assert.equal(encodeSave(Object.fromEntries(Object.entries(s).reverse()) as typeof s),bytes);
 assert.throws(()=>decodeSave(bytes,['other']));assert.throws(()=>decodeSave(bytes.slice(0,-2)));const envelope=JSON.parse(bytes);envelope.checksum='broken';assert.throws(()=>decodeSave(JSON.stringify(envelope)));
 for(const change of [(v:any)=>v.schemaVersion=2,(v:any)=>v.data.currencies.gold='1.2',(v:any)=>v.data.settings.musicGain=2,(v:any)=>v.data.board[0].unitId='missing',(v:any)=>v.data.rng.rewardState=[0,0,0,0],(v:any)=>v.data.unknown=true,(v:any)=>v.generation=Number.MAX_SAFE_INTEGER+1]){
  const v=JSON.parse(JSON.stringify(s));change(v);assert.throws(()=>validateSave(v));const payload=JSON.stringify(v);assert.throws(()=>decodeSave(JSON.stringify({format:1,payload,checksum:checksum(payload)})));
 }
});
