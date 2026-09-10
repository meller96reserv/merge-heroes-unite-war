package com.kiselnativeprobe

import android.os.Build
import android.os.Bundle
import android.util.Log
import android.window.OnBackInvokedCallback
import android.window.OnBackInvokedDispatcher
import com.cocos.lib.CocosActivity

/** Bounded strategy-A probe. Cocos owns its native surface and input. */
class CocosHostActivity : CocosActivity() {
  private var backCallback: OnBackInvokedCallback? = null
  private var audio: ProbeAudioFocus? = null

  override fun onCreate(state: Bundle?) {
    check(liveInstances == 0) { "Duplicate Cocos Activity/engine owner" }
    super.onCreate(state)
    audio = ProbeAudioFocus(applicationContext)
    liveInstances++
    creations++
    engineEpoch++
    launchPending = false
    Log.i("KiselHost", "Cocos created=$creations live=$liveInstances pid=${android.os.Process.myPid()}")
    if (Build.VERSION.SDK_INT >= 33) {
      backCallback = OnBackInvokedCallback { dismissToHost() }
      onBackInvokedDispatcher.registerOnBackInvokedCallback(
        OnBackInvokedDispatcher.PRIORITY_DEFAULT, backCallback!!)
    }
  }

  private fun dismissToHost() {
    Log.i("KiselHost", "Cocos Back -> finish; live=$liveInstances")
    finish()
  }

  @Deprecated("Compatibility for API24–32")
  override fun onBackPressed() = dismissToHost()

  override fun onResume() {
    super.onResume()
    acceptingMessages = true
    audio?.resume()
    Log.i("KiselHost", "Cocos resumed live=$liveInstances")
  }

  override fun onPause() {
    acceptingMessages = false
    audio?.pause()
    Log.i("KiselHost", "Cocos paused live=$liveInstances")
    super.onPause()
  }

  override fun onDestroy() {
    audio?.close(); audio = null
    acceptingMessages = false
    if (Build.VERSION.SDK_INT >= 33) backCallback?.let { onBackInvokedDispatcher.unregisterOnBackInvokedCallback(it) }
    super.onDestroy()
    liveInstances--
    launchPending = false
    Log.i("KiselHost", "Cocos destroyed live=$liveInstances")
  }

  companion object {
    @Volatile
    var liveInstances = 0
      private set
    var creations = 0
      private set
    @Volatile var launchPending = false
    @Volatile var acceptingMessages = false
      private set
    @Volatile var engineEpoch = 0L
      private set
  }
}
