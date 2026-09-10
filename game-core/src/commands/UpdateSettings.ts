import type {Command,Reduction} from './Dispatcher';
import type {GameState} from '../model/GameState';
export type AudioPreferences=Pick<GameState['data']['settings'],'musicGain'|'sfxGain'>;
export type SettingsPreferences=Omit<GameState['data']['settings'],'revision'>;
export type UpdateSettings=Command&{type:'UpdateSettings';settingsRevision:number;patch:Partial<SettingsPreferences>};
/** Preferences use their own revision: an unrelated battle reward must not
 * reject a toggle, while an older settings writer cannot overwrite a newer one. */
export function updateSettings(state:GameState,command:UpdateSettings):Reduction {
 const settings=state.data.settings,revision=settings.revision??0;
 if(command.settingsRevision!==revision)return {ok:false,reason:'STALE_REVISION'};
 const entries=Object.entries(command.patch??{});
 const valid=(key:string,value:unknown)=>key==='battleSpeed'?(value===1||value===2):['musicGain','sfxGain'].includes(key)?typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=1:['haptics','reducedMotion','notifications','analyticsConsent'].includes(key)&&typeof value==='boolean';
 if(!entries.length||entries.some(([key,value])=>!valid(key,value)))return {ok:false,reason:'INVALID_COMMAND'};
 if(!Number.isSafeInteger(revision+1))return {ok:false,reason:'INVALID_STATE'};
 const {analyticsConsent,...patch}=command.patch;
 if(analyticsConsent!==undefined)state.data.analyticsConsent=analyticsConsent?'granted':'denied';
 Object.assign(settings,patch,{revision:revision+1});
 return {ok:true,events:[{type:'settings.changed',payload:{revision:revision+1}}]};
}
