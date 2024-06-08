import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon, { IconProps } from '../Icon';

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
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
  },
});
