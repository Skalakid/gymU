import Icons from '@/constants/Icons';
import WorkoutDetailsPage from '@/pages/workouts/workoutDetails/WorkoutDetailsPage';
import { useRouter } from 'expo-router';

const UserWorkoutDetails = () => {
  const router = useRouter();

  const handleRightIconPress = () => {
    router.push('/(live_training)');
  };

  return (
    <WorkoutDetailsPage
      rightIcon={Icons.play}
      onRightIconPress={handleRightIconPress}
    />
  );
};

export default UserWorkoutDetails;
