import ThemedText from '@/components/ThemedText';
import ExerciseDetailsForm from '@/components/exercises/ExerciseDetailsForm';
import ExerciseDetailsInfo from '@/components/exercises/ExerciseDetailsInfo';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import useTheme from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const DetailsPage = () => {
  const { selectedExercise, addExercise } = useCreateWorkoutContext();
  const router = useRouter();
  const theme = useTheme();

  const handleAdd = () => {
    addExercise(selectedExercise.current!);
    router.navigate('/(tabs)/explore/add');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, marginTop: 40 }}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <View style={[styles.bar, { backgroundColor: theme.text }]} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <ThemedText size="xl" weight="semiBold">
              Exercise Details
            </ThemedText>

            <ExerciseDetailsInfo
              exerciseID={selectedExercise.current!.exercise_id}
            />

            <ExerciseDetailsForm
              type={selectedExercise.current!.exercise_type}
              onSubmit={handleAdd}
            />
          </View>
        </ScrollView>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 20,
    gap: 20,
  },
});
