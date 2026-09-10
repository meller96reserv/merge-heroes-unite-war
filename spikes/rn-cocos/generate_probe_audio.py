#!/usr/bin/env python3
"""Generate original diagnostic tones, or verify their exact PCM without rewriting."""
import argparse
import math
from pathlib import Path
import struct
import wave


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent / 'cocos-probe/assets/resources/probe-audio'
    for name, frequency, count in [('loop', 220, 48000), ('oneshot', 880, 5760)]:
        samples = []
        for i in range(count):
            envelope = 1 if name == 'loop' else min(1, i / 480, (count - 1 - i) / 480)
            samples.append(round(32767 * .15 * math.sin(2 * math.pi * frequency * i / 48000) * envelope))
        pcm = struct.pack('<' + 'h' * count, *samples)
        path = root / (name + '.wav')
        if args.check:
            with wave.open(str(path)) as source:
                assert (source.getnchannels(), source.getsampwidth(), source.getframerate()) == (1, 2, 48000)
                assert source.readframes(source.getnframes()) == pcm, f'{name}: PCM differs'
        else:
            with wave.open(str(path), 'wb') as target:
                target.setparams((1, 2, 48000, count, 'NONE', 'not compressed'))
                target.writeframes(pcm)
        print(name, 'PASS' if args.check else 'GENERATED', count, 'frames')


if __name__ == '__main__':
    main()
