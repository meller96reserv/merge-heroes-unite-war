import type {CombatEntity} from '../model/CombatEntity';import {compareIds} from './TargetingSystem';
export type KillEntitlement=Readonly<{source:string;entityId:string;encounterId:string;rewardId:string}>;
export type Death=Readonly<{entityId:string;encounterId:string;side:'hero'|'enemy';reward:KillEntitlement|null}>;
export function resolveDeaths(entities:CombatEntity[]):Death[]{
 const deaths:Death[]=[];
 for(const entity of [...entities].sort((a,b)=>compareIds(a.id,b.id))){
  if(entity.hp>0||entity.deathEmitted)continue;
  entity.deathEmitted=true;entity.canAttack=false;entity.targetId=null;
  const reward=entity.side==='enemy'&&entity.rewardId?Object.freeze({source:`kill:${entity.encounterId}:${entity.id}`,entityId:entity.id,encounterId:entity.encounterId,rewardId:entity.rewardId}):null;
  deaths.push(Object.freeze({entityId:entity.id,encounterId:entity.encounterId,side:entity.side,reward}));
 }
 return deaths;
}
