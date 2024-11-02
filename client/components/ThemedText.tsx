import { Text, type TextProps, StyleSheet, TextStyle } from 'react-native';
import { SizePresets, WeightPresets } from '@/constants/Typography';
import useTheme from '@/hooks/useTheme';

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
  size = 'default',
  weight = 'regular',
  textType = 'text',
  ...rest
}: ThemedTextProps) => {
  const theme = useTheme();
  const textColor = color || theme?.[textType] || theme.text;

  return (
    <Text
      style={[
        SizePresets[size],
        {
          color: textColor,
          fontFamily: `Poppins_${WeightPresets[weight].fontWeight}${(style as TextStyle)?.fontStyle === 'italic' ? '_italic' : ''}`,
        },
        WeightPresets[weight],
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
