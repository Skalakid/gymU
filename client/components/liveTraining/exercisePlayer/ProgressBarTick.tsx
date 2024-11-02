import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
  SharedValue,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
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
  const [isRendered, setIsRendered] = useState(false);

  const tickStyle = useAnimatedStyle(() => {
    const mesurement = isRendered && measure(ref);
    return {
      backgroundColor: withTiming(
        mesurement && currentProgress.value > mesurement.x
          ? activeColor
          : inactiveColor,
      ),
    };
  });

  useEffect(() => {
    setIsRendered(true);
  }, []);

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
