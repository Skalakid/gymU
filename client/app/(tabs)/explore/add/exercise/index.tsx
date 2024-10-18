import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import ExerciseListPage from '@/pages/exerciseList/ExerciseListPage';

const WorkoutExercisePickerPage = () => {
  const { addExercise } = useCreateWorkoutContext();

  return <ExerciseListPage onItemSelected={addExercise} />;
};

export default WorkoutExercisePickerPage;
