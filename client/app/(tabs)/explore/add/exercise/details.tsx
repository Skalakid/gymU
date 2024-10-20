import ThemedText from '@/components/ThemedText';
import PrimaryButton from '@/components/button/PrimaryButton';
import ExerciseDetailsForm from '@/components/exercises/ExerciseDetailsForm';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import useTheme from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Fragment } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      style={{ flex: 1 }}
    >
      <Fragment>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView
          style={[styles.mainSafeArea, { backgroundColor: theme.background }]}
        >
          <View
            style={[styles.container, { backgroundColor: theme.background }]}
          >
            <View style={styles.header}>
              <View style={[styles.bar, { backgroundColor: theme.text }]} />
            </View>

            <View style={styles.content}>
              <ThemedText size="xl" weight="semiBold">
                Exercise Details
              </ThemedText>

              <ExerciseDetailsForm
                type={selectedExercise.current!.exercise_type}
              />

              <PrimaryButton value="Add" onPress={handleAdd} />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    </KeyboardAvoidingView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flex: 1,
  },
  mainSafeArea: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    paddingTop: -40,
  },
  container: {
    height: 300,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  bar: {
    width: 64,
    height: 5,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
    gap: 20,
  },
});
