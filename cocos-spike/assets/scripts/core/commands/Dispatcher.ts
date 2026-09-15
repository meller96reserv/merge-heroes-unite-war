import {EventBus,freeze,type DomainEvent} from '../events/EventBus';
import {assertState,draft,snapshot,type GameState,type Snapshot} from '../model/GameState';
export type Command={type:string;commandId:string;expectedRevision?:number};
export type Rejection='INVALID_COMMAND'|'STALE_REVISION'|'COMMAND_ID_CONFLICT'|'INVALID_STATE'|'SAVE_FAILED'|'INSUFFICIENT_GOLD'|'BOARD_FULL'|'DEPLOYMENT_FULL'|'INVALID_MERGE'|'LOCKED'|'MAX_TIER';
export type Intent={type:string;payload:unknown};
export type Reduction={ok:true;events:Intent[]}|{ok:false;reason:Rejection};
export type Result={ok:true;revision:number;duplicate:boolean}|{ok:false;reason:Rejection};
export type CommitDraft=(state:GameState)=>Promise<void>;
/** All reducers operate on isolated drafts. The required commit port is the authority barrier. */
export class Dispatcher<C extends Command> {
 private state:Snapshot;private tail:Promise<unknown>=Promise.resolve();
 private operations=new Map<string,{signature:string;result:Promise<Result>}>();
 readonly events=new EventBus<DomainEvent>();
 constructor(initial:GameState,private reduce:(state:GameState,command:C)=>Reduction,private commit:CommitDraft){assertState(initial);this.state=snapshot(initial);}
 getSnapshot=()=>this.state;
 flush=async()=>{await this.tail;};
 subscribe=(listener:()=>void)=>this.events.subscribe(()=>listener());
 dispatch(command:C):Promise<Result>{
  if(!/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(command.commandId)||!command.type)return Promise.resolve({ok:false,reason:'INVALID_COMMAND'});
  const signature=JSON.stringify(command),copy=freeze(JSON.parse(signature) as C) as C;
  const existing=this.operations.get(copy.commandId);
  if(existing)return existing.signature===signature?existing.result.then(r=>r.ok?{...r,duplicate:true}:r):Promise.resolve({ok:false,reason:'COMMAND_ID_CONFLICT'});
  const result=this.tail.then(()=>this.execute(copy));
  this.operations.set(copy.commandId,{signature,result});this.tail=result.catch(()=>{});
  void result.then(r=>{if(!r.ok)this.operations.delete(copy.commandId);});return result;
 }
 private async execute(command:C):Promise<Result>{
  if(command.expectedRevision!==undefined&&command.expectedRevision!==this.state.revision)return {ok:false,reason:'STALE_REVISION'};
  const candidate=draft(this.state);let result:Reduction;
  try{result=this.reduce(candidate,command);if(!result.ok)return result;candidate.revision=this.state.revision+1;assertState(candidate);}catch{return {ok:false,reason:'INVALID_STATE'};}
  try{await this.commit(candidate);}catch{return {ok:false,reason:'SAVE_FAILED'};}
  this.state=snapshot(candidate);
  const batch=result.events.map((e,i)=>({...e,eventId:`${command.commandId}:${i}`,transactionId:command.commandId,revision:candidate.revision,simulationTick:0}));
  this.events.publish(batch);return {ok:true,revision:candidate.revision,duplicate:false};
 }
}
