import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import NativeCocosHost from './specs/NativeCocosHost';
import { HostExchange } from '../cocos-probe/assets/scripts/protocol/ProbeExchange';

export default function App() {
  const [taps, setTaps] = useState(0);
  const [hostStatus, setHostStatus] = useState('ready');
  const [bridgeStatus, setBridgeStatus] = useState('Bridge waiting');
  const bridge = useRef<HostExchange | null>(null);
  useEffect(() => {
    const exchange = new HostExchange(raw => NativeCocosHost!.send(raw), entry => {
      console.log('[bridge-probe][host]', JSON.stringify(entry));
      if (entry.event === 'exchange-complete') setBridgeStatus(`Bridge ${entry.status}: color=${entry.colorApplications}, rejected=${entry.hostRejected}/${entry.gameRejected}`);
    });
    bridge.current = exchange;
    const subscription = NativeCocosHost?.onMessage?.(raw => exchange.receive(raw));
    const audio = NativeCocosHost?.onAudioState?.(raw => {
      try {
        const state = JSON.parse(raw);
        if (typeof state.focus !== 'boolean' || typeof state.active !== 'boolean') throw new Error('Invalid native audio state');
        console.log('[kisel-audio][host]', raw);
        exchange.setAudioFocus(state.focus, state.active);
      } catch (error) { console.log('[kisel-audio][host-invalid]', String(error)); }
    });
    return () => { subscription?.remove(); audio?.remove(); exchange.close(); bridge.current = null; };
  }, []);
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Text accessibilityRole="header" style={styles.title}>
        Kisel Native Probe
      </Text>
      <Text style={styles.subtitle}>React Native 0.86.3 · TASK-0039</Text>
      <Text testID="rn-counter" style={styles.counter}>
        RN taps: {taps}
      </Text>
      <Pressable
        testID="rn-tap-button"
        accessibilityRole="button"
        accessibilityLabel="Increment React Native counter"
        onPress={() => setTaps(value => value + 1)}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Text style={styles.buttonText}>Tap RN counter</Text>
      </Pressable>
      <Pressable
        testID="open-cocos"
        accessibilityRole="button"
        disabled={!NativeCocosHost}
        style={styles.button}
        onPress={() => {
          bridge.current?.begin(Platform.OS === 'android');
          setHostStatus('requesting');
          NativeCocosHost?.open().then(status => {
            setHostStatus(status);
            if (Platform.OS === 'ios') bridge.current?.probeRetainedSession();
          }).catch(error => setHostStatus(String(error)));
        }}
      >
        <Text style={styles.buttonText}>Open native Cocos</Text>
      </Pressable>
      <Text testID="host-status" style={styles.note}>{NativeCocosHost ? hostStatus : 'Host integration pending on this platform'}</Text>
      <Text testID="bridge-status" style={styles.note}>{bridgeStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
  },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 14 },
  counter: { fontSize: 28, color: '#f8fafc', marginVertical: 44 },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  pressed: { opacity: 0.7 },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#ffffff' },
  note: { fontSize: 14, color: '#94a3b8', marginTop: 44, textAlign: 'center' },
});
