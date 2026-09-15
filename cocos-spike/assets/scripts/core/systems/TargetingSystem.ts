import type {CombatEntity} from '../model/CombatEntity';
export const compareIds=(a:string,b:string)=>a<b?-1:a>b?1:0;
/** PROPOSED spawnOrder-v1. Visual position and view insertion order are irrelevant. */
export function selectTarget(actor:CombatEntity,entities:readonly CombatEntity[],policy:'spawnOrder'):string|null {
 if(policy!=='spawnOrder')throw Error('Unsupported targeting policy');
 if(!actor.canAttack||actor.hp<=0)return null;
 return [...entities].filter(target=>target.side!==actor.side&&target.hp>0&&target.encounterId===actor.encounterId).sort((a,b)=>a.spawnOrdinal-b.spawnOrdinal||compareIds(a.id,b.id))[0]?.id??null;
}
export function acquireTargets(entities:CombatEntity[],policy:'spawnOrder'):void {for(const actor of entities)actor.targetId=selectTarget(actor,entities,policy);}
