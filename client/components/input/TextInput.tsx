import { SizePresets, WeightPresets } from '@/constants/Typography';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  ViewStyle,
} from 'react-native';
import ThemedText from '../ThemedText';
import useTheme from '@/hooks/useTheme';

type TextInputProps = {
  value?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  type?: 'password' | 'text';
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  style?: ViewStyle;
  disabled?: boolean;
};

const TextInput = ({
  value,
  label,
  placeholder,
  onChangeText,
  type = 'text',
  keyboardType = 'default',
  style,
  disabled,
}: TextInputProps) => {
  const theme = useTheme();
  const primaryColor = theme.text;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <ThemedText size="m" weight="medium">
          {label}
        </ThemedText>
      )}

      <RNTextInput
        style={[
          styles.textInput,
          {
            borderColor: primaryColor,
            color: primaryColor,
          },
          SizePresets.m,
          WeightPresets.semiBold,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password'}
        autoCapitalize="none"
        keyboardType={keyboardType}
        editable={!disabled}
        placeholderTextColor={`${primaryColor}AA`}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
  },
  textInput: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: 'Poppins',
  },
});
