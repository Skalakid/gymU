import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import TextInput from '@/components/input/TextInput';
import SelectDropdownInput from '@/components/input/dropdown/SelectDropdownInput';
import Icon from '@/components/common/Icon';
import SelectDropdownItem from '@/components/input/dropdown/SelectDropdownItem';
import { capitalize } from '@/utils/text.utils';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import { useWorkoutContext } from '@/contexts/WorkoutContext';

type GeneralInfoSummaryProps = {
  workoutGeneralInfo: WorkoutGeneralInfo | null;
};

const GeneralInfoSummary = ({
  workoutGeneralInfo,
}: GeneralInfoSummaryProps) => {
  const { difficulties } = useWorkoutContext();
  const theme = useTheme();

  const renderItem = (value: string) => {
    return (
      <>
        <SelectDropdownItem value={capitalize(value)} />
      </>
    );
  };

  return (
    <View style={styles.content}>
      <ThemedText size="xl" weight="semiBold">
        General info
      </ThemedText>
      <View style={styles.textInputs}>
        <TextInput
          label="Workout name"
          value={workoutGeneralInfo?.name}
          disabled
        />

        <TextInput
          label="Description"
          value={workoutGeneralInfo?.description}
          disabled
        />
      </View>

      <SelectDropdownInput
        data={difficulties}
        renderItem={(item) => renderItem(item.label)}
        placeholder="Select difficulty level..."
        selectedValue={capitalize(workoutGeneralInfo?.dificulty.label || '')}
        icon={Icons.flame}
        iconColor={theme.subTile}
        disabled
      />

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <Icon icon={Icons.hashtag} size={26} color={theme.subTile} />
        <FlatList
          style={styles.list}
          data={workoutGeneralInfo?.tags}
          renderItem={({ item, index }) => (
            <View
              style={[styles.tag, { backgroundColor: theme.secondary }]}
              key={`tag${index}`}
            >
              <ThemedText>{item.name}</ThemedText>
            </View>
          )}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default GeneralInfoSummary;

const styles = StyleSheet.create({
  content: {
    gap: 10,
    marginBottom: 20,
  },
  textInputs: {
    marginBottom: 10,
    gap: 10,
  },
  tag: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    padding: 5,
    borderRadius: 10,
  },
  list: {
    width: '100%',
  },
});
