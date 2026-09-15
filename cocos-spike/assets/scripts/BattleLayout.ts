export const BATTLE_BOARD_OFFSET=337;
export const BATTLE_ROW_GAP=43;
export const BATTLE_PANEL_TOP=18;
export const BATTLE_SLOT_TOP=28;
export function battleBoardTop(height:number){return height-BATTLE_BOARD_OFFSET;}
export function battleBoostTop(height:number){return height-376;}

/** Logical coordinates shared by drag acceptance and the tutorial spotlight. */
export function battleDropArea(boardTop:number){
    const y=Math.min(285,boardTop-195);
    return {x:10,y,w:410,h:boardTop-18-y};
}
export function insideBattle(x:number,y:number,boardTop:number){
    const r=battleDropArea(boardTop);return x>=r.x&&x<=r.x+r.w&&y>=r.y&&y<=r.y+r.h;
}
