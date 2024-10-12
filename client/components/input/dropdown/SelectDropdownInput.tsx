/* eslint-disable @typescript-eslint/no-explicit-any */
import { Colors } from '@/constants/Colors';
import { StyleSheet, View, useColorScheme } from 'react-native';
import ThemedText from '../../ThemedText';
import useTheme from '@/hooks/useTheme';
import SelectDropdown from 'react-native-select-dropdown';
import ThemedView from '../../ThemedView';
import Icon, { IconType } from '../../common/Icon';
import Icons from '@/constants/Icons';
import { useState } from 'react';

type SelectDropdownInputProps = {
  label?: string;
  placeholder: string;
  renderItem: (item: any) => JSX.Element;
  onSelect: (value: any) => void;
  data: any[];
  selectedValue?: string;
  icon?: IconType;
  iconColor?: string;
  iconSize?: number;
};

const SelectDropdownInput = ({
  label,
  placeholder,
  renderItem,
  data,
  onSelect,
  selectedValue = '',
  icon,
  iconColor,
  iconSize = 26,
}: SelectDropdownInputProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const primaryColor = Colors[colorScheme ?? 'light'].text;
  const [isActive, setIsActive] = useState(false);

  const renderButton = () => {
    return (
      <ThemedView
        style={[
          styles.button,
          {
            borderColor: primaryColor,
          },
        ]}
      >
        <ThemedText
          size="m"
          weight="semiBold"
          color={!selectedValue ? '#545355' : undefined}
        >
          {selectedValue || placeholder}
        </ThemedText>
        <Icon
          icon={isActive ? Icons.arrowTop : Icons.arrowBottom}
          size={20}
          color={primaryColor}
        />
      </ThemedView>
    );
  };

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText size="m" weight="medium">
          {label}
        </ThemedText>
      )}
      <View style={styles.selectWrapper}>
        {icon && <Icon icon={icon} size={iconSize} color={iconColor} />}
        <SelectDropdown
          dropdownStyle={{
            ...styles.dropdownMenuStyle,
            backgroundColor: theme.background,
          }}
          data={data}
          onSelect={onSelect}
          renderButton={renderButton}
          renderItem={renderItem}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </View>
    </View>
  );
};

export default SelectDropdownInput;
export type { SelectDropdownInputProps };

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: 'Poppins',
  },
  button: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: 'Poppins',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  dropdownMenuStyle: {
    height: 180,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
