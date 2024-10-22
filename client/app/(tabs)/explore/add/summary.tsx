import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import TextInput from '@/components/input/TextInput';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import SelectDropdownInput from '@/components/input/dropdown/SelectDropdownInput';
import { capitalize } from '@/utils/text.utils';
import { difficulties } from '@/components/workoutForm/WorkoutForm';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import SelectDropdownItem from '@/components/input/dropdown/SelectDropdownItem';
import Icon from '@/components/common/Icon';
import PrimaryButton from '@/components/button/PrimaryButton';
import DetailedExerciseItem from '@/components/exercises/DetailedExerciseItem';
import { useRouter } from 'expo-router';

const SummaryPage = () => {
  const { saveWorkout, workoutGeneralInfo, selectedExercises } =
    useCreateWorkoutContext();
  const router = useRouter();
  const theme = useTheme();

  const handleSaveWorkout = async () => {
    const success = await saveWorkout();
    if (success) {
      router.navigate('/explore');
    }
  };

  const renderItem = (value: string) => {
    return (
      <>
        <SelectDropdownItem value={capitalize(value)} />
      </>
    );
  };

  return (
    <PageWithGoBackHeader title="Workout Summary">
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

      <ThemedText style={{ marginBottom: 10 }} weight="medium">
        Exercises
      </ThemedText>
      <FlatList
        style={styles.exerciseList}
        data={selectedExercises ?? []}
        renderItem={({ item, index }) => (
          <DetailedExerciseItem
            key={`summary${item.name}${index}${item.orderIndex}`}
            name={item.name}
            type={item.exercise_type}
            bodyParts={item.body_parts}
            description={item.description}
            activeOpacity={1}
            exerciseDetails={item.value}
            style={styles.spearator}
          />
        )}
      />

      <PrimaryButton
        value="Save Workout"
        onPress={handleSaveWorkout}
        style={styles.spearator}
      />
    </PageWithGoBackHeader>
  );
};

export default SummaryPage;

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
  exerciseList: {
    flex: 1,
  },
  spearator: {
    marginBottom: 20,
  },
});
