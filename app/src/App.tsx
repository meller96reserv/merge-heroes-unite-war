import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BattleScreen from './screens/BattleScreen';
import {BootPanels} from './components/BootPanels';
import {currentFixture} from './debug/currentFixture';
import {useAudioSession} from './audio/useAudioSession';
import {services} from './platform/services';
export default function App(){
 useAudioSession();
 const AudioStatus=__DEV__?require('./debug/AudioStatus').default:null;
 const ButtonFixture=__DEV__&&currentFixture?.name==='button-states'?require('./debug/ButtonFixture').default:null;
 const EffectFixture=__DEV__&&currentFixture?.name==='effect-primitives'?require('./debug/EffectFixture').default:null;
 const WheelFixture=__DEV__&&currentFixture?.name==='wheel-ui'?require('./debug/WheelFixture').default:null;
 const FrameProbe=__DEV__&&currentFixture?.name==='frame-probe'?require('./debug/FrameProbe').default:null;
 const HeroMotionFixture=__DEV__&&currentFixture?.name==='hero-motion'?require('./debug/HeroMotionFixture').default:null;
 const CombatFixture=__DEV__&&currentFixture?.name==='combat-acceptance'?require('./debug/CombatFixture').default:null;
 return <GestureHandlerRootView onTouchStart={()=>void services.audioLifecycle().unlock()} style={{flex:1,backgroundColor:'#111c37'}}><SafeAreaProvider><StatusBar hidden/>{WheelFixture?<WheelFixture/>:EffectFixture?<EffectFixture/>:FrameProbe?<FrameProbe/>:HeroMotionFixture?<HeroMotionFixture/>:CombatFixture?<CombatFixture/>:ButtonFixture?<ButtonFixture/>:currentFixture?<BattleScreen/>:<BootPanels/>}{AudioStatus&&<AudioStatus/>}</SafeAreaProvider></GestureHandlerRootView>;
}
