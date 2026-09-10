package com.mergeheroes.nativeapi

import android.os.Handler
import android.os.Looper
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import expo.modules.kotlin.functions.Queues
import com.startapp.sdk.adsbase.StartAppSDK
import com.startapp.sdk.adsbase.StartAppAd
import com.startapp.sdk.adsbase.Ad
import com.startapp.sdk.adsbase.adlisteners.AdEventListener
import com.startapp.sdk.adsbase.adlisteners.AdDisplayListener

class MergeNativeModule : Module() {
  private data class Attempt(val id:String,val placement:String,val promise:Promise,val ad:StartAppAd,var completed:Boolean=false)
  private var attempt:Attempt?=null
  private var initialized=false
  private val handler=Handler(Looper.getMainLooper())
  private fun finish(a:Attempt,status:String) {
    if(attempt!==a)return
    attempt=null
    a.ad.setVideoListener(null)
    a.promise.resolve(mapOf("operationId" to a.id,"placement" to a.placement,"status" to status,"completed" to a.completed))
  }
  override fun definition() = ModuleDefinition {
    Name("MergeNative")
    AsyncFunction("initialize") { appId:String,testMode:Boolean ->
      val context=appContext.reactContext ?: return@AsyncFunction false
      if(!appId.matches(Regex("[0-9]{5,12}")))return@AsyncFunction false
      if(!initialized) {
        StartAppAd.disableSplash()
        StartAppAd.disableAutoInterstitial()
        // Privacy default: no personalized ads. The SDK retains its own consent UI.
        StartAppSDK.setUserConsent(context,"pas",System.currentTimeMillis(),false)
        StartAppSDK.init(context,appId,false)
        StartAppSDK.enableReturnAds(false)
        val debuggable=(context.applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE)!=0
        StartAppSDK.setTestAdsEnabled(testMode && debuggable)
        initialized=true
      }
      true
    }.runOnQueue(Queues.MAIN)
    AsyncFunction("showRewarded") { id:String,placement:String,promise:Promise ->
      val activity=appContext.currentActivity
      if(!initialized||activity==null||activity.isFinishing||attempt!=null||!listOf("freeCoins","wheel","stageBoost").contains(placement)) {
        promise.resolve(mapOf("operationId" to id,"placement" to placement,"status" to "unavailable","completed" to false))
      } else {
        val ad=StartAppAd(activity);val a=Attempt(id,placement,promise,ad);attempt=a
        ad.setVideoListener { if(attempt===a)a.completed=true }
        ad.loadAd(StartAppAd.AdMode.REWARDED_VIDEO,object:AdEventListener {
          override fun onReceiveAd(loaded:Ad) {
            if(attempt!==a)return
            val current=appContext.currentActivity
            if(current==null||current.isFinishing){finish(a,"cancelled");return}
            val displayed=ad.showAd(placement,object:AdDisplayListener {
              override fun adHidden(ad:Ad?){finish(a,if(a.completed)"completed" else "cancelled")}
              override fun adNotDisplayed(ad:Ad?){finish(a,"failed")}
              override fun adDisplayed(ad:Ad?){}
              override fun adClicked(ad:Ad?){}
            })
            if(!displayed)finish(a,"failed")
          }
          override fun onFailedToReceiveAd(ad:Ad?){finish(a,"unavailable")}
        })
      }
    }.runOnQueue(Queues.MAIN)
    Function("cancelRewarded") { id:String -> handler.post { val a=attempt;if(a?.id==id){a.ad.close();finish(a,"cancelled")} } }
    OnDestroy { handler.post { attempt?.let { a->a.ad.close();finish(a,"cancelled") } } }
  }
}
