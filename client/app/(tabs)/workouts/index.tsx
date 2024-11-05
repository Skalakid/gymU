import Endpoints from '@/constants/Endpoints';
import WorkoutListPage from '@/pages/workouts/WorkoutListPage';

const UserWorkoutsPage = () => {
  return (
    <WorkoutListPage
      title="Your Workouts"
      getAllWorkoutsEndpoint={Endpoints.user.all.workouts}
      getAllWorkoutTagsEndpoint={Endpoints.user.all.workoutTags}
    />
  );
};

export default UserWorkoutsPage;
