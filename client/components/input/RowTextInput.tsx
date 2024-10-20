import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import Icon, { IconType } from '../common/Icon';
import ThemedText from '../ThemedText';
import NumericValueInput from './NumericValueInput';

type RowTextInputProps = {
  value: number;
  onChageText: (text: string) => void;
  style?: ViewStyle;
  icon?: IconType;
  label: string;
};

const RowTextInput = ({
  value,
  onChageText,
  icon,
  label,
  style,
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
        onValueChange={(value) => onChageText(value.toString())}
        style={{ flex: 1 }}
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
