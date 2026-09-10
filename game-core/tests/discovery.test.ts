import {test} from 'node:test';import assert from 'node:assert/strict';import {createState} from '../src/model/GameState';import {discoveryService} from '../src/systems/DiscoveryService';
test('tier discovery pays once with a durable source token and missing reward cannot partially mark tier',()=>{
 const s=createState({dataVersion:'test',initialGold:'0',utcMs:0}),discover=discoveryService({2:[{kind:'currency',id:'gold',amount:'100'}]},{currencies:['gold'],items:{},freeSpinId:'fortune'});
 assert.equal(discover(s,2,'merge1').length,1);const before=JSON.stringify(s);assert.deepEqual(discover(s,2,'merge2'),[]);assert.equal(JSON.stringify(s),before);assert.equal(s.data.currencies.gold,'100');assert.ok(s.data.sourceWatermarks['discovery:2']);
 assert.throws(()=>discover(s,3,'merge3'));assert.equal(JSON.stringify(s),before);
 s.data.progression.discoveredTiers=[];discover(s,2,'repair');assert.equal(s.data.currencies.gold,'100');assert.deepEqual(s.data.progression.discoveredTiers,[2]);
});
