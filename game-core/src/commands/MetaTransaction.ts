import type {GameState} from '../model/GameState';
import type {Reduction} from './Dispatcher';
export function priorMeta(state:GameState,id:string,source:string):Reduction|null{
 const r=state.data.transactionReceipts.find(r=>r.id===id);
 if(r)return r.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 return Object.hasOwn(state.data.sourceWatermarks,source)?{ok:true,events:[]}:null;
}
export function metaReceipt(state:GameState,id:string,source:string){state.data.transactionReceipts.push({id,source,generation:state.generation+1,grants:[]});state.data.sourceWatermarks[source]=state.revision+1;}
