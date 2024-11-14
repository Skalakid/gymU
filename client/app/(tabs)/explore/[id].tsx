import fetchApi from '@/api/fetch';
import Icons from '@/constants/Icons';
import WorkoutDetailsPage from '@/pages/workouts/workoutDetails/WorkoutDetailsPage';
import { useState } from 'react';

const WorkoutDetails = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleWorkoutDetailsChange = (workoutDetails: Workout) => {
    setIsSaved(workoutDetails?.isSavedByUser ?? false);
  };

  const handleSaveWorkout = async (workoutDetails: Workout) => {
    if (!workoutDetails || workoutDetails?.isSavedByUser) {
      return;
    }
    await fetchApi(`/user/workout/save`, 'POST', null, {
      workoutId: workoutDetails.workoutId,
    });
    setIsSaved(true);
  };

  return (
    <WorkoutDetailsPage
      onWorkoutDetailsChange={handleWorkoutDetailsChange}
      onRightIconPress={handleSaveWorkout}
      rightIcon={isSaved ? Icons.check : Icons.save}
    />
  );
};

export default WorkoutDetails;
