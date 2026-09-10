type LocaleInfo={group:string;decimal:string;primary:number;secondary:number;digits:readonly string[]};
const english:LocaleInfo={group:',',decimal:'.',primary:3,secondary:3,digits:['0','1','2','3','4','5','6','7','8','9']};
const locales=new Map<string,LocaleInfo>([['en-US',english]]);
function localeInfo(locale:string):LocaleInfo {
 const cached=locales.get(locale);if(cached)return cached;
 if(typeof Intl==='undefined'||typeof Intl.NumberFormat!=='function')return english;
 const formatter=new Intl.NumberFormat(locale);if(typeof formatter.formatToParts!=='function')return english;
 const parts=formatter.formatToParts(123456789),groups=parts.filter(p=>p.type==='integer').map(p=>p.value.length);
 const info={group:parts.find(p=>p.type==='group')?.value??'',decimal:formatter.formatToParts(1.1).find(p=>p.type==='decimal')?.value??'.',primary:groups[groups.length-1]??3,secondary:groups[groups.length-2]??3,digits:Array.from({length:10},(_,i)=>new Intl.NumberFormat(locale,{useGrouping:false}).format(i))};
 if(locales.size>=4)locales.delete(locales.keys().next().value!);locales.set(locale,info);return info;
}
/** Hermes Intl does not accept BigInt. Group decimal strings directly so no
 * authoritative amount ever passes through a floating-point conversion. */
export function formatAmount(value:string,locale='en-US',compact=false):string {
 if(!/^(0|[1-9][0-9]*)$/.test(value))throw Error('Invalid amount display');const info=localeInfo(locale);
 const local=(digits:string)=>digits.replace(/[0-9]/g,d=>info.digits[Number(d)]!);
 if(!compact||value.length<5){
  if(!info.group)return local(value);const groups:string[]=[];let end=value.length,size=info.primary;
  while(end>0){const start=Math.max(0,end-size);groups.unshift(value.slice(start,end));end=start;size=info.secondary;}
  return groups.map(local).join(info.group);
 }
 const exponent=Math.floor((value.length-1)/3)*3,suffix=({3:'K',6:'M',9:'B',12:'T',15:'Qa',18:'Qi'} as Record<number,string>)[exponent];
 const split=suffix?value.length-exponent:1,whole=value.slice(0,split),fraction=value.slice(split,split+Math.max(0,3-split)).replace(/0+$/,'');
 return local(whole)+(fraction?info.decimal+local(fraction):'')+(suffix??`e${value.length-1}`);
}
