import type {StageDefinition} from '../model/Stage';
export class BossSystem {
 readonly deadlineTick:number;
 private tick=0;
 private outcome:'fighting'|'won'|'failed'='fighting';
 constructor(readonly policy:NonNullable<StageDefinition['boss']>,readonly stepMs:number){
  if(policy.tiePolicy!=='lethal_before_timeout'||!Number.isSafeInteger(policy.timerMs)||policy.timerMs<1||!Number.isSafeInteger(stepMs)||stepMs<1)throw Error('Invalid boss timer');
  this.deadlineTick=Math.ceil(policy.timerMs/stepMs);
 }
 /** Called after logical hits at this tick. Wall/background time is never an input. */
 afterHits(tick:number,allEnemiesDead:boolean){
  if(this.outcome!=='fighting')return this.outcome;
  if(!Number.isSafeInteger(tick)||tick<this.tick)throw Error('Boss time must be monotonic');
  this.tick=tick;
  if(allEnemiesDead&&tick<=this.deadlineTick)this.outcome='won';
  else if(tick>=this.deadlineTick)this.outcome='failed';
  return this.outcome;
 }
 get remainingMs(){return Math.max(0,this.deadlineTick-this.tick)*this.stepMs;}
 get status(){return this.outcome;}
}
