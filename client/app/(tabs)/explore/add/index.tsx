import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import Images from '@/constants/Images';
import WorkoutModalPage from '@/pages/workouts/WorkoutModalPage';

const AddWorkoutPage = () => {
  return (
    <WorkoutModalPage
      title="Add Workout"
      image={Images.add_workout_example_img}
    >
      <WorkoutForm />
    </WorkoutModalPage>
  );
};

export default AddWorkoutPage;
