import type {Snapshot} from '../model/GameState';
import type {StageDefinition} from '../model/Stage';
import type {EnemyDefinition} from '../systems/EncounterSpawner';
import {heroStats} from '../selectors/HeroStats';
import {heroes} from './PlayableConfig';
import {stages,stageEnemies,chapterProfiles} from './StageConfig';

/** PROPOSED cocos-stages-v2: varied hunting encounters with the same durable
 * stage/reward identities. Never consume reward/combat RNG for presentation. */
export function huntEnemy(base:EnemyDefinition,stage:StageDefinition,sequence:number):EnemyDefinition {
 const profile=chapterProfiles[stage.chapter-1]!;
 const pool=profile.pool.slice(0,Math.min(profile.pool.length,stage.displayIndex+1));
 const artId=pool[sequence%pool.length]!;
 // Keep the configured stage HP/rewards; only the suitable enemy appearance varies.
 return {...base,id:artId};
}
/** Conservative normal-hit budget, in simulation time: an estimate, not a win grant. */
export function bossReadiness(state:Snapshot,hitDelayMs=500){
 const current=stages.get(state.data.stages.currentStageId);
 const boss=current.boss?current:stages.all().find(s=>s.boss&&s.ordinal>current.ordinal);
 if(!boss?.boss)return {boss:null,ratio:0,damage:0,hp:0};
 const enemy=stageEnemies.find(e=>e.id===boss.waves[0]!.enemyId)!;
 let damage=0;
 for(const h of state.data.heroes)if(h.deployed){
  const stats=heroStats(state,heroes.get(h.definitionId),h);
  const hits=Math.max(0,Math.floor((boss.boss.timerMs-hitDelayMs)/stats.attackIntervalMs));
  damage+=hits*Math.max(1,stats.attack-enemy.stats.defense);
 }
 return {boss,ratio:Math.min(1,damage/enemy.stats.hp),damage,hp:enemy.stats.hp};
}
