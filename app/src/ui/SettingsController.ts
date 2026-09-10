import {runMetaAction} from './MetaActions';
import type {GameRuntime} from '../game/GameRuntime';
import type {SettingsPreferences} from '../../../game-core/src/commands/UpdateSettings';
type View={pending:number;error:string};
/** Serial partial patches preserve other controls and resolve the settings
 * revision at execution time. Mixer/haptics subscribe to committed snapshots. */
export class SettingsController {
 private view:View={pending:0,error:''};private listeners=new Set<()=>void>();
 private tail:Promise<unknown>=Promise.resolve();private alive=true;
 constructor(private game:GameRuntime){}
 getSnapshot=()=>this.view;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(patch:Partial<View>){if(!this.alive)return;this.view={...this.view,...patch};for(const listener of this.listeners)listener();}
 set(patch:Partial<SettingsPreferences>):Promise<boolean>{
  if(!this.alive)return Promise.resolve(false);
  const copy={...patch};this.update({pending:this.view.pending+1,error:''});
  const action=this.tail.then(async()=>{
   if(!this.alive)return false;
   const {result}=await runMetaAction(this.game,{type:'UpdateSettings',commandId:this.game.nextId('settings'),settingsRevision:this.game.dispatcher.getSnapshot().data.settings.revision??0,patch:copy});
   this.update({pending:this.view.pending-1,error:result.ok?'':'Could not save your settings. Please try again.'});return result.ok;
  }).catch(()=>{this.update({pending:this.view.pending-1,error:'Could not save your settings. Please try again.'});return false;});
  this.tail=action;return action;
 }
 dispose=()=>{this.alive=false;this.listeners.clear();};
}
