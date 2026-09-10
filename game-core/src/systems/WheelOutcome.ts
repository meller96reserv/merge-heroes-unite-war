import {SeededRng} from '../ports/SeededRng';
import {Amount} from '../model/Amount';
import type {Grant} from './RewardService';

export type WheelSegment = Readonly<{id:string; index:number; weight:number; grants:readonly Grant[]}>;
export type WheelSelection = Readonly<{spinId:string; outcomeId:string; rewardState:readonly number[]}>;
export const WHEEL_COOLDOWN_MS = 12 * 60 * 60 * 1000;

/** Figma labels/order are observed. Equal weights are our versioned PROPOSED
 * product rule, not a probability inferred from sector area or the reference.
 * Keep this version available for saved pending results after future changes. */
export const fortuneV1: readonly WheelSegment[] = [
  '10000', '100', null, '500', '1000', '200', 'free', '300', null, '5000', '150', '800',
].map((amount,index) => ({
  id:`fortune_v1_${index}`, index, weight:1,
  grants:amount===null ? [] : amount==='free'
    ? [{kind:'freeSpin',id:'fortune',amount:'3'}]
    : [{kind:'currency',id:'gold',amount}],
}));

export function validateWheel(segments:readonly WheelSegment[]):number {
  if(segments.length!==12 || new Set(segments.map(s=>s.id)).size!==12 || new Set(segments.map(s=>s.index)).size!==12) throw Error('Invalid wheel mapping');
  let total=0;
  for(const segment of segments){
    if(!/^[a-z0-9_]+$/.test(segment.id) || !Number.isInteger(segment.index) || segment.index<0 || segment.index>=12 || !Number.isSafeInteger(segment.weight) || segment.weight<1) throw Error('Invalid wheel segment');
    total+=segment.weight;
    for(const grant of segment.grants){
      Amount.from(grant.amount);
      if(!((grant.kind==='currency'&&grant.id==='gold') || (grant.kind==='freeSpin'&&grant.id==='fortune'&&Number.isSafeInteger(Number(grant.amount))))) throw Error('Invalid wheel grant');
    }
  }
  if(!Number.isSafeInteger(total) || total>0x100000000) throw Error('Invalid wheel weight total');
  return total;
}

export function wheelSegment(outcomeId:string):WheelSegment {
  const segment=fortuneV1.find(s=>s.id===outcomeId);
  if(!segment) throw Error('Unknown saved wheel outcome');
  return segment;
}
export function wheelLandingAngle(outcomeId:string):number {return (360-wheelSegment(outcomeId).index*30)%360;}

/** Replay receives the durable selection and never draws again. Reservation
 * owns installation of the returned RNG state in the same save transaction. */
export function selectWheelOutcome(spinId:string,rewardState:readonly number[],existing?:WheelSelection,segments:readonly WheelSegment[]=fortuneV1):WheelSelection {
  if(!/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(spinId)) throw Error('Invalid spin identity');
  const total=validateWheel(segments);
  if(existing){
    if(existing.spinId!==spinId || !segments.some(s=>s.id===existing.outcomeId)) throw Error('Conflicting pending spin');
    return {...existing,rewardState:[...existing.rewardState]};
  }
  const rng=new SeededRng(rewardState);
  let draw=rng.below(total);
  for(const segment of segments){
    if(draw<segment.weight) return {spinId,outcomeId:segment.id,rewardState:rng.snapshot()};
    draw-=segment.weight;
  }
  throw Error('Unreachable wheel selection');
}
