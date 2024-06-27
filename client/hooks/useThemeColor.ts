/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const useThemeColor = (
  props?: { light?: string; dark?: string } | null,
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark,
) => {
  const theme = useColorScheme() ?? 'light';
  if (props) {
    const colorFromProps = props[theme];

    if (colorFromProps) {
      return colorFromProps;
    } else if (colorName) {
      return Colors[theme][colorName];
    }
  }
  return 'transparent';
};

export default useThemeColor;
