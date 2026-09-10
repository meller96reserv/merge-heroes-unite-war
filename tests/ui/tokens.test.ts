import test from 'node:test';import assert from 'node:assert/strict';
import {measured,proposed} from '../../app/src/ui/DesignTokens';
test('TASK-0056 source dimensions/colors/type and separate proposed touch/timing tokens',()=>{
 assert.equal(measured.width,430);assert.equal(measured.height,932);assert.equal(measured.font.counter,32);assert.equal(measured.tier,'#00b43c');assert.equal(proposed.touchMinimum,44);assert.equal(proposed.motion.pressIn,80);assert.ok(!('gold' in measured));
});
