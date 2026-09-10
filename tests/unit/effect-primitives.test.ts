import {test} from 'node:test';import assert from 'node:assert/strict';
import {EffectPrimitives,effectProfile,effectRecipes,type EffectKind} from '../../app/src/presentation/EffectPrimitives';
import {createState,snapshot} from '../../game-core/src/model/GameState';
test('all five original recipes bound geometry, particle counts and reduced-motion fallbacks',()=>{
 for(const kind of Object.keys(effectRecipes) as EffectKind[]){
  const full=effectProfile(kind,'full'),low=effectProfile(kind,'low'),reduced=effectProfile(kind,'reduced');
  assert.ok(full.count<=8&&full.radius<=32);assert.ok(low.count<=4);assert.equal(reduced.count,0);assert.equal(reduced.spatial,false);assert.equal(reduced.durationMs,140);
 }
});
test('1000 hit burst saturates at 24, reused leases reject old callbacks, skip cannot affect core',()=>{
 const core=snapshot(createState({dataVersion:'test',initialGold:'100',utcMs:0})),before=JSON.stringify(core),p=new EffectPrimitives();
 for(let i=0;i<1000;i++)p.emit({id:`hit${i}`,kind:'hit',x:300,y:390,mode:'full'});
 assert.equal(p.stats.active,24);assert.equal(p.stats.allocated,24);assert.equal(p.stats.seen,512);const stale=p.getSnapshot()[0]!;
 p.clear();assert.equal(p.stats.active,0);p.emit({id:'next',kind:'crit',x:300,y:390,mode:'low'});p.release(stale);assert.equal(p.stats.active,1);
 p.emit({id:'next',kind:'crit',x:300,y:390,mode:'low'});assert.equal(p.stats.active,1);p.dispose();assert.equal(p.stats.active,0);assert.equal(p.stats.callbacks,0);assert.equal(JSON.stringify(core),before);
});
