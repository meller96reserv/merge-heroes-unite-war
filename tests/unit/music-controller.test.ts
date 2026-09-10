import test from 'node:test';import assert from 'node:assert/strict';
import {MusicController} from '../../app/src/audio/MusicController';
function setup(){
 let now=0;const tracks:{id:string;gain:number;paused:boolean;stopped:boolean}[]=[];
 const music=new MusicController(id=>{const track={id,gain:0,paused:false,stopped:false};tracks.push(track);return {setGain:(gain:number)=>{track.gain=gain;},pause:()=>{track.paused=true;},resume:()=>{track.paused=false;},stop:()=>{track.stopped=true;}};},()=>now,false);
 const advance=(ms:number)=>{now+=ms;music.tick();};return {music,tracks,advance};
}
test('main/boss transitions crossfade in 600ms with at most two sources through rapid replacement',()=>{
 const {music,tracks,advance}=setup();music.select('main');assert.equal(tracks.length,0);music.setActive(true);advance(600);
 assert.equal(tracks[0]?.gain,1);music.select('boss');assert.equal(music.stats.musicSources,2);
 advance(300);assert.ok(Math.abs(tracks[0]!.gain-.5)<1e-8);assert.ok(Math.abs(tracks[1]!.gain-.5)<1e-8);
 music.select('main');advance(600);assert.equal(music.stats.musicSources,1);assert.equal(tracks[0]?.stopped,false);assert.equal(tracks[1]?.stopped,true);assert.equal(tracks[0]?.gain,1);
 music.select('main');assert.equal(tracks.length,2);music.dispose();assert.ok(tracks.every(t=>t.stopped));
});
test('duck owners compose by strongest request, release independently and cannot stay latched after interruption',()=>{
 const {music,tracks,advance}=setup();music.select('main');music.setActive(true);advance(600);
 music.duck('reward',-4);music.duck('boss',-20);advance(40);
 assert.equal(music.stats.duckOwners,2);assert.ok(Math.abs(tracks[0]!.gain-10**(-8/20))<1e-8);
 music.releaseDuck('boss');advance(350);assert.ok(Math.abs(tracks[0]!.gain-10**(-4/20))<1e-8);
 music.releaseDuck('boss');assert.equal(music.stats.duckOwners,1);
 music.setActive(false);assert.equal(tracks[0]?.paused,true);assert.equal(music.stats.duckOwners,0);
 music.setActive(true);advance(600);assert.equal(tracks.length,1);assert.equal(tracks[0]?.gain,1);assert.equal(tracks[0]?.paused,false);
 music.duck('result',-3);advance(40);music.releaseDuck('result');advance(350);assert.equal(tracks[0]?.gain,1);music.dispose();
});
