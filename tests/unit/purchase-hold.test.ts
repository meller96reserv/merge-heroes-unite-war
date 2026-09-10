import {test} from 'node:test';import assert from 'node:assert/strict';import {PurchaseHold,type HoldScheduler} from '../../app/src/input/PurchaseHold';
test('hold serializes purchases; release, cancel, rejection and background leave no repeating work',async()=>{
 let pending:(()=>void)|null=null,calls=0;const scheduler:HoldScheduler={after(_ms,fn){pending=fn;return ()=>{pending=null;};}};
 const hold=new PurchaseHold(scheduler);let resolve!:(value:boolean)=>void;
 assert.equal(hold.start(1,()=>{calls++;return new Promise<boolean>(r=>resolve=r);},200),true);assert.equal(hold.start(2,async()=>true,200),false);assert.equal(calls,1);assert.equal(pending,null);
 hold.release(1);resolve(true);await Promise.resolve();await Promise.resolve();assert.equal(pending,null);assert.equal(hold.active,false);
 hold.start(3,async()=>{calls++;return true;},200);await Promise.resolve();assert.ok(pending);hold.cancel();assert.equal(pending,null);
 hold.start(4,async()=>false,200);await Promise.resolve();assert.equal(hold.active,false);assert.equal(pending,null);
 hold.start(5,async()=>true,200,false);await Promise.resolve();assert.equal(hold.active,false);assert.equal(pending,null);
});
