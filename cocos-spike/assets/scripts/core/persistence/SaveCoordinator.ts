import type {GameState} from '../model/GameState';
/** Dispatcher owns mutation ordering. Every economic write remains distinct;
 * lifecycle waits for accepted writes, never manufactures a second snapshot. */
export class SaveCoordinator {
 private pending=0;private tail:Promise<unknown>=Promise.resolve();private failed=false;
 constructor(private write:(state:GameState)=>Promise<void>,private flushStorage:()=>Promise<void>=async()=>{}){}
 commit=(state:GameState)=>{
  this.pending++;const result=this.tail.then(()=>this.write(state));
  this.tail=result.then(()=>{this.failed=false;},()=>{this.failed=true;}).finally(()=>{this.pending--;});
  return result;
 };
 async flush(){await this.tail;await this.flushStorage();}
 get metrics(){return {pending:this.pending,lastWriteFailed:this.failed};}
}
