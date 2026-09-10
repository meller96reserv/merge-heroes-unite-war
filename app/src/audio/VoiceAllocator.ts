import type {AudioEventDefinition} from './AudioTypes';
export type VoiceLease={id:number;eventId:string;bus:'ui'|'sfx';priority:number;started:number;variant:number;rate:number;stolenId?:number};
export function audioPriority(id:string){
 if(id.startsWith('boss.'))return 100;
 if(id==='wheel.result'||id==='merge.high')return 90;
 if(id.startsWith('reward.')||id.startsWith('progress.'))return 80;
 if(id.startsWith('ui.')||id.startsWith('merge.'))return 70;
 if(id==='combat.crit')return 60;
 return 30;
}
/** Reserve fade headroom: 22 SFX + at most 2 retiring, 3 UI + 1 retiring.
 * Together these respect the 24-SFX/4-UI physical source ceilings. */
export class VoiceAllocator {
 private entries=new Map<number,VoiceLease>();private last=new Map<string,number>();private sequence=0;private rng=0x6a09e667;
 private drops=0;private steals=0;
 constructor(private now=()=>performance.now(),private budgets={sfx:22,ui:3}){}
 private random(){let x=this.rng;x^=x<<13;x^=x>>>17;x^=x<<5;this.rng=x>>>0;return this.rng/0x100000000;}
 reserve(event:AudioEventDefinition,options:{neutral?:boolean;variant?:number;rate?:number}={}):VoiceLease|null {
  if(event.bus!=='ui'&&event.bus!=='sfx')return null;
  const now=this.now(),last=this.last.get(event.id)??-Infinity;
  if(now-last<event.cooldownMs){this.drops++;return null;}
  const same=[...this.entries.values()].filter(e=>e.eventId===event.id),bus=[...this.entries.values()].filter(e=>e.bus===event.bus),priority=audioPriority(event.id);
  let stolen:VoiceLease|undefined;
  if(same.length>=event.maxConcurrent)stolen=same[0];
  else if(bus.length>=this.budgets[event.bus])stolen=bus.filter(e=>e.priority<=priority).sort((a,b)=>a.priority-b.priority||a.started-b.started||a.id-b.id)[0];
  if(bus.length>=this.budgets[event.bus]&&!stolen){this.drops++;return null;}
  const regular=event.neutralVariant??event.files.length;
  const variant=options.neutral&&event.neutralVariant!==null?event.neutralVariant:options.variant??Math.floor(this.random()*regular);
  if(!event.files[variant])return null;
  const base=options.rate??1;if(!Number.isFinite(base))return null;
  const rate=Math.max(.5,Math.min(event.id.startsWith('merge.')?1.18:2,base*(1+(this.random()*2-1)*event.pitchRange)));
  if(stolen){this.entries.delete(stolen.id);this.steals++;}
  const lease:VoiceLease={id:++this.sequence,eventId:event.id,bus:event.bus,priority,started:now,variant,rate,...(stolen?{stolenId:stolen.id}:{})};
  this.entries.set(lease.id,lease);this.last.set(event.id,now);return lease;
 }
 release(id:number){return this.entries.delete(id);}
 clear(){this.entries.clear();}
 get stats(){return {allocated:this.entries.size,droppedByBudget:this.drops,voiceSteals:this.steals};}
}
