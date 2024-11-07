import { StyleSheet, View, type ViewProps } from 'react-native';

import useThemeColor from '@/hooks/useThemeColor';
import Animated from 'react-native-reanimated';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  animated?: boolean;
};

const Tile = ({
  style,
  lightColor,
  darkColor,
  animated,
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'tile',
  );

  if (animated) {
    return (
      <Animated.View
        style={[{ backgroundColor }, styles.container, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View
      style={[{ backgroundColor }, styles.container, style]}
      {...otherProps}
    />
  );
};

export default Tile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    height: 'auto',
  },
});
