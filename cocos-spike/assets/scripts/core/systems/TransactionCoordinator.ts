import type {GameState} from '../model/GameState';import type {SaveStore,Clock} from '../ports';
import {encodeSave as encodeCandidate,decodeSave} from '../persistence/SaveCodec';
export {checksum,encodeSave as encodeCandidate,decodeSave as decodeCandidate} from '../persistence/SaveCodec';
export class TransactionCoordinator {
 private verified=new Map<'A'|'B',{bytes:string;generation:number}>();
 constructor(private store:SaveStore,private clock:Clock,private namespace:string){}
 /** Dispatcher installs only after this promise resolves. A failed attempt may leave an unacknowledged candidate; recovery must validate receipts before replay. */
 commit=async(state:GameState):Promise<void>=>{
  state.generation+=1;state.updatedAt=Math.max(state.updatedAt,this.clock.utcMs());
  // A write can succeed before verification/flush fails. Reuse its exact bytes
  // on a semantically identical retry; the transport must still reject a
  // conflicting state from another session at this generation.
  const intended=encodeCandidate(state);let bytes=intended;
  for(const candidate of await this.store.readCandidates(this.namespace)){
   // Exact bytes already verified by this writer need no second schema walk.
   // Still read both slots: changed/corrupt/concurrent candidates are never trusted.
   const known=this.verified.get(candidate.slot);
   if(known?.bytes===candidate.bytes&&known.generation<state.generation)continue;
   let previous:GameState;try{previous=decodeSave(candidate.bytes);}catch{continue;}
   this.verified.set(candidate.slot,{bytes:candidate.bytes,generation:previous.generation});
   if(previous.generation===state.generation&&encodeCandidate({...previous,updatedAt:state.updatedAt})===intended){state.updatedAt=previous.updatedAt;bytes=candidate.bytes;break;}
  }
  const slot=state.generation%2===0?'A':'B';
  await this.store.writeCandidate(this.namespace,slot,bytes);
  if(await this.store.verifyCandidate(this.namespace,slot)!==bytes)throw Error('Save verification failed');
  await this.store.flush();
  if(await this.store.verifyCandidate(this.namespace,slot)!==bytes)throw Error('Save changed after flush');
  this.verified.set(slot,{bytes,generation:state.generation});
 };
}
