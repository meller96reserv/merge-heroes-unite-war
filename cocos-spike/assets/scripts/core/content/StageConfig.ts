import {StageCatalog,type StageDefinition} from '../model/Stage';
import type {EnemyDefinition} from '../systems/EncounterSpawner';
import type {Grant} from '../systems/RewardService';
/** PROPOSED shipped-roster-v3. Existing stage/profile IDs, saved ownership, receipts and
 * boss retry rules survive. Boss HP remains at the prior two-hero balance;
 * the user now grants a third fighter with the final board row. Source art
 * establishes identity, not hidden balance. */
const profiles=[
 ['ironhide_boar',40,'early_boar'],['boar_scout',250,'scout'],['bomb_goblin',250,'scout'],
 ['boar_chief',20000,'chief'],['boar_guard',50000,'guard'],['stone_gargoyle',50000,'guard'],
 ['boar_veteran',100000,'veteran'],['shadow_wolf',100000,'veteran'],['boar_overlord',600000,'overlord'],
 ['poison_mushroom',300000,'veteran'],['iron_beetle',400000,'veteran'],['dark_bat_mage',600000,'veteran'],['shadow_dragon',3200000,'overlord'],
] as const;

/** PROPOSED cocos-stages-v2. Nine normal checkpoints then a boss gate.
 * The existing three boss families remain; no additional screens/assets. */
export const chapterProfiles=[
 {hp:[40,60,80,105,130,160,190,220,250],gold:[1,2,3,4,5,6,7,8,8],boss:'boar_chief',timerMs:20000,bossGold:150,bossGems:10,clearGold:5000,clearGems:100,pool:['ironhide_boar','boar_scout','bomb_goblin','boar_guard','stone_gargoyle','shadow_wolf']},
 {hp:[30000,36000,43000,50000,60000,70000,80000,90000,100000],gold:[15,18,20,22,25,30,34,38,40],boss:'boar_overlord',timerMs:25000,bossGold:300,bossGems:30,clearGold:15000,clearGems:250,pool:['boar_guard','stone_gargoyle','boar_veteran','shadow_wolf','poison_mushroom','iron_beetle']},
 {hp:[180000,220000,260000,300000,360000,420000,480000,540000,600000],gold:[40,45,50,55,60,65,70,75,80],boss:'shadow_dragon',timerMs:30000,bossGold:300,bossGems:30,clearGold:30000,clearGems:500,pool:['poison_mushroom','iron_beetle','dark_bat_mage','shadow_wolf','stone_gargoyle','boar_veteran']},
] as const;
export const stageEnemyArt:Record<string,string>={};
export const stageKillRewards:Record<string,readonly Grant[]>={};
export const firstClearRewards:Record<string,readonly Grant[]>={};
const definitions:StageDefinition[]=[],enemies:EnemyDefinition[]=[];
for(let world=1;world<=chapterProfiles.length;world++){
 const profile=chapterProfiles[world-1]!;
 for(let n=1;n<=10;n++){
  const isBoss=n===10,id=`stage_${world}_${n}`,enemyId=isBoss?profile.boss:`hunt_${world}_${n}`,rewardId=`kill_${world}_${n}`;
  const original=profiles.find(p=>p[0]===profile.boss)!;
  const hp=isBoss?original[1]:profile.hp[n-1]!;
  enemies.push({id:enemyId,stats:{attack:0,defense:0,hp,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},rewardId,canAttack:false,hitDelayMs:150});
  stageEnemyArt[enemyId]=isBoss?profile.boss:profile.pool[(n-1)%Math.min(profile.pool.length,n+1)]!;
  stageKillRewards[rewardId]=[{kind:'currency',id:'gold',amount:String(isBoss?profile.bossGold:profile.gold[n-1])},{kind:'currency',id:'gem',amount:String(isBoss?profile.bossGems:world)},{kind:'currency',id:'orb',amount:String(isBoss?world*10:world)}];
  const clearId=`clear_${world}_${n}`;
  firstClearRewards[clearId]=[{kind:'currency',id:'gold',amount:String(isBoss?profile.clearGold:world===1&&n===1?5:profile.gold[Math.min(8,n-1)]!*2)},...(isBoss?[{kind:'currency' as const,id:'gem',amount:String(profile.clearGems)},{kind:'currency' as const,id:'orb',amount:String(profile.clearGems)}]:[])];
  const killsRequired=isBoss||n<=3?1:2;
  definitions.push({id,ordinal:(world-1)*10+n,chapter:world,displayIndex:n,worldId:'floating_islands',waves:Array.from({length:killsRequired},()=>({enemyId,count:1})),firstClearRewardId:clearId,nextStageId:n<10?`stage_${world}_${n+1}`:world<chapterProfiles.length?`stage_${world+1}_1`:null,boss:isBoss?{timerMs:profile.timerMs,farmStageId:`stage_${world}_9`,retryPolicy:'manual',tiePolicy:'lethal_before_timeout'}:null,evidenceIds:[]});
 }
}
export const stageEnemies:readonly EnemyDefinition[]=enemies;
export const stageDefinitions:readonly StageDefinition[]=definitions;
export const stages=new StageCatalog(stageDefinitions,{enemies:enemies.map(e=>e.id),worlds:['floating_islands'],rewards:Object.keys(firstClearRewards)});
