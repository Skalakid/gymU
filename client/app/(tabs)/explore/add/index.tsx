import AddExercisesForm from '@/components/workoutForm/AddExercisesForm';
import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import Images from '@/constants/Images';
import WorkoutModalPage from '@/pages/workouts/WorkoutModalPage';
import { useState } from 'react';

const AddWorkoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <WorkoutModalPage
      title="Add Workout"
      image={Images.add_workout_example_img}
      shouldFillFullHeight={currentStep > 0}
    >
      {currentStep === 0 ? <WorkoutForm /> : <AddExercisesForm />}
    </WorkoutModalPage>
  );
};

export default AddWorkoutPage;
