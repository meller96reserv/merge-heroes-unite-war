import { Canvas, Circle, Group, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia';
import { useEffect, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { cancelAnimation, Easing, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

// Shared presentation foundation. Figma layers replace this bootstrap composition
// through TASK-0033/0059/0060; it grants no progress and contains no game rules.
export default function GameSurface() {
  const [width, setWidth] = useState(300);
  const height = 250;
  const x = useSharedValue(width / 2);
  const y = useSharedValue(height / 2);
  const active = useSharedValue(0);
  const radius = useDerivedValue(() => 18 + active.value * 6);
  const halo = useDerivedValue(() => 40 + active.value * 24);
  const opacity = useDerivedValue(() => 0.15 + active.value * 0.15);

  useEffect(() => {
    x.value = width / 2;
    y.value = height / 2;
    active.value = 0;
    const listener = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        cancelAnimation(active);
        active.value = 0;
        x.value = width / 2;
        y.value = height / 2;
      }
    });
    return () => { listener.remove(); cancelAnimation(active); cancelAnimation(x); cancelAnimation(y); };
  }, [width, active, x, y]);

  const drag = Gesture.Pan().minDistance(0)
    .onBegin(event => {
      x.value = Math.max(30, Math.min(width - 30, event.x));
      y.value = Math.max(30, Math.min(height - 30, event.y));
      active.value = withTiming(1, { duration: 120 });
    })
    .onUpdate(event => {
      x.value = Math.max(30, Math.min(width - 30, event.x));
      y.value = Math.max(30, Math.min(height - 30, event.y));
    })
    .onFinalize(() => {
      active.value = withTiming(0, { duration: 320, easing: Easing.out(Easing.cubic) });
      x.value = withTiming(width / 2, { duration: 320, easing: Easing.out(Easing.cubic) });
      y.value = withTiming(height / 2, { duration: 320, easing: Easing.out(Easing.cubic) });
    });

  return (
    <GestureDetector gesture={drag}>
      <View testID="game-surface" style={styles.surface} onLayout={event => setWidth(event.nativeEvent.layout.width)}
        accessible accessibilityLabel="Camp light" accessibilityHint="Drag to move the light; release to return it to camp.">
        <Canvas pointerEvents="none" style={styles.canvas}>
          <RoundedRect x={0} y={0} width={width} height={height} r={28}>
            <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={['#234a50', '#183540', '#102832']} />
          </RoundedRect>
          <RoundedRect x={1} y={1} width={width - 2} height={height - 2} r={27} color="#55716a" style="stroke" strokeWidth={1} />
          <Group opacity={0.3}>
            <Circle cx={width / 2} cy={height / 2} r={86} color="#bda565" style="stroke" strokeWidth={1} />
            <Circle cx={width / 2} cy={height / 2} r={62} color="#bda565" style="stroke" strokeWidth={1} />
          </Group>
          <Circle cx={x} cy={y} r={halo} color="#ffc568" opacity={opacity} />
          <Circle cx={x} cy={y} r={radius} color="#edb44f" />
          <Circle cx={x} cy={y} r={7} color="#fff2be" />
        </Canvas>
      </View>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({ surface: { width: '100%', height: 250, marginTop: 24 }, canvas: { flex: 1 } });
