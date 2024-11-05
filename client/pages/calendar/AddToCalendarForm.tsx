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
    selectedRepeats,
    selectedRepeatsUnit,
    selectedRepetitions,
    updateSeletedDate,
    updateSelectedTime,
    updateSelectedRepeats,
    updateSelectedRepeatsUnit,
    updateSelectedRepetitions,
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
        label="Time"
        placeholder="Choose time"
        value={selectedTime}
        onValueChange={updateSelectedTime}
        type="time"
        style={styles.section}
      />

      <RepeatInput
        value={selectedRepeats}
        unit={selectedRepeatsUnit}
        onUnitChange={updateSelectedRepeatsUnit}
        onValueChange={updateSelectedRepeats}
        style={styles.repeatInput}
      />

      <FinishAfterInput
        unit={selectedRepeatsUnit}
        value={selectedRepetitions}
        onValueChange={updateSelectedRepetitions}
        style={styles.section}
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
