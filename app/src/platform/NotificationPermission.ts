import {Platform} from 'react-native';
import * as Notifications from './LocalNotifications';
export type NotificationAccess='granted'|'denied'|'default'|'unavailable';
export interface NotificationPermission {current():NotificationAccess;request():Promise<NotificationAccess>;refresh?():Promise<NotificationAccess>}
let access:NotificationAccess='default';
const mapped=(r:Notifications.NotificationPermissionsStatus):NotificationAccess=>r.granted||r.ios?.status===Notifications.IosAuthorizationStatus.PROVISIONAL?'granted':r.status==='denied'?'denied':'default';
const refresh=async()=>{try{return access=mapped(await Notifications.getPermissionsAsync());}catch{return access='unavailable';}};
export const notificationPermission:NotificationPermission={current:()=>access,refresh,request:async()=>{
 try{
  if(Platform.OS==='android')await Notifications.setNotificationChannelAsync('game-rewards',{name:'Game rewards',importance:Notifications.AndroidImportance.DEFAULT});
  const current=await refresh();if(current==='granted')return current;
  return access=mapped(await Notifications.requestPermissionsAsync({ios:{allowAlert:true,allowBadge:true,allowSound:true}}));
 }catch{return access='unavailable';}
}};
