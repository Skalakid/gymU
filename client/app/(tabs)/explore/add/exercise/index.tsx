import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import ExerciseListPage from '@/pages/exerciseList/ExerciseListPage';
import { useRouter } from 'expo-router';

const WorkoutExercisePickerPage = () => {
  const { updateCurrentExercise, selectedExercises } =
    useCreateWorkoutContext();
  const router = useRouter();
  const handleSelectItem = (exercise: BasicExercise) => {
    updateCurrentExercise({
      exercise_id: exercise.exercise_id,
      name: exercise.name,
      description: exercise.shortDescription,
      body_parts: exercise.body_parts,
      exercise_type: exercise.exercise_type,
      value: {
        sets: null,
        reps: null,
        weight: null,
        time: null,
        breakTime: null,
      },
      orderIndex: selectedExercises.length,
    });
    router.navigate('/(tabs)/explore/add/exercise/details');
  };

  return <ExerciseListPage onItemSelected={handleSelectItem} />;
};

export default WorkoutExercisePickerPage;
