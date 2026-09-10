import {assertEquipment} from './Equipment';
import type {SaveState} from './SaveTypes';import {Amount} from './Amount';import {freeze} from '../events/EventBus';
export type GameState=SaveState;
export type HeroInstance=GameState['data']['heroes'][number];
export type DeepReadonly<T> = T extends object ? {readonly [P in keyof T]:DeepReadonly<T[P]>}:T;
export type Snapshot=DeepReadonly<GameState>;
export function createState({dataVersion,initialGold,utcMs,unlockedSlots=15,firstStage='stage_1_1'}:{dataVersion:string;initialGold:string;utcMs:number;unlockedSlots?:number;firstStage?:string}):GameState{
 Amount.from(initialGold);
 if(!Number.isSafeInteger(utcMs)||utcMs<0||!Number.isInteger(unlockedSlots)||unlockedSlots<1||unlockedSlots>15)throw Error('Invalid initial state');
 return {schemaVersion:1,dataVersion,revision:0,generation:0,createdAt:utcMs,updatedAt:utcMs,lastActiveAt:utcMs,data:{
 player:{accountLevel:1,xp:'0',tutorialVersion:1,completedTutorialSteps:[]},currencies:{gold:initialGold,gem:'0'},heroes:[],board:Array.from({length:15},(_,slotId)=>({slotId,unlocked:slotId<unlockedSlots,unitId:null})),
 progression:{discoveredTiers:[],highestClearedOrdinal:0,purchaseCounts:{}},stages:{currentStageId:firstStage,encounterSequence:0,waveOrdinal:0,bossRetryAvailable:false,farmStageId:null},unlocks:{unlockedIds:[],announcedIds:[]},equipment:[],quests:{},daily:{lastClaimedPeriod:null,attendanceIndex:0},wheel:{nextFreeAt:0,freeSpins:0,pendingSpin:null},offline:{lastProcessedAt:utcMs,pendingClaim:null},
 settings:{musicGain:1,sfxGain:1,haptics:true,reducedMotion:false,notifications:false},analyticsConsent:'unknown',transactionReceipts:[],sourceWatermarks:{},nextInstanceSequence:1,rng:{algorithm:'xoshiro128ss-proposed-v1',combatState:[1,2,3,4],rewardState:[5,6,7,8]},autoMerge:{enabled:false,entitlementId:null,expiresAtUtcMs:null,lastObservedWallUtcMs:utcMs}}};
}
export function snapshot(state:GameState):Snapshot{return freeze(JSON.parse(JSON.stringify(state)) as GameState);}
export function draft(state:Snapshot):GameState{return JSON.parse(JSON.stringify(state)) as GameState;}
export function assertState(state:GameState|Snapshot,deploymentCap=3):void{
 assertEquipment(state);
 const {data}=state;
 for(const amount of Object.values(data.currencies))Amount.from(amount);
 if(!Number.isSafeInteger(state.revision)||state.revision<0)throw Error('Invalid revision');
 const heroes=new Map(data.heroes.map(h=>[h.id,h]));
 if(heroes.size!==data.heroes.length)throw Error('Duplicate hero ID');
 if(new Set(data.board.map(s=>s.slotId)).size!==data.board.length)throw Error('Duplicate slot ID');
 const assigned=new Set<string>();
 for(const slot of data.board){
  if(slot.unitId===null)continue;
  const hero=heroes.get(slot.unitId);
  if(!slot.unlocked||!hero||hero.slotId!==slot.slotId||assigned.has(slot.unitId))throw Error('Invalid board ownership');
  assigned.add(slot.unitId);
 }
 if(assigned.size!==heroes.size)throw Error('Unassigned owned hero');
 if(data.heroes.filter(h=>h.deployed).length>deploymentCap)throw Error('Deployment cap exceeded');
 if(new Set(data.transactionReceipts.map(r=>r.id)).size!==data.transactionReceipts.length)throw Error('Duplicate receipt');
}
