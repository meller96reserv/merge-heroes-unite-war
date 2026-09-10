import type {AudioVoice} from './AudioTypes';
type Track={id:string;voice:AudioVoice;weight:number};
const ease=(t:number)=>(1-Math.cos(Math.PI*Math.max(0,Math.min(1,t))))/2;
/** Two owned music sources, one bounded envelope timer, and idempotent duck
 * tokens. Gain handles use normalized track weight; settings stay independent. */
export class MusicController {
 private tracks=new Map<string,Track>();private desired:string|null=null;private active=false;
 private fade:{at:number;from:Map<string,number>}|null=null;
 private ducks=new Map<string,number>();private duckWeight=1;
 private duckFade:{at:number;from:number;to:number;duration:number}|null=null;
 private timer:ReturnType<typeof setInterval>|null=null;
 constructor(private start:(id:string)=>AudioVoice|null,private now=()=>performance.now(),private automatic=true){}
 select(id:string|null){
  if(id===this.desired)return;this.tick();this.desired=id;
  if(id===null){for(const track of this.tracks.values())track.voice.stop();this.tracks.clear();this.fade=null;this.stopTimer();return;}
  if(this.active)this.transition();
 }
 setActive(active:boolean){
  if(this.active===active)return;this.tick();this.active=active;
  if(!active){for(const track of this.tracks.values())track.voice.pause();this.fade=null;this.ducks.clear();this.duckFade=null;this.duckWeight=1;this.stopTimer();return;}
  for(const track of this.tracks.values())track.voice.resume();this.transition();
 }
 private transition(){
  if(!this.desired)return;
  if(!this.tracks.has(this.desired)){
   if(this.tracks.size>=2){const quiet=[...this.tracks.values()].sort((a,b)=>a.weight-b.weight)[0]!;quiet.voice.stop();this.tracks.delete(quiet.id);}
   const voice=this.start(this.desired);if(!voice)return;
   voice.setGain(0,0);this.tracks.set(this.desired,{id:this.desired,voice,weight:0});
  }
  if(this.tracks.size===1&&this.tracks.get(this.desired)!.weight===1){this.apply();return;}
  this.fade={at:this.now(),from:new Map([...this.tracks].map(([id,track])=>[id,track.weight]))};this.ensureTimer();this.apply();
 }
 duck(id:string,db:number){
  this.tick();this.ducks.set(id,Math.max(-8,Math.min(0,Number.isFinite(db)?db:0)));this.updateDuck();
 }
 releaseDuck(id:string){if(!this.ducks.has(id))return;this.tick();this.ducks.delete(id);this.updateDuck();}
 private updateDuck(){
  const target=10**(Math.min(0,...this.ducks.values())/20);
  if(!this.active){this.duckWeight=target;this.duckFade=null;return;}
  this.duckFade={at:this.now(),from:this.duckWeight,to:target,duration:target<this.duckWeight?40:350};this.ensureTimer();
 }
 tick=()=>{
  const now=this.now();
  if(this.fade){
   const progress=Math.min(1,(now-this.fade.at)/600),t=ease(progress);
   for(const [id,track] of this.tracks){const from=this.fade.from.get(id)??0;track.weight=from+((id===this.desired?1:0)-from)*t;}
   if(progress===1){for(const [id,track] of this.tracks)if(id!==this.desired){track.voice.stop();this.tracks.delete(id);}this.fade=null;}
  }
  if(this.duckFade){const progress=Math.min(1,(now-this.duckFade.at)/this.duckFade.duration);this.duckWeight=this.duckFade.from+(this.duckFade.to-this.duckFade.from)*ease(progress);if(progress===1)this.duckFade=null;}
  this.apply();if(!this.fade&&!this.duckFade)this.stopTimer();
 };
 private apply(){for(const track of this.tracks.values())track.voice.setGain(track.weight*this.duckWeight,0);}
 private ensureTimer(){if(this.active&&this.automatic&&!this.timer)this.timer=setInterval(this.tick,20);}
 private stopTimer(){if(this.timer)clearInterval(this.timer);this.timer=null;}
 dispose(){this.stopTimer();for(const track of this.tracks.values())track.voice.stop();this.tracks.clear();this.ducks.clear();this.desired=null;this.fade=null;this.duckFade=null;this.duckWeight=1;this.active=false;}
 get stats(){return {musicSources:this.tracks.size,duckOwners:this.ducks.size,musicDuck:this.duckWeight,musicTransition:this.fade?1:0};}
}
