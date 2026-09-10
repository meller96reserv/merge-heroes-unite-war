import {test} from 'node:test';import assert from 'node:assert/strict';
import {CascadeMotion} from '../../app/src/presentation/CascadeMotion';
import {MergeMotion} from '../../app/src/presentation/MergeMotion';
import {createState,snapshot} from '../../game-core/src/model/GameState';
import {runAutoMerge} from '../../game-core/src/systems/AutoMergeSystem';
import {heroes,mergeRules} from '../../game-core/src/content/PlayableConfig';
function cascade(tiers:number[]){
 const s=createState({dataVersion:'test',initialGold:'0',utcMs:0,unlockedSlots:15});
 s.data.autoMerge={enabled:true,entitlementId:'test',expiresAtUtcMs:3600000,lastObservedWallUtcMs:0};
 s.data.heroes=tiers.map((tier,i)=>{const h=heroes.instantiate(`hero_tier_${tier}`,`initial-${i}`,i);s.data.board[i]!.unitId=h.id;return h;});
 const previous=snapshot(s),result=runAutoMerge(s,'cascade',0,{...mergeRules,autoPolicy:'slotOrder',autoUnlockId:null},heroes,()=>[]);assert.equal(result.ok,true);
 const events=(result.ok?result.events:[]).map((e,i)=>({...e,eventId:`cascade:${i}`,transactionId:'cascade',revision:1,simulationTick:0}));
 return {previous,next:snapshot(s),events};
}
test('atomic cascade preserves every cue in committed order, coalesces consumed heroes and caps intensity/pitch',()=>{
 const {previous,next,events}=cascade([1,1,2,3,4,5]);const before=JSON.stringify(next),motion=new CascadeMotion(()=>100),p=motion.project(previous,next,events);
 assert.equal(p.steps.length,5);assert.deepEqual(p.steps.map(s=>s.intensity),[1,2,3,4,4]);assert.deepEqual(p.steps.map(s=>s.order),[1,2,3,4,5]);
 assert.ok(p.steps.every(s=>s.pitch>=1&&s.pitch<=1.18));assert.equal(p.visible.length,1);assert.equal(p.visible[0]!.tier,6);assert.equal(p.visible[0]!.intensity,4);
 assert.equal(motion.project(previous,next,events).steps.length,0);assert.equal(JSON.stringify(next),before);
});
test('four-ring pool saturation, stale completion and clear never remove a committed result',()=>{
 const {previous,next,events}=cascade([1,1,3,3,5,5,7,7,9,9]);const before=JSON.stringify(next),cues:number[]=[];
 const motion=new MergeMotion(new CascadeMotion(()=>100),step=>{cues.push(step.order);});motion.ingest(previous,next,events);
 assert.equal(cues.length,5);assert.equal(motion.stats.active,4);const old=motion.getSnapshot()[0]!;
 motion.clear();motion.release(old);assert.equal(motion.stats.active,0);assert.equal(JSON.stringify(next),before);
 motion.ingest(previous,next,events);assert.equal(motion.stats.active,0);assert.equal(cues.length,5);motion.dispose();
});
test('ancestry expires after the proposed 1.5 second chain window and on scene interruption',()=>{
 const {previous,next,events}=cascade([1,1,2]);let now=0;const motion=new CascadeMotion(()=>now);
 const first=motion.project(previous,next,events.slice(0,2));assert.equal(first.steps[0]!.intensity,1);
 now=1600;motion.project(next,next,[]);assert.equal(motion.stats.ancestry,0);motion.clear();assert.equal(motion.stats.ancestry,0);
});
