import {test} from 'node:test';import assert from 'node:assert/strict';import {createState} from '../src/model/GameState';import {encodeSave} from '../src/persistence/SaveCodec';import {recoverSave} from '../src/persistence/SaveRecovery';
test('recovery selects newest supported generation and retains corrupt/future/conflicting bytes without reset',()=>{
 const old=createState({dataVersion:'v1',initialGold:'100',utcMs:0});old.generation=1;const next=JSON.parse(JSON.stringify(old));next.generation=2;next.data.currencies.gold='90';const A={slot:'A' as const,bytes:encodeSave(next)},B={slot:'B' as const,bytes:encodeSave(old)};
 assert.deepEqual(recoverSave([],['v1']),{status:'empty',preserve:[]});const result=recoverSave([B,A],['v1']);assert.equal(result.status,'recovered');if(result.status==='recovered')assert.equal(result.state.data.currencies.gold,'90');
 const bad={slot:'A' as const,bytes:'truncated'};const recovered=recoverSave([bad,B],['v1']);assert.equal(recovered.status,'recovered');assert.deepEqual(recovered.preserve,[bad]);assert.equal(recoverSave([bad],['v1']).status,'blocked');
 const future={...next,dataVersion:'v2'};assert.deepEqual(recoverSave([{slot:'A',bytes:encodeSave(future)},B],['v1']).status,'blocked');
 const conflict={...old,data:{...old.data,currencies:{gold:'999'}}};assert.equal(recoverSave([{slot:'A',bytes:encodeSave(conflict)},B],['v1']).status,'blocked');
 assert.equal(B.bytes,encodeSave(old));
});
