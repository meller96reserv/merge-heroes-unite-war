import {deploymentCapacity} from '../systems/AccountProgression';
import type {GameState} from '../model/GameState';import type {Command,Reduction} from './Dispatcher';
export type DeployHero=Command&{type:'DeployHero';heroId:string;deployed:boolean};
export function deployHero(state:GameState,command:DeployHero):Reduction {
 const source=`deploy:${command.heroId}:${command.deployed}:${command.commandId}`,previous=state.data.transactionReceipts.find(r=>r.id===command.commandId);
 if(previous)return previous.source===source?{ok:true,events:[]}:{ok:false,reason:'COMMAND_ID_CONFLICT'};
 const cap=deploymentCapacity(state);
 const hero=state.data.heroes.find(h=>h.id===command.heroId);if(!hero)return {ok:false,reason:'INVALID_COMMAND'};
 if(hero.deployed===command.deployed)return {ok:true,events:[]};
 if(command.deployed&&state.data.heroes.filter(h=>h.deployed).length>=cap)return {ok:false,reason:'DEPLOYMENT_FULL'};
 hero.deployed=command.deployed;state.data.transactionReceipts.push({id:command.commandId,source,generation:state.generation+1,grants:[]});state.data.sourceWatermarks[source]=state.revision+1;
 return {ok:true,events:[{type:command.deployed?'hero.deployed':'hero.withdrawn',payload:{heroId:hero.id,slotId:hero.slotId}}]};
}
