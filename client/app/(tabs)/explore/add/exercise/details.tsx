import ThemedText from '@/components/ThemedText';
import ModalBar from '@/components/common/ModalBar';
import ExerciseDetailsForm from '@/components/exercises/ExerciseDetailsForm';
import ExerciseDetailsInfo from '@/components/exercises/ExerciseDetailsInfo';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import useTheme from '@/hooks/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const { type } = useLocalSearchParams();
  const { currentExercise, addExercise, updateExercise } =
    useCreateWorkoutContext();
  const router = useRouter();
  const theme = useTheme();
  const exerciseDetails = useRef<ExerciseDetails>({
    sets: null,
    reps: null,
    weight: null,
    time: null,
  });

  const handleAdd = () => {
    if (!currentExercise.current) {
      return;
    }

    const detailedExercise: DetailedExerciseItem = {
      ...currentExercise.current,
      value: exerciseDetails.current,
    };

    if (type === 'edit') {
      updateExercise(currentExercise.current.orderIndex, detailedExercise);
    } else {
      addExercise(detailedExercise);
    }

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
          <ModalBar />

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <ThemedText
              size="xl"
              weight="semiBold"
              style={{ marginBottom: 20 }}
            >
              Exercise Details
            </ThemedText>

            <ExerciseDetailsInfo
              exerciseID={currentExercise.current!.exerciseId}
              style={{ marginBottom: 20 }}
            />

            <ExerciseDetailsForm
              type={currentExercise.current!.exerciseType}
              onFormUpdate={handleFormUpdate}
              defaultSets={currentExercise.current!.value.sets || 3}
              defaultReps={currentExercise.current!.value.reps || 10}
              defaultWeight={currentExercise.current!.value.weight || 30}
              defaultTime={currentExercise.current!.value.time || 60}
              defaultBreakTime={currentExercise.current!.value.breakTime || 60}
              onSubmit={handleAdd}
            />
          </ScrollView>
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
  scrollView: {
    gap: 20,
  },
});
