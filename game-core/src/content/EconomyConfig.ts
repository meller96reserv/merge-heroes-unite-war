/** Shipped economy-v2, PROPOSED after the owner pacing review. Only the first
 * 30 tier-1 prices are OBSERVED (RUN-03); late growth is a product decision.
 * Shared recruited-unit count prevents resetting price by switching offers.
 * A quadratic tail remains affordable longer than an unbounded exponential. */
export const economyVersion='shipped-economy-v2';
export const observedPurchasePrices=Array.from({length:30},(_,i)=>i<15?'1':i<23?'2':i<29?'3':'4');
export const purchaseUnits={buy_tier_1:1,buy_tier_2:2,buy_tier_3:4} as const;
export function purchaseUnitCost(index:bigint):bigint {
 if(index<0n)throw Error('Invalid purchase index');
 if(index<30n)return BigInt(observedPurchasePrices[Number(index)]!);
 const tail=index-29n;return 4n+tail*tail/1600n;
}
export function scaledPurchaseCost(counts:Readonly<Record<string,number>>,units:number):string {
 if(![1,2,4].includes(units))throw Error('Invalid recruitment units');
 let index=0n;
 for(const [id,weight] of Object.entries(purchaseUnits)){
  const n=counts[id]??0;if(!Number.isSafeInteger(n)||n<0)throw Error('Invalid purchase count');
  index+=BigInt(n)*BigInt(weight);
 }
 let cost=0n;for(let i=0;i<units;i++)cost+=purchaseUnitCost(index+BigInt(i));
 return cost.toString();
}
export const discoveryGold=['0','5','10','15','25','40','60','90','140','220'] as const;
