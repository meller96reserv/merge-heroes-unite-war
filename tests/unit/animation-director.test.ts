import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {AnimationDirector,resolveMotion,type MotionEvent} from '../../app/src/presentation/AnimationDirector';
import profiles from '../../app/src/presentation/MotionProfiles.json';
import {createState,snapshot} from '../../game-core/src/model/GameState';
test('all source matrix events have runtime profiles with explicit reduced/low fallbacks',()=>{
 const ids=readFileSync('docs/visual/animation_matrix.csv','utf8').trim().split(/\r?\n/).slice(1).map(row=>row.split(',')[0]);
 assert.deepEqual(Object.keys(profiles),ids);
 for(const event of ids as MotionEvent[]){const full=resolveMotion(event,'full'),low=resolveMotion(event,'low'),reduced=resolveMotion(event,'reduced');assert.equal(low.durationMs,full.durationMs);assert.equal(low.shakeAllowed,false);assert.equal(reduced.spatial,false);assert.equal(reduced.loop,false);assert.ok(reduced.durationMs<=140);}
});
test('death interrupts attack once; repeated hits and stale callbacks cannot restart or resurrect a reused target',()=>{
 const director=new AnimationDirector();let live=0,reconciles=0;const mount=director.mount('boar',()=>reconciles++);
 const start=()=>{live++;return()=>{live--;};};const attack=director.play(mount,'enemy.attack','attack1',start)!;
 const death=director.play(mount,'enemy.death','death1',start)!;assert.equal(live,1);assert.equal(director.finish(attack),false);
 for(let i=0;i<50;i++)assert.equal(director.play(mount,'enemy.hit',`hit${i}`,start),null);
 assert.equal(director.finish(death),true);assert.equal(live,0);assert.equal(director.play(mount,'enemy.idle','idle1',start),null);
 const next=director.mount('boar',()=>reconciles++),nextAttack=director.play(next,'enemy.attack','attack1',start)!;assert.equal(director.finish(death),false);assert.equal(live,1);director.unmount(next);assert.equal(director.finish(nextAttack),false);assert.deepEqual(director.stats,{mounts:0,active:0});assert.equal(live,0);assert.equal(reconciles,3);
});
test('mode switch and scene exit reset every cosmetic resource without changing the core snapshot',()=>{
 const core=createState({dataVersion:'test',initialGold:'100',utcMs:0}),before=snapshot(core),director=new AnimationDirector('full',2);let resources=0,resets=0;
 for(const id of ['hero','enemy']){const m=director.mount(id,()=>resets++);director.play(m,'hero.idle',id,()=>{resources++;return()=>{resources--;};});}
 assert.throws(()=>director.mount('overflow',()=>{}));assert.equal(resources,2);director.setMode('reduced');assert.equal(resources,0);assert.equal(resets,2);director.dispose();assert.deepEqual(director.stats,{mounts:0,active:0});assert.deepEqual(core,before);
});
test('synchronous completion and failed starts leave no active handle or retained resource',()=>{
 const d=new AnimationDirector(),m=d.mount('hero',()=>{});let resources=0;
 d.play(m,'hero.spawn','spawn',ticket=>{resources++;d.finish(ticket);return()=>{resources--;};});assert.equal(resources,0);assert.equal(d.stats.active,0);
 assert.throws(()=>d.play(m,'hero.attack','attack',()=>{throw Error('renderer unavailable');}));assert.equal(d.stats.active,0);d.dispose();
});
