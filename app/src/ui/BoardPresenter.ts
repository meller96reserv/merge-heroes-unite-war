import type {GameRuntime} from '../game/GameRuntime';import type {layout} from './ResponsiveLayout';import {InputRouter} from '../input/InputRouter';import {checkMerge} from '../../../game-core/src/systems/MergeRules';import {heroes,mergeRules} from '../../../game-core/src/content/PlayableConfig';
import {boardUnlockStage} from '../../../game-core/src/content/UnlockConfig';
export const rejectionText:Record<string,string>={BOARD_FULL:'Your board is full. Merge two matching heroes!',INSUFFICIENT_GOLD:'Not enough coins yet.',LOCKED:'Keep playing to unlock this.',MAX_TIER:'This hero has reached the highest tier.',INVALID_MERGE:'Match two heroes of the same level.',STALE_REVISION:'The board changed. Try that move again.',SAVE_FAILED:'Progress could not be saved. Please try again.',INVALID_STATE:'That move could not be completed.'};
export type Drag={heroId:string;slotId:number;tier:number;revision:number;pointer:number};
export class BoardPresenter {
 readonly input=new InputRouter();drag:Drag|null=null;
 constructor(readonly game:GameRuntime){}
 lockedHint(slotId:number){const stage=boardUnlockStage(slotId);return stage?`Defeat Boss 1-${stage} to open these five islands.`:rejectionText.LOCKED!;}
 hit(x:number,y:number,l:ReturnType<typeof layout>):number|null {const p=l.toDesign(x,y);return l.board.findIndex(r=>p.x>=r.x&&p.x<=r.x+r.width&&p.y>=r.y-3&&p.y<r.y+r.height);}
 begin(slotId:number,pointer=0):Drag|null {
  const s=this.game.dispatcher.getSnapshot(),slot=s.data.board.find(s=>s.slotId===slotId),hero=s.data.heroes.find(h=>h.id===slot?.unitId);
  if(!hero||!this.input.down(pointer,'board'))return null;
  return this.drag={heroId:hero.id,slotId,tier:hero.tier,revision:s.revision,pointer};
 }
 targets():number[]{
  if(!this.drag)return [];const s=this.game.dispatcher.getSnapshot();
  return s.data.board.filter(slot=>slot.unlocked&&(slot.unitId===null||(slot.unitId!==this.drag!.heroId&&checkMerge(s,this.drag!.heroId,slot.unitId,mergeRules,heroes).ok))).map(s=>s.slotId);
 }
 async drop(slotId:number|null){
  const drag=this.drag;this.cancel();if(!drag||slotId===null||slotId<0||slotId===drag.slotId)return null;
  const slot=this.game.dispatcher.getSnapshot().data.board.find(s=>s.slotId===slotId);if(!slot)return null;
  const common={commandId:this.game.nextId('drop'),expectedRevision:drag.revision};
  return this.game.dispatcher.dispatch(slot.unitId?{...common,type:'MergeHeroes',sourceId:drag.heroId,targetId:slot.unitId}:{...common,type:'MoveHero',heroId:drag.heroId,slotId});
 }
 async tap(slotId:number){
  if(!this.input.down(0,'board'))return null;this.input.up(0);
  const s=this.game.dispatcher.getSnapshot(),slot=s.data.board.find(s=>s.slotId===slotId),hero=s.data.heroes.find(h=>h.id===slot?.unitId);
  if(!slot?.unlocked)return {ok:false as const,reason:'LOCKED' as const};if(!hero)return null;
  return this.game.dispatcher.dispatch({type:'DeployHero',commandId:this.game.nextId('deploy'),expectedRevision:s.revision,heroId:hero.id,deployed:!hero.deployed});
 }
 cancel(){if(this.drag)this.input.cancel(this.drag.pointer);this.drag=null;}
}
