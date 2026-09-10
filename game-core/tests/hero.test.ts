import {test} from 'node:test';import assert from 'node:assert/strict';import {HeroCatalog,type HeroDefinition} from '../src/model/Hero';
export const definition=(id='tier1',tier=1,family='heroes'):HeroDefinition=>({id,tier,family,rarityId:null,attackType:'melee',baseStats:{attack:10,defense:0,hp:100,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:15000},visualId:'hero_turtle_warrior__1815x1620',portraitId:'hero_turtle_warrior__1815x1620',animationProfile:'hero_rigid',audioProfile:'hero_custom_needed',projectileId:null,unlockId:null,evidenceIds:[]});
test('definition stays immutable and separate from independently owned instances',()=>{
 const source=definition(),catalog=new HeroCatalog([source]);source.baseStats.attack=999;
 const a=catalog.instantiate('tier1','h1',0),b=catalog.instantiate('tier1','h2',1);a.deployed=true;a.upgradeLevel=2;
 assert.equal(catalog.get('tier1').baseStats.attack,10);assert.equal(b.deployed,false);assert.equal(b.upgradeLevel,0);assert.equal(a.tier,1);
 assert.throws(()=>new HeroCatalog([definition(),definition()]));assert.throws(()=>catalog.instantiate('missing','h3',2));assert.throws(()=>catalog.instantiate('tier1','h3',15));
});
