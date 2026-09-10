import type {SaveStore,SaveCandidate} from '../../../game-core/src/ports';
/** IndexedDB transaction completion is the write acknowledgement, never request success. */
export class WebSaveStore implements SaveStore {
 private database:Promise<IDBDatabase>|null=null;
 constructor(private factory:IDBFactory=indexedDB,private databaseName='merge-heroes-saves-v1',private beforeWrite:()=>void=()=>{}){}
 private open():Promise<IDBDatabase>{
  if(!this.database)this.database=new Promise((resolve,reject)=>{
   const request=this.factory.open(this.databaseName,1);
   request.onupgradeneeded=()=>request.result.createObjectStore('candidates');
   request.onerror=()=>{this.database=null;reject(Error('Save database unavailable'));};
   request.onblocked=()=>{this.database=null;reject(Error('Close another game tab to open saves'));};
   request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();this.database=null;};resolve(db);};
  });return this.database;
 }
 async readCandidates(namespace:string):Promise<SaveCandidate[]>{
  const candidates=await Promise.all((['A','B'] as const).map(async slot=>({slot,bytes:await this.verifyCandidate(namespace,slot)})));
  return candidates.flatMap(c=>c.bytes===null?[]:[{slot:c.slot,bytes:c.bytes}]);
 }
 async writeCandidate(namespace:string,slot:'A'|'B',bytes:string):Promise<void>{
  this.beforeWrite();const db=await this.open();
  const generation:unknown=JSON.parse(JSON.parse(bytes).payload).generation;
  if(typeof generation!=='number'||!Number.isSafeInteger(generation)||generation<1)throw Error('Invalid save generation');
  await new Promise<void>((resolve,reject)=>{
   const tx=db.transaction('candidates','readwrite',{durability:'strict'}),store=tx.objectStore('candidates');let remaining=2,conflict=false;
   tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error(conflict?'Save changed in another session':'Save transaction aborted'));tx.onerror=()=>{};
   for(const candidate of ['A','B']){
    const read=store.get(JSON.stringify([namespace,candidate]));read.onsuccess=()=>{
     const previous=read.result as {generation:number;bytes:string}|undefined;
     if(previous&&previous.generation>=generation&&previous.bytes!==bytes){conflict=true;tx.abort();return;}
     if(--remaining===0&&!conflict)store.put({generation,bytes},JSON.stringify([namespace,slot]));
    };
   }
  });
 }
 async verifyCandidate(namespace:string,slot:'A'|'B'):Promise<string|null>{
  const db=await this.open();return new Promise((resolve,reject)=>{
   const tx=db.transaction('candidates','readonly'),request=tx.objectStore('candidates').get(JSON.stringify([namespace,slot]));let value:string|null=null;
   request.onsuccess=()=>{value=request.result?.bytes??null;};tx.oncomplete=()=>resolve(value);tx.onabort=()=>reject(Error('Save read aborted'));tx.onerror=()=>{};
  });
 }
 async flush():Promise<void>{/* Every write already awaited a strict transaction completion. */}
 async preserve(namespace:string,candidates:readonly SaveCandidate[]):Promise<void>{
  if(!candidates.length)return;const db=await this.open();
  await new Promise<void>((resolve,reject)=>{
   const tx=db.transaction('candidates','readwrite',{durability:'strict'});
   // Original bytes are the collision-free archive identity; never returned to diagnostics.
   for(const c of candidates)tx.objectStore('candidates').put({bytes:c.bytes},JSON.stringify([namespace,'recovery',c.slot,c.bytes]));
   tx.oncomplete=()=>resolve();tx.onabort=()=>reject(Error('Recovery archive failed'));tx.onerror=()=>{};
  });
 }
 async close(){const db=await this.database;db?.close();this.database=null;}
}
