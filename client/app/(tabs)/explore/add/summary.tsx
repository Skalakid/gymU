import { StyleSheet } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useRouter } from 'expo-router';
import GeneralInfoSummary from '@/components/workouts/addNewWorkout/summary/GeneralInfoSummary';
import ExerciseSummary from '@/components/workouts/addNewWorkout/summary/ExerciseSummary';

const SummaryPage = () => {
  const { saveWorkout, selectedExercises, workoutGeneralInfo } =
    useCreateWorkoutContext();
  const router = useRouter();

  const handleSaveWorkout = async () => {
    const success = await saveWorkout();
    if (success) {
      router.navigate('/explore');
    }
  };

  return (
    <PageWithGoBackHeader title="Workout Summary">
      <ThemedText style={{ marginBottom: 10 }} weight="medium">
        Exercises
      </ThemedText>

      <GeneralInfoSummary workoutGeneralInfo={workoutGeneralInfo} />
      <ExerciseSummary exercises={selectedExercises} />

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
  spearator: {
    marginBottom: 20,
  },
});
