/** App-scoped SDK ownership: dedupe one operation, bound waits, discard late callbacks. */
export class RequestCoordinator {
 private active:{id:string;promise:Promise<unknown>;cancel:()=>void}|null=null;
 get busy(){return this.active!==null;}
 run<T>(id:string,action:(signal:AbortSignal)=>Promise<T>,cancel:()=>void,timeoutMs=120000):Promise<T>{
  if(this.active)return this.active.id===id?this.active.promise as Promise<T>:Promise.reject(Error('Platform operation busy'));
  let stop=()=>{};const controller=new AbortController();
  const promise=new Promise<T>((resolve,reject)=>{
   let settled=false;const finish=(error:Error|null,value?:T)=>{if(settled)return;settled=true;clearTimeout(timer);if(this.active?.id===id)this.active=null;error?reject(error):resolve(value!);};
   stop=()=>{try{controller.abort();cancel();}finally{finish(Error('Platform operation cancelled'));}};
   const timer=setTimeout(stop,timeoutMs);
   void Promise.resolve().then(()=>{if(controller.signal.aborted)throw Error('Cancelled');return action(controller.signal);}).then(value=>finish(null,value),()=>finish(Error('Platform operation failed')));
  });
  this.active={id,promise,cancel:stop};return promise;
 }
 cancel(){this.active?.cancel();}
}
