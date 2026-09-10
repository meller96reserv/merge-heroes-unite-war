# Original project audio

The audio marked PROJECT_ORIGINAL is synthesized specifically for Merge Heroes
Unite War from the composition/synthesis source in `tooling/audio/`. Creator:
project work authored with Codex assistance. No reference-game audio, downloaded
sample library, recorded performance or third-party melody is used.

Short effects use deterministic oscillators, filtered seeded noise, envelopes,
original note sequences and early reflections. Each event manifest contains its
brief, actual runtime/master file and SHA-256. NumPy/SciPy are generation tools;
their program code is not sampled into the sound or included in the audio files.

These are project deliverables, not public-domain/CC0 uploads. No third-party
sample license or attribution is needed for these original sources. This record
describes provenance and does not purport to waive the project's rights or clear
unrelated supplied art, fonts or trademarks. TASK-0233 retains the final combined
release provenance review. Acquisition is separate from final in-game mix/user
audition; TASK-0186 owns that acceptance.

Reproduction for SFX: run `tooling/audio/synthesize-sfx.py` with Python,
NumPy and SciPy. The small mono 44.1 kHz PCM WAVs are lossless masters and runtime
files, so no duplicate heavy master directory is committed. No external audio
network request is involved. Deferred offline-reward audio remains in the source
catalogue and does not add an offline-farming feature to delivery.

`tooling/audio/compose-music.py` includes the original 96 BPM main (40 bars,
100 seconds) and boss (24 bars, 60 seconds) scores and synthesized plucked,
celesta, flute, string-pad, bass and soft percussion instruments. Both share
a compatible harmonic palette. Tails and room reflections wrap periodically.
Compact 128 kbps MP3 runtime files retain gapless encoder metadata; 32 kHz
lossless stereo masters are reproducible in `/tmp/kisel-audio-masters` and their
hashes are in the manifest. The encoding tool is FFmpeg/libmp3lame. No temporary
master, audio diagnostic log or duplicate large render is committed.

`tooling/audio/synthesize-ambience.py` produces two 90-second mono wind/leaf
loops with sparse original synthesized bird details. Periodic spectral noise
and integer-cycle slow modulation make the source continuous; no identifiable
recorded location or external sample is present. MP3 runtime files are 96 kbps;
lossless 32 kHz masters follow the same local/reproducible policy as music.
