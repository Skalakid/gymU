import AddExercisesForm from '@/components/workoutForm/AddExercisesForm';
import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import Images from '@/constants/Images';
import WorkoutModalPage from '@/pages/workouts/WorkoutModalPage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const AddWorkoutPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleGoBack = () => {
    if (currentStep === 0) {
      router.back();
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <WorkoutModalPage
      title="Add Workout"
      image={Images.add_workout_example_img}
      shouldFillFullHeight={currentStep > 0}
      onGoBack={handleGoBack}
    >
      {currentStep === 0 ? (
        <WorkoutForm onSubmit={handleNextStep} />
      ) : (
        <AddExercisesForm />
      )}
    </WorkoutModalPage>
  );
};

export default AddWorkoutPage;
