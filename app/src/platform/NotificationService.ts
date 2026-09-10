import * as Notifications from './LocalNotifications';
import type {GameRuntime} from '../game/GameRuntime';
import {notificationPermission} from './NotificationPermission';
import {externalRoute} from '../navigation/ExternalRoutes';
import type {NavigationCoordinator} from '../ui/NavigationCoordinator';
const channelId='game-rewards';
/** Opt-in local reminders only: no remote token registration or backend needed. */
export function bindNotifications(game:GameRuntime,navigation:NavigationCoordinator){
 let alive=true,last='',pendingRoute:ReturnType<typeof externalRoute>=null,tail=Promise.resolve();
 const route=()=>{if(!alive||!pendingRoute||!navigation.getSnapshot().focused)return;const target=pendingRoute;pendingRoute=null;if(!navigation.navigate(target))pendingRoute=target;};
 const receive=(r:Notifications.NotificationResponse)=>{pendingRoute=externalRoute(r.notification.request.content.data);route();};
 const listener=Notifications.addNotificationResponseReceivedListener(receive),navSubscription=navigation.subscribe(route);
 void Notifications.getLastNotificationResponseAsync().then(r=>{if(alive&&r)receive(r);}).catch(()=>{});
 const update=()=>{
  const s=game.dispatcher.getSnapshot(),key=JSON.stringify([s.data.settings.notifications,s.data.daily.lastClaimedPeriod,s.data.wheel.nextFreeAt]);if(key===last)return;last=key;
  tail=tail.then(async()=>{
   if(!alive)return;await Promise.all(['merge-daily','merge-wheel'].map(id=>Notifications.cancelScheduledNotificationAsync(id)));
   if(!s.data.settings.notifications||await notificationPermission.refresh?.()!=='granted')return;
   const now=Date.now(),tomorrow=(Math.floor(now/86400000)+1)*86400000;
   const reminders=[{identifier:'merge-daily',route:'daily',at:tomorrow,title:'Your daily bonus is ready',body:'Come back and claim 1000 gold.'},{identifier:'merge-wheel',route:'wheel',at:s.data.wheel.nextFreeAt,title:'The Fortune Wheel is ready',body:'Discover your next reward.'}];
   for(const r of reminders)if(alive&&r.at>now)await Notifications.scheduleNotificationAsync({identifier:r.identifier,content:{title:r.title,body:r.body,data:{route:r.route},sound:s.data.settings.sfxGain>0?'default':undefined},trigger:{type:Notifications.SchedulableTriggerInputTypes.DATE,date:new Date(r.at),channelId}});
  }).catch(()=>{});
 };
 void notificationPermission.refresh?.().then(update);const unsubscribe=game.dispatcher.subscribe(update);update();
 return()=>{alive=false;listener.remove();navSubscription();unsubscribe();};
}
