export type AudioBus='music'|'sfx'|'ui'|'ambience';
export type AudioClip={key:string;source:number|string;durationMs:number};
export type AudioEventDefinition={id:string;bus:AudioBus;files:readonly AudioClip[];gainDb:number;cooldownMs:number;maxConcurrent:number;pitchRange:number;duckMusicDb:number;neutralVariant:number|null};
export type AudioVoice={setGain:(gain:number,rampMs?:number)=>void;pause:()=>void;resume:()=>void;stop:()=>void};
export type AudioStart={gain:number;rate:number;loop:boolean;onEnd:()=>void};
export interface AudioDriver {
 prepare(clips:readonly AudioClip[]):Promise<void>;
 unlock():Promise<boolean>;
 setActive(active:boolean):Promise<void>;
 start(clip:AudioClip,options:AudioStart):AudioVoice|null;
 dispose():void;
 readonly stats:Readonly<Record<string,string|number>>;
}
