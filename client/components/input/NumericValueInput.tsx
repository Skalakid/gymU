import { Colors } from '@/constants/Colors';
import { SizePresets, WeightPresets } from '@/constants/Typography';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import ThemedText from '../ThemedText';
import IconButton from '../button/IconButton';
import Icons from '@/constants/Icons';

type TextInputProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  label?: string;
  style?: ViewStyle;
};

const NumericValueInput = ({
  value,
  onValueChange,
  label,
  style,
}: TextInputProps) => {
  const colorScheme = useColorScheme();
  const primaryColor = Colors[colorScheme ?? 'light'].text;

  const handleValueChange = (text: string) => {
    const numericValue = text === '-' ? 0 : Number(text);
    if (isNaN(numericValue)) {
      return;
    }
    onValueChange?.(numericValue);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <ThemedText size="m" weight="medium">
          {label}
        </ThemedText>
      )}

      <View
        style={[
          styles.textInputConatiner,
          {
            borderColor: primaryColor,
          },
        ]}
      >
        <IconButton
          icon={Icons.minus}
          onPress={() => handleValueChange(`${Number(value) - 1}`)}
          style={styles.button}
        />
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
          value={`${value}`}
          onChangeText={handleValueChange}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <IconButton
          icon={Icons.plus}
          onPress={() => handleValueChange(`${Number(value) + 1}`)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default NumericValueInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
  },
  textInputConatiner: {
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    padding: 16,
    fontFamily: 'Poppins',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    width: 64,
  },
});
