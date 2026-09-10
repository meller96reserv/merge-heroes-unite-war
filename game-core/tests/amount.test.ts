import test from 'node:test';import assert from 'node:assert/strict';import {Amount} from '../src/model/Amount';
test('TASK-0070 exact debit/credit and serialization above safe integer',()=>{
 const huge=Amount.from('100000000000000000000000000000000001'),one=Amount.from('1');
 assert.equal(huge.subtract(one).add(one).compare(huge),0);assert.equal(huge.subtract(one).compare(huge),-1);
 assert.equal(JSON.stringify(huge),'"100000000000000000000000000000000001"');assert.equal(Amount.from('999').add(one).toString(),'1000');
 assert.equal(Amount.from('100').multiply(15000n).divideFloor(10000n).toString(),'150');
 for(const bad of ['-1','01','1.0','1e3',' 1','1,000',''])assert.throws(()=>Amount.from(bad));
 assert.throws(()=>one.subtract(huge));assert.throws(()=>one.divideFloor(0n));
});
