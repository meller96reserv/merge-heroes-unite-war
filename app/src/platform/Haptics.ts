export type HapticKind='selection'|'light'|'medium'|'success';
export type HapticDriver={available:boolean;play:(kind:HapticKind)=>Promise<void>};
export const hapticEvents:Readonly<Record<string,{kind:HapticKind;priority:number}>>={
 'ui.primary':{kind:'light',priority:1},'ui.tab':{kind:'selection',priority:1},
 'hero.purchased':{kind:'light',priority:1},'merge.completed':{kind:'medium',priority:2},
 'tier.discovered':{kind:'success',priority:3},'daily.claimed':{kind:'success',priority:3},
 'chest.opened':{kind:'medium',priority:2},'upgrade.committed':{kind:'medium',priority:2},
 'item.enhanced':{kind:'medium',priority:2},'equipment.changed':{kind:'light',priority:1},
 'wheel.landed':{kind:'medium',priority:3},'stage.cleared':{kind:'success',priority:3},
};
/** No timers or queued playback. Every emission checks the current preference/focus. */
export class Haptics {
 enabled=false;active=false;private last=-Infinity;private seen=new Set<string>();private errors=0;
 constructor(private driver:HapticDriver,private now=()=>performance.now()){}
 emit(event:string,id?:string){
  const rule=hapticEvents[event];if(!rule)return 'unknown';
  if(id){if(this.seen.has(id))return 'duplicate';this.seen.add(id);if(this.seen.size>256)this.seen.delete(this.seen.values().next().value!);}
  if(!this.enabled||!this.active)return 'suppressed';
  if(!this.driver.available)return 'unavailable';
  const now=this.now();if(now-this.last<250)return 'cooldown';this.last=now;
  try{void this.driver.play(rule.kind).catch(()=>{this.errors++;});}catch{this.errors++;}
  return 'requested';
 }
 get stats(){return {seen:this.seen.size,driverErrors:this.errors};}
}
