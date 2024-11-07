import Endpoints from '@/constants/Endpoints';
import WorkoutListPage from '@/pages/workouts/WorkoutListPage';

const ExplorePage = () => {
  return (
    <WorkoutListPage
      title="Explore Workouts"
      getAllWorkoutsEndpoint={Endpoints.workout.all.workouts}
      getAllWorkoutTagsEndpoint={Endpoints.workout.all.workoutTags}
    />
  );
};

export default ExplorePage;
