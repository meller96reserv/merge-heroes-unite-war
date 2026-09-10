import {dragonDefinition} from '../../../game-core/src/modes/DragonMode';
import type {Snapshot} from '../../../game-core/src/model/GameState';import type {BattleVisualSnapshot} from '../battle/BattleRuntime';import {stages} from '../../../game-core/src/content/StageConfig';
/** Values are domain projections. Figma's 2-100 label is only a separate visual fixture. */
export function stageHud(state:Snapshot,battle:BattleVisualSnapshot|null){
 const dragon=battle?.stageId?.startsWith('dungeon_')?dragonDefinition(battle.stageId.slice(8)):undefined;
 if(dragon){const enemy=battle?.combat.encounter.entities.find(e=>e.side==='enemy'),hp=enemy?.hp??dragon.hp;return {label:'DUNGEON',progress:1-hp/dragon.hp,hp,maxHp:dragon.hp,waveLabel:dragon.name.toUpperCase(),boss:true,remainingSeconds:battle?.boss?Math.ceil(battle.boss.remainingMs/1000):45,retryStageId:null,farming:false,barLabel:'BOSS'};}
 const stage=stages.get(battle?.stageId??state.data.stages.currentStageId),enemies=battle?.combat.encounter.entities.filter(e=>e.side==='enemy')??[],hp=enemies.reduce((sum,e)=>sum+e.hp,0),maxHp=enemies.reduce((sum,e)=>sum+e.maxHp,0),wave=battle?.waveOrdinal??state.data.stages.waveOrdinal??0;
 const retry=state.data.stages.bossRetryAvailable?stages.bossForFarm(state.data.stages.farmStageId??''):null;
 return {label:`${stage.chapter}-${stage.displayIndex}`,progress:(wave+(maxHp?1-hp/maxHp:0))/stage.waves.length,hp,maxHp,waveLabel:`WAVE ${wave+1}/${stage.waves.length}`,boss:!!stage.boss,remainingSeconds:battle?.boss?Math.ceil(battle.boss.remainingMs/1000):null,retryStageId:retry?.id??null,farming:!!retry,barLabel:stage.boss?'BOSS':`${wave+1}/${stage.waves.length}`};
}
