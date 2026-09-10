import test from 'node:test';import assert from 'node:assert/strict';
import {NavigationCoordinator} from '../../app/src/ui/NavigationCoordinator';
test('stale route loads cannot replace the current route after Back or background',()=>{
 const nav=new NavigationCoordinator(),old=nav.beginRoute(),fresh=nav.beginRoute();assert.equal(nav.finishRoute(old,{name:'heroes'}),false);
 assert.equal(nav.finishRoute(fresh,{name:'wheel'}),true);assert.equal(nav.back(),true);assert.equal(nav.getSnapshot().route.name,'battle');
 const pending=nav.beginRoute();nav.setFocused(false);nav.setFocused(true);assert.equal(nav.finishRoute(pending,{name:'settings'}),false);
 nav.navigate('wheel');nav.navigate('settings');nav.back();assert.equal(nav.getSnapshot().route.name,'wheel');
});
test('priority/deduped popups retain exclusive ownership through closing and ignore stale exit callbacks',()=>{
 const nav=new NavigationCoordinator();nav.enqueue({id:'daily:1',kind:'daily',priority:10});nav.enqueue({id:'reward:1',kind:'reward',priority:50});
 assert.equal(nav.enqueue({id:'reward:1',kind:'reward',priority:50}),false);assert.equal(nav.getSnapshot().top?.id,'reward:1');
 nav.back();assert.equal(nav.getSnapshot().top?.closing,true);assert.equal(nav.navigate('wheel'),false);
 nav.enqueue({id:'urgent:1',kind:'error',priority:100});assert.equal(nav.getSnapshot().top?.id,'reward:1');
 assert.equal(nav.finishPopupExit('daily:1'),false);assert.equal(nav.finishPopupExit('reward:1'),true);assert.equal(nav.finishPopupExit('reward:1'),false);
 assert.equal(nav.getSnapshot().top?.id,'urgent:1');nav.back();nav.finishPopupExit('urgent:1');assert.equal(nav.getSnapshot().top?.id,'daily:1');
});
