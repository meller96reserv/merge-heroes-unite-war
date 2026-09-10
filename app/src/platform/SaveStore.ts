import type {SaveStore as SavePort,SaveCandidate} from '../../../game-core/src/ports';
import {checksum} from '../../../game-core/src/persistence/SaveCodec';
export interface PrivateFiles {
 read(path:string):Promise<string|null>;
 write(path:string,bytes:string):Promise<void>;
 replace(source:string,destination:string):Promise<void>;
 flush():Promise<void>;
}
/** One app-private writer, temporary candidate verification before replacement. */
export class NativeSaveStore implements SavePort {
 private tail:Promise<unknown>=Promise.resolve();
 constructor(private files:PrivateFiles){}
 private path(namespace:string,slot:string){return `${encodeURIComponent(namespace)}.${slot}.json`;}
 async readCandidates(namespace:string):Promise<SaveCandidate[]>{
  const candidates=await Promise.all((['A','B'] as const).map(async slot=>({slot,bytes:await this.verifyCandidate(namespace,slot)})));
  return candidates.flatMap(c=>c.bytes===null?[]:[{slot:c.slot,bytes:c.bytes}]);
 }
 writeCandidate(namespace:string,slot:'A'|'B',bytes:string):Promise<void>{
  const result=this.tail.then(async()=>{
   const destination=this.path(namespace,slot),temporary=`${destination}.pending`;
   await this.files.write(temporary,bytes);if(await this.files.read(temporary)!==bytes)throw Error('Temporary save verification failed');
   await this.files.flush();await this.files.replace(temporary,destination);
  });this.tail=result.catch(()=>{});return result;
 }
 verifyCandidate(namespace:string,slot:'A'|'B'){return this.files.read(this.path(namespace,slot));}
 async flush(){await this.tail;await this.files.flush();}
 async preserve(namespace:string,candidates:readonly SaveCandidate[]){
  for(const c of candidates)for(let i=0;;i++){
   const path=this.path(namespace,`recovery-${c.slot}-${checksum(c.bytes)}-${i}`),old=await this.files.read(path);
   if(old===c.bytes)break;if(old===null){await this.files.write(path,c.bytes);break;}
  }await this.files.flush();
 }
}
