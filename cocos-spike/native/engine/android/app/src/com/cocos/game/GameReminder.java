package com.cocos.game;
import android.app.*;
import android.content.*;
import android.os.Build;
public final class GameReminder extends BroadcastReceiver {
 public void onReceive(Context context,Intent intent){
  if(!context.getSharedPreferences("game-services",0).getBoolean("notifications",false))return;
  NotificationManager manager=(NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
  if(!manager.areNotificationsEnabled())return;
  Intent launch=context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());if(launch==null)return;
  PendingIntent tap=PendingIntent.getActivity(context,1808,launch,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
  Notification.Builder b=Build.VERSION.SDK_INT>=26?new Notification.Builder(context,"game-bonuses"):new Notification.Builder(context);
  manager.notify(1808,b.setSmallIcon(android.R.drawable.star_big_on).setContentTitle("Merge Heroes Unite War").setContentText("Your heroes are waiting. Come back for more rewards!").setContentIntent(tap).setAutoCancel(true).build());
 }
}
