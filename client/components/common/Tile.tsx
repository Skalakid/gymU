import { StyleSheet, View, type ViewProps } from 'react-native';

import useThemeColor from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const Tile = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'tile',
  );

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
  },
});
