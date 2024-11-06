import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon, { IconProps } from '../common/Icon';
import ThemedText from '../ThemedText';

type IconButtonProps = IconProps & {
  onPress?: () => void;
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  label?: string;
  labelSize?: 's' | 'm' | 'l';
};

const IconButton = ({
  onPress,
  style,
  labelStyle,
  label,
  labelSize = 's',
  ...rest
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Icon {...rest} />
      {label && (
        <ThemedText size={labelSize} color={rest.color} style={labelStyle}>
          {label}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
});
