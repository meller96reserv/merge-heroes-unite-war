import type {CombatEntity} from '../model/CombatEntity';import {compareIds} from './TargetingSystem';
export type AttackIntent=Readonly<{id:string;encounterId:string;actorId:string;targetId:string;createdTick:number;hitTick:number;sequence:number;attack:number;critChanceBp:number;critMultiplierBp:number}>;
export function advanceCooldowns(entities:CombatEntity[]):void {for(const actor of entities)if(actor.hp>0&&actor.canAttack)actor.cooldownTicks=Math.max(0,actor.cooldownTicks-1);}
export function attackIntents(entities:CombatEntity[],tick:number):AttackIntent[] {
 if(!Number.isSafeInteger(tick)||tick<0)throw Error('Invalid attack tick');
 const intents:AttackIntent[]=[];
 for(const actor of [...entities].sort((a,b)=>compareIds(a.id,b.id))){
  if(actor.hp<=0||!actor.canAttack||actor.cooldownTicks>0||!actor.targetId)continue;
  const target=entities.find(e=>e.id===actor.targetId&&e.encounterId===actor.encounterId&&e.side!==actor.side&&e.hp>0);if(!target)continue;
  if(!Number.isSafeInteger(actor.attackSequence+1)||!Number.isSafeInteger(tick+actor.hitDelayTicks))throw Error('Attack sequence exhausted');
  actor.attackSequence++;actor.cooldownTicks=actor.intervalTicks;
  intents.push(Object.freeze({id:`${actor.encounterId}:${actor.id}:${actor.attackSequence}`,encounterId:actor.encounterId,actorId:actor.id,targetId:target.id,createdTick:tick,hitTick:tick+actor.hitDelayTicks,sequence:actor.attackSequence,attack:actor.attack,critChanceBp:actor.critChanceBp,critMultiplierBp:actor.critMultiplierBp}));
 }
 return intents;
}
