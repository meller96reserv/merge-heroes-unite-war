import {test} from 'node:test';import assert from 'node:assert/strict';import {heroAttackTiming} from '../../app/src/presentation/HeroCombatMotion';
import {AnimationDirector} from '../../app/src/presentation/AnimationDirector';
test('hit markers align to actual 0/50/150/350ms domain deadlines, including late presentation',()=>{
 for(const delay of [0,50,150,350])for(const elapsed of [0,25,100,500]){
  const t=heroAttackTiming(delay,elapsed);assert.equal(t.anticipationMs+t.releaseMs,Math.max(0,delay-elapsed));assert.equal(t.hitAtMs,Math.max(0,delay-elapsed));assert.ok(t.recoveryMs>=0&&t.recoveryMs<=140);
 }
 assert.deepEqual(heroAttackTiming(150),{anticipationMs:80,releaseMs:70,recoveryMs:140,hitAtMs:150});assert.throws(()=>heroAttackTiming(-1));
});
test('hit interrupts an attack; death rejects subsequent hit callbacks and target generation changes',()=>{
 const d=new AnimationDirector(),m=d.mount('hero',()=>{});let active='';const play=(name:any,key:string)=>d.play(m,name,key,()=>{active=name;return()=>{active='';};});
 const attack=play('hero.attack','attack1')!;play('hero.hit','hit1');assert.equal(active,'hero.hit');assert.equal(d.finish(attack),false);const death=play('hero.death','death')!;assert.equal(play('hero.hit','hit2'),null);assert.equal(active,'hero.death');d.unmount(m);assert.equal(d.finish(death),false);assert.equal(active,'');
});
