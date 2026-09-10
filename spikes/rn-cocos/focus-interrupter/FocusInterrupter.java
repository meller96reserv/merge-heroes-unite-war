package dev.kisel.focusinterrupter;

import android.app.Activity;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.TextView;

/** Separate-UID diagnostic app: ask the real OS for transient focus after 10s. */
public final class FocusInterrupter extends Activity {
    private final Handler handler = new Handler(android.os.Looper.getMainLooper());
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TextView label = new TextView(this);
        label.setText("Kisel audio focus test\nReturn to Cocos now.\nTransient request in 10 seconds; abandon after 3 seconds.");
        label.setTextSize(24);
        setContentView(label);
        final AudioManager manager = (AudioManager)getSystemService(AUDIO_SERVICE);
        final AudioFocusRequest request = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
            .setAudioAttributes(new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build())
            .setWillPauseWhenDucked(true)
            .setOnAudioFocusChangeListener(change -> Log.i("KiselFocusInterrupter", "focus=" + change))
            .build();
        handler.postDelayed(() -> {
            int result = manager.requestAudioFocus(request);
            Log.i("KiselFocusInterrupter", "request result=" + result + " uid=" + android.os.Process.myUid());
            handler.postDelayed(() -> {
                Log.i("KiselFocusInterrupter", "abandon result=" + manager.abandonAudioFocusRequest(request));
                finish();
            }, 3000);
        }, 10000);
    }
}
