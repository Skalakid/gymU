import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Icon, { IconProps } from "../Icon";
import Icons from "@/constants/Icons";

type IconButtonProps = IconProps & {
  onPress?: () => void;
  style?: ViewStyle;
};

const IconButton = ({ onPress, style, ...rest }: IconButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Icon {...rest} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
