# Original diagnostic audio — TASK-0044

These two project-generated sine signals are temporary development fixtures, not final game audio. No reference audio was extracted. They contain no third-party samples, music or recordings. Generation is defined by [generate_probe_audio.py](generate_probe_audio.py); run it with `--check` to verify exact PCM without modifying assets.

Both files are mono48kHz,16-bit PCM at amplitude0.15. `loop.wav` is one second at220Hz, exactly220 periods. `oneshot.wav` is120ms at880Hz with10ms linear edge fades. The Cocos sources use gain0.4, one looping voice and one controlled SFX voice; focus loss/mute stops both. They are confined to the native feasibility spike and excluded from production asset manifests. Acoustic output, speaker quality and physical-headphone routing require device checks; source/player events alone do not prove them.
