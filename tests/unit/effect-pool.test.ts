import {test} from 'node:test';import assert from 'node:assert/strict';
import {EffectPool} from '../../app/src/presentation/EffectPool';
import {AnimationDirector} from '../../app/src/presentation/AnimationDirector';
test('saturation drops cosmetic acquisition; recycled lease cannot be released by an old completion',()=>{
 let resets=0,listeners=0,resources=0;
 const pool=new EffectPool(1,()=>({opacity:1,x:0}),v=>{v.opacity=1;v.x=0;resets++;});
 const first=pool.acquire()!;first.value.x=100;first.value.opacity=.4;
 listeners++;resources++;pool.own(first,()=>{listeners--;});pool.own(first,()=>{resources--;});
 assert.equal(pool.acquire(),null);assert.equal(pool.release(first),true);assert.equal(listeners,0);assert.equal(resources,0);
 const reused=pool.acquire()!;assert.equal(reused.slot,first.slot);assert.notEqual(reused.generation,first.generation);assert.deepEqual(reused.value,{opacity:1,x:0});assert.equal(pool.release(first),false);assert.equal(pool.stats.active,1);
 pool.dispose();assert.equal(resets,2);assert.deepEqual(pool.stats,{allocated:0,active:0,callbacks:0,capacity:1});assert.equal(pool.acquire(),null);
});
test('director cancellation midway releases all owned callbacks; repeated scenes return to baseline',()=>{
 let timers=0,destroyed=0;const pool=new EffectPool(4,()=>({progress:0}),v=>v.progress=0,()=>{destroyed++;}),director=new AnimationDirector();
 for(let scene=0;scene<50;scene++){
  const mount=director.mount('merge-result',()=>{});
  director.play(mount,'hero.mergeIn',`merge${scene}`,()=>{const lease=pool.acquire()!;timers++;pool.own(lease,()=>{timers--;});lease.value.progress=.5;return()=>{pool.release(lease);};});
  director.unmount(mount);assert.equal(timers,0);assert.equal(pool.stats.callbacks,0);assert.equal(pool.stats.active,0);
 }
 assert.equal(pool.stats.allocated,1);pool.dispose();assert.equal(destroyed,1);
});
test('one failing cleanup cannot leak sibling resources or recycle a value before reset finishes',()=>{
 const pool=new EffectPool(1,()=>({value:5}),v=>v.value=0);let cleaned=0;const lease=pool.acquire()!;
 pool.own(lease,()=>{cleaned++;assert.equal(pool.acquire(),null);});pool.own(lease,()=>{throw Error('disposed backend');});
 assert.throws(()=>pool.release(lease),AggregateError);assert.equal(cleaned,1);assert.equal(pool.stats.callbacks,0);assert.equal(lease.value.value,0);
 let staleCleaned=false;assert.equal(pool.own(lease,()=>{staleCleaned=true;}),false);assert.equal(staleCleaned,true);pool.dispose();
});
test('failed resets quarantine the slot; scene disposal still cleans sibling effects',()=>{
 const pool=new EffectPool(1,()=>({}),()=>{throw Error('reset failed');});const lease=pool.acquire()!;assert.throws(()=>pool.release(lease));assert.equal(pool.acquire(),null);pool.dispose();
 const d=new AnimationDirector();let live=0;
 for(const id of ['bad','good']){const m=d.mount(id,()=>{});d.play(m,'hero.spawn',id,()=>{live++;return()=>{live--;if(id==='bad')throw Error('cleanup failed');};});}
 assert.throws(()=>d.dispose(),AggregateError);assert.equal(live,0);assert.deepEqual(d.stats,{mounts:0,active:0});
});
