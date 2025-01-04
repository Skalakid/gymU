import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import Icon, { IconType } from '../common/Icon';
import ThemedText from '../ThemedText';
import NumericValueInput from './NumericValueInput';

type RowTextInputProps = {
  value?: number;
  placeholder?: string;
  placeholderValue?: number;
  onChageText: (text: number) => void;
  style?: ViewStyle;
  icon?: IconType;
  label: string;
  minValue?: number;
  maxValue?: number;
};

const RowTextInput = ({
  value,
  placeholder,
  placeholderValue,
  onChageText,
  icon,
  label,
  style,
  minValue,
  maxValue,
}: RowTextInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.label}>
        {icon && <Icon icon={icon} size={24} />}
        {label && (
          <ThemedText size="l" weight="semiBold">
            {label}
          </ThemedText>
        )}
      </View>
      <NumericValueInput
        value={value}
        onValueChange={(value) => onChageText(value)}
        style={{ flex: 1 }}
        minValue={minValue}
        maxValue={maxValue}
        placeholder={placeholder}
        placeholderValue={placeholderValue}
      />
    </View>
  );
};

export default RowTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flexDirection: 'row',
    gap: 8,
    width: 128,
    alignItems: 'center',
  },
});
