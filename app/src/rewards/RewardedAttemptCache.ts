import type {GameRuntime} from '../game/GameRuntime';
import type {RewardedResult} from '../../../game-core/src/rewards/RewardedOperation';
/** Session-local SDK results awaiting the durable barrier survive route closure.
 * They are never inferred after process restart; saved confirmation owns that. */
const pending=new WeakMap<GameRuntime,Map<string,RewardedResult>>();
export function rewardedAttempts(game:GameRuntime){let cache=pending.get(game);if(!cache){cache=new Map();pending.set(game,cache);}return cache;}
