import type {AttackIntent} from './AttackSystem';import type {CombatEntity} from '../model/CombatEntity';import {compareIds} from './TargetingSystem';
const order=(a:AttackIntent,b:AttackIntent)=>a.hitTick-b.hitTick||compareIds(a.actorId,b.actorId)||a.sequence-b.sequence;
/** Encounter-scoped queue; stale source/target hits cancel, never retarget. */
export class HitQueue {
 private pending=new Map<string,AttackIntent>();private seen=new Set<string>();
 constructor(private capacity=128){if(!Number.isInteger(capacity)||capacity<1)throw Error('Invalid hit capacity');}
 enqueue(intents:readonly AttackIntent[]):void {
  const unique=new Map(intents.filter(i=>!this.seen.has(i.id)).map(i=>[i.id,i]));
  if(this.pending.size+unique.size>this.capacity)throw Error('Hit queue capacity exceeded');
  for(const intent of unique.values())if(!Number.isSafeInteger(intent.hitTick)||intent.hitTick<intent.createdTick)throw Error('Invalid hit schedule');
  for(const [id,intent] of unique){this.seen.add(id);this.pending.set(id,Object.freeze({...intent}));}
 }
 drain(tick:number,encounterId:string,entities:readonly CombatEntity[]):AttackIntent[]{
  const due=this.snapshot().filter(i=>i.hitTick<=tick);for(const intent of due)this.pending.delete(intent.id);
  return due.filter(intent=>intent.encounterId===encounterId&&entities.some(e=>e.id===intent.actorId&&e.encounterId===encounterId&&e.hp>0&&e.canAttack)&&entities.some(e=>e.id===intent.targetId&&e.encounterId===encounterId&&e.hp>0));
 }
 snapshot():readonly AttackIntent[]{return [...this.pending.values()].sort(order);}
 cancelActor(actorId:string){for(const [id,intent] of this.pending)if(intent.actorId===actorId)this.pending.delete(id);}
 clear(){this.pending.clear();this.seen.clear();}
}
