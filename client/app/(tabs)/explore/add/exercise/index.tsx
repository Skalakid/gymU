import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import ExerciseListPage from '@/pages/exerciseList/ExerciseListPage';
import { useRouter } from 'expo-router';

const WorkoutExercisePickerPage = () => {
  const { updateSelectedExercise } = useCreateWorkoutContext();
  const router = useRouter();
  const handleSelectItem = (exercise: BasicExercise) => {
    updateSelectedExercise(exercise);
    router.navigate('/(tabs)/explore/add/exercise/details');
  };

  return <ExerciseListPage onItemSelected={handleSelectItem} />;
};

export default WorkoutExercisePickerPage;
