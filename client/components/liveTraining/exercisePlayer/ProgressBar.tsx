import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  clamp,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ProgressBarTick from './ProgressBarTick';
import useTheme from '@/hooks/useTheme';

type ProgressBarProps = {
  progress: number;
  ticks?: number;
};

const ProgressBar = ({ ticks = 10, progress = 0 }: ProgressBarProps) => {
  const theme = useTheme();
  const [tickPositions, setTickPositions] = useState<number[]>([]);
  const x = useSharedValue(0);
  const sliderRef = useAnimatedRef();
  const [sliderWidth, setSliderWidth] = useState(1);

  const onSliderLayout = (event: LayoutChangeEvent) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const progressBarStyle: ViewStyle = useAnimatedStyle(() => ({
    width: withTiming(x.value, { duration: 100 }),
  }));

  useEffect(() => {
    const ticksArray = Array.from({ length: ticks }, (_, index) => index);
    setTickPositions(ticksArray);
  }, [sliderRef, sliderWidth, ticks]);

  useEffect(() => {
    x.value = (clamp(progress, 0, 100) / 100) * sliderWidth;
  }, [progress, sliderWidth, x]);

  return (
    <View style={styles.container}>
      <Animated.View
        ref={sliderRef}
        style={[styles.progressBarOutline, { backgroundColor: theme.tile }]}
        onLayout={onSliderLayout}
      >
        <Animated.View
          style={[
            styles.progressBarFill,
            { backgroundColor: theme.text },
            progressBarStyle,
          ]}
        ></Animated.View>

        <Animated.View style={styles.ticsksContainer}>
          {tickPositions.map((threshold, index) => (
            <ProgressBarTick
              key={index}
              currentProgress={x}
              activeColor={theme.tile}
              inactiveColor={theme.subTile}
              isTransparent={index === 0 || index === tickPositions.length - 1}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressBarOutline: {
    width: '100%',
    height: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  ticsksContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
