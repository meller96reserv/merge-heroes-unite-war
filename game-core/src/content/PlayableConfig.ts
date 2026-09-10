import {observedPurchasePrices,discoveryGold} from './EconomyConfig';
import {equipmentRewardCatalog} from './EquipmentConfig';
import {HeroCatalog} from '../model/Hero';import {heroDefinitions} from './HeroDefinitions';import type {BoardConfig} from '../model/Board';import type {PurchaseOffer} from '../selectors/PurchaseQuote';import type {AutoRules} from '../systems/AutoMergeSelector';import type {Grant} from '../systems/RewardService';
/** Versioned product approximation; never imported from reference-analysis fixtures. */
export const dataVersion='playable-v1';
export const heroes=new HeroCatalog(heroDefinitions);
export const boardConfig:BoardConfig={slotCount:15,columns:5,initialUnlocked:5,deploymentCap:3,slotUnlockIds:Array.from({length:15},(_,i)=>i<5?null:`slot_${i}`)};
export const offers:readonly PurchaseOffer[]=[1,2,3].map((tier,i)=>({id:`buy_tier_${tier}`,currencyId:'gold',grantDefinitionId:`hero_tier_${tier}`,prices:observedPurchasePrices,sharedGrowthUnits:([1,2,4] as const)[i]!,afterTable:'repeatLastProposed',holdEnabled:true,holdIntervalMs:200}));
export const mergeRules:AutoRules={manualEnabled:true,compatibility:'sameFamilyAndTier',pairs:Array.from({length:9},(_,i)=>({sourceDefinitionId:`hero_tier_${i+1}`,targetDefinitionId:`hero_tier_${i+1}`,resultDefinitionId:`hero_tier_${i+2}`})),maxTier:10,deployedPolicy:'inheritEither',autoPolicy:'slotOrder',autoUnlockId:null};
export const discoveryRewards:Readonly<Record<number,readonly Grant[]>>=Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,[{kind:'currency',id:'gold',amount:discoveryGold[i]!}]]));
export const rewardCatalog={currencies:['gold','gem','orb'],items:equipmentRewardCatalog,freeSpinId:'fortune'} as const;

/** PROPOSED booster-v1: optional 60 minute convenience entitlement, no ad placement. */
export const autoActivation={durationMs:60*60*1000,costCurrencyId:'gold',costAmount:'100',freeActivationPolicy:'disabled'} as const;
