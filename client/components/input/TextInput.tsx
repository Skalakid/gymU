import { Colors } from '@/constants/Colors';
import { SizePresets, WeightPresets } from '@/constants/Typography';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  useColorScheme,
} from 'react-native';
import ThemedText from '../ThemedText';

type TextInputProps = {
  value?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  type?: 'password' | 'text';
};

const TextInput = ({
  value,
  label,
  placeholder,
  onChangeText,
  type = 'text',
}: TextInputProps) => {
  const colorScheme = useColorScheme();
  const primaryColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View style={styles.container}>
      <ThemedText size="m" weight="medium">
        {label}
      </ThemedText>

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
