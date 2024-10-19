import { Alert, FlatList, StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import { useState } from 'react';
import AddExerciseItemButton from '../exercises/AddExerciseItemButton';
import { useRouter } from 'expo-router';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import BasicExerciseItem from '../exercises/BasicExerciseItem';
import PrimaryButton from '../button/PrimaryButton';
import DeleteAndEditSwipeable from '../common/swipeable/DeleteAndEditSwipeable';

const AddExercisesForm = () => {
  const {
    selectedExercises,
    workoutGeneralInfo,
    clearExercises,
    updateWorkoutGeneralInfo,
  } = useCreateWorkoutContext();
  const router = useRouter();

  const handleExerciseAddButtonPress = () => {
    router.navigate('/explore/add/exercise');
  };

  const handleSaveWorkout = async () => {
    if (selectedExercises.length === 0) {
      Alert.alert('Please add exercises to your workout');
      return;
    }

    if (!workoutGeneralInfo) {
      Alert.alert('Please fill the workout general info');
      return;
    }

    // const reponse = await fetchApi(
    //   '/workout/create',
    //   'POST',
    //   null,
    //   {
    //     name: workoutGeneralInfo.name,
    //     description: workoutGeneralInfo.description,
    //     is_private: workoutGeneralInfo.isPrivate,
    //     workout_level_id: workoutGeneralInfo.dificultyLevel,
    //     tag_ids: workoutGeneralInfo.tagsIds,
    //     exercises: [],
    //   },
    //   true,
    // );
    // if (reponse.ok) {
    //   router.navigate('/explore');
    // } else {
    //   Alert.alert('Something went wrong...');
    // }

    clearExercises();
    updateWorkoutGeneralInfo(null);
    router.navigate('/explore');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText weight="semiBold" size="l">
          Choose exercises
        </ThemedText>
      </View>

      <View style={styles.content}>
        {selectedExercises && (
          <FlatList
            style={styles.exerciseList}
            data={selectedExercises ?? []}
            renderItem={({ item }) => (
              <DeleteAndEditSwipeable
                rightActionContainerStyle={styles.actionContainerStyle}
                leftActionContainerStyle={styles.actionContainerStyle}
                rightThreshold={100}
                style={styles.swipeableContainer}
              >
                <BasicExerciseItem
                  name={item.name}
                  type={item.exercise_type}
                  bodyParts={item.body_parts}
                  description={item.shortDescription}
                  activeOpacity={1}
                />
              </DeleteAndEditSwipeable>
            )}
            ListEmptyComponent={() => (
              <ThemedText size="s" style={styles.infoText}>
                Let's cook the perfect workout plan! 🔥
              </ThemedText>
            )}
            ListFooterComponent={() => (
              <AddExerciseItemButton
                style={styles.addExerciseItemButton}
                onPress={handleExerciseAddButtonPress}
              />
            )}
          />
        )}
      </View>
      <PrimaryButton onPress={handleSaveWorkout} value="Save workout" />
    </View>
  );
};

export default AddExercisesForm;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeCounter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  addExerciseItemButton: {
    width: '100%',
  },
  exerciseList: {
    marginBottom: 20,
  },
  actionContainerStyle: {
    borderRadius: 15,
  },
  swipeableContainer: {
    marginBottom: 20,
  },
});
