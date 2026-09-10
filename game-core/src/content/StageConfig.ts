import {StageCatalog,type StageDefinition} from '../model/Stage';
import type {EnemyDefinition} from '../systems/EncounterSpawner';
import type {Grant} from '../systems/RewardService';
/** PROPOSED shipped-roster-v2. Existing stage/profile IDs, saved ownership, receipts and
 * boss retry rules survive. Source art establishes identity, not hidden balance. */
const profiles=[
 ['ironhide_boar',40,'early_boar'],['boar_scout',250,'scout'],['bomb_goblin',250,'scout'],
 ['boar_chief',12000,'chief'],['boar_guard',6000,'guard'],['stone_gargoyle',6000,'guard'],
 ['boar_veteran',16000,'veteran'],['shadow_wolf',16000,'veteran'],['boar_overlord',200000,'overlord'],
 ['poison_mushroom',40000,'veteran'],['iron_beetle',50000,'veteran'],['dark_bat_mage',75000,'veteran'],['shadow_dragon',750000,'overlord'],
] as const;
export const stageEnemies:readonly EnemyDefinition[]=profiles.map(([id,hp,rewardId])=>({id,stats:{attack:0,defense:0,hp,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},rewardId,canAttack:false,hitDelayMs:150}));
export const stageKillRewards:Readonly<Record<string,readonly Grant[]>>=Object.fromEntries(['early_boar','scout','chief','guard','veteran','overlord'].map((id,i)=>[id,[{kind:'currency',id:'gold',amount:['1','8','100','70','300','1200'][i]!},{kind:'currency',id:'orb',amount:['1','1','10','3','6','30'][i]!},{kind:'currency',id:'gem',amount:['1','1','10','2','3','30'][i]!}]]));
export const firstClearRewards:Readonly<Record<string,readonly Grant[]>>=Object.fromEntries([5,20,150,100,250,1500,600,800,3000].map((amount,i)=>[`stage_clear_${i+1}`,[{kind:'currency',id:'gold',amount:String(amount)}]]));
const waves=[['ironhide_boar'],['boar_scout','bomb_goblin'],['boar_chief'],['boar_guard','stone_gargoyle'],['boar_veteran','shadow_wolf'],['boar_overlord'],['poison_mushroom','iron_beetle'],['dark_bat_mage'],['shadow_dragon']];
export const stageDefinitions:readonly StageDefinition[]=waves.map((enemies,i)=>({
 id:`stage_1_${i+1}`,ordinal:i+1,chapter:1,displayIndex:i+1,worldId:'floating_islands',
 waves:enemies.map(enemyId=>({enemyId,count:1})),firstClearRewardId:`stage_clear_${i+1}`,nextStageId:i===waves.length-1?null:`stage_1_${i+2}`,
 boss:i===2||i===5||i===8?{timerMs:i===2?20000:i===5?25000:30000,farmStageId:`stage_1_${i}`,retryPolicy:'manual',tiePolicy:'lethal_before_timeout'}:null,evidenceIds:[],
}));
export const stages=new StageCatalog(stageDefinitions,{enemies:stageEnemies.map(e=>e.id),worlds:['floating_islands'],rewards:Object.keys(firstClearRewards)});
