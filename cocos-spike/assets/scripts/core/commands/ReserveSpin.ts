import type {GameState} from '../model/GameState';
import type {Clock} from '../ports';
import {selectWheelOutcome,WHEEL_COOLDOWN_MS} from '../systems/WheelOutcome';
import type {Command,Reduction} from './Dispatcher';

export type ReserveSpin = Command & {type:'ReserveSpin'};
/** Entitlement, outcome, RNG and receipt are one draft. The dispatcher must
 * persist this draft before any presentation is allowed to begin. */
export function reserveSpin(state:GameState,command:ReserveSpin,clock:Pick<Clock,'utcMs'>):Reduction {
  const source=`wheel.reserve:${command.commandId}`,data=state.data,wheel=data.wheel;
  const receipt=data.transactionReceipts.find(r=>r.id===command.commandId);
  if(receipt) return receipt.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
  if(Object.hasOwn(data.sourceWatermarks,source)) return {ok:true,events:[]};
  if(wheel.pendingSpin?.status==='reserved') return {ok:false,reason:'LOCKED'};
  const utc=clock.utcMs();
  if(!Number.isSafeInteger(utc) || utc<0 || !Number.isSafeInteger(utc+WHEEL_COOLDOWN_MS)) return {ok:false,reason:'INVALID_STATE'};
  // A local clock rollback cannot make a second spin eligible. No reference
  // anti-cheat/server-time claim: forward clock changes need a trusted service.
  if(utc<Math.max(state.updatedAt,state.lastActiveAt) || (utc<wheel.nextFreeAt && wheel.freeSpins===0)) return {ok:false,reason:'LOCKED'};
  if(!Number.isSafeInteger(data.nextInstanceSequence+1)) return {ok:false,reason:'INVALID_STATE'};
  const id=`spin:${data.nextInstanceSequence++}`;
  const selected=selectWheelOutcome(id,data.rng.rewardState);
  // Use the regular timed entitlement first; bonus spins bypass its cooldown.
  if(utc<wheel.nextFreeAt) wheel.freeSpins--;
  wheel.nextFreeAt=utc+WHEEL_COOLDOWN_MS;
  wheel.pendingSpin={id,outcomeId:selected.outcomeId,rewardId:selected.outcomeId,status:'reserved'};
  data.rng.rewardState=[...selected.rewardState];
  data.transactionReceipts.push({id:command.commandId,source,generation:state.generation+1,grants:[]});
  data.sourceWatermarks[source]=state.revision+1;
  return {ok:true,events:[{type:'wheel.reserved',payload:{spinId:id,outcomeId:selected.outcomeId,nextFreeAt:wheel.nextFreeAt}}]};
}
