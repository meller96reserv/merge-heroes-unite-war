import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { useEffect, useState, type ComponentType } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

// Only CanvasKit initialization differs. The game module is shared with index.ts.
export default function WebRoot() {
  const [Game, setGame] = useState<ComponentType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setError(false);
    LoadSkiaWeb({ locateFile: () => '/canvaskit.wasm' })
      .then(() => import('./App'))
      .then(({ default: App }) => { if (active) setGame(() => App); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);

  if (Game) return <Game />;
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Merge Heroes</Text>
      {error ? <>
        <Text style={styles.message}>The adventure could not load. Please try again.</Text>
        <Pressable accessibilityRole="button" style={styles.retry} onPress={() => globalThis.location.reload()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </> : <ActivityIndicator color="#f5bf5c" accessibilityLabel="Loading adventure" />}
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#172c36', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: '900', color: '#fff4d4', marginBottom: 28 },
  message: { color: '#e8e0cb', textAlign: 'center' },
  retry: { marginTop: 24, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, backgroundColor: '#f5bf5c' },
  retryText: { fontWeight: '700', color: '#362b24' },
});
