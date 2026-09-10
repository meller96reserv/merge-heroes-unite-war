import type {Snapshot} from '../../../game-core/src/model/GameState';
import {dailyEligibility,DAILY_GOLD} from '../../../game-core/src/systems/DailyService';
export function dailyPanel(state:Snapshot,utc:number){return {...dailyEligibility(state,utc),gold:DAILY_GOLD,claimed:state.data.daily.lastClaimedPeriod};}
