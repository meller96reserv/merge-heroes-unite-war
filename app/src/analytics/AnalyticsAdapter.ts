import type {GameRuntime} from '../game/GameRuntime';
import type {AnalyticsPort} from '../platform/services';
export interface AnalyticsSink {start():void;enabled(value:boolean):void;event(name:string,parameters:Record<string,string|number|boolean>):void;flush():void;}
const names:Record<string,string>={'purchase.succeeded':'hero_purchased','merge.completed':'merge_completed','tier.discovered':'hero_discovered','stage.cleared':'stage_cleared','dungeon.completed':'dragon_completed','daily.claimed':'daily_claimed','wheel.reserved':'wheel_started','wheel.claimed':'wheel_claimed','reward.committed':'reward_claimed','equipment.changed':'equipment_changed','item.enhanced':'equipment_enhanced','upgrade.committed':'upgrade_purchased','relic.opened':'relic_opened'};
const fields=new Set(['tier','resultTier','level','count','stageId','dragonId','kind','placement']);
/** Analytics is optional telemetry, downstream of durable events, never authority. */
export class AnalyticsAdapter implements AnalyticsPort {
 private started=false;private allowed=false;private seen=new Set<string>();private queue:{name:string;params:Record<string,string|number|boolean>;at:number}[]=[];
 constructor(private sink:AnalyticsSink,private now=()=>Date.now()){}
 async start(){if(this.started||!this.allowed)return;try{this.sink.start();this.started=true;this.sink.enabled(this.allowed);}catch{/* Gameplay remains available. */}}
 consent(allowed:boolean){this.allowed=allowed;if(!allowed)this.queue=[];if(this.started)try{this.sink.enabled(allowed);}catch{}if(allowed){void this.start().then(()=>this.drain());}}
 event(name:string,parameters:Record<string,string|number|boolean>){
  if(!this.allowed||!Object.values(names).includes(name))return;
  const params:Record<string,string|number|boolean>={schemaVersion:1};
  for(const [key,value] of Object.entries(parameters))if(fields.has(key)&&((typeof value==='number'&&Number.isSafeInteger(value))||typeof value==='boolean'||typeof value==='string'&&/^[A-Za-z0-9_.:-]{1,64}$/.test(value)))params[key]=value;
  this.queue.push({name,params,at:this.now()});if(this.queue.length>64)this.queue.shift();this.drain();
 }
 private drain(){if(!this.started||!this.allowed)return;while(this.queue.length){const e=this.queue[0]!;if(this.now()-e.at>60000){this.queue.shift();continue;}try{this.sink.event(e.name,e.params);this.queue.shift();}catch{break;}}}
 bind(game:GameRuntime){
  this.consent(game.dispatcher.getSnapshot().data.analyticsConsent==='granted');void this.start().then(()=>this.drain());
  return game.dispatcher.events.subscribe(batch=>{
   this.consent(game.dispatcher.getSnapshot().data.analyticsConsent==='granted');
   for(const e of batch){if(this.seen.has(e.eventId))continue;this.seen.add(e.eventId);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value!);const name=names[e.type];if(name)this.event(name,(e.payload??{}) as Record<string,string|number|boolean>);}
  });
 }
 flush(){this.drain();if(this.allowed&&this.started)try{this.sink.flush();}catch{}}
}
