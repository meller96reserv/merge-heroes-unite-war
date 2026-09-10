import {Asset} from 'expo-asset';
import {createAudioPlayer,setAudioModeAsync,setIsAudioActiveAsync,preload,clearAllPreloadedSources} from 'expo-audio';
import type {AudioDriver,AudioClip,AudioStart,AudioVoice} from './AudioTypes';
export class PlatformAudioDriver implements AudioDriver {
 private ready=new Set<string>();private voices=new Set<AudioVoice>();private active=true;private generation=0;
 async prepare(clips:readonly AudioClip[]){
  const generation=this.generation;
  await setAudioModeAsync({playsInSilentMode:true,allowsRecording:false,shouldPlayInBackground:false,interruptionMode:'doNotMix',shouldRouteThroughEarpiece:false});
  for(let i=0;i<clips.length;i+=6)await Promise.all(clips.slice(i,i+6).map(async clip=>{
   if(this.ready.has(clip.key)||generation!==this.generation)return;
   const asset=Asset.fromModule(clip.source);await asset.downloadAsync();
   // Longer sources stream from bundled local files, with bounded native buffering.
   if(generation!==this.generation)return;
   if(clip.durationMs<2000)await preload({uri:asset.localUri??asset.uri});
   if(generation===this.generation)this.ready.add(clip.key);
  }));
 }
 async unlock(){await setIsAudioActiveAsync(true);return true;}
 async setActive(active:boolean){this.active=active;await setIsAudioActiveAsync(active);}
 start(clip:AudioClip,options:AudioStart):AudioVoice|null {
  if(!this.active||!this.ready.has(clip.key))return null;
  const asset=Asset.fromModule(clip.source),player=createAudioPlayer({uri:asset.localUri??asset.uri},{keepAudioSessionActive:true,preferredForwardBufferDuration:5,updateInterval:1000});
  player.loop=options.loop;player.volume=options.gain*.8;player.shouldCorrectPitch=false;player.setPlaybackRate(options.rate);
  let ended=false,ramp:ReturnType<typeof setInterval>|null=null;
  const listener=player.addListener('playbackStatusUpdate',status=>{if(status.didJustFinish&&!options.loop){voice.stop();options.onEnd();}});
  const voice:AudioVoice={
   setGain:(value,duration=30)=>{if(ended)return;if(ramp)clearInterval(ramp);const from=player.volume,to=value*.8,start=Date.now();if(duration<=0){player.volume=to;return;}ramp=setInterval(()=>{const t=Math.min(1,(Date.now()-start)/duration);player.volume=from+(to-from)*t;if(t===1&&ramp){clearInterval(ramp);ramp=null;}},Math.min(20,Math.max(2,duration/3)));},
   pause:()=>{if(!ended)player.pause();},resume:()=>{if(!ended)player.play();},
   stop:()=>{if(ended)return;ended=true;if(ramp)clearInterval(ramp);listener.remove();player.remove();this.voices.delete(voice);},
  };
  this.voices.add(voice);player.play();return voice;
 }
 dispose(){this.generation++;for(const voice of [...this.voices])voice.stop();this.ready.clear();void clearAllPreloadedSources().catch(()=>{});void setIsAudioActiveAsync(false).catch(()=>{});}
 get stats(){return {readyFiles:this.ready.size,voices:this.voices.size,context:this.active?'active':'suspended'};}
}
