import type {GameState,Snapshot} from '../model/GameState';
import type {Command,Intent,Reduction} from '../commands/Dispatcher';

export type TutorialState='not_started'|'step_1'|'step_2'|'step_3'|'step_4'|'step_5'|'completed';
const order:readonly TutorialState[]=['not_started','step_1','step_2','step_3','step_4','step_5','completed'];
export const tutorialState=(s:GameState|Snapshot):TutorialState=>s.data.player.tutorialState??'completed';
export const tutorialActive=(s:GameState|Snapshot)=>tutorialState(s)!=='completed';

/** Forward-only reconciliation reads ownership; it never performs a gameplay
 * action. Visible battle platforms and the deployment cap are unrelated here. */
function validStep(s:GameState):TutorialState {
 const h=s.data.heroes;
 if(h.some(h=>h.deployed))return 'step_5';
 if(h.some(h=>h.tier>=2)||s.data.progression.discoveredTiers.some(t=>t>=2))return 'step_4';
 if(h.length>=2)return 'step_3';
 return h.length?'step_2':'step_1';
}
export function reconcileTutorial(s:GameState):boolean {
 const previous=s.data.player.tutorialState;
 if(previous===undefined){
  const progressed=s.data.heroes.length>0||s.data.progression.discoveredTiers.length>0||s.data.progression.highestClearedOrdinal>0||Object.values(s.data.progression.purchaseCounts).some(n=>n>0)||s.data.player.completedTutorialSteps.length>0;
  s.data.player.tutorialState=progressed?'completed':'not_started';
 }
 if(tutorialActive(s)){
  const next=validStep(s);
  if(order.indexOf(next)>order.indexOf(tutorialState(s)))s.data.player.tutorialState=next;
 }
 return previous!==s.data.player.tutorialState;
}
/** Called with successful purchase/merge/deploy intents inside their own draft.
 * Failed commands/commits and receipt replays cannot checkpoint the guide. */
export function advanceTutorial(s:GameState,events:readonly Intent[]):Intent[] {
 if(!tutorialActive(s)||!events.some(e=>['purchase.succeeded','merge.completed','hero.deployed'].includes(e.type)))return [];
 return reconcileTutorial(s)?[{type:'tutorial.stepChanged',payload:{step:tutorialState(s)}}]:[];
}
export type FinishTutorial=Command&({type:'SkipTutorial'}|{type:'CompleteTutorial';heroId:string});
export function finishTutorial(s:GameState,c:FinishTutorial):Reduction {
 if(!tutorialActive(s))return {ok:true,events:[]};
 if(c.type==='CompleteTutorial'&&(tutorialState(s)!=='step_5'||!s.data.heroes.some(h=>h.id===c.heroId&&h.deployed)))return {ok:false,reason:'INVALID_STATE'};
 s.data.player.tutorialState='completed';
 return {ok:true,events:[{type:'tutorial.completed',payload:{skipped:c.type==='SkipTutorial'}}]};
}
