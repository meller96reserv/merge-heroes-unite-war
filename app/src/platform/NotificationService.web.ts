import type {GameRuntime} from '../game/GameRuntime';
import type {NavigationCoordinator} from '../ui/NavigationCoordinator';
// Browser permissions remain available in Settings; no unreliable background timer.
export function bindNotifications(_game:GameRuntime,_navigation:NavigationCoordinator){return()=>{};}
