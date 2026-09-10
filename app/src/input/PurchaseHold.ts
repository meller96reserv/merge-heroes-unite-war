export interface HoldScheduler {after(ms:number,callback:()=>void):()=>void}
export const holdScheduler:HoldScheduler={after(ms,callback){const timer=setTimeout(callback,ms);return ()=>clearTimeout(timer);}};
/** One accepted purchase at a time. Interval is configured PROPOSED cadence, not measured parity. */
export class PurchaseHold {
 private generation=0;private cancelTimer:(()=>void)|null=null;private pointer:number|null=null;
 constructor(private scheduler:HoldScheduler=holdScheduler){}
 start(pointer:number,purchase:()=>Promise<boolean>,intervalMs:number,repeat=true):boolean {
  if(this.pointer!==null||!Number.isSafeInteger(intervalMs)||intervalMs<1)return false;
  this.pointer=pointer;const generation=++this.generation;
  const issue=async()=>{
   let accepted=false;try{accepted=await purchase();}catch{/* The caller owns visible failure feedback. */}
   if(generation!==this.generation)return;
   if(!accepted||!repeat){this.cancel();return;}
   this.cancelTimer=this.scheduler.after(intervalMs,()=>{this.cancelTimer=null;void issue();});
  };
  void issue();return true;
 }
 release(pointer:number){if(this.pointer===pointer)this.cancel();}
 cancel(){this.generation++;this.pointer=null;this.cancelTimer?.();this.cancelTimer=null;}
 get active(){return this.pointer!==null;}
}
