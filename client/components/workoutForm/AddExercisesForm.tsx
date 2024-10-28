import { FlatList, StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import AddExerciseItemButton from '../exercises/AddExerciseItemButton';
import { useRouter } from 'expo-router';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import PrimaryButton from '../button/PrimaryButton';
import DeleteAndEditSwipeable from '../common/swipeable/DeleteAndEditSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DetailedExerciseItem from '../exercises/DetailedExerciseItem';

const AddExercisesForm = () => {
  const { selectedExercises, removeExercise, updateCurrentExercise } =
    useCreateWorkoutContext();
  const router = useRouter();

  const handleExerciseAddButtonPress = () => {
    router.navigate('/explore/add/exercise');
  };

  const handleSaveWorkout = async () => {
    router.navigate('/explore/add/summary');
  };

  const handleRemoveExercise = (index: number) => {
    removeExercise(index);
  };

  const handleEditExercise = (index: number) => {
    updateCurrentExercise(selectedExercises[index]);
    router.push({
      pathname: '/explore/add/exercise/details',
      params: { type: 'edit' },
    });
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
          <GestureHandlerRootView>
            <FlatList
              style={styles.exerciseList}
              data={selectedExercises ?? []}
              renderItem={({ item, index }) => (
                <DeleteAndEditSwipeable
                  key={`${item.name} + ${index} + ${item.orderIndex}`}
                  rightActionContainerStyle={styles.actionContainerStyle}
                  leftActionContainerStyle={styles.actionContainerStyle}
                  rightThreshold={100}
                  leftThreshold={100}
                  style={styles.swipeableContainer}
                  onSwipeRight={() => handleRemoveExercise(index)}
                  onSwipeLeft={() => handleEditExercise(index)}
                >
                  <DetailedExerciseItem
                    name={item.name}
                    type={item.exercise_type}
                    bodyParts={item.body_parts}
                    description={item.description}
                    activeOpacity={1}
                    exerciseDetails={item.value}
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
          </GestureHandlerRootView>
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
