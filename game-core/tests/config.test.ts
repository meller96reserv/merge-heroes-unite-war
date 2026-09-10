import test from 'node:test';
import assert from 'node:assert/strict';
import {loadConfig, type SchemaValidator} from '../src/config/ConfigLoader';
type Config={version:number;rows:{id:string;next:string|null;asset:string;hp:number}[]};
const schema: SchemaValidator<Config>={check:(v:unknown)=>{
 const x=v as Config;
 if(!x || typeof x!=='object' || x.version!==1 || !Array.isArray(x.rows))return [{path:'$',message:'invalid version/shape'}];
 for(const [i,r] of x.rows.entries()) if(!r || typeof r.id!=='string' || !(r.next===null || typeof r.next==='string') || typeof r.asset!=='string' || typeof r.hp!=='number')return [{path:`rows[${i}]`,message:'invalid record shape'}];
 return [];
}};
const good:Config={version:1,rows:[{id:'a',next:'b',asset:'hero_turtle',hp:1},{id:'b',next:null,asset:'hero_turtle',hp:4}]};
const load=(data:unknown)=>loadConfig('stages.json',JSON.stringify(data),schema,d=>({unique:[{path:'rows.id',ids:d.rows.map(r=>r.id)}],references:d.rows.map((r,i)=>({path:`rows[${i}].asset`,id:r.asset,allowed:['hero_turtle']})),integers:d.rows.map((r,i)=>({path:`rows[${i}].hp`,value:r.hp,min:1,max:1000000})),graphs:[{path:'rows.next',edges:Object.fromEntries(d.rows.map(r=>[r.id,r.next]))}]}));
test('TASK-0050 validates shape before semantics, reports file+field, immutable result',()=>{
 assert.equal(load(good).rows[0]!.hp,1);assert.ok(Object.isFrozen(load(good).rows[0]));
 assert.throws(()=>load({version:0}),/stages.json:\$/);
 for(const [field,value,error] of [['id','a','duplicate'],['next','a','cycle'],['next','missing','dangling'],['asset','missing','rows\[1\].asset'],['hp',-1,'hp'],['hp',Number.MAX_SAFE_INTEGER+1,'hp']] as const){
  const bad=structuredClone(good);(bad.rows[1] as any)[field]=value;assert.throws(()=>load(bad),new RegExp(error.replace('[','\\[').replace(']','\\]')));
 }
 assert.throws(()=>loadConfig('broken.json','{',schema,()=>({})),/broken.json:\$: invalid JSON/);
});
