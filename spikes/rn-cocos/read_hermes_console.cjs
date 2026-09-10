const fs = require('node:fs');
const WebSocket = require('./rn-probe/node_modules/ws');
const output = process.argv[2];
if (!output || fs.existsSync(output)) throw new Error('Supply a new output JSON path; historical evidence is never overwritten');
(async () => {
  const target = (await (await fetch('http://127.0.0.1:8081/json/list')).json()).find(t => t.title.includes('iPhone'));
  if (!target) throw new Error('Own iOS probe target missing');
  const ws = new WebSocket(target.webSocketDebuggerUrl, {origin: "http://localhost:8081"});
  const entries = [];
  ws.onopen = () => ws.send(JSON.stringify({id:1,method:'Runtime.enable'}));
  ws.onmessage = event => {
    const m = JSON.parse(event.data);
    if (m.method === 'Runtime.consoleAPICalled') {
      const args = m.params.args.map(a => a.value ?? a.description);
      if (args.some(a => typeof a === 'string' && a.includes('[bridge-probe]'))) entries.push({timestamp:m.params.timestamp,args});
    }
  };
  ws.onerror = error => { console.error(error.message || error); process.exitCode = 1; };
  setTimeout(() => {
    fs.writeFileSync(output, JSON.stringify({target:target.title,events:entries},null,2)+'\n');
    console.log(`Captured ${entries.length} own bridge diagnostic events`);
    ws.close();
  }, 5000);
})();
