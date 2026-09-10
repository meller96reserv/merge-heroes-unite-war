import {readFile,writeFile} from 'node:fs/promises';
// Expo issue #49214 / #49426: constructors do not return a value and cannot
// carry SWIFT_RETURNS_RETAINED. Keep the class's Swift shared-reference ARC hooks.
// https://github.com/expo/expo/issues/49214
const path='node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI-Cxx/include/RuntimeScheduler.h';
const source=await readFile(path,'utf8');
const occurrences=source.match(/SWIFT_RETURNS_RETAINED RuntimeScheduler\(/g)??[];
if(occurrences.length!==0&&occurrences.length!==2)throw Error('Review changed Expo RuntimeScheduler before applying compatibility patch');
if(occurrences.length){await writeFile(path,source.replaceAll('SWIFT_RETURNS_RETAINED RuntimeScheduler(', 'RuntimeScheduler('));console.log('Applied Expo RuntimeScheduler constructor compatibility patch.');}
// Swift 6.2 rejects nonisolated(unsafe) pointer captures through nested synchronous
// assumeIsolated callbacks. Match Expo's existing NonisolatedUnsafeVar workaround
// in execute(): the pointer lifetime and JS-thread execution stay unchanged.
const swiftPath='node_modules/expo-modules-jsi/apple/Sources/ExpoModulesJSI/Runtime/JavaScriptRuntime.swift';
let swift=await readFile(swiftPath,'utf8');
for(const [name,expected] of [['thisPtr',2],['argumentsPtr',2],['resultPtr',3]]){
 const pattern=`nonisolated(unsafe) let ${name} = ${name}`;
 const count=swift.split(pattern).length-1;
 if(count!==0&&count!==expected)throw Error('Review changed Expo synchronous pointer captures');
 if(count)swift=swift.replaceAll(pattern,`let boxed_${name} = NonisolatedUnsafeVar(${name})`);
}
swift=swift.replaceAll('writeJSIValue(to: resultPtr)','writeJSIValue(to: boxed_resultPtr.value)')
 .replaceAll('UnsafeMutablePointer(mutating: thisPtr).move()','UnsafeMutablePointer(mutating: boxed_thisPtr.value).move()')
 .replaceAll('JavaScriptValuesBuffer(runtime, start: argumentsPtr, count: argumentsCount)','JavaScriptValuesBuffer(runtime, start: boxed_argumentsPtr.value, count: argumentsCount)')
 .replaceAll('JavaScriptUnownedValue(runtime.pointee, thisPtr)','JavaScriptUnownedValue(runtime.pointee, boxed_thisPtr.value)');
await writeFile(swiftPath,swift);
// Expo 57 EventEmitter uses a weak nonisolated capture that Swift 6.2 still
// rejects. Reuse Expo's own weak sendability box; dispatch remains on the JS
// actor and the emitter is not retained beyond its existing lifetime.
const emitterPath='node_modules/expo-modules-core/ios/Core/Events/EventEmitter.swift';
let emitter=await readFile(emitterPath,'utf8');
const weakCapture='nonisolated(unsafe) weak let emitter = self';
const weakCount=emitter.split(weakCapture).length-1;
if(weakCount!==0&&weakCount!==2)throw Error('Review changed Expo EventEmitter weak capture');
if(weakCount){
 emitter=emitter.replaceAll(weakCapture,'let weakEmitter = NonisolatedUnsafeWeakVar(self)')
  .replaceAll('guard let emitter else {','guard let emitter = weakEmitter.value else {')
  .replaceAll('guard let emitter, let appContext else {','guard let emitter = weakEmitter.value, let appContext else {');
 await writeFile(emitterPath,emitter);
}
