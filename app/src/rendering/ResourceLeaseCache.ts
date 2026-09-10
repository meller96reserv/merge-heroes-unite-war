type Entry<T>={users:number;value?:T;error?:unknown;loading?:Promise<T>;listeners:Set<()=>void>;timer?:ReturnType<typeof setTimeout>;expired:boolean};
/** Visible consumers own resources. A short grace period absorbs route/motion
 * remounts; pending reads are shared even if the last consumer disappears. */
export class ResourceLeaseCache<K,T>{
 private entries=new Map<K,Entry<T>>();loads=0;
 constructor(private load:(key:K)=>Promise<T>,private graceMs=1500,private release?:(value:T)=>void){}
 private entry(key:K){let e=this.entries.get(key);if(!e){e={users:0,listeners:new Set(),expired:false};this.entries.set(key,e);}return e;}
 get(key:K){return this.entries.get(key)?.value??null;}
 error(key:K){return this.entries.get(key)?.error;}
 retain(key:K,changed?:()=>void){
  const e=this.entry(key);e.users++;e.expired=false;if(e.timer)clearTimeout(e.timer);e.timer=undefined;if(changed)e.listeners.add(changed);
  void this.ready(key).catch(()=>{});let active=true;
  return()=>{if(!active)return;active=false;if(changed)e.listeners.delete(changed);if(--e.users===0&&Number.isFinite(this.graceMs))e.timer=setTimeout(()=>{e.expired=true;this.evict(key,e);},this.graceMs);};
 }
 private evict(key:K,e:Entry<T>){if(e.users||e.loading||!e.expired)return;if(e.value)this.release?.(e.value);this.entries.delete(key);}
 ready(key:K):Promise<T>{
  const e=this.entry(key);if(e.value)return Promise.resolve(e.value);if(e.loading)return e.loading;
  this.loads++;e.error=undefined;
  e.loading=this.load(key).then(value=>{e.value=value;return value;},error=>{e.error=error;throw error;}).finally(()=>{
   e.loading=undefined;for(const changed of e.listeners)changed();this.evict(key,e);
  });return e.loading;
 }
 inspect(){return [...this.entries].map(([key,e])=>({key,users:e.users,value:e.value,pending:!!e.loading,error:!!e.error}));}
}
