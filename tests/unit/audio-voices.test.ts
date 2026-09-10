import test from 'node:test';import assert from 'node:assert/strict';
import {VoiceAllocator} from '../../app/src/audio/VoiceAllocator';
import type {AudioEventDefinition} from '../../app/src/audio/AudioTypes';
const definition=(id:string,extra:Partial<AudioEventDefinition>={}):AudioEventDefinition=>({id,bus:'sfx',files:[0,1,2].map(n=>({key:`${id}:${n}`,source:n,durationMs:100})),gainDb:-18,cooldownMs:45,maxConcurrent:6,pitchRange:.06,duckMusicDb:0,neutralVariant:null,...extra});
test('100 simultaneous hits obey cadence, concurrency and bounded source ownership',()=>{
 let now=0;const voices=new VoiceAllocator(()=>now),hit=definition('combat.hit');
 const accepted=Array.from({length:100},()=>voices.reserve(hit)).filter(Boolean);
 assert.equal(accepted.length,1);assert.equal(voices.stats.droppedByBudget,99);
 for(let i=0;i<100;i++){now+=45;const lease=voices.reserve(hit)!;assert.ok(lease);assert.ok(voices.stats.allocated<=6);}
 assert.equal(voices.stats.allocated,6);voices.clear();assert.equal(voices.stats.allocated,0);
});
test('important sounds evict oldest quiet voices; quiet cues cannot evict priority results',()=>{
 let now=0;const voices=new VoiceAllocator(()=>now,{sfx:2,ui:1});
 const first=voices.reserve(definition('combat.hit'))!;now++;
 voices.reserve(definition('combat.melee'));now++;
 const boss=voices.reserve(definition('boss.death'))!;assert.equal(boss.stolenId,first.id);
 assert.equal(voices.release(first.id),false);assert.equal(voices.stats.allocated,2);
 now++;const result=voices.reserve(definition('wheel.result'))!;assert.ok(result.stolenId);
 now++;assert.equal(voices.reserve(definition('combat.ranged')),null);
 assert.ok(voices.reserve(definition('ui.primary',{bus:'ui'})));assert.equal(voices.stats.allocated,3);
});
test('variant/pitch randomness is local, bounded and excludes the neutral result unless requested',()=>{
 let now=0;const a=new VoiceAllocator(()=>now),b=new VoiceAllocator(()=>now),result=definition('wheel.result',{neutralVariant:2});
 for(let i=0;i<100;i++){
  now+=50;const x=a.reserve(result)!,y=b.reserve(result)!;assert.deepEqual(x,y);
  assert.ok(x.variant===0||x.variant===1);assert.ok(x.rate>=.94&&x.rate<=1.06);a.release(x.id);b.release(y.id);
 }
 now+=50;assert.equal(a.reserve(result,{neutral:true})?.variant,2);
 now+=50;assert.equal(a.reserve(result,{rate:NaN}),null);
});
