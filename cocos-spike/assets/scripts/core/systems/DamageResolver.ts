import type {AttackIntent} from './AttackSystem';import type {CombatEntity} from '../model/CombatEntity';
export type DamageConfig={damageModel:'proposedSubtractDefense';rounding:'floor'|'round'|'ceil';minimumDamage:number};
export type DamageResult={attackId:string;actorId:string;targetId:string;raw:number;crit:boolean;mitigated:number;applied:number;hpBefore:number;hpAfter:number};
export class DamageResolver {
 private resolved=new Set<string>();
 constructor(private config:DamageConfig){if(config.damageModel!=='proposedSubtractDefense'||!Number.isSafeInteger(config.minimumDamage)||config.minimumDamage<0)throw Error('Invalid damage configuration');}
 resolve(intent:AttackIntent,target:CombatEntity,rngBp:()=>number):DamageResult|null {
  if(this.resolved.has(intent.id)||target.id!==intent.targetId||target.encounterId!==intent.encounterId||target.hp<=0)return null;
  if([intent.attack,intent.critChanceBp,intent.critMultiplierBp,target.hp,target.defense].some(n=>!Number.isSafeInteger(n)||n<0)||intent.critChanceBp>10000||intent.critMultiplierBp<10000||intent.critMultiplierBp>100000||BigInt(intent.attack)*BigInt(intent.critMultiplierBp)>BigInt(Number.MAX_SAFE_INTEGER)*10000n)throw Error('Invalid or overflowing damage input');
  let crit=false;if(intent.attack>0&&intent.critChanceBp>0){const roll=rngBp();if(!Number.isInteger(roll)||roll<0||roll>=10000)throw Error('Invalid critical roll');crit=roll<intent.critChanceBp;}
  const numerator=BigInt(intent.attack)*BigInt(crit?intent.critMultiplierBp:10000),bias=this.config.rounding==='ceil'?9999n:this.config.rounding==='round'?5000n:0n;
  const raw=Number((numerator+bias)/10000n),mitigated=intent.attack===0?0:Math.max(this.config.minimumDamage,raw-target.defense),hpBefore=target.hp,applied=Math.min(hpBefore,mitigated);
  target.hp=hpBefore-applied;this.resolved.add(intent.id);
  return {attackId:intent.id,actorId:intent.actorId,targetId:target.id,raw,crit,mitigated,applied,hpBefore,hpAfter:target.hp};
 }
 clear(){this.resolved.clear();}
}
