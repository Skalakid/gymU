import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import AddExerciseItemButton from '@/components/exercises/AddExerciseItemButton';
import DateTimeInput from '@/components/input/DateTimeInput';
import ThemedText from '@/components/ThemedText';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { StyleSheet, ScrollView } from 'react-native';
import RepeatInput from './RepeatInput';

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
    updateSeletedDate,
    updateSelectedTime,
    updateSelectedRepeats,
    updateSelectedRepeatsUnit,
  } = useCreateCalendarEventContext();

  return (
    <ScrollView style={pageStyles.container}>
      <DateTimeInput
        label="Date"
        placeholder="Choose date"
        value={selectedDate}
        onValueChange={updateSeletedDate}
        type="date"
      />

      <DateTimeInput
        label="Time"
        placeholder="Choose time"
        value={selectedTime}
        onValueChange={updateSelectedTime}
        type="time"
      />

      <ThemedText size="l" weight="semiBold">
        Repeat every:
      </ThemedText>

      <RepeatInput
        value={selectedRepeats}
        unit={selectedRepeatsUnit}
        onUnitChange={updateSelectedRepeatsUnit}
        onValueChange={updateSelectedRepeats}
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

const pageStyles = StyleSheet.create({
  container: {},
});

export default AddToCalendarForm;
