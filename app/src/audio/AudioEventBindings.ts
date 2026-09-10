import type {DomainEvent} from '../../../game-core/src/events/EventBus';
import type {Snapshot} from '../../../game-core/src/model/GameState';
import type {AttackIntent} from '../../../game-core/src/systems/AttackSystem';
import type {DamageResult} from '../../../game-core/src/systems/DamageResolver';
import type {Death} from '../../../game-core/src/systems/DeathSystem';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
import type {BattleVisualSnapshot} from '../battle/BattleRuntime';
import {CascadeMotion} from '../presentation/CascadeMotion';
import type {AudioDirector} from './AudioDirector';

const meta:Readonly<Record<string,string>>={
 'daily.claimed':'reward.daily','chest.opened':'reward.chest','relic.opened':'reward.chest',
 'equipment.changed':'equipment.equip','item.enhanced':'equipment.upgrade','upgrade.committed':'equipment.upgrade',
 'tier.discovered':'progress.unlock','feature.unlocked':'progress.unlock','stage.cleared':'progress.stageClear',
};
/** Event-only projection: authoritative commits for money/meta and concrete
 * simulation events for attacks/hits. No timers, grants or animation callbacks. */
export class AudioEventBindings {
 private seen=new Set<string>();private lastEncounter='';private cascade=new CascadeMotion();
 battleVisible=true;
 constructor(private audio:Pick<AudioDirector,'emit'>){}
 private once(key:string){if(this.seen.has(key))return false;this.seen.add(key);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value!);return true;}
 private emit(id:string,key:string,options:{rate?:number;variant?:number}={}){if(this.once(key))this.audio.emit(id,{id:key,...options});}
 battle(snapshot:BattleVisualSnapshot){
  const encounter=snapshot.combat.encounter;
  if(this.lastEncounter!==encounter.id){
   this.lastEncounter=encounter.id;
   if(snapshot.boss&&!snapshot.paused&&this.battleVisible)this.emit('boss.intro',`${encounter.id}:boss-intro`);
  }
  // Consume identities while hidden/paused so a foreground return cannot replay
  // old attacks. The battle may continue logically behind a required meta screen.
  for(const event of snapshot.events){
   if(event.type==='attack.intent'){
    const attack=event.payload as AttackIntent,key=`attack:${attack.id}`;
    if(!this.once(key)||snapshot.paused||!this.battleVisible)continue;
    const actor=encounter.entities.find(e=>e.id===attack.actorId);if(!actor)continue;
    const kind=actor.side==='hero'?heroes.get(actor.definitionId).attackType:'melee';
    this.audio.emit(`combat.${kind}`,{id:key});
   }else if(event.type==='damage.applied'){
    const hit=event.payload as DamageResult,key=`hit:${hit.attackId}`;
    if(!this.once(key)||snapshot.paused||!this.battleVisible||hit.applied<=0)continue;
    this.audio.emit(hit.crit?'combat.crit':'combat.hit',{id:key});
   }else if(event.type==='enemy.died'){
    const death=event.payload as Death,key=`death:${death.encounterId}:${death.entityId}`;
    if(!this.once(key)||snapshot.paused||!this.battleVisible)continue;
    this.audio.emit(snapshot.boss?'boss.death':'enemy.deathSmall',{id:key});
   }
  }
 }
 committed(previous:Snapshot,next:Snapshot,batch:readonly DomainEvent[]){
  const steps=this.cascade.project(previous,next,batch).steps;
  for(const event of batch){
   if(event.type==='purchase.succeeded'){
    const purchase=event.payload as {cost:string};
    this.emit('hero.spawn',`spawn:${event.eventId}`);
    if(BigInt(purchase.cost)>0)this.emit('economy.goldSpend',`spend:${event.eventId}`);
   }else if(event.type==='merge.completed'){
    const p=event.payload as {resultTier:number},step=steps.find(s=>s.id===event.eventId);
    const band=p.resultTier<=3?'low':p.resultTier<=6?'mid':'high';
    this.emit(`merge.${band}`,`merge:${event.eventId}`,{rate:step?.pitch??1});
    if(step&&step.intensity>1)this.emit('merge.cascade',`cascade:${event.eventId}`,{variant:step.intensity-1});
   }else {
    const mapped=meta[event.type];
    if(mapped&&(!['stage.cleared','feature.unlocked'].includes(event.type)||this.battleVisible))this.emit(mapped,`meta:${mapped}:${event.transactionId}`);
   }
  }
  // A committed receipt delta, not a balance-label change, owns currency sound.
  const previousIds=new Set(previous.data.transactionReceipts.map(r=>r.id)),gained=new Set<string>();
  for(const receipt of next.data.transactionReceipts){
   if(previousIds.has(receipt.id))continue;
   if(!this.battleVisible&&(receipt.source.startsWith('kill:')||receipt.source.startsWith('stageFirstClear:')))continue;
   for(const grant of receipt.grants)if(grant.kind==='currency'&&BigInt(grant.amount)>0)gained.add(grant.id);
  }
  const transaction=batch[0]?.transactionId;
  if(transaction)for(const currency of gained)if(currency==='gold'||currency==='gem')this.emit(currency==='gold'?'economy.goldGain':'economy.gemGain',`gain:${transaction}:${currency}`);
 }
 clear(){this.cascade.clear();}
}
