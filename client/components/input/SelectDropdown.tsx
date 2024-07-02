/* eslint-disable @typescript-eslint/no-explicit-any */
import { Colors } from '@/constants/Colors';
import { StyleSheet, View, useColorScheme } from 'react-native';
import ThemedText from '../ThemedText';
import useTheme from '@/hooks/useTheme';
import SelectDropdown from 'react-native-select-dropdown';
import ThemedView from '../ThemedView';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';

type TextInputProps = {
  label?: string;
  placeholder: string;
  renderItem: (item: any) => JSX.Element;
  onSelect: (value: any) => void;
  data: any[];
  selectedValue?: string;
};

const SelectDropdownInput = ({
  label,
  placeholder,
  renderItem,
  data,
  onSelect,
  selectedValue = '',
}: TextInputProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const primaryColor = Colors[colorScheme ?? 'light'].text;

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText size="m" weight="medium">
          {label}
        </ThemedText>
      )}
      <View>
        <SelectDropdown
          dropdownStyle={{ backgroundColor: theme.background }}
          data={data}
          onSelect={onSelect}
          renderButton={() => {
            return (
              <ThemedView
                style={[
                  styles.button,
                  {
                    borderColor: primaryColor,
                  },
                ]}
              >
                {}
                <ThemedText
                  size="m"
                  weight="semiBold"
                  color={!selectedValue ? '#545355' : undefined}
                >
                  {selectedValue || placeholder}
                </ThemedText>

                <Icon icon={Icons.arrowBottom} size={20} color={primaryColor} />
              </ThemedView>
            );
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default SelectDropdownInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
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
  },
});
