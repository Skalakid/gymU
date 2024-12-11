import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ExpandableItemProps = {
  isExpanded: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  swipedRatio?: number;
};

const ExpandableItem = ({
  isExpanded,
  style,
  children,
  swipedRatio,
}: ExpandableItemProps) => {
  const height = useSharedValue(0);

  const bodyStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value * (isExpanded ? 1 : (swipedRatio ?? 0))),
  }));

  return (
    <Animated.View style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default ExpandableItem;

const styles = StyleSheet.create({
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
  },
});
