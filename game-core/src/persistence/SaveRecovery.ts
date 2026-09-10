import type {SaveCandidate} from '../ports';import type {GameState} from '../model/GameState';import {decodeSave,checksum} from './SaveCodec';
export type Recovery={status:'empty';preserve:readonly SaveCandidate[]}|{status:'recovered';state:GameState;preserve:readonly SaveCandidate[]}|{status:'blocked';reason:'unsupported'|'corrupt'|'conflicting-generation';preserve:readonly SaveCandidate[]};
/** Read-only: caller must archive `preserve` before any replacement write. Never resets. */
export function recoverSave(candidates:readonly SaveCandidate[],supportedDataVersions:readonly string[]):Recovery {
 if(!candidates.length)return {status:'empty',preserve:[]};
 const valid:{state:GameState;candidate:SaveCandidate}[]=[],preserve:SaveCandidate[]=[];let future=false;
 for(const candidate of candidates){
  try{
   const envelope=JSON.parse(candidate.bytes),payload=typeof envelope.payload==='string'&&checksum(envelope.payload)===envelope.checksum?JSON.parse(envelope.payload):null;
   if(payload&&(payload.schemaVersion!==1||!supportedDataVersions.includes(payload.dataVersion)))future=true;
   valid.push({state:decodeSave(candidate.bytes,supportedDataVersions),candidate});
  }catch{preserve.push({...candidate});}
 }
 // A newer application may have written authoritative progress. Do not downgrade it.
 if(future)return {status:'blocked',reason:'unsupported',preserve:candidates.map(c=>({...c}))};
 valid.sort((a,b)=>b.state.generation-a.state.generation);
 const best=valid[0];if(!best)return {status:'blocked',reason:'corrupt',preserve};
 if(valid[1]?.state.generation===best.state.generation&&JSON.stringify(valid[1].state)!==JSON.stringify(best.state))return {status:'blocked',reason:'conflicting-generation',preserve:candidates.map(c=>({...c}))};
 return {status:'recovered',state:best.state,preserve};
}
