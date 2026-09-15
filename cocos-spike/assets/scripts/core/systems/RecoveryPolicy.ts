import type {CombatEntity} from '../model/CombatEntity';
export type RecoveryPolicy=Readonly<{id:string;evidence:'PROPOSED'|'OBSERVED'|'MEASURED';enemyCounterattacks:boolean;heroRecovery:'nextEncounterFullHp'}>;
/** Versioned chapter approximation; other modes must opt into their reviewed policy. */
export const chapterRecovery:RecoveryPolicy=Object.freeze({id:'chapter-playable-v1',evidence:'PROPOSED',enemyCounterattacks:false,heroRecovery:'nextEncounterFullHp'});
export function validateRecoveryPolicy(policy:RecoveryPolicy){
 if(!policy.id||!['PROPOSED','OBSERVED','MEASURED'].includes(policy.evidence)||typeof policy.enemyCounterattacks!=='boolean'||policy.heroRecovery!=='nextEncounterFullHp')throw Error('Unsupported recovery policy');
 return Object.freeze({...policy});
}
export type EncounterHealth=Readonly<Pick<CombatEntity,'hp'|'deathEmitted'>>;
/** Withdrawing/redeploying is not a heal; new encounters create fresh combatants. */
export function restoreEncounterHealth(entity:CombatEntity,previous:EncounterHealth|undefined){
 if(!previous)return;
 entity.hp=Math.min(entity.maxHp,previous.hp);entity.deathEmitted=previous.deathEmitted;
 if(entity.hp===0)entity.canAttack=false;
}
