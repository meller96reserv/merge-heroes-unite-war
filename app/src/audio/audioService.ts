import {AudioDirector} from './AudioDirector';
import {PlatformAudioDriver} from './AudioDriver';
import {audioEvents} from './AudioCatalog';
import {AudioLifecycle} from './AudioLifecycle';
let service:AudioDirector|null=null;
export function getAudio(){return service??=new AudioDirector(new PlatformAudioDriver(),audioEvents);}
let lifecycle:AudioLifecycle|null=null;
export function getAudioLifecycle(){return lifecycle??=new AudioLifecycle(getAudio());}
