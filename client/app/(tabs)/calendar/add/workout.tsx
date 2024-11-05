import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Header from '@/components/navigation/Header';
import { useRouter, useSegments } from 'expo-router';
import Icons from '@/constants/Icons';
import { useCallback, useEffect, useState } from 'react';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import fetchApi from '@/api/fetch';
import TagSelector from '@/components/workouts/TagSelector';
import { useCreateCalendarEventContext } from '@/contexts/CreateCalendarEventContext';
import Endpoints from '@/constants/Endpoints';

const CalendarWorkoutPickerPage = () => {
  const router = useRouter();

  const { updateSelectedWorkout } = useCreateCalendarEventContext();

  const onGoBack = () => {
    router.back();
  };

  const handleSelectItem = (item: Workout | null) => {
    updateSelectedWorkout(item ?? null);
    onGoBack();
  };

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const segments = useSegments();
  const isFocused = segments[segments.length - 1] === 'workouts';

  const getAllWorkouts = useCallback(async (tagIds: number[] | null = null) => {
    try {
      const params = tagIds !== null ? `?tag_ids=${tagIds.join(',')}` : '';
      const response = await fetchApi(
        `${Endpoints.user.all.workouts}${params}`,
        'GET',
      );

      if (!response.ok) {
        throw new Error(
          `Unable to load workouts, received code:${response.status}`,
        );
      }

      const paginatedWorkouts: PaginatedResponse<Workout> =
        await response.json();
      setWorkouts(paginatedWorkouts.data);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
      Alert.alert((error as Error).message);
    }
  }, []);

  const getAllWorkoutTags = useCallback(async () => {
    try {
      const response = await fetchApi(
        Endpoints.user.all.workoutTags,
        'GET',
        null,
      );

      if (!response.ok) {
        throw new Error(
          `Unable to load workout tags, received code:${response.status}`,
        );
      }

      const data: WorkoutTagsRespone = await response.json();
      setTags(data.workout_tags);
      setAreTagsLoaded(true);
    } catch (error) {
      console.error(error);
      Alert.alert((error as Error).message);
    }
  }, []);

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    getAllWorkouts(selectedTags.map((tag) => tag.tag_id));
  };

  useEffect(() => {
    getAllWorkouts();
    getAllWorkoutTags();
  }, [isFocused, getAllWorkouts, getAllWorkoutTags]);

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
