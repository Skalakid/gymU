import PrimaryButton from '@/components/button/PrimaryButton';
import AddToCalendarForm from '@/pages/calendar/AddToCalendarForm';
import WorkoutModalPage from '@/pages/workouts/WorkoutModalPage';
import { useRouter } from 'expo-router';

const AddToCalendarPage = () => {
  const router = useRouter();

  const handleWorkoutButtonPress = () => {
    router.navigate('/calendar/add/workout');
  };

  return (
    <WorkoutModalPage title="Add to calendar" shouldFillFullHeight={true}>
      <AddToCalendarForm onWorkoutButtonPress={handleWorkoutButtonPress} />
      <PrimaryButton
        value="Add"
        onPress={() => {
          // eslint-disable-next-line no-console
          console.log('TODO: Connect with proper endpoint');
        }}
      />
    </WorkoutModalPage>
  );
};

export default AddToCalendarPage;
