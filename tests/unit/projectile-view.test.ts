import {test} from 'node:test';import assert from 'node:assert/strict';import {projectileViews} from '../../app/src/battle/ProjectileView';import {layout} from '../../app/src/ui/ResponsiveLayout';import {battleFixture} from '../../game-core/tests/battle.test';
import {heroView} from '../../app/src/battle/HeroView';
import {heroRelease,heroImageRect} from '../../app/src/presentation/HeroMotion';
import anchors from '../../app/src/presentation/HeroAnchors.json';
import art from '../../app/assets/art/effects/projectile-manifest.json';
test('projectiles project only live current-generation hits; cosmetic pool exhaustion cannot change combat',()=>{
 const {battle}=battleFixture();for(let i=0;i<20;i++)battle.step();const snapshot={combat:battle.snapshot(),events:[],revision:1,paused:false},before=JSON.stringify(snapshot),l=layout(430,932);
 const views=projectileViews(snapshot,l);assert.equal(views.length,1);assert.equal(views[0]!.durationMs,150);assert.equal(projectileViews(snapshot,l,0).length,0);assert.equal(JSON.stringify(snapshot),before);
 const actor=heroView(snapshot.combat.encounter.entities.find(e=>e.side==='hero')!,0,l)!;assert.deepEqual(views[0]!.from,heroRelease(actor.visualId,actor.rect));
 for(let i=0;i<3;i++)battle.step();assert.equal(projectileViews({combat:battle.snapshot(),events:[],revision:2,paused:false},l).length,0);assert.equal(battle.snapshot().encounter.entities.find(e=>e.side==='enemy')!.hp,30);
 const stale=JSON.parse(before);stale.combat.hits[0].encounterId='previous';assert.equal(projectileViews(stale,l).length,0);
});
test('all ten release sockets use contain-fit coordinates; original art is bounded in every quality profile',()=>{
 for(const id of Object.keys(anchors))for(const rect of [{x:8,y:384,width:83,height:86},{x:20,y:200,width:30,height:90}]){
  const image=heroImageRect(id,rect),release=heroRelease(id,rect);assert.ok(release.x>=image.x&&release.x<=image.x+image.width);assert.ok(release.y>=image.y&&release.y<=image.y+image.height);
 }
 assert.equal(art.capacity,32);assert.equal(art.status,'PROPOSED_ORIGINAL');
 for(const p of Object.values(art.profiles)){assert.ok(p.radius>0&&p.radius<=8);assert.ok(/^#[0-9a-f]{6}$/i.test(p.outline));assert.ok(p.path.length<160);}
});
