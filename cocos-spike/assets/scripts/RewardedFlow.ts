import {BattleModel} from './BattleModel';
import {NativeServices} from './NativeServices';
import {RewardedPlacement} from './core/rewards/RewardedOperation';
/** Durable reservation -> native video completion -> saved confirmation -> grant.
 * A saved confirmation is recovered without asking the player to watch twice. */
export class RewardedFlow {
 private active=false;
 constructor(private model:BattleModel){}
 async claim(placement:RewardedPlacement,outcomeId=''):Promise<'claimed'|'unavailable'|'cancelled'|'failed'|'busy'>{
  if(this.active)return 'busy';this.active=true;
  const begin=placement==='wheel'?'BeginWheelAd':placement==='freeCoins'?'BeginFreeCoinsAd':'BeginStageBoostAd';
  const record=placement==='wheel'?'RecordWheelAd':placement==='freeCoins'?'RecordFreeCoinsAd':'RecordStageBoostAd';
  const claim=placement==='wheel'?'CompleteSpin':placement==='freeCoins'?'ClaimFreeCoins':'ClaimStageBoost';
  const fields=placement==='wheel'?{spinId:outcomeId}:placement==='stageBoost'?{boostId:outcomeId}:{};
  try{
   if(!await this.model.command(begin,fields))return 'failed';
   const op=Object.values(this.model.snapshot.data.rewardedOperations??{}).find(o=>o.placement===placement&&(!outcomeId||o.outcomeId===outcomeId)&&(o.status==='reserved'||o.status==='confirmed'));
   if(!op)return 'failed';
   if(op.status!=='confirmed'){
    const native=await NativeServices.request('ad',{placement});
    const status=native.status==='completed'&&native.completed===true?'completed':native.status==='cancelled'?'cancelled':native.status==='unavailable'?'unavailable':'failed';
    const saved=await this.model.command(record,{result:{id:op.id,placement,outcomeId:op.outcomeId,sessionId:op.sessionId,status}});
    if(!saved)return 'failed';if(status!=='completed')return status;
   }
   return await this.model.command(claim,{...fields,operationId:op.id})?'claimed':'failed';
  }finally{this.active=false;}
 }
}
