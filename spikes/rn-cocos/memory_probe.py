#!/usr/bin/env python3
"""Sample only the named spike process, locally; never force GC or reset its state."""
import argparse
import csv
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import re
import subprocess
import time
from urllib.parse import parse_qs, urlparse

SPIKE = Path(__file__).resolve().parent
ADB = '/Users/admin/Library/Android/sdk/platform-tools/adb'


def run(*args):
    return subprocess.check_output(args, text=True, timeout=45)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ios-pid', type=int, required=True)
    parser.add_argument('--port', type=int, default=7458)
    parser.add_argument('--run-id', required=True)
    args = parser.parse_args()
    assert re.fullmatch(r'[a-zA-Z0-9_-]+', args.run_id)
    output = SPIKE / f'evidence/memory-{args.run_id}.csv'
    assert not output.exists(), 'Use a fresh run ID'
    rows = []

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            try:
                query = parse_qs(urlparse(self.path).query)
                platform, phase, cycle = (query[k][0] for k in ('platform', 'phase', 'cycle'))
                assert platform in ('ios', 'android') and phase in ('baseline', 'warmup', 'open', 'closed')
                cycle = int(cycle); assert 0 <= cycle <= 10
                assert not any(r['platform'] == platform and r['phase'] == phase and r['cycle'] == cycle for r in rows)
                time.sleep(2)  # Same settle interval, no explicit GC; part of the measurement protocol.
                row = {'platform': platform, 'phase': phase, 'cycle': cycle, 'epochSeconds': time.time(),
                       'pid': '', 'rssKiB': '', 'pssKiB': '', 'physicalFootprintMiB': '', 'nativeHeapAllocatedKiB': ''}
                stem = SPIKE / f'logs/memory-{args.run_id}-{platform}-{phase}-{cycle}'
                if platform == 'ios':
                    pid = str(args.ios_pid)
                    identity = run('ps', '-p', pid, '-o', 'comm=')
                    assert 'KiselNativeProbe' in identity
                    raw = run('vmmap', '-summary', pid)
                    footprint = re.search(r'^Physical footprint:\s+([\d.]+)([KMG])', raw, re.M)
                    assert footprint
                    row.update(pid=pid, rssKiB=int(run('ps', '-p', pid, '-o', 'rss=').strip()),
                               physicalFootprintMiB=float(footprint[1]) * {'K': 1/1024, 'M': 1, 'G': 1024}[footprint[2]])
                else:
                    pid = run(ADB, '-s', 'emulator-5556', 'shell', 'pidof', 'com.kiselnativeprobe').strip()
                    raw = run(ADB, '-s', 'emulator-5556', 'shell', 'dumpsys', 'meminfo', pid)
                    total = re.search(r'TOTAL PSS:\s+(\d+).*TOTAL RSS:\s+(\d+)', raw)
                    heap = re.search(r'^\s+Native Heap\s+([\d\s]+)$', raw, re.M)
                    assert total and heap
                    # dumpsys header: Pss,PrivateDirty,PrivateClean,SwapPss,Rss,HeapSize,HeapAlloc,HeapFree.
                    fields = heap[1].split(); assert len(fields) == 8
                    row.update(pid=pid, pssKiB=int(total[1]), rssKiB=int(total[2]), nativeHeapAllocatedKiB=int(fields[6]))
                stem.with_suffix('.log').write_text(raw)
                row['rawLog'] = str(stem.with_suffix('.log').relative_to(SPIKE.parents[1]))
                rows.append(row)
                with output.open('w', newline='') as f:
                    writer = csv.DictWriter(f, fieldnames=row, lineterminator='\n')
                    writer.writeheader(); writer.writerows(rows)
                body = json.dumps({'status': 'PASS', 'sample': row}).encode()
                self.send_response(200)
                print(json.dumps(row), flush=True)
            except Exception as error:
                body = json.dumps({'status': 'FAIL', 'error': str(error)}).encode()
                self.send_response(500)
                print(body.decode(), flush=True)
            self.send_header('Content-Type', 'application/json'); self.end_headers(); self.wfile.write(body)

        def log_message(self, *_):
            pass

    print(f'Local memory sampler 127.0.0.1:{args.port}; PID {args.ios_pid}', flush=True)
    HTTPServer(('127.0.0.1', args.port), Handler).serve_forever()


if __name__ == '__main__':
    main()
