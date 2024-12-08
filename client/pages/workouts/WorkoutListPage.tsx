import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import Header from '@/components/navigation/Header';
import TagSelector from '@/components/workouts/TagSelector';
import WorkoutItem from '@/components/workouts/WorkoutItem';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import usePagination from '@/hooks/usePagination';
import { useRouter, useSegments } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [areTagsLoaded, setAreTagsLoaded] = useState(false);
  const [tags, setTags] = useState<WorkoutType[]>([]);
  const segments = useSegments();
  const isFocused = segments[segments.length - 1] === 'workouts';

  const { data, loadMore, handleRefresh, initialLoader, refreshing } =
    usePagination(getAllWorkoutsEndpoint);

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
    getAllWorkoutTags();
  }, [isFocused, getAllWorkoutTags]);

  const handleTagSelectionChange = (selectedTags: WorkoutType[]) => {
    const tagIds = selectedTags.map((tag) => tag.tagId);
    handleRefresh(`tagIds=${tagIds.join(',')}`);
  };

  const handleAddWorkout = () => {
    router.navigate('/explore/add');
  };

  const workoutFlatList = useMemo(
    () => (
      <FlatList
        style={styles.workoutList}
        data={data}
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    ),
    [data, loadMore, router, segments],
  );

  const renderContent = () => {
    if (initialLoader || refreshing) {
      return <ActivityIndicator color={Colors.dark.primary} />;
    }

    if (data.length === 0) {
      return <ThemedText>No workouts found...</ThemedText>;
    }

    return workoutFlatList;
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

        {renderContent()}
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
