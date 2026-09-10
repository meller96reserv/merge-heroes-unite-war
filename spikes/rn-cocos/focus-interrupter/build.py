#!/usr/bin/env python3
"""Build a tiny separate-UID focus test with installed pinned SDK tools; no dependencies."""
import json
import os
from pathlib import Path
import subprocess
from zipfile import ZipFile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
LOCK = json.loads((HERE.parent / 'toolchain.json').read_text())
SDK = Path(LOCK['android']['sdk'])
TOOLS = SDK / 'build-tools/36.0.0'
JAVA = Path(LOCK['java']['home'])
OUT = ROOT / '.tools/focus-interrupter'
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'classes').mkdir(exist_ok=True)
(OUT / 'dex').mkdir(exist_ok=True)
env = dict(os.environ, JAVA_HOME=str(JAVA))
def run(*args):
    subprocess.run([str(a) for a in args], check=True, env=env)
run(JAVA/'bin/javac', '-source', '8', '-target', '8', '-classpath', SDK/'platforms/android-36/android.jar',
    '-d', OUT/'classes', HERE/'FocusInterrupter.java')
run(TOOLS/'d8', '--min-api', '26', '--lib', SDK/'platforms/android-36/android.jar',
    '--output', OUT/'dex', *sorted((OUT/'classes').rglob('*.class')))
run(TOOLS/'aapt2', 'link', '-I', SDK/'platforms/android-36/android.jar',
    '--manifest', HERE/'AndroidManifest.xml', '-o', OUT/'unsigned.apk')
with ZipFile(OUT/'unsigned.apk', 'a') as apk:
    apk.write(OUT/'dex/classes.dex', 'classes.dex')
run(TOOLS/'zipalign', '-f', '4', OUT/'unsigned.apk', OUT/'aligned.apk')
run(TOOLS/'apksigner', 'sign', '--ks', HERE.parent/'rn-probe/android/app/debug.keystore',
    '--ks-pass', 'pass:android', '--out', OUT/'focus-interrupter.apk', OUT/'aligned.apk')
run(TOOLS/'apksigner', 'verify', OUT/'focus-interrupter.apk')
print(OUT/'focus-interrupter.apk')
