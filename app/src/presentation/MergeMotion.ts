import type {Snapshot} from '../../../game-core/src/model/GameState';
import type {DomainEvent} from '../../../game-core/src/events/EventBus';
import {EffectPool,type EffectLease} from './EffectPool';
import {CascadeMotion,type CascadeStep} from './CascadeMotion';
export type MergeVisual = CascadeStep;
type RecordValue={visual:MergeVisual|null};
export type MergeLease=EffectLease<RecordValue>;
/** Only committed events enter this bounded cosmetic projection. Owned heroes stay in game-core. */
export class MergeMotion {
 private pool=new EffectPool<RecordValue>(4,()=>({visual:null}),v=>{v.visual=null;});
 private records:MergeLease[]=[];
 constructor(private cascade=new CascadeMotion(),private cue:(step:CascadeStep)=>void=()=>{}){}
 private listeners=new Set<()=>void>();
 private value:readonly MergeLease[]=[];
 getSnapshot=()=>this.value;
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn);};};
 private publish(){this.value=Object.freeze([...this.records]);for(const fn of this.listeners)fn();}
 ingest(previous:Snapshot,next:Snapshot,events:readonly DomainEvent[]){
  // If a displayed result was consumed/moved, immediately redraw the authoritative board.
  for(const lease of [...this.records]){
   const v=lease.value.visual!;
   if(!next.data.heroes.some(h=>h.id===v.newId&&h.slotId===v.targetSlot))this.release(lease);
  }
  const cascade=this.cascade.project(previous,next,events);
  for(const step of cascade.steps)try{this.cue(step);}catch{/* An unavailable cosmetic audio hook cannot suppress the result. */}
  for(const step of cascade.visible){
   const lease=this.pool.acquire();if(!lease)continue;
   lease.value.visual=step;this.records.push(lease);
  }
  this.publish();
 }
 release=(lease:MergeLease)=>{if(!this.pool.release(lease))return;this.records=this.records.filter(r=>r!==lease);this.publish();};
 clear=()=>{this.pool.clear();this.cascade.clear();this.records=[];this.publish();};
 dispose(){this.clear();this.pool.dispose();this.listeners.clear();}
 get stats(){return {...this.pool.stats,listeners:this.listeners.size};}
}
export function mergeMarker(ms:number){
 'worklet';
 const t=Math.max(0,Math.min(650,ms));
 return {converge:Math.min(1,t/180),oldOpacity:Math.max(0,1-Math.max(0,t-180)/90),
  reveal:Math.max(0,Math.min(1,(t-270)/120)),settle:Math.max(0,Math.min(1,(t-390)/260)),done:t>=650};
}
