import { StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useTheme from '@/hooks/useTheme';

type DotProps = {
  index: number;
  currentIndex: SharedValue<number>;
};

const Dot = ({ index, currentIndex }: DotProps) => {
  const theme = useTheme();

  const dotAnimatedStyles = useAnimatedStyle(() => {
    const isActive = index === currentIndex.value;
    return {
      backgroundColor: withTiming(isActive ? theme.primary : 'transparent'),
    };
  });

  return (
    <Animated.View
      style={[styles.dot, { borderColor: theme.primary }, dotAnimatedStyles]}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    width: 12,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
  },
});
