package com.kiselnativeprobe

import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.cocos.lib.CocosHelper
import com.cocos.lib.JsbBridge
import java.lang.ref.WeakReference
import org.json.JSONObject

class CocosHostModule(context: ReactApplicationContext) : NativeCocosHostSpec(context) {
  @Volatile private var invalidated = false
  init { current = WeakReference(this) }
  override fun getName() = NAME

  override fun open(promise: Promise) {
    Handler(Looper.getMainLooper()).post {
      val activity = reactApplicationContext.currentActivity
      if (activity == null || activity.isFinishing) {
        promise.reject("HOST_UNAVAILABLE", "No live RN Activity")
      } else if (CocosHostActivity.launchPending || CocosHostActivity.liveInstances > 0) {
        promise.resolve("already-open")
      } else {
        try {
          bindReceiver()
          CocosHostActivity.launchPending = true
          activity.startActivity(Intent(activity, CocosHostActivity::class.java))
          Log.i("KiselHost", "RN requested Cocos open pid=${android.os.Process.myPid()}")
          promise.resolve("opening")
        } catch (error: Exception) {
          CocosHostActivity.launchPending = false
          promise.reject("OPEN_FAILED", error)
        }
      }
    }
  }

  private fun bindReceiver() {
    JsbBridge.setCallback { channel, raw ->
      if (channel != CHANNEL || raw == null || invalidated) return@setCallback
      val bytes = raw.toByteArray(Charsets.UTF_8).size
      if (bytes > MAX_BYTES) {
        Log.w("KiselBridge", "G2H rejected OVERSIZE bytes=$bytes")
        return@setCallback
      }
      val epoch = CocosHostActivity.engineEpoch
      Log.i("KiselBridge", "G2H received on ${Thread.currentThread().name} bytes=$bytes epoch=$epoch")
      reactApplicationContext.runOnJSQueueThread {
        if (!invalidated && epoch == CocosHostActivity.engineEpoch && CocosHostActivity.acceptingMessages) {
          Log.i("KiselBridge", "G2H emit on ${Thread.currentThread().name} epoch=$epoch")
          emitOnMessage(raw)
        } else Log.w("KiselBridge", "G2H dropped inactive/stale owner")
      }
    }
  }

  override fun send(raw: String, promise: Promise) {
    val bytes = raw.toByteArray(Charsets.UTF_8).size
    if (bytes > MAX_BYTES) {
      promise.reject("OVERSIZE", "Native transport limit is64KiB UTF8")
      return
    }
    if (invalidated || !CocosHostActivity.acceptingMessages) {
      promise.reject("HOST_INACTIVE", "No active Cocos owner")
      return
    }
    val epoch = CocosHostActivity.engineEpoch
    CocosHelper.runOnGameThread {
      if (invalidated || !CocosHostActivity.acceptingMessages || epoch != CocosHostActivity.engineEpoch) {
        promise.reject("STALE_OWNER", "Owner changed before engine delivery")
      } else {
        Log.i("KiselBridge", "H2G dispatch on ${Thread.currentThread().name} bytes=$bytes epoch=$epoch")
        JsbBridge.sendToScript(CHANNEL, raw)
        promise.resolve("queued")
      }
    }
  }

  override fun invalidate() {
    invalidated = true
    JsbBridge.setCallback(null)
    super.invalidate()
  }

  companion object {
    private var current: WeakReference<CocosHostModule>? = null
    fun publishAudio(focus: Boolean, reason: String) {
      val module = current?.get() ?: return
      val raw = JSONObject().put("focus", focus)
        .put("active", CocosHostActivity.acceptingMessages).put("reason", reason).toString()
      module.reactApplicationContext.runOnJSQueueThread {
        if (!module.invalidated) module.emitOnAudioState(raw)
      }
    }
    const val NAME = "NativeCocosHost"
    private const val CHANNEL = "kisel.protocol.v1"
    private const val MAX_BYTES = 64 * 1024
  }
}
