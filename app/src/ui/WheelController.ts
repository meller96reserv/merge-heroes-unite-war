import {formatAmount} from '../../../game-core/src/selectors/NumberFormatter';
import type {GameRuntime} from '../game/GameRuntime';
import {rewardedAttempts} from '../rewards/RewardedAttemptCache';
import type {RewardedAds} from '../platform/RewardedAds';
import type {RewardedBinding} from '../../../game-core/src/rewards/RewardedOperation';
import {wheelSegment,wheelLandingAngle} from '../../../game-core/src/systems/WheelOutcome';
import type {WheelSpinRequest} from '../presentation/WheelMotion';
import type {Snapshot} from '../../../game-core/src/model/GameState';
type ViewState={busy:boolean;reserving:boolean;error:string;animatedId:string|null;settledId:string|null};
const saveError='Could not save. Please try again.';
export class WheelController {
 private state:ViewState={busy:false,reserving:false,error:'',animatedId:null,settledId:null};
 private listeners=new Set<()=>void>();private alive=true;
 constructor(private game:GameRuntime,private ads:RewardedAds,private feedback:{land?:()=>void;claim?:()=>void}={}){}
 getSnapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(change:Partial<ViewState>){if(!this.alive)return;this.state={...this.state,...change};for(const listener of this.listeners)listener();}
 dispose=()=>{this.alive=false;this.listeners.clear();};
 settled=(id:string)=>{
  if(this.state.animatedId===id&&this.state.settledId!==id){this.update({settledId:id});this.feedback.land?.();}
 };
 async action():Promise<void>{
  if(!this.alive||this.state.busy||this.ads.isShowing())return;
  const pending=this.game.dispatcher.getSnapshot().data.wheel.pendingSpin;
  if(pending?.status==='reserved'&&this.state.animatedId===pending.id&&this.state.settledId!==pending.id)return;
  this.update({busy:true,reserving:pending?.status!=='reserved',error:''});
  try{
   if(pending?.status==='reserved')await this.claim(pending.id);
   else {
    const result=await this.game.dispatcher.dispatch({type:'ReserveSpin',commandId:this.game.nextId('wheelReserve')});
    if(!result.ok){this.update({error:result.reason==='LOCKED'?'Your next free spin is not ready.':saveError});return;}
    const spin=this.game.dispatcher.getSnapshot().data.wheel.pendingSpin;
    if(spin?.status==='reserved')this.update({animatedId:spin.id,settledId:null});
   }
  }catch{this.update({error:'Video unavailable. Your reward is saved.'});}
  finally{this.update({busy:false,reserving:false});}
 }
 private async claim(spinId:string){
  const d=this.game.dispatcher;
  const cache=rewardedAttempts(this.game);
  let operation=Object.values(d.getSnapshot().data.rewardedOperations??{}).find(op=>op.placement==='wheel'&&op.outcomeId===spinId&&(op.status==='confirmed'||op.status==='reserved'&&op.sessionId===this.game.sessionId&&cache.has(op.id)));
  if(!operation){
   const begin=await d.dispatch({type:'BeginWheelAd',commandId:this.game.nextId('wheelAd'),spinId});
   if(!begin.ok){this.update({error:saveError});return;}
   operation=Object.values(d.getSnapshot().data.rewardedOperations??{}).find(op=>op.placement==='wheel'&&op.outcomeId===spinId&&(op.status==='confirmed'||(op.status==='reserved'&&op.sessionId===this.game.sessionId)));
  }
  if(!operation){this.update({error:'Please reopen the wheel and try again.'});return;}
  if(operation.status!=='confirmed'){
   if(this.ads.isShowing()){this.update({error:'A video is already playing.'});return;}
   const binding:RewardedBinding={id:operation.id,placement:operation.placement,outcomeId:operation.outcomeId,sessionId:operation.sessionId};
   let completion=cache.get(operation.id);
   if(!completion){let status:Awaited<ReturnType<RewardedAds['show']>>;try{status=await this.ads.show(binding);}catch{status='failed';}completion={...binding,status};cache.set(operation.id,completion);}
   const recorded=await d.dispatch({type:'RecordWheelAd',commandId:`adResult:${operation.id}`,result:completion});
   if(!recorded.ok){if(recorded.reason!=='SAVE_FAILED')cache.delete(operation.id);this.update({error:recorded.reason==='SAVE_FAILED'?saveError:'Please reopen the wheel and try again.'});return;}
   cache.delete(operation.id);const status=completion.status;
   if(status!=='completed'){
    this.update({error:status==='cancelled'?'Video not finished. Your reward is saved.':'Video unavailable. Your reward is saved.'});return;
   }
  }
  const result=await d.dispatch({type:'CompleteSpin',commandId:`wheelClaim:${spinId}`,spinId,operationId:operation.id});
  if(!result.ok){this.update({error:saveError});return;}
  this.feedback.claim?.();
 }
}
export function wheelView(state:Snapshot,controller:ViewState,remainingMs:number){
 const pending=state.data.wheel.pendingSpin,hasPrize=pending?.status==='reserved';
 const spinning=hasPrize&&controller.animatedId===pending.id&&controller.settledId!==pending.id;
 const outcome=pending?wheelSegment(pending.outcomeId):null;
 const grant=outcome?.grants[0];
 const rewardText=grant?.kind==='freeSpin'?`${grant.amount} FREE SPINS`:grant?`${formatAmount(grant.amount)} GOLD`:'BETTER LUCK NEXT TIME';
 const spin:WheelSpinRequest|null=pending&&!controller.reserving?{id:pending.id,landingAngleDegrees:wheelLandingAngle(pending.outcomeId),segments:12,kind:'fortune'}:null;
 const claimReady=hasPrize&&Object.values(state.data.rewardedOperations??{}).some(op=>op.placement==='wheel'&&op.outcomeId===pending.id&&op.status==='confirmed');
 return {spin,skipSpin:!spinning,rewardText,claimReady,remainingMs,free:true,error:controller.error,
  phase:controller.busy?'claiming' as const:spinning?'spinning' as const:hasPrize?'result' as const:remainingMs>0&&state.data.wheel.freeSpins===0?'cooldown' as const:'available' as const};
}
