/** A stale flush can never resume a suspended or disposed runtime. */
export class LifecycleCoordinator {
 private generation=0;private alive=true;private desired:boolean|null=null;private barrier:Promise<void>=Promise.resolve();
 constructor(private target:{pause():void;resume():void},private flush:()=>Promise<void>){}
 setActive(active:boolean){
  if(!this.alive||this.desired===active)return;this.desired=active;const generation=++this.generation;
  if(!active){this.target.pause();this.barrier=this.flush().catch(()=>{});}
  else void this.barrier.then(()=>{if(this.alive&&this.desired&&generation===this.generation)this.target.resume();});
 }
 dispose(){this.alive=false;this.generation++;this.target.pause();}
}
