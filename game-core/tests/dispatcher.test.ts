import test from 'node:test';import assert from 'node:assert/strict';
import {Dispatcher,type Command} from '../src/commands/Dispatcher';import {createState} from '../src/model/GameState';
test('TASK-0072 queue, stale revision, invalid draft/RNG rollback and duplicate identity',async()=>{
 const initial=createState({dataVersion:'fixture',initialGold:'100',utcMs:1});let writes=0;
 const d=new Dispatcher<Command>(initial,(s,c)=>{s.data.currencies.gold=String(BigInt(s.data.currencies.gold!)+1n);s.data.rng.combatState[0]=9;if(c.type==='reject')return {ok:false,reason:'LOCKED'};return {ok:true,events:[{type:'changed',payload:{}}]};},async()=>{writes++;});
 const before=JSON.stringify(d.getSnapshot());assert.deepEqual(await d.dispatch({type:'reject',commandId:'r'}),{ok:false,reason:'LOCKED'});assert.equal(JSON.stringify(d.getSnapshot()),before);
 let nested:Promise<unknown>|undefined;d.events.subscribe(batch=>{if(batch[0]?.transactionId==='a')nested=d.dispatch({type:'add',commandId:'b',expectedRevision:1});});
 assert.ok((await d.dispatch({type:'add',commandId:'a',expectedRevision:0})).ok);await nested;
 assert.equal(d.getSnapshot().data.currencies.gold,'102');assert.equal(writes,2);
 assert.deepEqual(await d.dispatch({type:'add',commandId:'a',expectedRevision:0}),{ok:true,revision:1,duplicate:true});assert.equal(writes,2);
 assert.deepEqual(await d.dispatch({type:'other',commandId:'a'}),{ok:false,reason:'COMMAND_ID_CONFLICT'});
 assert.deepEqual(await d.dispatch({type:'add',commandId:'c',expectedRevision:0}),{ok:false,reason:'STALE_REVISION'});
 assert.deepEqual(await d.dispatch({type:'add',commandId:''}),{ok:false,reason:'INVALID_COMMAND'});
});
