import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import Header from '@/components/navigation/Header';
import { useRouter, useSegments } from 'expo-router';
import Icons from '@/constants/Icons';
import { useEffect, useState } from 'react';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import fetchApi from '@/api/fetch';
import TagSelector from '@/components/workouts/TagSelector';
import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';

const ALL_USER_WORKOUT_ENDPOINT = '/user/workout/all';
const ALL_USER_WORKOUT_TAGS_ENDPOINT = '/user/workout/tag/all';

const CalendarWorkoutPickerPage = () => {
  const router = useRouter();

  const { updateSelectedWorkout } = useCreateCalendarEventContext();

  const onGoBack = () => {
    router.back();
  };

  const handleSelectItem = (item: Workout | null) => {
    if (item === null || item === undefined) {
      updateSelectedWorkout(null);
    } else {
      updateSelectedWorkout(item);
    }
    onGoBack();
  };

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
        `${ALL_USER_WORKOUT_ENDPOINT}${params}`,
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
      const response = await fetchApi(
        ALL_USER_WORKOUT_TAGS_ENDPOINT,
        'GET',
        null,
      );
      const data: WorkoutTagsRespone = await response.json();
      setTags(data.workout_tags);
      setAreTagsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    getAllWorkouts(selectedTags.map((tag) => tag.tag_id));
  };

  useEffect(() => {
    getAllWorkouts();
    getAllWorkoutTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <ThemedView style={styles.container}>
      <Header
        title={'Choose workout'}
        style={[styles.header]}
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={onGoBack}
      />
      <ThemedView style={styles.content}>
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
                handleSelectItem(item);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: -20,
    marginBottom: 0,
    paddingLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tagSelector: {
    marginVertical: 20,
  },
  workoutList: {
    gap: 10,
  },
});

export default CalendarWorkoutPickerPage;
