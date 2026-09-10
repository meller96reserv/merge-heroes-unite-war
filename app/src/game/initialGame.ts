import {createState,type GameState} from '../../../game-core/src/model/GameState';
import {createBoard,unlockBoard} from '../../../game-core/src/model/Board';
import {boardConfig,dataVersion} from '../../../game-core/src/content/PlayableConfig';
import {unlocks} from '../../../game-core/src/content/UnlockConfig';

/** Production bootstrap: the first purchase/placement belongs to the player. */
export function initialGame(utcMs:number):GameState {
 const state=createState({dataVersion,initialGold:'100',utcMs,unlockedSlots:boardConfig.initialUnlocked});
 state.data.board=createBoard(boardConfig);
 return state;
}

/** Repair only earned slot flags in older saves; preserve heroes and receipts. */
export function reconcileBoardUnlocks(state:GameState):boolean {
 const events=unlocks.evaluate(state),slots=unlockBoard(state,boardConfig);
 return events.length>0||slots.length>0;
}
