import test from 'node:test';
import assert from 'node:assert/strict';
import {fortuneV1,selectWheelOutcome,validateWheel,wheelLandingAngle,wheelSegment,WHEEL_COOLDOWN_MS} from '../../game-core/src/systems/WheelOutcome';

test('Figma outcomes and landing map are exhaustive; weights are explicit proposed data',()=>{
  assert.equal(validateWheel(fortuneV1),12);
  assert.equal(WHEEL_COOLDOWN_MS,43_200_000);
  assert.deepEqual(fortuneV1.map(s=>s.grants[0]?.amount??'FAIL'),['10000','100','FAIL','500','1000','200','3','300','FAIL','5000','150','800']);
  for(const s of fortuneV1) assert.equal((wheelLandingAngle(s.id)+s.index*30)%360,0);
  assert.equal(wheelSegment('fortune_v1_6').grants[0]?.kind,'freeSpin');
  assert.throws(()=>wheelSegment('missing'));
  for(const invalid of [fortuneV1.slice(1),fortuneV1.map((s,i)=>i? s:{...s,weight:0}),fortuneV1.map(s=>({...s,index:0})),fortuneV1.map(s=>({...s,weight:0x100000000}))]) assert.throws(()=>validateWheel(invalid));
});
test('reward stream selection is deterministic and durable selection replay draws nothing',()=>{
  const before=[5,6,7,8],first=selectWheelOutcome('spin:1',before);
  assert.deepEqual(selectWheelOutcome('spin:1',before),first);
  assert.deepEqual(before,[5,6,7,8]);
  assert.notDeepEqual(first.rewardState,before);
  assert.deepEqual(selectWheelOutcome('spin:1',[9,10,11,12],first),first);
  assert.throws(()=>selectWheelOutcome('spin:2',before,first));
  // All segments remain reachable across successive draws of the saved stream.
  const seen=new Set<string>();
  let stream:readonly number[]=before;
  for(let i=1;i<=256;i++){const result=selectWheelOutcome(`spin:${i}`,stream);seen.add(result.outcomeId);stream=result.rewardState;}
  assert.equal(seen.size,12);
});
