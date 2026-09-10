import {test} from 'node:test';import assert from 'node:assert/strict';
import {wheelEasing,planWheelSpin} from '../../app/src/presentation/WheelMotion';
test('wheel profile is monotonic and stops at the supplied saved angle; boost lasts 1.5 seconds',()=>{
 let previous=0;for(let i=0;i<=100;i++){const next=wheelEasing(i/100);assert.ok(next>=previous&&next<=1);previous=next;}assert.equal(previous,1);
 for(let angle=0;angle<360;angle+=30){const request={id:'saved',landingAngleDegrees:angle},before=JSON.stringify(request),plan=planWheelSpin(721,request);assert.equal(plan.to%360,angle);assert.ok(plan.to-plan.from>=1800);assert.equal(JSON.stringify(request),before);}
 assert.equal(planWheelSpin(0,{id:'boost',landingAngleDegrees:90,kind:'boost'}).durationMs,1500);
 assert.throws(()=>planWheelSpin(0,{id:'bad',landingAngleDegrees:NaN}));
});
