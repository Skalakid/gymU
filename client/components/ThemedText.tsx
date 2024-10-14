import { Text, type TextProps, StyleSheet, TextStyle } from 'react-native';
import useThemeColor from '@/hooks/useThemeColor';
import { SizePresets, WeightPresets } from '@/constants/Typography';

export type ThemedTextProps = TextProps & {
  color?: string;
  lightColor?: string;
  darkColor?: string;
  size?: keyof typeof SizePresets;
  weight?: keyof typeof WeightPresets;
  textType?: 'text' | 'description' | 'error';
};

const ThemedText = ({
  style,
  color,
  lightColor,
  darkColor,
  size = 'default',
  weight = 'regular',
  textType = 'text',
  ...rest
}: ThemedTextProps) => {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    textType,
  );
  const textColor = color || themeColor;

  return (
    <Text
      style={[
        SizePresets[size],
        {
          color: textColor,
          fontFamily: `Poppins_${WeightPresets[weight].fontWeight}${(style as TextStyle)?.fontStyle === 'italic' ? '_italic' : ''}`,
        },
        styles.default,
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Poppins',
  },
});
