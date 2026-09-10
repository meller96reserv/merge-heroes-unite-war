import {combatEntity,type CombatStats,type CombatEntity} from '../model/CombatEntity';
export type EnemyDefinition={id:string;stats:CombatStats;rewardId:string|null;canAttack:boolean;hitDelayMs:number};
export type Encounter={id:string;sequence:number;tick:number;entities:CombatEntity[];complete:boolean};
export function spawnEncounter(stageId:string,sequence:number,waveOrdinal:number,wave:readonly {enemyId:string;count:number}[],definitions:readonly EnemyDefinition[],stepMs:number):Encounter {
 if(!stageId||!Number.isSafeInteger(sequence)||sequence<0||!Number.isSafeInteger(waveOrdinal)||waveOrdinal<0)throw Error('Invalid encounter identity');
 if(new Set(definitions.map(d=>d.id)).size!==definitions.length)throw Error('Duplicate enemy definition');
 const id=`${stageId}:${sequence}:${waveOrdinal}`,entities:CombatEntity[]=[];
 for(const entry of wave){
  const definition=definitions.find(d=>d.id===entry.enemyId);
  if(!definition||!Number.isInteger(entry.count)||entry.count<1||entry.count>32||entities.length+entry.count>32)throw Error('Invalid or excessive wave');
  for(let i=0;i<entry.count;i++){const ordinal=entities.length;entities.push(combatEntity({id:`${id}:enemy:${ordinal}`,definitionId:definition.id,encounterId:id,side:'enemy',spawnOrdinal:ordinal,stats:definition.stats,stepMs,hitDelayMs:definition.hitDelayMs,canAttack:definition.canAttack,rewardId:definition.rewardId}));}
 }
 if(!entities.length)throw Error('Empty encounter');return {id,sequence,tick:0,entities,complete:false};
}
