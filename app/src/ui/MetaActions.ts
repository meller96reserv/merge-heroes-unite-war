import type {GameRuntime,GameCommand} from '../game/GameRuntime';
import type {Result} from '../../../game-core/src/commands/Dispatcher';
type Operation={command:GameCommand;promise:Promise<{result:Result;command:GameCommand}>|null};
const pending=new WeakMap<GameRuntime,Operation>();
/** A failed durable write retains its exact identity across route unmounts.
 * Finishing it has priority over a new action, avoiding a second draw/debit. */
export function runMetaAction(game:GameRuntime,command:GameCommand){
 const prior=pending.get(game);if(prior?.promise)return prior.promise;
 const operation=prior??{command,promise:null};
 const promise=game.dispatcher.dispatch(operation.command).then(result=>{
  if(!result.ok&&result.reason==='SAVE_FAILED'){operation.promise=null;pending.set(game,operation);}else pending.delete(game);
  return {result,command:operation.command};
 });operation.promise=promise;pending.set(game,operation);return promise;
}
