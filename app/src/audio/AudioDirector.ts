import type {AudioBus,AudioDriver,AudioEventDefinition,AudioVoice} from './AudioTypes';
import {VoiceAllocator} from './VoiceAllocator';
import {MusicController} from './MusicController';
type Playing={voice:AudioVoice;event:AudioEventDefinition;weight?:number};
const gain=(db:number)=>10**(db/20),clamp=(v:number)=>Number.isFinite(v)?Math.max(0,Math.min(1,v)):0;
/** Shared semantic audio authority. No game state writes, reward RNG, React
 * frames or queued stale one-shots. Platform adapters only perform playback. */
export class AudioDirector {
 private initialized=false;private activated=false;private active=true;private generation=0;
 private initializing:Promise<void>|null=null;private allocator=new VoiceAllocator();
 private voices=new Map<number,Playing>();private loops=new Map<AudioBus,Playing>();
 private musicEntries=new Map<string,Playing>();private music:MusicController;
 private retiring:{entry:Playing;timer:ReturnType<typeof setTimeout>}[]=[];
 private desiredLoops=new Map<AudioBus,string>();private seen=new Set<string>();
 private musicGain=1;private sfxGain=1;private masterGain=1;
 private counts={played:0,suppressed:0,missing:0,errors:0};
 private focusTail:Promise<void>=Promise.resolve();
 private focusReady=false;private focusRevision=0;
 constructor(private driver:AudioDriver,private catalog:Readonly<Record<string,AudioEventDefinition>>){this.music=new MusicController(id=>this.startMusic(id));}
 initialize(){
  if(this.initializing)return this.initializing;
  const token=this.generation;
  const clips=Object.values(this.catalog).flatMap(e=>e.bus==='ambience'?e.files.slice(0,1):e.files);
  this.initializing=this.driver.prepare(clips).then(()=>{if(this.generation===token){this.initialized=true;this.reconcile();}}).catch(()=>{if(this.generation===token){this.counts.errors++;this.initializing=null;}});
  return this.initializing;
 }
 async unlock(){
  const token=this.generation;
  try{const unlocked=await this.driver.unlock();if(token!==this.generation)return;this.activated=unlocked;if(unlocked)await this.syncFocus();}catch{if(token===this.generation)this.counts.errors++;}
 }
 private syncFocus(){
  const token=this.generation,active=this.active,revision=++this.focusRevision;
  // Preserve each transition: a fast no-fill must finish native deactivation
  // before reactivation. Never replay a loop against a still-disabled session.
  this.focusReady=false;
  this.focusTail=this.focusTail.then(async()=>{
   if(token!==this.generation)return;
   await this.driver.setActive(active);
   if(token===this.generation&&revision===this.focusRevision){this.focusReady=active;this.reconcile();}
  }).catch(()=>{if(token===this.generation)this.counts.errors++;});
  return this.focusTail;
 }
 flushFocus=()=>this.focusTail;
 setActive(active:boolean){
  this.active=active;this.focusReady=false;
  if(!active){for(const {voice} of this.voices.values())voice.stop();this.voices.clear();this.allocator.clear();this.clearRetiring();this.music.setActive(false);for(const {voice} of this.loops.values())voice.pause();}
  if(!this.activated)return;
  void this.syncFocus();
 }
 setGains(music:number,sfx:number,master=1){
  if(this.musicGain===clamp(music)&&this.sfxGain===clamp(sfx)&&this.masterGain===clamp(master))return;
  this.musicGain=clamp(music);this.sfxGain=clamp(sfx);this.masterGain=clamp(master);
  for(const entry of [...this.voices.values(),...this.loops.values(),...this.musicEntries.values()])entry.voice.setGain(this.volume(entry.event)*(entry.weight??1));
  this.reconcile();
 }
 private volume(event:AudioEventDefinition){return gain(event.gainDb)*this.masterGain*(event.bus==='music'?this.musicGain:this.sfxGain);}
 private get canPlay(){return this.initialized&&this.activated&&this.active&&this.focusReady;}
 emit(eventId:string,options:{id?:string;neutral?:boolean;variant?:number;rate?:number}={}){
  if(options.id){const key=eventId+':'+options.id;if(this.seen.has(key))return 'duplicate';this.seen.add(key);if(this.seen.size>512)this.seen.delete(this.seen.values().next().value!);}
  const event=this.catalog[eventId];if(!event){this.counts.missing++;return 'missing';}
  if(!this.canPlay||this.volume(event)===0){this.counts.suppressed++;return 'suppressed';}
  const lease=this.allocator.reserve(event,options);if(!lease){this.counts.suppressed++;return 'suppressed';}
  const {id,variant,rate,stolenId}=lease,clip=event.files[variant]!;
  if(stolenId!==undefined){const old=this.voices.get(stolenId);this.voices.delete(stolenId);this.music.releaseDuck(`voice:${stolenId}`);if(old)this.retire(old);}
  try{
   const voice=this.driver.start(clip,{gain:this.volume(event),rate,loop:false,onEnd:()=>{this.voices.delete(id);this.allocator.release(id);this.music.releaseDuck(`voice:${id}`);}});
   if(!voice){this.allocator.release(id);this.counts.suppressed++;return 'suppressed';}
   this.voices.set(id,{voice,event});if(event.duckMusicDb<0)this.music.duck(`voice:${id}`,event.duckMusicDb);this.counts.played++;return 'played';
  }catch{this.allocator.release(id);this.counts.errors++;return 'failed';}
 }
 private retire(entry:Playing){
  const cap=entry.event.bus==='ui'?1:2,same=this.retiring.filter(r=>r.entry.event.bus===entry.event.bus);
  if(same.length>=cap){const oldest=same[0]!;clearTimeout(oldest.timer);oldest.entry.voice.stop();this.retiring.splice(this.retiring.indexOf(oldest),1);}
  entry.voice.setGain(0,8);
  const pending={entry,timer:setTimeout(()=>{entry.voice.stop();this.retiring=this.retiring.filter(r=>r!==pending);},8)};
  this.retiring.push(pending);
 }
 private clearRetiring(){for(const r of this.retiring){clearTimeout(r.timer);r.entry.voice.stop();}this.retiring=[];}
 private startMusic(id:string):AudioVoice|null {
  const event=this.catalog[id];if(!event||!this.canPlay)return null;
  let voice:AudioVoice|null;try{voice=this.driver.start(event.files[0]!,{gain:0,rate:1,loop:true,onEnd:()=>{}});}catch{this.counts.errors++;return null;}if(!voice)return null;
  const entry:Playing={event,voice,weight:0};this.musicEntries.set(id,entry);
  return {setGain:(weight,ramp=0)=>{entry.weight=weight;voice.setGain(this.volume(event)*weight,ramp);},pause:voice.pause,resume:voice.resume,stop:()=>{voice.stop();this.musicEntries.delete(id);}};
 }
 duckMusic(id:string,db:number){this.music.duck(id,db);}
 releaseMusicDuck(id:string){this.music.releaseDuck(id);}
 setLoop(bus:'music'|'ambience',eventId:string|null){
  if(bus==='music'){if(eventId!==null&&this.catalog[eventId]?.bus!=='music')throw Error('Invalid music loop');this.music.select(eventId);this.reconcile();return;}
  if(eventId===null)this.desiredLoops.delete(bus);else {if(this.catalog[eventId]?.bus!==bus)throw Error('Invalid audio loop');this.desiredLoops.set(bus,eventId);}
  this.reconcile();
 }
 private reconcile(){
  this.music.setActive(this.canPlay&&this.musicGain>0&&this.masterGain>0);
  for(const bus of ['ambience'] as const){
   const wanted=this.desiredLoops.get(bus),existing=this.loops.get(bus);
   if(existing&&existing.event.id!==wanted){existing.voice.stop();this.loops.delete(bus);}
   if(!this.canPlay||!wanted)continue;
   const event=this.catalog[wanted]!;
   const playing=this.loops.get(bus);
   if(playing){if(this.volume(event)>0)playing.voice.resume();else playing.voice.pause();continue;}
   if(this.volume(event)===0)continue;
   try{const voice=this.driver.start(event.files[0]!,{gain:this.volume(event),rate:1,loop:true,onEnd:()=>{}});if(voice)this.loops.set(bus,{voice,event});}catch{this.counts.errors++;}
  }
 }
 dispose(){this.generation++;for(const entry of [...this.voices.values(),...this.loops.values()])entry.voice.stop();this.voices.clear();this.allocator.clear();this.clearRetiring();this.music.dispose();this.loops.clear();this.desiredLoops.clear();this.driver.dispose();this.initialized=false;this.activated=false;this.initializing=null;this.seen.clear();}
 get stats(){return {...this.counts,musicGain:this.musicGain,sfxGain:this.sfxGain,ready:this.initialized?1:0,activated:this.activated?1:0,active:this.active?1:0,oneShots:this.voices.size,retiring:this.retiring.length,loops:this.loops.size+this.musicEntries.size,...this.music.stats,...this.allocator.stats,...this.driver.stats};}
}
