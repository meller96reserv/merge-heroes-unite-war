import type {Snapshot} from '../../../game-core/src/model/GameState';
import {EffectPool,type EffectLease} from './EffectPool';
export type RewardFlyer=Readonly<{currency:'gold'|'gem';x:number;y:number;ordinal:number}>;
export type RewardLease=EffectLease<{flyer:RewardFlyer|null}>;
/** Only new durable receipts create symbolic flyers. Completion owns no grants. */
export class RewardMotion {
 private pool=new EffectPool<{flyer:RewardFlyer|null}>(24,()=>({flyer:null}),v=>{v.flyer=null;});
 private records:RewardLease[]=[];private value:readonly RewardLease[]=[];private listeners=new Set<()=>void>();private lastRevision=-1;
 getSnapshot=()=>this.value;
 subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn);};};
 private publish(){this.value=Object.freeze([...this.records]);for(const fn of this.listeners)fn();}
 ingest(previous:Snapshot,next:Snapshot,source:{x:number;y:number},reduced=false){
  if(next.revision<=previous.revision||next.revision<=this.lastRevision)return;
  this.lastRevision=next.revision;
  if(reduced)return;
  const old=new Set(previous.data.transactionReceipts.map(r=>r.id));
  const currencies=new Set<'gold'|'gem'>();
  for(const receipt of next.data.transactionReceipts){
   if(old.has(receipt.id))continue;
   for(const g of receipt.grants)if(g.kind==='currency'&&(g.id==='gold'||g.id==='gem')&&BigInt(g.amount)>0n)currencies.add(g.id);
  }
  for(const currency of currencies)for(let ordinal=0;ordinal<(currency==='gold'?5:3);ordinal++){
   const lease=this.pool.acquire();if(!lease)break;
   lease.value.flyer=Object.freeze({currency,...source,ordinal});this.records.push(lease);
  }
  if(currencies.size)this.publish();
 }
 release=(lease:RewardLease)=>{if(!this.pool.release(lease))return;this.records=this.records.filter(r=>r!==lease);this.publish();};
 clear=()=>{this.pool.clear();this.records=[];this.publish();};
 get stats(){return this.pool.stats;}
}
