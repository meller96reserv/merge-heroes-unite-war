import type {Snapshot} from '../../../game-core/src/model/GameState';
import type {DomainEvent} from '../../../game-core/src/events/EventBus';

export type CascadeStep=Readonly<{id:string;newId:string;tier:number;sourceTier:number;sourceSlot:number;targetSlot:number;intensity:number;pitch:number;order:number}>;
/** Cosmetic ancestry only. Committed order and reward RNG are never modified. */
export class CascadeMotion {
 private seen=new Set<string>();
 private ancestors=new Map<string,{intensity:number;at:number}>();
 private order=0;
 constructor(private now:()=>number=()=>performance.now()){}
 project(previous:Snapshot,next:Snapshot,events:readonly DomainEvent[]){
  const now=this.now(),roster=new Map(previous.data.heroes.map(h=>[h.id,{tier:h.tier,slotId:h.slotId}]));
  const steps:CascadeStep[]=[];
  for(const [id,entry] of this.ancestors)if(now-entry.at>1500||now<entry.at)this.ancestors.delete(id);
  for(const event of events){
   if(event.type!=='merge.completed'||this.seen.has(event.eventId))continue;
   this.seen.add(event.eventId);if(this.seen.size>256)this.seen.delete(this.seen.values().next().value!);
   const p=event.payload as {oldIds:string[];newId:string;resultTier:number;destinationSlot:number};
   const source=roster.get(p.oldIds[0]!),target=roster.get(p.oldIds[1]!);if(!source||!target)continue;
   const intensity=Math.min(4,1+Math.max(...p.oldIds.map(id=>this.ancestors.get(id)?.intensity??0)));
   for(const id of p.oldIds){roster.delete(id);this.ancestors.delete(id);}
   roster.set(p.newId,{tier:p.resultTier,slotId:p.destinationSlot});
   this.ancestors.set(p.newId,{intensity,at:now});
   if(this.ancestors.size>32)this.ancestors.delete(this.ancestors.keys().next().value!);
   steps.push(Object.freeze({id:event.eventId,newId:p.newId,tier:p.resultTier,sourceTier:source.tier,sourceSlot:source.slotId,targetSlot:p.destinationSlot,intensity,pitch:1+0.06*(intensity-1),order:++this.order}));
  }
  // An atomic auto cascade may already have consumed intermediate heroes. Coalesce
  // those pulses into surviving results; never display a ghost over a newer board.
  const visible=steps.filter(s=>next.data.heroes.some(h=>h.id===s.newId&&h.slotId===s.targetSlot&&h.tier===s.tier));
  return {steps:Object.freeze(steps),visible:Object.freeze(visible)};
 }
 clear(){this.ancestors.clear();}
 get stats(){return {ancestry:this.ancestors.size,seen:this.seen.size};}
}
