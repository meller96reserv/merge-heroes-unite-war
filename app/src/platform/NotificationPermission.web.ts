import type {NotificationAccess,NotificationPermission} from './NotificationPermission';
const current=():NotificationAccess=>typeof Notification==='undefined'||!globalThis.isSecureContext?'unavailable':Notification.permission;
export const notificationPermission:NotificationPermission={current,request:async()=>{const value=current();if(value!=='default')return value;try{return await Notification.requestPermission();}catch{return 'unavailable';}}};
