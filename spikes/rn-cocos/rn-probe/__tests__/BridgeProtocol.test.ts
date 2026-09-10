import { decode, INITIALIZE_PAYLOAD, invalidCases, MAX_BYTES, Receiver, Sender, utf8Bytes } from '../../cocos-probe/assets/scripts/protocol/Protocol';
import { GameExchange, HostExchange } from '../../cocos-probe/assets/scripts/protocol/ProbeExchange';

const init = () => {
  const sender = new Sender('probe.test', 4, () => 123);
  const receiver = new Receiver('game', 'probe.test', 4);
  const wire = JSON.stringify(sender.message('app.initialize', INITIALIZE_PAYLOAD, 'host.init'));
  expect(receiver.accept(wire).kind).toBe('accepted');
  return {sender, receiver, wire};
};

test('both receiving roles use real v1 handshake and direction checks', () => {
  const game = new Sender('probe.test', 4);
  const host = new Receiver('host', 'probe.test', 4);
  expect(host.accept(JSON.stringify(game.message('game.ready', {gameBuild: 'cocos.3.8.8', supportedVersions: [1], capabilities: ['probe.ping']}, null))).kind).toBe('accepted');
  expect(host.accept(JSON.stringify(game.message('probe.color', {color: 'cyan'}, 'bad.direction'))).code).toBe('WRONG_DIRECTION');
});

test('identical and reordered-key retries never apply twice; changed payload conflicts', () => {
  const {sender, receiver, wire} = init();
  expect(receiver.accept(wire).kind).toBe('duplicate');
  const message = sender.message('probe.color', {color: 'cyan'}, 'host.color');
  expect(receiver.accept(JSON.stringify(message)).kind).toBe('accepted');
  const reordered = Object.fromEntries(Object.entries(message).reverse());
  expect(receiver.accept(JSON.stringify(reordered)).kind).toBe('duplicate');
  expect(receiver.accept(JSON.stringify({...message, payload: {color: 'violet'}})).code).toBe('REQUEST_CONFLICT');
});

test.each(invalidCases(new Sender('probe.test', 4).message('probe.ping', {token: 'valid'}, 'next')).map(x => [x.id, x.expected]))('%s rejected without advancing state', (id, expected) => {
  const {sender, receiver} = init();
  const next = sender.message('probe.ping', {token: 'valid'}, 'next');
  const fixture = invalidCases(next).find(x => x.id === id)!;
  expect(receiver.accept(fixture.raw).code).toBe(expected);
  expect(receiver.accept(JSON.stringify(next)).kind).toBe('accepted');
});

test('UTF8 size counts multibyte text and rejects oversized valid JSON', () => {
  expect(utf8Bytes('AЖ😀')).toBe(7);
  expect(utf8Bytes('\ud800')).toBe(3);
  const raw = JSON.stringify(new Sender('probe.test', 4).message('probe.ping', {token: 'x'.repeat(MAX_BYTES)}, 'large'));
  expect(decode(raw).code).toBe('OVERSIZE');
});

test('precise payload paths, unsafe integers, extra envelope fields and invalid nested settings', () => {
  const base = new Sender('probe.test', 4).message('app.initialize', INITIALIZE_PAYLOAD, 'host.init');
  expect(decode(JSON.stringify({...base, payload: {...base.payload, settings: {...INITIALIZE_PAYLOAD.settings, musicGain: 2}}})).path).toBe('$.payload.settings.musicGain');
  expect(decode(JSON.stringify({...base, generation: 9007199254740992})).path).toBe('$.generation');
  expect(decode(JSON.stringify({...base, injected: 1})).path).toBe('$.injected');
  const poison = JSON.parse(JSON.stringify(base));
  Object.defineProperty(poison.payload.settings, '__proto__', {value: {}, enumerable: true});
  expect(decode(JSON.stringify(poison)).path).toBe('$.payload.settings.__proto__');
  expect(decode(JSON.stringify({...base, constructor: {}})).path).toBe('$.constructor');
});

test('sequence reversal, premature commands, receipt capacity and teardown stay closed', () => {
  const fresh = new Receiver('game', 'probe.test', 4);
  expect(fresh.accept(JSON.stringify(new Sender('probe.test', 4).message('probe.ping', {token: 'early'}, 'early'))).code).toBe('NOT_INITIALIZED');
  const {sender, receiver} = init();
  for (let i = 0; i < 127; i++) expect(receiver.accept(JSON.stringify(sender.message('probe.ping', {token: `ping.${i}`}, `request.${i}`))).kind).toBe('accepted');
  const next = sender.message('probe.ping', {token: 'overflow'}, 'overflow');
  expect(receiver.accept(JSON.stringify({...next, sequence: 0})).code).toBe('REORDERED_SEQUENCE');
  expect(receiver.accept(JSON.stringify(next)).code).toBe('RECEIPT_CAPACITY');
  receiver.close();
  expect(receiver.accept(JSON.stringify(next)).code).toBe('CLOSED');
});

test('complete development exchange keeps one effect while both runtimes reject the adversarial suite', async () => {
  const colors: string[] = [];
  let host: HostExchange;
  let finish: (value: Record<string, unknown>) => void;
  const completed = new Promise<Record<string, unknown>>(resolve => { finish = resolve; });
  let lifecycleResolve: (value: Record<string, unknown>) => void;
  const alive = new Promise<Record<string, unknown>>(resolve => { lifecycleResolve = resolve; });
  const game = new GameExchange('probe.integration', 7, raw => {
    if (utf8Bytes(raw) <= MAX_BYTES) host.receive(raw);
  }, color => colors.push(color), () => {});
  host = new HostExchange(async raw => {
    if (utf8Bytes(raw) > MAX_BYTES) throw {code: 'OVERSIZE'};
    game.receive(raw);
  }, entry => {
    if (entry.event === 'exchange-complete') finish(entry);
    if (entry.event === 'lifecycle-pong') lifecycleResolve(entry);
  });
  host.begin(true);
  game.start();
  expect(await completed).toMatchObject({status: 'PASS', hostRejected: 9, gameRejected: 9, hostDuplicates: 1, gameDuplicates: 1, colorApplications: 1});
  expect(colors).toEqual(['cyan']);
  host.begin(false);
  host.probeRetainedSession();
  expect(await alive).toMatchObject({token: 'host.lifecycle.1', sessionId: 'probe.integration', generation: 7});
  expect(colors).toEqual(['cyan']);
  host.close();
  game.close();
});

test('closing a host cancels initialization queued before native delivery', async () => {
  const sends: string[] = [];
  const host = new HostExchange(raw => { sends.push(raw); }, () => {});
  const game = new GameExchange('probe.old', 8, raw => host.receive(raw), () => {}, () => {});
  host.begin(true);
  game.start();
  host.close();
  await new Promise<void>(resolve => setTimeout(resolve, 0));
  expect(sends).toEqual([]);
});

test('inactive host caches audio state without consuming transport sequence; resume and mute remain valid', async () => {
  let host: HostExchange;
  const states: boolean[][] = [];
  const rejected: Record<string, unknown>[] = [];
  let active = true;
  const game = new GameExchange('probe.audio', 12, raw => {
    if (utf8Bytes(raw) <= MAX_BYTES) host.receive(raw);
  }, () => {}, entry => { if (entry.kind === 'rejected') rejected.push(entry); },
  (focus, muted) => states.push([focus, muted]));
  host = new HostExchange(async raw => {
    if (utf8Bytes(raw) > MAX_BYTES) throw {code: 'OVERSIZE'};
    if (!active) throw {code: 'HOST_INACTIVE'};
    game.receive(raw);
  }, () => {});
  host.begin(true); host.setAudioFocus(true); game.start();
  const drain = () => new Promise<void>(resolve => setTimeout(resolve, 0));
  await drain();
  expect(states).toEqual([[true, false]]);
  const before = rejected.length;
  active = false; host.setAudioFocus(false, false); await drain();
  expect(states).toHaveLength(1);
  active = true; host.setAudioFocus(true, true); await drain();
  game.requestMute(true); await drain();
  expect(states).toEqual([[true, false], [true, false], [true, true]]);
  expect(rejected).toHaveLength(before);
  host.close(); game.close();
});

test('reset cancels queued work of the previous generation and initializes only the new owner', async () => {
  const sends: string[] = [];
  const host = new HostExchange(raw => { sends.push(raw); }, () => {});
  host.begin(true);
  new GameExchange('probe.old', 8, raw => host.receive(raw), () => {}, () => {}).start();
  host.begin(true);
  new GameExchange('probe.new', 9, raw => host.receive(raw), () => {}, () => {}).start();
  await new Promise<void>(resolve => setTimeout(resolve, 0));
  expect(sends.map(raw => JSON.parse(raw).sessionId)).toEqual(['probe.new']);
});
