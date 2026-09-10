import type {BattleLayout} from '../components/BattleBoard';
/** GAP-005: original scenery is flattened. The shipped fallback stays static in
 * every motion mode, preserving composition without invented parallax layers.
 * Coverage is clamped to the visible world; board/HUD retain independent anchors.
 */
export function backgroundPresentation(l:BattleLayout){
 const dy=l.boostY-487,x=-47.257,y=Math.min(0,-150.984+dy*0.5);
 return {x,y,width:Math.max(524.514,430-x),height:Math.max(1082.984+dy*0.5,l.boardTop-y)};
}
