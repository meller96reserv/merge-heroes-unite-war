import {createAnalytics} from '../analytics/createAnalytics';
import {dragonDefinition} from '../../../game-core/src/modes/DragonMode';
import {relicById} from '../../../game-core/src/content/RelicConfig';
import {equipmentById} from '../../../game-core/src/content/EquipmentConfig';
import {GameRuntime} from './GameRuntime';
import {initialGame,reconcileBoardUnlocks} from './initialGame';
import {heroes,dataVersion} from '../../../game-core/src/content/PlayableConfig';
import {stages} from '../../../game-core/src/content/StageConfig';
import {TransactionCoordinator} from '../../../game-core/src/systems/TransactionCoordinator';
import {recoverSave} from '../../../game-core/src/persistence/SaveRecovery';
import {services} from '../platform/services';
let session:Promise<GameRuntime>|null=null;
export function getGameRuntime():Promise<GameRuntime>{
 if(!session)session=(async()=>{
  const store=services.storage(),namespace='local-guest.production',recovery=recoverSave(await store.readCandidates(namespace),[dataVersion]);
  if(recovery.status==='blocked')throw Error('Your saved progress could not be opened. It has been kept safe.');
  await store.preserve(namespace,recovery.preserve);
  const state=recovery.status==='recovered'?recovery.state:initialGame(Date.now());
  // Validate content references as well as the structural save schema.
  for(const hero of state.data.heroes)if(heroes.get(hero.definitionId).tier!==hero.tier)throw Error('Saved hero content does not match this game version.');
  for(const item of state.data.equipment){const definition=equipmentById.get(item.definitionId);if(!definition||definition.slotType!==item.slotType)throw Error('Saved equipment content does not match this game version.');}
  for(const id of Object.keys(state.data.heroLevels??{}))heroes.get(id);
  for(const id of Object.keys(state.data.relics??{}))if(!relicById.has(id))throw Error('Saved relic content is unavailable.');
  if(state.data.dungeon?.active&&!dragonDefinition(state.data.dungeon.active.dragonId))throw Error('Saved dungeon content is unavailable.');
  const stage=stages.get(state.data.stages.currentStageId);if((state.data.stages.waveOrdinal??0)>=stage.waves.length)throw Error('Saved wave does not match this game version.');
  const coordinator=new TransactionCoordinator(store,{utcMs:()=>Date.now(),monotonicMs:()=>performance.now()},namespace);
  const repaired=reconcileBoardUnlocks(state);
  if(repaired&&recovery.status==='recovered')state.revision++;
  if(recovery.status==='empty'||repaired)await coordinator.commit(state);
  const game=new GameRuntime(state,coordinator.commit),analytics=createAnalytics();
  if(analytics){services.installAnalytics(analytics);analytics.bind(game);}
  return game;
 })().catch(error=>{session=null;throw error;});
 return session;
}
