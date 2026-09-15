import {native,sys} from 'cc';
export type NativeResult={status:string;completed?:boolean;enabled?:boolean};
/** Native SDKs return status only; amounts and rewards remain in pure core. */
export class NativeServices{
 private static sequence=0;private static initialized=false;
 private static call(method:string,value:string):string{
  if(!sys.isNative)return JSON.stringify({status:'unavailable'});
  if(sys.os===sys.OS.ANDROID)return native.reflection.callStaticMethod('com/cocos/game/GameServices',method,'(Ljava/lang/String;)Ljava/lang/String;',value);
  if(sys.os===sys.OS.IOS)return native.reflection.callStaticMethod('GameServices',method+':',value);
  return JSON.stringify({status:'unavailable'});
 }
 static async request(action:string,fields:Record<string,unknown>={}):Promise<NativeResult>{
  const requestId='native-'+(++this.sequence),deadline=Date.now()+180000;
  try{
   let result=JSON.parse(this.call('request',JSON.stringify({action,requestId,...fields}))||'{}');
   while(result.status==='pending'&&Date.now()<deadline){await new Promise(r=>setTimeout(r,150));result=JSON.parse(this.call('poll',requestId)||'{"status":"pending"}');}
   if(result.status==='pending'){this.call('request',JSON.stringify({action:'cancel',requestId}));return {status:'failed'};}
   return result;
  }catch{return {status:'unavailable'};}
 }
 static initialize(){if(this.initialized)return;this.initialized=true;void this.request('initialize');}
 static event(name:string,value=''){if(this.initialized)void this.request('event',{name,value});}
 static async openLegal(kind:'terms'|'privacy'){return this.request('legal',{kind});}
}
