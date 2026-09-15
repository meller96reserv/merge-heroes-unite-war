import {heroStats} from '../selectors/HeroStats';
import {chapterRecovery,validateRecoveryPolicy,restoreEncounterHealth,type RecoveryPolicy,type EncounterHealth} from './RecoveryPolicy';
import {freeze} from '../events/EventBus';import type {Intent} from '../commands/Dispatcher';import type {Snapshot,DeepReadonly} from '../model/GameState';import {combatEntity} from '../model/CombatEntity';import type {HeroCatalog} from '../model/Hero';import {SeededRng} from '../ports/SeededRng';
import type {Encounter} from './EncounterSpawner';import {advanceCooldowns,attackIntents,type AttackIntent} from './AttackSystem';import {acquireTargets} from './TargetingSystem';import {HitQueue} from './HitQueue';import {DamageResolver,type DamageConfig} from './DamageResolver';import {resolveDeaths,type KillEntitlement} from './DeathSystem';
export type BattleConfig=DamageConfig&{stepMs:number;targetingPolicy:'spawnOrder';staleProjectilePolicy:'cancel';hitDelayMs:number};
export type BattleSnapshot=DeepReadonly<{encounter:Encounter;hits:readonly AttackIntent[];pendingRewards:KillEntitlement[];waiting:boolean;rng:readonly number[]}>;
export class BattleSystem {
 private encounter:Encounter;private hits=new HitQueue();private damage:DamageResolver;private rng:SeededRng;private waiting=false;private suspended=false;private rewards:KillEntitlement[]=[];private attackSequences=new Map<string,number>();private health=new Map<string,EncounterHealth>();
 constructor(encounter:Encounter,readonly config:BattleConfig,seed:readonly number[],mode:RecoveryPolicy=chapterRecovery){
  if(config.targetingPolicy!=='spawnOrder'||config.staleProjectilePolicy!=='cancel')throw Error('Unsupported battle policy');
  const policy=validateRecoveryPolicy(mode);this.encounter=JSON.parse(JSON.stringify(encounter));for(const enemy of this.encounter.entities)if(enemy.side==='enemy')enemy.canAttack=enemy.canAttack&&policy.enemyCounterattacks;this.damage=new DamageResolver(config);this.rng=new SeededRng(seed);
 }
 syncRoster(state:Snapshot,catalog:HeroCatalog):void {
  const previous=this.encounter.entities.filter(e=>e.side==='hero'),enemies=this.encounter.entities.filter(e=>e.side==='enemy');
  for(const old of previous){this.attackSequences.set(old.id,old.attackSequence);this.health.set(old.id,{hp:old.hp,deathEmitted:old.deathEmitted});if(!state.data.heroes.some(h=>h.id===old.id&&h.deployed))this.hits.cancelActor(old.id);}
  const heroes=[...state.data.heroes].filter(h=>h.deployed).sort((a,b)=>a.slotId-b.slotId).map(hero=>{
   const definition=catalog.get(hero.definitionId),stats=heroStats(state,definition,hero);
   const existing=previous.find(e=>e.id===hero.id&&e.definitionId===hero.definitionId);
   if(existing){const missing=existing.maxHp-existing.hp;existing.attack=stats.attack;existing.defense=stats.defense;existing.maxHp=stats.hp;existing.hp=existing.hp===0?0:Math.max(1,stats.hp-missing);return existing;}
   const entity=combatEntity({id:hero.id,definitionId:hero.definitionId,encounterId:this.encounter.id,side:'hero',spawnOrdinal:hero.slotId,stats,stepMs:this.config.stepMs,hitDelayMs:this.config.hitDelayMs,canAttack:true});
   entity.attackSequence=this.attackSequences.get(hero.id)??0;restoreEncounterHealth(entity,this.health.get(hero.id));return entity;
  });this.encounter.entities=[...heroes,...enemies];
 }
 setSuspended(value:boolean){this.suspended=value;}
 get tick(){return this.encounter.tick;}
 get pending(){return this.waiting;}
 get complete(){return this.encounter.complete;}
 get enemiesDefeated(){return this.encounter.entities.filter(e=>e.side==='enemy').every(e=>e.hp===0);}
 snapshot():BattleSnapshot{return freeze(JSON.parse(JSON.stringify({encounter:this.encounter,hits:this.hits.snapshot(),pendingRewards:this.rewards,waiting:this.waiting,rng:this.rng.snapshot()})) as BattleSnapshot);}
 step():readonly Intent[]{
  if(this.suspended||this.waiting||this.encounter.complete)return [];
  const e=this.encounter,events:Intent[]=[];e.tick++;
  advanceCooldowns(e.entities);acquireTargets(e.entities,this.config.targetingPolicy);
  const attacks=attackIntents(e.entities,e.tick);this.hits.enqueue(attacks);
  events.push(...attacks.map(attack=>({type:'attack.intent',payload:attack})));
  for(const intent of this.hits.drain(e.tick,e.id,e.entities)){
   const target=e.entities.find(t=>t.id===intent.targetId)!;const result=this.damage.resolve(intent,target,()=>this.rng.below(10000));
   if(result)events.push({type:'damage.applied',payload:result});
  }
  const deaths=resolveDeaths(e.entities);events.push(...deaths.map(death=>({type:death.side==='enemy'?'enemy.died':'hero.died',payload:death})));
  this.rewards=deaths.flatMap(d=>d.reward?[d.reward]:[]);
  const allDead=e.entities.filter(entity=>entity.side==='enemy').every(entity=>entity.hp<=0);
  if(this.rewards.length||allDead){this.waiting=true;events.push({type:'battle.commitRequested',payload:{encounterId:e.id,rewards:this.rewards,cleared:allDead}});}
  return freeze(JSON.parse(JSON.stringify(events)) as Intent[]);
 }
 /** Only the persistence adapter calls this after the matching sources are durable. */
 acknowledgeRewards(committedSources:readonly string[]):readonly Intent[]{
  if(!this.waiting)return [];
  if(this.rewards.some(r=>!committedSources.includes(r.source)))throw Error('Missing durable kill acknowledgement');
  this.waiting=false;this.rewards=[];
  if(this.encounter.entities.filter(e=>e.side==='enemy').every(e=>e.hp<=0)){
   this.encounter.complete=true;return [{type:'encounter.cleared',payload:{encounterId:this.encounter.id,tick:this.encounter.tick}}];
  }return [];
 }
}
