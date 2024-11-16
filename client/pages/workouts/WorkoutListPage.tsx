import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import TagSelector from '@/components/workouts/TagSelector';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import { useRouter, useSegments } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type WorkoutListProps = {
  title: string;
  getAllWorkoutsEndpoint: string;
  getAllWorkoutTagsEndpoint: string;
};

const WorkoutListPage = ({
  title,
  getAllWorkoutsEndpoint,
  getAllWorkoutTagsEndpoint,
}: WorkoutListProps) => {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const segments = useSegments();
  const isFocused = segments[segments.length - 1] === 'workouts';

  const getAllWorkouts = useCallback(
    async (tagIds: number[] | null = null) => {
      try {
        const params = tagIds !== null ? `?tagIds=${tagIds.join(',')}` : '';
        const response = await fetchApi(
          `${getAllWorkoutsEndpoint}${params}`,
          'GET',
        );
        const paginatedWorkouts: PaginatedResponse<Workout> =
          await response.json();
        setWorkouts(paginatedWorkouts.data);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    },
    [getAllWorkoutsEndpoint],
  );

  const getAllWorkoutTags = useCallback(async () => {
    try {
      const response = await fetchApi(getAllWorkoutTagsEndpoint, 'GET', null);
      const data: WorkoutTagsRespone = await response.json();
      setTags(data.workoutTags);
      setAreTagsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }, [getAllWorkoutTagsEndpoint]);

  useEffect(() => {
    getAllWorkouts();
    getAllWorkoutTags();
  }, [isFocused, getAllWorkouts, getAllWorkoutTags]);

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    getAllWorkouts(selectedTags.map((tag) => tag.tagId));
  };

  const handleAddWorkout = () => {
    router.navigate('/explore/add');
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title={title}
        rightIcon={Icons.circleAdd}
        rightIconSize={26}
        rightIconOnPress={handleAddWorkout}
      />
      <ThemedView style={[styles.content]}>
        {areTagsLoaded && (
          <TagSelector
            style={styles.tagSelector}
            tags={tags}
            onSelectionChange={handleTagSelectionChange}
          />
        )}
        <FlatList
          style={styles.workoutList}
          data={workouts}
          keyExtractor={(item) => item.workoutId.toString()}
          renderItem={({ item }) => (
            <WorkoutItem
              id={item.workoutId}
              name={item.name}
              level={item.workoutLevel}
              tags={item.workoutTags}
              onPress={() => {
                if (segments[segments.length - 1] === 'workouts') {
                  router.navigate(`/workouts/${item.workoutId}`);
                } else if (segments[segments.length - 1] === 'explore') {
                  router.navigate(`/explore/${item.workoutId}`);
                }
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListEmptyComponent={() =>
            isLoaded ? (
              <ThemedText>No workouts found...</ThemedText>
            ) : (
              <ActivityIndicator color={Colors.dark.primary} />
            )
          }
        />
      </ThemedView>
    </ThemedView>
  );
};

export default WorkoutListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tagSelector: {
    marginBottom: 20,
  },
  workoutList: {
    gap: 10,
  },
});
