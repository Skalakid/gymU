import { Colors } from '@/constants/Colors';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

export type ButtonProps = {
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
};

const PrimaryButton = ({
  value,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.white} size={23} />
      ) : (
        <ThemedText size="l" style={[textStyle]} color={Colors.white}>
          {value}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark.primary,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 15,
  },
});
