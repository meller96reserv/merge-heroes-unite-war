import type {GameState} from '../model/GameState';
import type {Clock} from '../ports';

export type RewardedOperation = NonNullable<GameState['data']['rewardedOperations']>[string];
export type RewardedPlacement = RewardedOperation['placement'];
export type RewardedBinding = Pick<RewardedOperation,'id'|'placement'|'outcomeId'|'sessionId'>;
export type RewardedResult = RewardedBinding & {status:'completed'|'cancelled'|'failed'|'unavailable'};
/** PROPOSED callback freshness window. Confirmed durable entitlements do not
 * expire: a process restart must still finish a previously confirmed grant. */
export const REWARDED_ATTEMPT_MS=10*60*1000;
const identity=(id:string)=>/^[A-Za-z][A-Za-z0-9_.:-]{0,127}$/.test(id);
const matches=(op:RewardedOperation,b:RewardedBinding)=>op.id===b.id&&op.placement===b.placement&&op.outcomeId===b.outcomeId&&op.sessionId===b.sessionId;

/** Call only from a validated placement owner. Outcome is an entitlement ID,
 * never an amount provided by the UI or the advertising SDK. */
export function reserveRewardedOperation(state:GameState,binding:RewardedBinding,clock:Pick<Clock,'utcMs'>):RewardedOperation {
  if(![binding.id,binding.outcomeId,binding.sessionId].every(identity)||!['wheel','freeCoins','stageBoost'].includes(binding.placement)) throw Error('Invalid rewarded identity');
  const records=state.data.rewardedOperations??{},previous=records[binding.id];
  if(previous){if(!matches(previous,binding)) throw Error('Conflicting rewarded identity');return previous;}
  if(Object.hasOwn(state.data.sourceWatermarks,`rewarded:${binding.id}`)) throw Error('Consumed rewarded identity');
  const utc=clock.utcMs();
  if(!Number.isSafeInteger(utc)||utc<Math.max(state.updatedAt,state.lastActiveAt)||!Number.isSafeInteger(utc+REWARDED_ATTEMPT_MS)) throw Error('Invalid rewarded clock');
  if(Object.values(records).some(op=>op.placement===binding.placement&&op.outcomeId===binding.outcomeId&&op.status==='confirmed')) throw Error('Outcome already confirmed');
  // One foreground attempt owns SDK callbacks. Replacing an abandoned attempt
  // invalidates its late callback without deleting the underlying prize.
  for(const operation of Object.values(records)) if(operation.status==='reserved') operation.status='cancelled';
  const operation:RewardedOperation={...binding,createdAt:utc,expiresAt:utc+REWARDED_ATTEMPT_MS,status:'reserved'};
  records[operation.id]=operation;state.data.rewardedOperations=records;
  return operation;
}

/** Only the trusted platform adapter maps an SDK reward-completed callback to
 * `completed`. Ad close/display/click/no-fill never map to that value. The
 * current application session is injected by the owner, not read from payload. */
export function recordRewardedResult(state:GameState,result:RewardedResult,currentSessionId:string,clock:Pick<Clock,'utcMs'>):boolean {
  const operation=state.data.rewardedOperations?.[result.id];
  if(!operation||operation.status!=='reserved'||!matches(operation,result)||operation.sessionId!==currentSessionId) return false;
  const utc=clock.utcMs();
  if(!Number.isSafeInteger(utc)||utc<operation.createdAt||utc<state.updatedAt||utc>=operation.expiresAt) return false;
  if(!['completed','cancelled','failed','unavailable'].includes(result.status)) return false;
  operation.status=result.status==='completed'?'confirmed':'cancelled';
  return true;
}

/** Must execute in the same draft as the owning feature's grant+receipt.
 * Failed persistence installs neither consumption nor currency. */
export function consumeRewardedOperation(state:GameState,id:string,placement:RewardedPlacement,outcomeId:string):boolean {
  const operation=state.data.rewardedOperations?.[id];
  if(!operation||operation.status!=='confirmed'||operation.placement!==placement||operation.outcomeId!==outcomeId||Object.hasOwn(state.data.sourceWatermarks,`rewarded:${id}`)) return false;
  operation.status='consumed';state.data.sourceWatermarks[`rewarded:${id}`]=state.revision+1;
  return true;
}
