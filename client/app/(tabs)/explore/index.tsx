import WorkoutListPage from '@/pages/workouts/WorkoutListPage';

const ExplorePage = () => {
  return (
    <WorkoutListPage
      title="Explore Workouts"
      getAllWorkoutsEndpoint="/workout/all"
      getAllWorkoutTagsEndpoint="/workout/tag/all"
    />
  );
};

export default ExplorePage;
