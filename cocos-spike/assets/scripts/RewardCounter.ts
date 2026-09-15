export type RewardCurrency = 'gold' | 'gem';

/** Presentation-only withholding of already committed currency. Never writes a save. */
export class RewardCounter {
 private sequence=0;
 private pending=new Map<number,{currency:RewardCurrency;amount:bigint}>();
 reserve(currency:RewardCurrency,amount:string,parts:number):(part:number)=>boolean {
  const total=BigInt(amount),id=++this.sequence,seen=new Set<number>();
  if(total<=0n||parts<1)return ()=>false;
  this.pending.set(id,{currency,amount:total});
  return part=>{
   const record=this.pending.get(id);
   if(!record||seen.has(part)||part<0||part>=parts)return false;
   seen.add(part);
   // Integer partitions sum exactly, including amounts larger than Number.MAX_SAFE_INTEGER.
   record.amount-=total*BigInt(part+1)/BigInt(parts)-total*BigInt(part)/BigInt(parts);
   if(seen.size===parts)this.pending.delete(id);
   return true;
  };
 }
 display(currency:RewardCurrency,committed:string):string {
  let value=BigInt(committed);
  for(const r of this.pending.values())if(r.currency===currency)value-=r.amount;
  return (value>0n?value:0n).toString();
 }
 clear(){this.pending.clear();}
}
