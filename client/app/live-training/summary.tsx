import { Alert, FlatList, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ThemedText from '@/components/ThemedText';
import WorkoutOpinionForm from '@/components/liveTraining/opinion/OpinionForm';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useLiveTrainingContext } from '@/contexts/LiveTrainingContext';
import DetailedExerciseItem from '@/components/exercises/DetailedExerciseItem';
import { useRouter } from 'expo-router';

const LiveTrainingSummaryPage = () => {
  const router = useRouter();
  const { currentWorkout, saveWorkoutLog, resetTraining } =
    useLiveTrainingContext();
  const [opinionValue, setOpinionValue] = useState<number | null>(null);

  const handleOpinionSelection = (value: number) => {
    setOpinionValue(value);
  };

  const handleSubmit = () => {
    try {
      if (!currentWorkout) {
        Alert.alert('No workout found');
      }

      if (opinionValue === null) {
        Alert.alert('Please rate your workout');
        return;
      }

      saveWorkoutLog(opinionValue ?? 0);
      Alert.alert('Success', 'Workout log saved successfully');
      resetTraining();
      router.dismissAll();
      router.replace('/home');
    } catch (error) {
      Alert.alert('Failed to save workout log', 'Please try again later');
    }
  };

  return (
    <PageWithGoBackHeader
      title="Training Summary"
      headerStyle={{ paddingBottom: 5 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText size="l" weight="semiBold">
            Congratulations! 🥳
          </ThemedText>

          <View style={styles.opinionForm}>
            <ThemedText size="m" weight="regular">
              How was your workout?
            </ThemedText>

            <WorkoutOpinionForm onSelection={handleOpinionSelection} />
          </View>
        </View>

        <View style={styles.content}>
          <ThemedText size="m" weight="semiBold">
            You did:
          </ThemedText>

          <FlatList
            data={currentWorkout?.exercises}
            style={styles.trainingItemList}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <DetailedExerciseItem
                name={item.name}
                type={item.exerciseType}
                bodyParts={item.bodyParts}
                exerciseDetails={item.value}
                style={{ marginBottom: 20 }}
              />
            )}
          />
        </View>

        <PrimaryButton value="Finish" onPress={handleSubmit} />
      </View>
    </PageWithGoBackHeader>
  );
};

export default LiveTrainingSummaryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingBottom: 20,
  },
  header: {},
  opinionForm: {
    gap: 10,
  },
  content: {
    flex: 1,
  },
  trainingItemList: {
    flex: 1,
    paddingTop: 10,
  },
});
