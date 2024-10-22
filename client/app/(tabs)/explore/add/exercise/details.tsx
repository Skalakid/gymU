import ThemedText from '@/components/ThemedText';
import PrimaryButton from '@/components/button/PrimaryButton';
import ExerciseDetailsForm from '@/components/exercises/ExerciseDetailsForm';
import ExerciseDetailsInfo from '@/components/exercises/ExerciseDetailsInfo';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import useTheme from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const DetailsPage = () => {
  const { currentExercise, addExercise } = useCreateWorkoutContext();
  const router = useRouter();
  const theme = useTheme();
  const exerciseDetails = useRef<ExerciseDetails>({
    sets: null,
    reps: null,
    weight: null,
    time: null,
  });

  const handleAdd = () => {
    const detailedExercise: DetailedExerciseItem = {
      ...currentExercise.current!,
      value: exerciseDetails.current,
      description: currentExercise.current!.shortDescription,
    };

    addExercise(detailedExercise);
    router.navigate('/(tabs)/explore/add');
  };

  const handleFormUpdate = (details: ExerciseDetails) => {
    exerciseDetails.current = details;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.bar, { backgroundColor: theme.text }]} />
          </View>

          <ScrollView style={styles.scrollView}>
            <ThemedText
              size="xl"
              weight="semiBold"
              style={{ marginBottom: 20 }}
            >
              Exercise Details
            </ThemedText>

            <ExerciseDetailsInfo
              exerciseID={currentExercise.current!.exercise_id}
              style={{ marginBottom: 20 }}
            />

            <ExerciseDetailsForm
              type={currentExercise.current!.exercise_type}
              onFormUpdate={handleFormUpdate}
            />
          </ScrollView>

          <PrimaryButton value="Add" onPress={handleAdd} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  bar: {
    width: 64,
    height: 5,
    borderRadius: 5,
  },
  scrollView: {
    gap: 20,
  },
});
