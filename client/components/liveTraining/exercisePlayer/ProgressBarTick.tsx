import { LayoutChangeEvent, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ProgressBarTickProps = {
  currentProgress: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  isTransparent?: boolean;
};

const ProgressBarTick = ({
  currentProgress,
  activeColor,
  inactiveColor,
  isTransparent,
}: ProgressBarTickProps) => {
  const ref = useAnimatedRef();
  const x = useSharedValue(0);

  const handleOnLayout = (e: LayoutChangeEvent) => {
    x.value = e.nativeEvent.layout.x;
  };

  const tickStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        currentProgress.value > x.value ? activeColor : inactiveColor,
      ),
    };
  });

  return (
    <Animated.View
      ref={ref}
      style={[styles.tick, !isTransparent && tickStyle]}
      collapsable={false}
      onLayout={handleOnLayout}
    />
  );
};

export default ProgressBarTick;

const styles = StyleSheet.create({
  tick: {
    width: 1,
    height: '70%',
    zIndex: 10,
  },
});
