import type {GameState} from '../model/GameState';import type {SaveStore,Clock} from '../ports';
import {encodeSave as encodeCandidate,decodeSave} from '../persistence/SaveCodec';
export {checksum,encodeSave as encodeCandidate,decodeSave as decodeCandidate} from '../persistence/SaveCodec';
export class TransactionCoordinator {
 constructor(private store:SaveStore,private clock:Clock,private namespace:string){}
 /** Dispatcher installs only after this promise resolves. A failed attempt may leave an unacknowledged candidate; recovery must validate receipts before replay. */
 commit=async(state:GameState):Promise<void>=>{
  state.generation+=1;state.updatedAt=Math.max(state.updatedAt,this.clock.utcMs());
  // A write can succeed before verification/flush fails. Reuse its exact bytes
  // on a semantically identical retry; the transport must still reject a
  // conflicting state from another session at this generation.
  const intended=encodeCandidate(state);
  for(const candidate of await this.store.readCandidates(this.namespace)){
   let previous:GameState;try{previous=decodeSave(candidate.bytes);}catch{continue;}
   if(previous.generation===state.generation&&encodeCandidate({...previous,updatedAt:state.updatedAt})===intended){state.updatedAt=previous.updatedAt;break;}
  }
  const slot=state.generation%2===0?'A':'B',bytes=encodeCandidate(state);
  await this.store.writeCandidate(this.namespace,slot,bytes);
  if(await this.store.verifyCandidate(this.namespace,slot)!==bytes)throw Error('Save verification failed');
  await this.store.flush();
  if(await this.store.verifyCandidate(this.namespace,slot)!==bytes)throw Error('Save changed after flush');
 };
}
