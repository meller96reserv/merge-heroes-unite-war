import {test} from 'node:test';import assert from 'node:assert/strict';import {InputRouter} from '../../app/src/input/InputRouter';
test('modal/tutorial priority, single owner and closing pointer-up consumption',()=>{
 const r=new InputRouter();r.setLayer('tutorial',true);assert.equal(r.down(1,'board'),false);r.setLayer('modal',true);assert.equal(r.down(1,'tutorial'),false);
 assert.equal(r.down(1,'modal'),true);assert.equal(r.down(2,'modal'),false);r.setLayer('modal',false);r.setLayer('tutorial',false);
 assert.equal(r.down(1,'board'),false);assert.equal(r.up(2),null);assert.equal(r.up(1),'modal');assert.equal(r.up(1),null);
 assert.equal(r.down(3,'board'),true);r.cancel(2);assert.equal(r.owns(3,'board'),true);r.cancel();assert.equal(r.owns(3,'board'),false);
});
