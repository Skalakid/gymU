import { View, type ViewProps } from 'react-native';

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

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default Tile;
