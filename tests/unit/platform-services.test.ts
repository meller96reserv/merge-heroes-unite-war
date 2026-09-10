import test from 'node:test';
import assert from 'node:assert/strict';
import {StartIoRewarded} from '../../app/src/platform/StartIoRewarded';
import {RequestCoordinator} from '../../app/src/platform/RequestCoordinator';
import {validatedRewardedResult,type RewardedNativeModule} from '../../app/src/platform/PlatformRequests';
import {AnalyticsAdapter} from '../../app/src/analytics/AnalyticsAdapter';
import {LifecycleCoordinator} from '../../app/src/platform/LifecycleCoordinator';
import {SaveCoordinator} from '../../game-core/src/persistence/SaveCoordinator';
import {createState} from '../../game-core/src/model/GameState';
import {externalRoute} from '../../app/src/navigation/ExternalRoutes';
const binding={id:'ad:1',placement:'freeCoins' as const,outcomeId:'coins:1',sessionId:'session:1'};
const wait=()=>new Promise<void>(resolve=>setTimeout(resolve,0));
test('native video completion requires exact operation/placement plus confirmed callback; duplicate show loads once',async()=>{
 let calls=0,finish!:(v:unknown)=>void;
 const native:RewardedNativeModule={initialize:async()=>true,showRewarded:()=>{calls++;return new Promise(r=>{finish=r;});},cancelRewarded:()=>{}};
 const adapter=new StartIoRewarded(native,'1234567');
 const a=adapter.show(binding),b=adapter.show(binding);await wait();assert.equal(calls,1);assert.equal(adapter.isShowing(),true);
 assert.equal(await adapter.show({...binding,id:'ad:2'}),'failed');
 finish({operationId:binding.id,placement:binding.placement,status:'completed',completed:true});assert.equal(await a,'completed');assert.equal(await b,'completed');assert.equal(adapter.isShowing(),false);
 for(const r of [{operationId:'stale',placement:binding.placement,status:'completed',completed:true},{operationId:binding.id,placement:'wheel',status:'completed',completed:true},{operationId:binding.id,placement:binding.placement,status:'completed',completed:false},null])assert.equal(validatedRewardedResult(r,binding),'failed');
 for(const status of ['cancelled','failed','unavailable'] as const)assert.equal(validatedRewardedResult({operationId:binding.id,placement:binding.placement,status,completed:false},binding),status);
 assert.equal(await new StartIoRewarded(native,undefined).show(binding),'unavailable');
});
test('timeout/abort rejects late native completion and never starts work after cancellation',async()=>{
 const coordinator=new RequestCoordinator();let cancelled=0,late!:(value:string)=>void;
 const result=coordinator.run('op',()=>new Promise<string>(r=>{late=r;}),()=>{cancelled++;},5);
 await assert.rejects(result);assert.equal(cancelled,1);assert.equal(coordinator.busy,false);late('completed');await wait();
 let called=false;const queued=coordinator.run('next',async()=>{called=true;return 1;},()=>{});coordinator.cancel();await assert.rejects(queued);await wait();assert.equal(called,false);
 assert.equal(await coordinator.run('ok',async()=>2,()=>{}),2);
});
test('lifecycle flush barrier and generation prevent duplicate or stale resumes',async()=>{
 let pauses=0,resumes=0,flushes=0,release!:()=>void;
 const lifecycle=new LifecycleCoordinator({pause:()=>{pauses++;},resume:()=>{resumes++;}},()=>{flushes++;return new Promise<void>(r=>{release=r;});});
 lifecycle.setActive(true);await wait();assert.equal(resumes,1);lifecycle.setActive(false);lifecycle.setActive(false);assert.equal(flushes,1);
 lifecycle.setActive(true);lifecycle.setActive(false);assert.equal(flushes,2);release();await wait();assert.equal(resumes,1);
 lifecycle.setActive(true);await wait();assert.equal(resumes,2);lifecycle.dispose();lifecycle.setActive(true);await wait();assert.equal(resumes,2);assert.equal(pauses,3);
});
test('save queue preserves every accepted economic write and survives failed storage',async()=>{
 const revisions:number[]=[];let fail=true;
 const queue=new SaveCoordinator(async s=>{await wait();if(fail){fail=false;throw Error('disk');}revisions.push(s.revision);});
 const state=createState({dataVersion:'playable-v1',utcMs:0,initialGold:'100',unlockedSlots:5});
 await assert.rejects(queue.commit(state));await queue.flush();assert.equal(queue.metrics.lastWriteFailed,true);
 const a=queue.commit({...state,revision:1}),b=queue.commit({...state,revision:2});assert.equal(queue.metrics.pending,2);await Promise.all([a,b]);await queue.flush();assert.deepEqual(revisions,[1,2]);assert.deepEqual(queue.metrics,{pending:0,lastWriteFailed:false});
});
test('analytics consent, safe field allowlist, bounded queue and payload routing',async()=>{
 const sent:unknown[]=[],toggles:boolean[]=[];let now=0,fail=false;
 const adapter=new AnalyticsAdapter({start:()=>{},enabled:v=>toggles.push(v),event:(n,p)=>{if(fail)throw Error('network');sent.push([n,p]);},flush:()=>{}},()=>now);
 await adapter.start();adapter.event('hero_purchased',{tier:1});assert.equal(sent.length,0);
 adapter.consent(true);adapter.event('hero_purchased',{tier:2,secret:'must-not-send',stageId:'https://not-allowed'});assert.deepEqual(sent,[['hero_purchased',{schemaVersion:1,tier:2}]]);
 adapter.event('arbitrary',{tier:9});assert.equal(sent.length,1);fail=true;for(let i=0;i<100;i++)adapter.event('hero_purchased',{tier:i});now=61001;fail=false;adapter.flush();assert.equal(sent.length,1);
 adapter.consent(false);adapter.event('hero_purchased',{tier:5});assert.equal(sent.length,1);assert.equal(toggles.at(-1),false);
 assert.equal(externalRoute({route:'wheel'}),'wheel');assert.equal(externalRoute({route:'wheel',gold:1000}),null);assert.equal(externalRoute({route:'https://example.com'}),null);
});
