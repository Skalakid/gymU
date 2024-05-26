import { Text, type TextProps, StyleSheet, TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SizePresets, WeightPresets } from "@/constants/Typography";

export type ThemedTextProps = TextProps & {
  color?: string;
  lightColor?: string;
  darkColor?: string;
  size?: keyof typeof SizePresets;
  weight?: keyof typeof WeightPresets;
};

export function ThemedText({
  style,
  color,
  lightColor,
  darkColor,
  size = "default",
  weight = "regular",
  ...rest
}: ThemedTextProps) {
  const textColor =
    color || useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        SizePresets[size],
        WeightPresets[weight],
        { color: textColor },
        styles.default,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "Poppins",
  },
});
