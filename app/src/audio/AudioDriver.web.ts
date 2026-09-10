import {Asset} from 'expo-asset';
import type {AudioDriver,AudioClip,AudioStart,AudioVoice} from './AudioTypes';

/** The same clips/catalogue as native, with predecoded buffers for short cues
 * and exact loop frames. Web Audio gain also works on mobile Safari. */
export class PlatformAudioDriver implements AudioDriver {
 private context:AudioContext|null=null;private output:GainNode|null=null;
 private buffers=new Map<string,AudioBuffer>();private loading=new Map<string,Promise<void>>();
 private voices=new Set<AudioVoice>();private generation=0;
 private getContext(){
  if(!this.context){this.context=new AudioContext({sampleRate:32000,latencyHint:'interactive'});this.output=this.context.createGain();this.output.gain.value=.8;this.output.connect(this.context.destination);}
  return this.context;
 }
 async prepare(clips:readonly AudioClip[]){
  const context=this.getContext(),token=this.generation;
  for(let i=0;i<clips.length;i+=6)await Promise.all(clips.slice(i,i+6).map(clip=>{
   if(this.buffers.has(clip.key))return;
   if(this.loading.has(clip.key))return this.loading.get(clip.key);
   const request=(async()=>{const uri=Asset.fromModule(clip.source).uri,response=await fetch(uri,{credentials:'omit'});if(!response.ok)throw Error('Audio asset unavailable');const buffer=await context.decodeAudioData(await response.arrayBuffer());if(this.generation===token)this.buffers.set(clip.key,buffer);})().finally(()=>this.loading.delete(clip.key));
   this.loading.set(clip.key,request);return request;
  }));
 }
 async unlock(){try{const context=this.getContext();await context.resume();return context.state==='running';}catch{return false;}}
 async setActive(active:boolean){if(!this.context)return;if(active)await this.context.resume();else await this.context.suspend();}
 start(clip:AudioClip,options:AudioStart):AudioVoice|null {
  const context=this.context,buffer=this.buffers.get(clip.key);if(!context||!buffer||context.state!=='running')return null;
  const gain=context.createGain();gain.gain.value=options.gain;gain.connect(this.output!);
  let source:AudioBufferSourceNode|null=null,offset=0,started=0,stopped=false;
  const play=()=>{
   if(stopped||source)return;
   source=context.createBufferSource();source.buffer=buffer;source.loop=options.loop;source.playbackRate.value=options.rate;
   source.connect(gain);started=context.currentTime;
   source.onended=()=>{if(!stopped&&!options.loop){voice.stop();options.onEnd();}};
   source.start(0,offset%buffer.duration);
  };
  const voice:AudioVoice={
   setGain:(value,rampMs=30)=>{const now=context.currentTime;gain.gain.cancelAndHoldAtTime(now);gain.gain.linearRampToValueAtTime(value,now+rampMs/1000);},
   pause:()=>{if(!source)return;offset=(offset+(context.currentTime-started)*options.rate)%buffer.duration;source.onended=null;source.stop();source.disconnect();source=null;},
   resume:()=>play(),
   stop:()=>{if(stopped)return;stopped=true;voice.pause();gain.disconnect();this.voices.delete(voice);},
  };
  this.voices.add(voice);play();return voice;
 }
 dispose(){this.generation++;for(const voice of [...this.voices])voice.stop();this.buffers.clear();this.loading.clear();const context=this.context;this.context=null;this.output=null;if(context)void context.close().catch(()=>{});}
 get stats(){return {readyFiles:this.buffers.size,decodedBytes:[...this.buffers.values()].reduce((n,b)=>n+b.length*b.numberOfChannels*4,0),voices:this.voices.size,context:this.context?.state??'not-created'};}
}
