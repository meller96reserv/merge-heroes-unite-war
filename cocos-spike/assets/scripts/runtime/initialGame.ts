import {createState,type GameState} from '../core/model/GameState';
import {createBoard,unlockBoard} from '../core/model/Board';
import {boardConfig,dataVersion} from '../core/content/PlayableConfig';
import {unlocks} from '../core/content/UnlockConfig';

/** Production bootstrap: the first purchase/placement belongs to the player. */
export function initialGame(utcMs:number):GameState {
 const state=createState({dataVersion,initialGold:'100',utcMs,unlockedSlots:boardConfig.initialUnlocked});
 state.data.board=createBoard(boardConfig);
 state.data.player.tutorialState='not_started';
 return state;
}

/** Repair only earned slot flags in older saves; preserve heroes and receipts. */
export function reconcileBoardUnlocks(state:GameState):boolean {
 const events=unlocks.evaluate(state),slots=unlockBoard(state,boardConfig);
 return events.length>0||slots.length>0;
}
