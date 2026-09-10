export type WheelSpinRequest=Readonly<{id:string;landingAngleDegrees:number;kind?:'fortune'|'boost';segments?:number}>;
export function wheelEasing(t:number){
 'worklet';
 const p=Math.max(0,Math.min(1,t)),a=900/3700,k=5*a/(2+3*a);
 if(p<a)return k*(p/a)**2;
 return k+(1-k)*(1-(1-(p-a)/(1-a))**5);
}
export function planWheelSpin(fromDegrees:number,request:WheelSpinRequest){
 if(!request.id||![fromDegrees,request.landingAngleDegrees].every(Number.isFinite))throw Error('Invalid saved wheel target');
 const segments=request.segments??12;
 if(!Number.isInteger(segments)||segments<2||segments>64)throw Error('Invalid wheel segment count');
 const normalize=(angle:number)=>((angle%360)+360)%360,from=normalize(fromDegrees),target=normalize(request.landingAngleDegrees),boost=request.kind==='boost';
 return Object.freeze({id:request.id,from,to:from+360*(boost?3:5)+normalize(target-from),durationMs:boost?1500:3700,segments});
}
