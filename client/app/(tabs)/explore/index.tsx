import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Tile from '@/components/common/Tile';
import Header from '@/components/navigation/Header';
import WorkoutForm from '@/components/workoutForm/WorkoutForm';
import TagSelector from '@/components/workouts/TagSelector';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type WorkoutTagsRespone = {
  workout_tags: WorkoutType[];
};

const ExplorePage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);

  const getAllWorkouts = async (tagIds: number[] | null = null) => {
    try {
      const params = tagIds !== null ? `?tag_ids=${tagIds.join(',')}` : '';
      const response = await fetchApi(`/workout/all${params}`, 'GET');
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
      const response = await fetchApi('/workout/tag/all', 'GET', null);
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
  }, []);

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    getAllWorkouts(selectedTags.map((tag) => tag.tag_id));
  };

  return (
    <ThemedView style={styles.container}>
      <Header
        title="Explore workouts"
        rightIcon={Icons.circleAdd}
        rightIconSize={26}
        rightIconOnPress={() => setShowWorkoutForm(true)}
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

        {/* TODO: Create separate screen instead of `Modal` */}
        <Modal
          animationType="slide"
          visible={showWorkoutForm}
          transparent={true}
        >
          <WorkoutForm closeForm={() => setShowWorkoutForm((prev) => !prev)} />
        </Modal>
      </ThemedView>
    </ThemedView>
  );
};

export default ExplorePage;

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
