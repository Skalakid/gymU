import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import AddExerciseItemButton from '@/components/exercises/AddExerciseItemButton';
import DateTimeInput from '@/components/input/DateTimeInput';
import ThemedText from '@/components/ThemedText';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { StyleSheet, ScrollView } from 'react-native';
import RepeatInput from './RepeatInput';
import FinishAfterInput from './FinishAfterInput';

type AddToCalendarFormProps = { onWorkoutButtonPress: () => void };

const AddToCalendarForm = ({
  onWorkoutButtonPress,
}: AddToCalendarFormProps) => {
  const {
    selectedWorkout,
    selectedDate,
    selectedTime,
    selectedRepeatFrequency,
    selectedRepeatUnit,
    selectedRepeatCount,
    updateSeletedDate,
    updateSelectedTime,
    updateSelectedRepeatFrequency,
    updateSelectedRepeatUnit,
    updateSelectedRepeatCount,
  } = useCreateCalendarEventContext();

  return (
    <ScrollView style={[styles.container]}>
      <DateTimeInput
        label="Date"
        placeholder="Choose date"
        value={selectedDate}
        onValueChange={updateSeletedDate}
        type="date"
        style={styles.section}
      />

      <DateTimeInput
        dupa="enter"
        label="Time"
        placeholder="Choose time"
        value={selectedTime}
        onValueChange={updateSelectedTime}
        type="time"
        style={styles.section}
      />

      <RepeatInput
        value={selectedRepeatFrequency}
        unit={selectedRepeatUnit}
        onUnitChange={updateSelectedRepeatUnit}
        onValueChange={updateSelectedRepeatFrequency}
        style={styles.repeatInput}
      />

      <FinishAfterInput
        unit={selectedRepeatUnit}
        value={selectedRepeatCount}
        onValueChange={updateSelectedRepeatCount}
        style={styles.section}
        disabled={selectedRepeatFrequency === 0}
      />

      <ThemedText size="l" weight="semiBold">
        Choose training
      </ThemedText>

      {selectedWorkout === null ? (
        <AddExerciseItemButton onPress={onWorkoutButtonPress} />
      ) : (
        <WorkoutItem
          id={selectedWorkout.workout_id}
          name={selectedWorkout.name}
          level={selectedWorkout.workout_level}
          tags={selectedWorkout.workout_tags}
          onPress={onWorkoutButtonPress}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { rowGap: 20 },
  section: { flex: 1, marginBottom: 10 },
  repeatInput: { flex: 1, marginBottom: 20 },
});

export default AddToCalendarForm;
