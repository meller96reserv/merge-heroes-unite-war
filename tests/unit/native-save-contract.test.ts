import {test} from 'node:test';import assert from 'node:assert/strict';import {NativeSaveStore,type PrivateFiles} from '../../app/src/platform/SaveStore';
test('native contract serializes temporary replace and preserves active candidates on transport failure',async()=>{
 const bytes=new Map<string,string>(),operations:string[]=[];let fail=false;
 const files:PrivateFiles={async read(p){return bytes.get(p)??null;},async write(p,b){operations.push('write:'+p);if(fail)throw Error('full');bytes.set(p,b);},async replace(a,b){operations.push('replace:'+b);bytes.set(b,bytes.get(a)!);bytes.delete(a);},async flush(){operations.push('flush');}};
 const store=new NativeSaveStore(files);await Promise.all([store.writeCandidate('guest/env','A','one'),store.writeCandidate('guest/env','B','two')]);await store.flush();assert.equal((await store.readCandidates('guest/env')).length,2);assert.equal((await store.readCandidates('other')).length,0);
 assert.ok(operations.indexOf('replace:guest%2Fenv.A.json')<operations.indexOf('write:guest%2Fenv.B.json.pending'));
 fail=true;await assert.rejects(store.writeCandidate('guest/env','A','broken'));assert.equal(await store.verifyCandidate('guest/env','A'),'one');
});
