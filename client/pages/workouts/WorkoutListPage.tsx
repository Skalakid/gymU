import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import TagSelector from '@/components/workouts/TagSelector';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import { useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type WorkoutListProps = {
  title: string;
  getAllWorkoutsEndpoint: string;
  getAllWorkoutTagsEndpoint: string;
};

type WorkoutTagsRespone = {
  workout_tags: WorkoutType[];
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

  const getAllWorkouts = async (tagIds: number[] | null = null) => {
    try {
      const params = tagIds !== null ? `?tag_ids=${tagIds.join(',')}` : '';
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
  };

  const getAllWorkoutTags = async () => {
    try {
      const response = await fetchApi(getAllWorkoutTagsEndpoint, 'GET', null);
      const data: WorkoutTagsRespone = await response.json();
      setTags(data.workout_tags);
      setAreTagsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllWorkouts();
    getAllWorkoutTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    getAllWorkouts(selectedTags.map((tag) => tag.tag_id));
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
          keyExtractor={(item) => item.workout_id.toString()}
          renderItem={({ item }) => (
            <WorkoutItem
              id={item.workout_id}
              name={item.name}
              level={item.workout_level}
              tags={item.workout_tags}
              onPress={() => {
                router.navigate(
                  `/${segments[segments.length - 1]}/${item.workout_id}`,
                );
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
