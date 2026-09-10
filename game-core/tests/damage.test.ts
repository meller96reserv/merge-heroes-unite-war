import {test} from 'node:test';import assert from 'node:assert/strict';import {DamageResolver} from '../src/systems/DamageResolver';import {entity} from './combat-entity.test';import {hit} from './hit-queue.test';
test('integer critical rounding, defense, min damage and HP clamp; duplicate hit never draws or damages again',()=>{
 const d=new DamageResolver({damageModel:'proposedSubtractDefense',rounding:'floor',minimumDamage:1}),target=entity('enemy','enemy');target.hp=5;target.defense=3;
 const intent={...hit(),attack:7,critChanceBp:10000};let draws=0;const result=d.resolve(intent,target,()=>{draws++;return 9999;});assert.deepEqual(result,{attackId:'attack1',actorId:'hero',targetId:'enemy',raw:10,crit:true,mitigated:7,applied:5,hpBefore:5,hpAfter:0});assert.equal(d.resolve(intent,target,()=>{throw Error('unexpected draw');}),null);assert.equal(draws,1);
 const defended=entity('enemy','enemy');defended.defense=100;assert.equal(d.resolve({...hit('defense'),attack:1},defended,()=>assert.fail())!.applied,1);assert.equal(d.resolve({...hit('zero'),attack:0},defended,()=>assert.fail())!.applied,0);
 for(const [roll,crit] of [[2499,true],[2500,false]] as const){const t=entity('enemy','enemy');assert.equal(d.resolve({...hit(`threshold${roll}`),critChanceBp:2500},t,()=>roll)!.crit,crit);}
 const t=entity('enemy','enemy'),before=t.hp;assert.throws(()=>d.resolve({...hit('overflow'),attack:Number.MAX_SAFE_INTEGER},t,()=>assert.fail()));assert.equal(t.hp,before);
});
