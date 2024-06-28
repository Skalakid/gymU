import WorkoutListPage from '@/pages/workouts/WorkoutListPage';

const UserWorkoutsPage = () => {
  return (
    <WorkoutListPage
      title="Your Workouts"
      getAllWorkoutsEndpoint="/user/workout/all"
      getAllWorkoutTagsEndpoint="/user/workout/tag/all"
    />
  );
};

export default UserWorkoutsPage;
