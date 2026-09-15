import type {Intent} from '../core/commands/Dispatcher';
import type {DamageResult} from '../core/systems/DamageResolver';

export type DamageLabel=Readonly<{id:string;targetId:string;text:string;crit:boolean;lane:number;lease:number}>;
export function damageMotion(progress:number,crit:boolean,lane:number,reduced=false){
 'worklet';
 const p=Math.max(0,Math.min(1,progress));
 return {x:(lane-1)*19+(reduced?0:(lane-1)*8*p),y:reduced?0:-p*(crit?32:24),scale:reduced||!crit?1:1+0.25*Math.sin(Math.min(1,p*4)*Math.PI),opacity:Math.min(1,(1-p)*2)};
}
export function damageDuration(crit:boolean,reduced=false){return reduced?250:crit?800:650;}

/** Cosmetic only: 48 labels, exact integer sums within one committed hit batch.
 * Critical hits stay distinct; consumed events stay consumed after cancellation.
 */
export class DamageLabelPool {
 private records:DamageLabel[]=[];private seen=new Set<string>();private sequence=0;
 constructor(private capacity=48){if(!Number.isInteger(capacity)||capacity<0||capacity>48)throw Error('Invalid damage-label capacity');}
 ingest(events:readonly Intent[]){
  const normals=new Map<string,string>();
  for(const event of events){
   if(event.type!=='damage.applied')continue;
   const result=event.payload as DamageResult;
   if(this.seen.has(result.attackId))continue;
   this.seen.add(result.attackId);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value!);
   if(!Number.isSafeInteger(result.applied)||result.applied<=0||!this.capacity)continue;
   const index=result.crit?-1:this.records.findIndex(r=>r.id===normals.get(result.targetId));
   if(index>=0){const previous=this.records[index]!;this.records[index]=Object.freeze({...previous,text:String(BigInt(previous.text)+BigInt(result.applied))});continue;}
   if(this.records.length===this.capacity){const ordinary=this.records.findIndex(r=>!r.crit);this.records.splice(ordinary<0?0:ordinary,1);}
   const lease=++this.sequence;
   this.records.push(Object.freeze({id:result.attackId,targetId:result.targetId,text:String(result.applied),crit:result.crit,lane:(lease-1)%3,lease}));
   if(!result.crit)normals.set(result.targetId,result.attackId);
  }
 }
 snapshot():readonly DamageLabel[]{return Object.freeze([...this.records]);}
 release(id:string,lease:number){const i=this.records.findIndex(r=>r.id===id&&r.lease===lease);if(i<0)return false;this.records.splice(i,1);return true;}
 clear(){this.records=[];}
 reset(){this.clear();this.seen.clear();}
 get stats(){return {active:this.records.length,seen:this.seen.size,capacity:this.capacity};}
}
