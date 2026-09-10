package com.kiselnativeprobe

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log

/** Native host focus, bounded diagnostic fixture. Cocos alone owns players. */
class ProbeAudioFocus(private val context: Context) {
  private val manager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
  private var active = false
  private var noisy = false
  private val listener = AudioManager.OnAudioFocusChangeListener { change ->
    publish(active && !noisy && change == AudioManager.AUDIOFOCUS_GAIN, "focus:$change")
  }
  private val request = if (Build.VERSION.SDK_INT >= 26) AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
    .setAudioAttributes(AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_GAME)
      .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build())
    .setWillPauseWhenDucked(true)
    .setAcceptsDelayedFocusGain(true)
    .setOnAudioFocusChangeListener(listener, Handler(Looper.getMainLooper()))
    .build() else null
  private val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
      if (intent.action == AudioManager.ACTION_AUDIO_BECOMING_NOISY) {
        noisy = true; publish(false, "headphones-unplugged")
      }
    }
  }
  init {
    val filter = IntentFilter(AudioManager.ACTION_AUDIO_BECOMING_NOISY)
    if (Build.VERSION.SDK_INT >= 33) context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED)
    else @Suppress("DEPRECATION") context.registerReceiver(receiver, filter)
  }
  fun resume() {
    active = true
    val result = if (Build.VERSION.SDK_INT >= 26) manager.requestAudioFocus(request!!)
      else @Suppress("DEPRECATION") manager.requestAudioFocus(listener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN)
    publish(!noisy && result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED, "request:$result")
  }
  fun pause() {
    active = false; publish(false, "host-paused")
    if (Build.VERSION.SDK_INT >= 26) manager.abandonAudioFocusRequest(request!!)
    else @Suppress("DEPRECATION") manager.abandonAudioFocus(listener)
  }
  fun close() {
    pause(); context.unregisterReceiver(receiver)
    Log.i("KiselAudio", "focus-owner-closed listener=0 receiver=0")
  }
  private fun publish(focus: Boolean, reason: String) {
    Log.i("KiselAudio", "native-focus=$focus reason=$reason thread=${Thread.currentThread().name}")
    CocosHostModule.publishAudio(focus, reason)
  }
}
