import {freeze} from '../events/EventBus';
export type StageDefinition=Readonly<{
 id:string;ordinal:number;chapter:number;displayIndex:number;worldId:string;
 waves:readonly {enemyId:string;count:number}[];firstClearRewardId:string|null;nextStageId:string|null;
 boss:Readonly<{timerMs:number;farmStageId:string;retryPolicy:'manual'|'automatic';tiePolicy:'lethal_before_timeout'}>|null;
 evidenceIds:readonly string[];
}>;
export class StageCatalog {
 private definitions=new Map<string,StageDefinition>();
 constructor(definitions:readonly StageDefinition[],references:{enemies:readonly string[];worlds:readonly string[];rewards:readonly string[]}){
  const ordinals=new Set<number>(),displayIds=new Set<string>(),farmIds=new Set<string>();
  for(const d of definitions){
   if(!/^[A-Za-z][A-Za-z0-9_.:-]*$/.test(d.id)||this.definitions.has(d.id)||[d.ordinal,d.chapter,d.displayIndex].some(n=>!Number.isSafeInteger(n)||n<1)||ordinals.has(d.ordinal)||displayIds.has(`${d.chapter}:${d.displayIndex}`))throw Error('Invalid stage identity');
   if(!references.worlds.includes(d.worldId)||!d.waves.length||d.waves.length>100||d.waves.some(w=>!references.enemies.includes(w.enemyId)||!Number.isInteger(w.count)||w.count<1||w.count>32)||d.firstClearRewardId!==null&&!references.rewards.includes(d.firstClearRewardId))throw Error('Invalid stage content reference');
   if(d.boss&&(!Number.isSafeInteger(d.boss.timerMs)||d.boss.timerMs<1||d.boss.tiePolicy!=='lethal_before_timeout'||!['manual','automatic'].includes(d.boss.retryPolicy)||farmIds.has(d.boss.farmStageId)))throw Error('Invalid or ambiguous boss policy');
   ordinals.add(d.ordinal);displayIds.add(`${d.chapter}:${d.displayIndex}`);if(d.boss)farmIds.add(d.boss.farmStageId);
   this.definitions.set(d.id,freeze(JSON.parse(JSON.stringify(d)) as StageDefinition));
  }
  if(!definitions.length)throw Error('Empty stage graph');
  for(const d of this.definitions.values()){
   if(d.nextStageId!==null&&!this.definitions.has(d.nextStageId))throw Error('Dangling next stage');
   if(d.boss){const farm=this.get(d.boss.farmStageId);if(farm.boss||farm.ordinal>=d.ordinal)throw Error('Farm must be an earlier ordinary stage');}
   const visited=new Set<string>();let node:StageDefinition|undefined=d;
   while(node){if(visited.has(node.id))throw Error('Stage cycle');visited.add(node.id);node=node.nextStageId?this.get(node.nextStageId):undefined;}
   if(d.nextStageId&&this.get(d.nextStageId).ordinal<=d.ordinal)throw Error('Stage ordinal must advance');
  }
 }
 get(id:string){const result=this.definitions.get(id);if(!result)throw Error('Unknown stage');return result;}
 all():readonly StageDefinition[]{return [...this.definitions.values()].sort((a,b)=>a.ordinal-b.ordinal);}
 bossForFarm(id:string){return this.all().find(s=>s.boss?.farmStageId===id)??null;}
}
