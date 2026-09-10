import {EffectPool,type EffectLease} from './EffectPool';
export const effectRecipes={
 hit:{durationMs:140,count:4,radius:18,color:'#fff4c6',outline:'#87552a',shape:'spark'},
 crit:{durationMs:250,count:6,radius:29,color:'#ffdf71',outline:'#985226',shape:'star'},
 merge:{durationMs:380,count:8,radius:32,color:'#8cfff2',outline:'#2e7580',shape:'spark'},
 death:{durationMs:280,count:5,radius:24,color:'#d6e8d9',outline:'#627b80',shape:'puff'},
 reward:{durationMs:560,count:6,radius:30,color:'#ffe488',outline:'#946027',shape:'star'},
} as const;
export type EffectKind=keyof typeof effectRecipes;
export type EffectMode='full'|'low'|'reduced';
export function effectProfile(kind:EffectKind,mode:EffectMode){
 const r=effectRecipes[kind];return {...r,count:mode==='reduced'?0:mode==='low'?Math.ceil(r.count/2):r.count,durationMs:mode==='reduced'?140:r.durationMs,spatial:mode!=='reduced'};
}
export type Burst=Readonly<{id:string;kind:EffectKind;x:number;y:number;mode:EffectMode}>;
export type BurstLease=EffectLease<{burst:Burst|null}>;
/** 24 bursts, at most 192 primitive particles; values never retain combat entities. */
export class EffectPrimitives {
 private pool=new EffectPool<{burst:Burst|null}>(24,()=>({burst:null}),v=>{v.burst=null;});
 private seen=new Set<string>();private records:BurstLease[]=[];
 private value:readonly BurstLease[]=[];private listeners=new Set<()=>void>();
 getSnapshot=()=>this.value;
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn);};};
 private publish(){this.value=Object.freeze([...this.records]);for(const fn of this.listeners)fn();}
 emit(burst:Burst){
  if(this.seen.has(burst.id)||![burst.x,burst.y].every(Number.isFinite))return;
  this.seen.add(burst.id);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value!);
  const lease=this.pool.acquire();if(!lease)return;
  lease.value.burst=Object.freeze({...burst});this.records.push(lease);this.publish();
 }
 release=(lease:BurstLease)=>{if(!this.pool.release(lease))return;this.records=this.records.filter(r=>r!==lease);this.publish();};
 clear=()=>{this.pool.clear();this.records=[];this.publish();};
 dispose(){this.clear();this.pool.dispose();this.listeners.clear();}
 get stats(){return {...this.pool.stats,seen:this.seen.size,listeners:this.listeners.size};}
}
