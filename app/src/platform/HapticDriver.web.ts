import type {HapticDriver} from './Haptics';
/** Browser preview has no guaranteed physical actuator; never claim a vibration. */
export const hapticDriver:HapticDriver={available:false,play:async()=>{}};
