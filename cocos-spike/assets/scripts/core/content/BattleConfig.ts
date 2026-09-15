import type {BattleConfig} from '../systems/BattleSystem';import type {EnemyDefinition} from '../systems/EncounterSpawner';
export const battleConfig:BattleConfig={stepMs:50,hitDelayMs:150,targetingPolicy:'spawnOrder',staleProjectilePolicy:'cancel',damageModel:'proposedSubtractDefense',rounding:'floor',minimumDamage:1};
export const earlyEnemies:readonly EnemyDefinition[]=[{id:'ironhide_boar',stats:{attack:0,defense:0,hp:40,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},rewardId:'early_boar',canAttack:false,hitDelayMs:150}];
/** PROPOSED early loop table; reference EV-012 also observes a +1 gold first kill. */
export const killRewards={early_boar:[{kind:'currency',id:'gold',amount:'1'}]} as const;
export const encounterTransitionMs=500;
