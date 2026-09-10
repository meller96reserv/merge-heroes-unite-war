import test from 'node:test';import assert from 'node:assert/strict';
import {SettingsController} from '../../app/src/ui/SettingsController';
import {GameRuntime} from '../../app/src/game/GameRuntime';
import {createState} from '../../game-core/src/model/GameState';
import {encodeSave,decodeSave} from '../../game-core/src/persistence/SaveCodec';
test('ordered partial settings preserve all controls, save/reload and unrelated purchase currency',async()=>{
 let saved='';const game=new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),async state=>{saved=encodeSave(state);});
 const controller=new SettingsController(game);
 const actions=[controller.set({musicGain:.2}),controller.set({haptics:false}),controller.set({reducedMotion:true}),controller.set({musicGain:0,notifications:true})];
 await game.dispatcher.dispatch({type:'BuyHero',commandId:'buy',offerId:'buy_tier_1'});assert.deepEqual(await Promise.all(actions),[true,true,true,true]);
 const next=decodeSave(saved).data;assert.deepEqual(next.settings,{musicGain:0,sfxGain:1,haptics:false,reducedMotion:true,notifications:true,revision:4});assert.equal(next.currencies.gold,'99');assert.equal(controller.getSnapshot().pending,0);
});
test('failed settings save is retryable and disposed queued controls do not change progress',async()=>{
 let fail=true;const game=new GameRuntime(createState({dataVersion:'playable-v1',initialGold:'100',utcMs:1000}),async()=>{if(fail)throw Error('injected');});
 const controller=new SettingsController(game);assert.equal(await controller.set({sfxGain:0}),false);assert.equal(game.dispatcher.getSnapshot().data.settings.sfxGain,1);assert.ok(controller.getSnapshot().error);
 fail=false;assert.equal(await controller.set({sfxGain:0}),true);assert.equal(game.dispatcher.getSnapshot().data.settings.sfxGain,0);
 const queued=controller.set({haptics:false});controller.dispose();assert.equal(await queued,false);assert.equal(game.dispatcher.getSnapshot().data.settings.haptics,true);
});
