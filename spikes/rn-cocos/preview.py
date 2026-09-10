#!/usr/bin/env python3
"""Build and serve the same Cocos probe scene used by the native exports."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--skip-build', action='store_true', help='Serve the last successful export')
    parser.add_argument('--port', type=int, default=7457)
    args = parser.parse_args()
    spike = Path(__file__).resolve().parent
    project = spike / 'cocos-probe'
    if not args.skip_build:
        logs = spike / 'logs'
        logs.mkdir(exist_ok=True)
        with (logs / 'cocos-preview-console.log').open('w') as output:
            result = subprocess.run([
                sys.executable, str(spike / 'run.py'), 'cocos', '--project', str(project),
                '--build', f'configPath={project / "build-profiles/web-preview.json"};'
                           f'logDest={logs / "cocos-preview-export.log"}',
            ], stdout=output, stderr=subprocess.STDOUT)
        if result.returncode:
            print(f'Export failed; see {logs / "cocos-preview-console.log"}', file=sys.stderr)
            return result.returncode
    output = project / 'build/web-preview'
    if not (output / 'index.html').is_file():
        parser.error('Preview export is missing. Run again without --skip-build.')
    handler = partial(SimpleHTTPRequestHandler, directory=str(output))
    with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
        print(f'Cocos preview: http://127.0.0.1:{args.port} (Ctrl+C to stop)', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
    return 0


if __name__ == '__main__':
    sys.exit(main())
