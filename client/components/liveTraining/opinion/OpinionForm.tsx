import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icons from '@/constants/Icons';
import OpinionIconButton from './OpinionIconButton';

type WorkoutOpinionFormProps = {
  onSelection: (value: number) => void;
  style?: ViewStyle;
  value?: number | null;
};

const formData = [
  {
    icon: Icons.emojiTired,
    label: 'Terrible',
    value: -1,
    color: '#ff9176',
  },
  {
    icon: Icons.emojiSmile,
    label: 'OK',
    value: 0,
    color: '#feda5d',
  },
  {
    icon: Icons.emojiLaugh,
    label: 'Fantastic',
    value: 1,
    color: '#b8e082',
  },
];

const OpinionForm = ({
  onSelection,
  style,
  value,
}: WorkoutOpinionFormProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    onSelection(formData[index].value);
  };

  useEffect(() => {
    setSelectedIndex(
      value !== null && value !== undefined
        ? formData.findIndex((item) => item.value === value)
        : null,
    );
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      {formData.map((data, index) => (
        <OpinionIconButton
          key={index}
          icon={data.icon}
          label={data.label}
          onPress={() => handleSelection(index)}
          selected={selectedIndex === index}
          color={data.color}
        />
      ))}
    </View>
  );
};

export default OpinionForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
