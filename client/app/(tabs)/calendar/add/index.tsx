import PrimaryButton from '@/components/button/PrimaryButton';
import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import AddToCalendarForm from '@/pages/calendar/AddToCalendarForm';
import WorkoutModalPage from '@/pages/workouts/WorkoutModalPage';
import { useRouter } from 'expo-router';

const AddToCalendarPage = () => {
  const router = useRouter();

  const { areAllCalendarFieldsSelected, saveCalendarEvent } =
    useCreateCalendarEventContext();

  const handleWorkoutButtonPress = () => {
    router.navigate('/calendar/add/workout');
  };

  const handleSubmit = async () => {
    const isSaveSucced = await saveCalendarEvent();
    if (isSaveSucced) {
      router.back();
    }
  };

  return (
    <WorkoutModalPage title="Add to calendar" shouldFillFullHeight={true}>
      <AddToCalendarForm onWorkoutButtonPress={handleWorkoutButtonPress} />
      <PrimaryButton
        value="Add"
        onPress={handleSubmit}
        disabled={!areAllCalendarFieldsSelected()}
      />
    </WorkoutModalPage>
  );
};

export default AddToCalendarPage;
