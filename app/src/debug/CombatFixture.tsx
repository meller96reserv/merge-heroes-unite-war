import {useMemo,useState} from 'react';
import {View,Text,Pressable} from 'react-native';
import {Canvas} from '@shopify/react-native-skia';
import {BattleSystem} from '../../../game-core/src/systems/BattleSystem';
import {battleConfig} from '../../../game-core/src/content/BattleConfig';
import {spawnEncounter} from '../../../game-core/src/systems/EncounterSpawner';
import {createState} from '../../../game-core/src/model/GameState';
import {heroes} from '../../../game-core/src/content/PlayableConfig';
import {BattleActors} from '../battle/BattleActors';
import {projectileViews} from '../battle/ProjectileView';
import {DamageLabelPool} from '../battle/DamageLabel';
import {BattleWorld} from '../components/BattleBoard';
import {layout} from '../ui/ResponsiveLayout';
import type {Intent} from '../../../game-core/src/commands/Dispatcher';
/** Development-only acceptance harness using the production core, assets and Skia presenters. */
export default function CombatFixture(){
 const fixture=useMemo(()=>{
  const params=new URLSearchParams(globalThis.location?.search),tier=Number(params.get('tier')??1),mode=params.get('mode')??'full',crit=params.get('crit')==='1';
  const state=createState({dataVersion:'combat-acceptance-only',initialGold:'0',utcMs:0}),hero=heroes.instantiate(`hero_tier_${tier}`,'hero',0);hero.deployed=true;state.data.heroes=[hero];state.data.board[0]!.unitId=hero.id;
  const enemy={id:params.get('boss')==='1'?'boar_chief':'ironhide_boar',stats:{attack:0,defense:0,hp:20,attackIntervalMs:1000,critChanceBp:0,critMultiplierBp:10000},rewardId:'fixture-only',canAttack:false,hitDelayMs:0};
  const createEngine=(sequence:number)=>{
   const setup=new BattleSystem(spawnEncounter('fixture',sequence,0,[{enemyId:enemy.id,count:1}],[enemy],50),battleConfig,[1,2,3,4]);setup.syncRoster(state,heroes);
   const encounter=JSON.parse(JSON.stringify(setup.snapshot().encounter));Object.assign(encounter.entities.find((e:any)=>e.side==='hero'),{attack:10,critChanceBp:crit?10000:0,critMultiplierBp:20000});
   return new BattleSystem(encounter,battleConfig,[1,2,3,4]);
  };
  return {engine:createEngine(0),createEngine,sequence:0,state,mode,labels:new DamageLabelPool(),events:[] as Intent[],frameEvents:[] as readonly Intent[]};
 },[]);
 const [revision,refresh]=useState(0),[paused,setPaused]=useState(false),[missingTarget,setMissingTarget]=useState(false),[visualGeneration,setVisualGeneration]=useState(0),l=layout(430,932),combat=fixture.engine.snapshot();
 const step=()=>{const events=fixture.engine.step();fixture.frameEvents=events;fixture.events.push(...events);fixture.labels.ingest(events);refresh(v=>v+1);};
 const withdraw=()=>{fixture.state.data.heroes[0]!.deployed=false;fixture.engine.syncRoster(fixture.state,heroes);refresh(v=>v+1);};
 const pause=()=>{fixture.engine.setSuspended(!paused);setPaused(!paused);};
 const nextEncounter=()=>{
  if(!combat.encounter.entities.filter(e=>e.side==='enemy').every(e=>e.hp===0))return;
  // Fixture-only scene transition: keep the same owned hero and mounted presenters.
  // No save/reward acknowledgement is fabricated by this diagnostic control.
  fixture.engine=fixture.createEngine(++fixture.sequence);fixture.engine.setSuspended(paused);fixture.labels.reset();fixture.frameEvents=[];refresh(v=>v+1);
 };
 const projected=missingTarget?{...combat,encounter:{...combat.encounter,entities:combat.encounter.entities.filter(e=>e.side!=='enemy')}}:combat;
 const visual={combat:projected,events:fixture.frameEvents,revision,paused,damageLabels:fixture.labels.snapshot()};
 const status=JSON.stringify({combat,events:fixture.events,projectedProjectiles:projectileViews(visual,l).length});
 return <View style={{width:430,height:932,backgroundColor:'#11263a'}}><Canvas style={{width:430,height:650}}><BattleWorld l={l} actors={<BattleActors key={visualGeneration} l={l} snapshot={visual} reducedMotion={fixture.mode==='reduced'} lowQuality={fixture.mode==='low'} releaseDamage={(id,lease)=>{fixture.labels.release(id,lease);refresh(v=>v+1);}}/>}/></Canvas>
 <Text style={{color:'white'}}>Combat acceptance · {fixture.mode}</Text>
 {([['step',step],['withdraw',withdraw],['pause',pause],['restart-presentation',()=>setVisualGeneration(v=>v+1)],['missing-target',()=>{setMissingTarget(true);refresh(v=>v+1);}],['next-encounter',nextEncounter]] as const).map(([label,action])=><Pressable key={label} testID={label} onPress={action} style={{padding:12}}><Text style={{color:'white'}}>{label}</Text></Pressable>)}
 <View testID="combat-fixture-state" accessibilityLabel={status}/></View>;
}
