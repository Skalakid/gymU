import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import ThemedText from '../ThemedText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import { SizePresets, WeightPresets } from '@/constants/Typography';
import useTheme from '@/hooks/useTheme';
import { dateToTime } from '@/utils/date.utils';

type DateInputProps = {
  value?: Date | null;
  label?: string;
  style?: ViewStyle;
  placeholder?: string;
  onValueChange: (date: Date) => void;
  type: 'date' | 'time';
};

const DateTimeInput = ({
  value,
  label,
  placeholder,
  onValueChange,
  type = 'date',
  style,
}: DateInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useTheme();
  const primaryColor = theme.text;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onValueChange(date);
    hideDatePicker();
  };

  const displayedValue =
    value === null
      ? placeholder
      : type === 'date'
        ? value?.toDateString()
        : dateToTime(value!);

  return (
    <View style={style}>
      {label && (
        <ThemedText size="m" weight="medium">
          {label}
        </ThemedText>
      )}
      <TouchableOpacity
        onPress={showDatePicker}
        style={[
          styles.textInput,
          {
            borderColor: primaryColor,
            color: primaryColor,
          },
          SizePresets.m,
          WeightPresets.semiBold,
        ]}
      >
        <ThemedText>{displayedValue}</ThemedText>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={type}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

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

export default DateTimeInput;
