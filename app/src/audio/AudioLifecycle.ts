import type {AudioDirector} from './AudioDirector';
import type {Snapshot} from '../../../game-core/src/model/GameState';
import type {GameRuntime} from '../game/GameRuntime';

/** Independent gates compose: returning from an ad cannot override background,
 * blur, or a newer saved mute. Only committed preferences reach the mixer. */
export class AudioLifecycle {
 private gates=new Map<string,boolean>([['preferences',false]]);
 private holds=new Set<symbol>();private revision=-1;private active:boolean|null=null;
 constructor(private audio:Pick<AudioDirector,'setActive'|'setGains'|'unlock'>&Partial<Pick<AudioDirector,'flushFocus'>>){this.update();}
 setGate(name:'app'|'focus'|'visibility'|'platformFocus',allowed:boolean){this.gates.set(name,allowed);this.update();}
 private update(){const next=[...this.gates.values()].every(Boolean)&&this.holds.size===0;if(next!==this.active){this.active=next;this.audio.setActive(next);}}
 hold(reason:string){const token=Symbol(reason);this.holds.add(token);this.update();return()=>{if(this.holds.delete(token))this.update();};}
 async during<T>(reason:string,action:()=>Promise<T>):Promise<T>{
  const release=this.hold(reason);
  try{await this.audio.flushFocus?.();return await action();}
  finally{release();await this.audio.flushFocus?.();}
 }
 apply(snapshot:Snapshot){
  if(snapshot.revision<this.revision)return;
  this.revision=snapshot.revision;const settings=snapshot.data.settings;
  this.audio.setGains(settings.musicGain,settings.sfxGain);this.gates.set('preferences',true);this.update();
 }
 bind(game:GameRuntime){this.revision=-1;this.apply(game.dispatcher.getSnapshot());return game.dispatcher.subscribe(()=>this.apply(game.dispatcher.getSnapshot()));}
 unlock(){return this.audio.unlock();}
 dispose(){this.holds.clear();this.revision=-1;this.gates=new Map([['preferences',false]]);this.update();}
}
