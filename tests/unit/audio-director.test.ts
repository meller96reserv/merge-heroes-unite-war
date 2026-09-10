import test from 'node:test';import assert from 'node:assert/strict';
import {AudioDirector} from '../../app/src/audio/AudioDirector';
import type {AudioDriver,AudioClip,AudioEventDefinition,AudioStart} from '../../app/src/audio/AudioTypes';
const event=(id:string,bus:AudioEventDefinition['bus']):AudioEventDefinition=>({id,bus,files:[{key:id,source:1,durationMs:100}],gainDb:0,cooldownMs:0,maxConcurrent:2,pitchRange:0,duckMusicDb:0,neutralVariant:null});
class Driver implements AudioDriver {
 starts:{clip:AudioClip;options:AudioStart;gain:number;stopped:boolean;paused:boolean}[]=[];
 stats={context:'test'};async prepare(){}async unlock(){return true;}async setActive(){}
 start(clip:AudioClip,options:AudioStart){const r={clip,options,gain:options.gain,stopped:false,paused:false};this.starts.push(r);return {setGain:(gain:number)=>{r.gain=gain;},pause:()=>{r.paused=true;},resume:()=>{r.paused=false;},stop:()=>{r.stopped=true;}};}
 dispose(){}
}
const flush=()=>new Promise(resolve=>setTimeout(resolve,0));
test('activation/mute/focus gate real playback without replaying suppressed sounds or duplicating loops',async()=>{
 const driver=new Driver(),catalog={click:event('click','ui'),main:event('main','music'),wind:event('wind','ambience')},audio=new AudioDirector(driver,catalog);
 audio.setLoop('music','main');audio.setLoop('ambience','wind');await audio.initialize();
 assert.equal(audio.emit('click'),'suppressed');assert.equal(driver.starts.length,0);
 await audio.unlock();assert.equal(driver.starts.length,2);await new Promise(resolve=>setTimeout(resolve,650));
 audio.setLoop('music','main');audio.setGains(.3,.7);assert.equal(driver.starts.length,2);
 assert.equal(driver.starts[0]?.gain,.3);assert.equal(driver.starts[1]?.gain,.7);
 assert.equal(audio.emit('click',{id:'click:1'}),'played');assert.equal(audio.emit('click',{id:'click:1'}),'duplicate');
 audio.setActive(false);assert.equal(driver.starts[2]?.stopped,true);assert.equal(audio.emit('click'),'suppressed');
 audio.setActive(true);await flush();assert.equal(driver.starts.length,3);assert.equal(audio.stats.loops,2);
 audio.setGains(0,0);assert.equal(driver.starts[0]?.paused,true);assert.equal(audio.emit('click'),'suppressed');
 audio.setGains(.5,1);assert.equal(driver.starts[0]?.paused,false);assert.equal(driver.starts.length,3);
 audio.dispose();assert.ok(driver.starts.every(r=>r.stopped));
});
test('late preload after root disposal cannot restart music',async()=>{
 let finish!:()=>void;const driver=new Driver();driver.prepare=()=>new Promise<void>(resolve=>{finish=resolve;});
 const audio=new AudioDirector(driver,{main:event('main','music')});audio.setLoop('music','main');const loading=audio.initialize();await audio.unlock();audio.dispose();finish();await loading;
 assert.equal(driver.starts.length,0);assert.equal(audio.stats.ready,0);
});
test('fast rewarded outcomes finish native pause before SDK show and recover a single prior loop after native activation',async()=>{
 const {AudioLifecycle}=await import('../../app/src/audio/AudioLifecycle');
 const {createState}=await import('../../game-core/src/model/GameState');
 const driver=new Driver(),calls:string[]=[];let enabled=false;
 driver.setActive=async(active:boolean)=>{calls.push(`start:${active}`);await new Promise(r=>setTimeout(r,2));enabled=active;calls.push(`done:${active}`);};
 const start=driver.start.bind(driver);driver.start=(clip,options)=>{assert.equal(enabled,true);return start(clip,options);};
 const audio=new AudioDirector(driver,{main:event('main','music')}),life=new AudioLifecycle(audio);life.apply(createState({dataVersion:'playable-v1',initialGold:'0',utcMs:0}));audio.setLoop('music','main');await audio.initialize();await audio.unlock();
 for(const outcome of ['completed','cancelled','unavailable','failed']){
  const result=await life.during('rewarded',async()=>{assert.equal(enabled,false);assert.ok(driver.starts.every(v=>v.paused));calls.push('ad:'+outcome);return outcome;});
  assert.equal(result,outcome);assert.equal(enabled,true);assert.equal(driver.starts.filter(v=>!v.stopped).length,1);assert.equal(driver.starts[0]!.paused,false);
 }
 await life.during('background-ad',async()=>{life.setGate('app',false);});assert.equal(enabled,false);assert.equal(driver.starts[0]!.paused,true);life.setGate('app',true);await audio.flushFocus();assert.equal(driver.starts[0]!.paused,false);
 audio.setGains(0,1);await life.during('muted-ad',async()=>{});assert.equal(driver.starts[0]!.paused,true);assert.equal(driver.starts.length,1);
 audio.dispose();
});
