import { StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';

type ProgressBarTickProps = {
  currentProgress: SharedValue<number>;
  activeColor?: string;
  inactiveColor?: string;
  isTransparent?: boolean;
};

const ProgressBarTick = ({
  currentProgress,
  activeColor,
  inactiveColor,
  isTransparent,
}: ProgressBarTickProps) => {
  const ref = useAnimatedRef();
  const tickStyle = useAnimatedStyle(() => {
    const mesurement = measure(ref);
    return {
      backgroundColor:
        mesurement && currentProgress.value > mesurement.x
          ? activeColor
          : inactiveColor,
    };
  });

  return (
    <Animated.View
      ref={ref}
      style={[styles.tick, !isTransparent && tickStyle]}
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
