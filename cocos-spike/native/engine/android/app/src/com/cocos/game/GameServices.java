package com.cocos.game;

import android.app.*;
import android.content.*;
import android.content.pm.PackageManager;
import android.os.*;
import android.net.Uri;
import org.json.JSONObject;
import java.lang.ref.WeakReference;
import java.util.concurrent.ConcurrentHashMap;
import com.startapp.sdk.adsbase.*;
import com.startapp.sdk.adsbase.adlisteners.*;
import io.appmetrica.analytics.AppMetrica;
import io.appmetrica.analytics.AppMetricaConfig;

public final class GameServices {
    private static WeakReference<Activity> host=new WeakReference<>(null);
    private static final ConcurrentHashMap<String,String> results=new ConcurrentHashMap<>();
    private static boolean initialized=false,adsReady=false;
    private static Attempt active; private static String permissionRequest;
    private static final Handler main=new Handler(Looper.getMainLooper());
    static void attach(Activity activity){host=new WeakReference<>(activity);}
    private static String result(String status){return "{\"status\":\""+status+"\"}";}
    private static void finish(String id,String value){if(results.size()>32)results.clear();results.put(id,value);}
    public static String poll(String id){String value=results.remove(id);return value==null?result("pending"):value;}
    public static String request(String raw){
        try {JSONObject q=new JSONObject(raw);String id=q.getString("requestId");
            main.post(()->{try{handle(q,id);}catch(Exception error){finish(id,result("failed"));}});
            return result("pending");
        }catch(Exception error){return result("failed");}
    }
    private static void handle(JSONObject q,String id)throws Exception{
        Activity a=host.get();if(a==null||a.isFinishing()){finish(id,result("unavailable"));return;}
        switch(q.getString("action")){
        case "initialize":
            if(!initialized){
                AppMetrica.activate(a.getApplicationContext(),AppMetricaConfig.newConfigBuilder(GameServiceConfig.METRICA).withLocationTracking(false).build());
                AppMetrica.enableActivityAutoTracking(a.getApplication());initialized=true;
                StartAppAd.disableSplash();StartAppAd.disableAutoInterstitial();StartAppSDK.enableReturnAds(false);
                if(GameServiceConfig.START_IO.matches("[0-9]{5,12}")){
                    StartAppSDK.setUserConsent(a,"pas",System.currentTimeMillis(),false);
                    StartAppSDK.init(a,GameServiceConfig.START_IO,false);StartAppSDK.setTestAdsEnabled(false);adsReady=true;
                }
            }finish(id,result("ok"));break;
        case "event":
            String name=q.optString("name");if(initialized&&name.matches("[a-zA-Z_.]{1,48}"))AppMetrica.reportEvent(name,new JSONObject().put("value",q.optString("value").substring(0,Math.min(80,q.optString("value").length()))).toString());
            finish(id,result("ok"));break;
        case "legal":
            String url="terms".equals(q.optString("kind"))?GameServiceConfig.TERMS:GameServiceConfig.PRIVACY;
            if(!url.startsWith("https://telegra.ph/")){finish(id,result("unavailable"));break;}
            a.startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(url)));finish(id,result("ok"));break;
        case "notifications":
            boolean enabled=q.optBoolean("enabled");
            if(enabled&&Build.VERSION.SDK_INT>=33&&a.checkSelfPermission("android.permission.POST_NOTIFICATIONS")!=PackageManager.PERMISSION_GRANTED){
                permissionRequest=id;a.requestPermissions(new String[]{"android.permission.POST_NOTIFICATIONS"},1808);
            }else finishNotifications(a,id,enabled);
            break;
        case "ad":
            String placement=q.optString("placement");
            if(!adsReady||active!=null||!java.util.Arrays.asList("freeCoins","wheel","stageBoost").contains(placement)){finish(id,result("unavailable"));break;}
            Attempt t=new Attempt(id,new StartAppAd(a));active=t;
            t.ad.setVideoListener(()->{if(active==t)t.completed=true;});
            t.ad.loadAd(StartAppAd.AdMode.REWARDED_VIDEO,new AdEventListener(){
                public void onReceiveAd(Ad ignored){
                    if(active!=t)return;Activity current=host.get();if(current==null||current.isFinishing()){end(t,"cancelled");return;}
                    boolean shown=t.ad.showAd(placement,new AdDisplayListener(){
                        public void adHidden(Ad ad){end(t,t.completed?"completed":"cancelled");}
                        public void adNotDisplayed(Ad ad){end(t,"failed");}
                        public void adDisplayed(Ad ad){}
                        public void adClicked(Ad ad){}
                    });if(!shown)end(t,"failed");
                }
                public void onFailedToReceiveAd(Ad ad){end(t,"unavailable");}
            });
            main.postDelayed(()->{if(active==t){t.ad.close();end(t,"failed");}},175000);break;
        case "cancel":if(active!=null&&active.id.equals(id)){active.ad.close();end(active,"cancelled");}else finish(id,result("cancelled"));break;
        default:finish(id,result("unavailable"));
        }
    }
    private static class Attempt{final String id;final StartAppAd ad;boolean completed;Attempt(String i,StartAppAd a){id=i;ad=a;}}
    private static void end(Attempt t,String status){if(active!=t)return;active=null;t.ad.setVideoListener(null);finish(t.id,"{\"status\":\""+status+"\",\"completed\":"+(t.completed&&"completed".equals(status))+"}");}
    static void permissionResult(int code,int[] grants){if(code!=1808||permissionRequest==null)return;String id=permissionRequest;permissionRequest=null;Activity a=host.get();if(a!=null)finishNotifications(a,id,grants.length>0&&grants[0]==PackageManager.PERMISSION_GRANTED);}
    private static void finishNotifications(Activity a,String id,boolean enabled){
        NotificationManager manager=(NotificationManager)a.getSystemService(Context.NOTIFICATION_SERVICE);
        if(Build.VERSION.SDK_INT>=26)manager.createNotificationChannel(new NotificationChannel("game-bonuses","Available game bonuses",NotificationManager.IMPORTANCE_DEFAULT));
        if(enabled&&!manager.areNotificationsEnabled())enabled=false;
        a.getSharedPreferences("game-services",0).edit().putBoolean("notifications",enabled).apply();
        AlarmManager alarm=(AlarmManager)a.getSystemService(Context.ALARM_SERVICE);
        PendingIntent intent=PendingIntent.getBroadcast(a,1808,new Intent(a,GameReminder.class),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        alarm.cancel(intent);if(enabled)alarm.set(AlarmManager.RTC_WAKEUP,System.currentTimeMillis()+12*60*60*1000L,intent);
        finish(id,"{\"status\":\"ok\",\"enabled\":"+enabled+"}");
    }
}
