import { AudioGate } from '../../cocos-probe/assets/scripts/protocol/AudioGate';

test('late loading cannot start in background; focus must be reacquired', () => {
  const start = jest.fn(), stop = jest.fn();
  const gate = new AudioGate(start, stop);
  gate.setState(true, false); gate.setShown(false); gate.setReady();
  expect(start).toHaveBeenCalledTimes(0);
  gate.setShown(true); expect(start).toHaveBeenCalledTimes(0);
  gate.setState(true, false); expect(start).toHaveBeenCalledTimes(1);
});

test('duplicate gains/resumes do not multiply loops; loss stops loop and SFX', () => {
  const start = jest.fn(), stop = jest.fn();
  const gate = new AudioGate(start, stop);
  gate.setReady(); gate.setState(true, false); gate.setState(true, false); gate.setShown(true);
  expect(start).toHaveBeenCalledTimes(1);
  gate.setState(false, false); gate.setState(false, false);
  expect(stop).toHaveBeenCalledTimes(1);
  gate.setState(true, false); expect(start).toHaveBeenCalledTimes(2);
});

test('mute survives lifecycle and late callbacks cannot reopen a closed gate', () => {
  const start = jest.fn(), stop = jest.fn();
  const gate = new AudioGate(start, stop);
  gate.setReady(); gate.setState(true, true); gate.setShown(false); gate.setShown(true);
  gate.setState(true, true); expect(gate.allowed).toBe(false);
  gate.setState(true, false); expect(start).toHaveBeenCalledTimes(1);
  gate.close(); gate.setState(true, false); gate.setReady(); gate.setShown(true);
  expect(start).toHaveBeenCalledTimes(1); expect(stop).toHaveBeenCalledTimes(1);
});
