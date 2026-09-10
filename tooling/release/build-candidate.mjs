import {spawnSync} from 'node:child_process';
import {existsSync,mkdirSync} from 'node:fs';
import {resolve,dirname,delimiter} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..'),target=process.argv[2];
const localNode=resolve(root,'.tools/node-v22.23.2-darwin-arm64/bin');
const env={...process.env,PATH:[existsSync(localNode)?localNode:null,process.env.PATH].filter(Boolean).join(delimiter)};
if(!env.JAVA_HOME&&existsSync('/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home'))env.JAVA_HOME='/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home';
if(!env.ANDROID_HOME&&env.HOME&&existsSync(resolve(env.HOME,'Library/Android/sdk')))env.ANDROID_HOME=resolve(env.HOME,'Library/Android/sdk');
if(!env.GRADLE_USER_HOME)env.GRADLE_USER_HOME=resolve(root,'.tools/gradle-cache');
let cmd,args,cwd=root;
if(target==='android'){
 cwd=resolve(root,'android');cmd='./gradlew';args=[':app:assembleRelease',':app:bundleRelease','-PreactNativeArchitectures=arm64-v8a','--max-workers=4'];
 if(!existsSync(resolve(cwd,'gradlew')))throw Error('Run npm run native:prebuild first.');
}else if(target==='ios'){
 cmd='xcodebuild';args=['-workspace','ios/MergeHeroesUniteWar.xcworkspace','-scheme','MergeHeroesUniteWar','-configuration','Release','-sdk','iphonesimulator','-destination','generic/platform=iOS Simulator','-derivedDataPath','.tools/rn-production-ios','-jobs','4','ARCHS=arm64','CODE_SIGNING_ALLOWED=NO','build'];
}else throw Error('Expected android or ios target');
mkdirSync(resolve(root,'.tools'),{recursive:true});
const result=spawnSync(cmd,args,{cwd,env,stdio:'inherit'});if(result.error)throw result.error;process.exitCode=result.status??1;
