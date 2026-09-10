import {test} from 'node:test';import assert from 'node:assert/strict';import {heroDefinitions} from '../../game-core/src/content/HeroDefinitions';
import {heroMotionProfile,heroFoot,heroImageRect} from '../../app/src/presentation/HeroMotion';
test('all ten calibrated families have contain-correct anchors and bounded spawn overshoot',()=>{
 assert.equal(heroDefinitions.length,10);
 for(const hero of heroDefinitions){
  const rect={x:15,y:20,width:110,height:150},p=heroMotionProfile(hero.visualId),foot=heroFoot(hero.visualId,rect),image=heroImageRect(hero.visualId,rect);
  assert.ok(foot.x>=image.x&&foot.x<=image.x+image.width);assert.ok(foot.y>=image.y&&foot.y<=image.y+image.height);
  for(const x of [image.x,image.x+image.width])assert.ok(foot.x+(x-foot.x)*p.overshoot>=rect.x-p.clipMargin&&foot.x+(x-foot.x)*p.overshoot<=rect.x+rect.width+p.clipMargin);
  assert.equal(p.hoverPx>0,hero.visualId.includes('ice_fairy'));assert.equal(p.spawnMs,280);
 }
 assert.throws(()=>heroMotionProfile('unmapped-hero'));
});
