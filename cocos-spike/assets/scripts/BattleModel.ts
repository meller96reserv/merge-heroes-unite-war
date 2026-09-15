import {GameRuntime,GameCommand} from './runtime/GameRuntime';
import {BattleRuntime} from './runtime/BattleRuntime';
import {loadLocalGame} from './runtime/LocalGame';
import {heroes,offers} from './core/content/PlayableConfig';
import {quotePurchase} from './core/selectors/PurchaseQuote';
import {stageDefinitions,stages} from './core/content/StageConfig';
import {dragonDefinition} from './core/modes/DragonMode';
import {deploymentCapacity} from './core/systems/AccountProgression';
import {NativeServices} from './NativeServices';
import {ENEMY_ART} from './EnemyArt';
export const CONFIG={reserveSlots:15,deploymentCapacity:1};
export interface Hero{id:number;slot:number;tier:number;deployed:boolean;}
export type BattleEvent={type:string;hero?:any;heroId?:number;consumedId?:number;attackType?:string;attackId?:string;flightSeconds?:number;crit?:boolean;boss?:boolean;damage?:number;rewards?:{gold:string;gem:string};message?:string;boostId?:string};
const id=(n:number)=>'hero_'+n;
const numeric=(s:string)=>Number(s.replace('hero_',''));
export class BattleModel {
 game!:GameRuntime; battle!:BattleRuntime;kills=0;
 private encounter=''; private revision=-1;private unsub:()=>void=()=>{};private unsubEvents:()=>void=()=>{};
 private observedHero:string|null=null;private tutorialRemaining=0;
 constructor(private emit:(e:BattleEvent)=>void){}
 async init(){
  this.game=await loadLocalGame();this.battle=new BattleRuntime(this.game);this.battle.setCocosPaused(false);
  this.encounter=this.battle.getSnapshot().combat.encounter.id;
  this.unsub=this.battle.subscribe(()=>this.visual());
  this.unsubEvents=this.game.dispatcher.events.subscribe(batch=>{
   let gold=0n,gem=0n;
   for(const e of batch){const p=e.payload as any;
    // These events are emitted only after durable, idempotent reward commits,
    // matching the RN RewardMotion source. Aggregate kill + first-clear once.
    if(['kill.rewardCommitted','stage.firstClearCommitted','dungeon.completed'].includes(e.type))for(const grant of p.grants){
     if(grant.kind==='currency'&&grant.id==='gold')gold+=BigInt(grant.amount);
     if(grant.kind==='currency'&&grant.id==='gem')gem+=BigInt(grant.amount);
    }
    if(['purchase.succeeded','merge.completed','hero.sold','equipment.purchased','equipment.changed','hero.statsChanged','stage.cleared','dungeon.completed','wheel.claimed','freeCoins.claimed','stageBoost.claimed','tutorial.completed'].includes(e.type))NativeServices.event(e.type);
    if(e.type==='stageBoost.available')this.emit({type:'boost',boostId:p.boostId});
    const h=(s:string)=>this.heroes.find(h=>h.id===numeric(s));
    if(e.type==='purchase.succeeded'&&h(p.instanceId))this.emit({type:'purchase',hero:h(p.instanceId)});
    if(e.type==='merge.completed'&&h(p.newId))this.emit({type:'merge',hero:h(p.newId),consumedId:numeric(p.oldIds[0])});
    if(e.type==='deployment.capacityUnlocked')this.emit({type:'capacity',message:'BATTLE CAPACITY '+p.capacity+' · DEPLOY ANOTHER HERO'});
    if((e.type==='hero.deployed'||e.type==='hero.withdrawn')&&h(p.heroId))this.emit({type:e.type==='hero.deployed'?'deploy':'withdraw',hero:h(p.heroId)});
    if(e.type==='kill.rewardCommitted'){this.kills++;this.emit({type:'death'});}
    if(e.type==='stage.cleared'||e.type==='dungeon.completed')this.emit({type:'clear',boss:e.type==='dungeon.completed'||!!stageDefinitions.find(s=>s.id===p.stageId)?.boss});
    if(e.type==='board.changed'&&p.heroId&&h(p.heroId))this.emit({type:'move',hero:h(p.heroId)});
    if(e.type==='boss.failed'||e.type==='dungeon.failed')this.emit({type:'notice',message:'TIME UP · UPGRADE YOUR HEROES AND RETRY'});
   }
   if(gold>0n||gem>0n)this.emit({type:'reward',rewards:{gold:gold.toString(),gem:gem.toString()}});
   this.emit({type:'sync'});
  });
 }
 get snapshot(){return this.game.dispatcher.getSnapshot();}
 get tutorialObserved(){return this.observedHero!==null;}
 get gold(){return Number(this.snapshot.data.currencies.gold);}
 get heroes():Hero[]{return this.snapshot.data.heroes.map(h=>({id:numeric(h.id),slot:h.slotId,tier:h.tier,deployed:h.deployed}));}
 get capacity(){return deploymentCapacity(this.snapshot);}
 get unlockedSlots(){return this.snapshot.data.board.filter(s=>s.unlocked).length;}
 get price(){const q=quotePurchase(this.snapshot,offers[0],heroes);return q.ok?Number(q.cost):this.offerPrice(1);}
 offerPrice(tier:number):number {const q=quotePurchase(this.snapshot,offers[tier-1],heroes);return Number(q.cost??0);}
 get deployed(){return this.heroes.find(h=>h.deployed);}
 get deployedHeroes(){return this.heroes.filter(h=>h.deployed);}
 get stage(){const v=this.battle.getSnapshot();const d=this.snapshot.data.dungeon?.active; if(d)return {name:dragonDefinition(d.dragonId)!.name,waves:[{}]};const s=stageDefinitions.find(s=>s.id===v.stageId)??stages.get(this.snapshot.data.stages.currentStageId);return {name:`${s.chapter}-${s.displayIndex}`,waves:s.waves};}
 get waveIndex(){return this.battle.getSnapshot().waveOrdinal??0;}
 get enemy(){const e=this.battle.getSnapshot().combat.encounter.entities.find(e=>e.side==='enemy');return {art:e?.definitionId.startsWith('dragon_')?dragonDefinition(e.definitionId.slice(7))!.visualId:ENEMY_ART[e?.definitionId??'ironhide_boar'],hp:e?.maxHp??40};}
 get hp(){return this.battle.getSnapshot().combat.encounter.entities.filter(e=>e.side==='enemy').reduce((n,e)=>n+e.hp,0);}
 get maxHp(){return this.battle.getSnapshot().combat.encounter.entities.filter(e=>e.side==='enemy').reduce((n,e)=>n+e.maxHp,0)||1;}
 atSlot(s:number){return this.heroes.find(h=>h.slot===s);}
 async command(type:GameCommand['type'],fields:Record<string,unknown>={}):Promise<boolean>{
  try{const result=await this.game.dispatcher.dispatch({type,commandId:this.game.nextId(type),...fields} as GameCommand);
   if(!result.ok)this.emit({type:'notice',message:result.reason.replace(/_/g,' ')});
   return result.ok;
  }catch(e){this.emit({type:'notice',message:'SAVE FAILED · YOUR PROGRESS IS KEPT'});console.error('[cocos-spike] command failed',String(e));return false;}
 }
 buy(tier=1):null{void this.command('BuyHero',{offerId:'buy_tier_'+tier});return null;}
 move(n:number,slot:number):null{const other=this.atSlot(slot);if(other&&other.id!==n)return this.merge(n,other.id);void this.command('MoveHero',{heroId:id(n),slotId:slot});return null;}
 merge(a:number,b:number):null{void this.command('MergeHeroes',{sourceId:id(a),targetId:id(b)});return null;}
 deploy(n:number):null{void this.command('DeployHero',{heroId:id(n),deployed:true});return null;}
 withdraw(n:number):void{void this.command('DeployHero',{heroId:id(n),deployed:false});}
 private visual(){const v=this.battle.getSnapshot();if(this.revision===v.revision)return;this.revision=v.revision;
  if(this.encounter!==v.combat.encounter.id){this.encounter=v.combat.encounter.id;this.emit({type:'respawn'});}
  for(const e of v.events){const p=e.payload as any;
   if(e.type==='attack.intent'&&p.actorId.startsWith('hero_')){const h=this.snapshot.data.heroes.find(h=>h.id===p.actorId);if(h){
    if(this.snapshot.data.player.tutorialState==='step_5'&&!this.observedHero){this.observedHero=h.id;this.tutorialRemaining=2.2;}
    this.emit({type:'attack',heroId:numeric(h.id),attackType:heroes.get(h.definitionId).attackType,attackId:p.id,flightSeconds:(p.hitTick-p.createdTick)*this.battle.engine.config.stepMs/1000/(this.snapshot.data.settings.battleSpeed??1)});
   }}
   if(e.type==='damage.applied')this.emit({type:'hit',damage:p.applied,crit:p.crit,boss:!!v.boss,heroId:numeric(p.actorId),attackId:p.attackId});
  }
  this.emit({type:'hud'});
 }
 update(dt:number){
  this.battle.advance(Math.min(dt,.25)*1000);
  if(this.observedHero&&this.tutorialRemaining>0&&Number.isFinite(this.tutorialRemaining)){
   this.tutorialRemaining-=Math.min(dt,.25);
   if(this.tutorialRemaining<=0){this.tutorialRemaining=Infinity;void this.command('CompleteTutorial',{heroId:this.observedHero}).then(ok=>{if(!ok)this.observedHero=null;});}
  }
 }
 pause(paused:boolean){this.battle?.setCocosPaused(paused);if(paused){this.observedHero=null;this.tutorialRemaining=0;void this.game?.flush();}}
 dispose(){this.unsub();this.unsubEvents();this.battle?.dispose();void this.game?.flush();}
}
