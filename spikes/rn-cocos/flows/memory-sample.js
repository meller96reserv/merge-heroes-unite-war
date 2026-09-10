// Development-only runner -> local host sampler. No app network or cloud request.
const response = http.get('http://127.0.0.1:7458/sample?platform=ios&phase=' + output.phase + '&cycle=' + output.cycle);
if (!response.ok || json(response.body).status !== 'PASS') {
  throw new Error('Memory sample failed: ' + response.body);
}
