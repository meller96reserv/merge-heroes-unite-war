import {sys} from 'cc';
import {GameRuntime} from './GameRuntime';
import {initialGame,reconcileBoardUnlocks} from './initialGame';
import {recoverSave} from '../core/persistence/SaveRecovery';
import {TransactionCoordinator} from '../core/systems/TransactionCoordinator';
import {reconcileDeploymentCapacity} from '../core/systems/AccountProgression';
import {reconcileTutorial} from '../core/systems/TutorialService';
import {dataVersion} from '../core/content/PlayableConfig';
import {migrateProgress} from './ProgressMigration';
import type {SaveStore,SaveCandidate} from '../core/ports';

/** Cocos native SQLite-backed localStorage. Two checksummed generations, verified before publication. */
class CocosSaveStore implements SaveStore {
 private key(n:string,s:string){return n+':'+s;}
 async readCandidates(n:string):Promise<SaveCandidate[]>{return (['A','B'] as const).flatMap(slot=>{const bytes=sys.localStorage.getItem(this.key(n,slot));return bytes===null?[]:[{slot,bytes}];});}
 async writeCandidate(n:string,s:'A'|'B',b:string){sys.localStorage.setItem(this.key(n,s),b);}
 async verifyCandidate(n:string,s:'A'|'B'){return sys.localStorage.getItem(this.key(n,s));}
 async flush(){} // setItem is synchronous on the native storage implementation.
}
export async function loadLocalGame():Promise<GameRuntime>{
 const store=new CocosSaveStore(),namespace='mergeheroes.cocos.v1',candidates=await store.readCandidates(namespace),recovery=recoverSave(candidates,[dataVersion,'playable-v1']);
 for(const c of recovery.preserve)sys.localStorage.setItem(namespace+':preserved:'+Date.now()+':'+c.slot,c.bytes);
 if(recovery.status==='blocked')throw Error('Saved progress could not be opened. It has been preserved.');
 const state=recovery.status==='recovered'?recovery.state:initialGame(Date.now());
 if(state.dataVersion!==dataVersion)for(const c of candidates)sys.localStorage.setItem(namespace+':pre-stages-v2:'+c.slot,c.bytes);
 const repaired=[migrateProgress(state),reconcileBoardUnlocks(state),reconcileDeploymentCapacity(state),reconcileTutorial(state)].some(Boolean);
 const coordinator=new TransactionCoordinator(store,{utcMs:()=>Date.now(),monotonicMs:()=>performance.now()},namespace);
 if(repaired&&recovery.status==='recovered')state.revision++;
 if(recovery.status==='empty'||repaired)await coordinator.commit(state);
 return new GameRuntime(state,coordinator.commit);
}
