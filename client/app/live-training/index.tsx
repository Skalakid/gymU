import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ExercisePlayer from '@/components/liveTraining/exercisePlayer/ExercisePlayer';
import { useLiveTrainingContext } from '@/contexts/LiveTrainingContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CardSwitcher from '@/components/liveTraining/cardSwitcher/CardSwitcher';
import { interpolate } from 'react-native-reanimated';
import ExerciseOpinionModal from '@/components/liveTraining/modal/ExerciseOpinionModal';

const LiveTrainingPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { workoutID } = useLocalSearchParams();
  const {
    startLiveTraining,
    trainingItems,
    currentExerciseIndex,
    nextItem,
    peviousItem,
    addOpinion,
  } = useLiveTrainingContext();
  const shouldEnableMoving = useRef(false);

  const handleStartLiveTraining = useCallback(() => {
    if (Number.isNaN(workoutID)) {
      return;
    }

    try {
      startLiveTraining(Number(workoutID));
    } catch (error) {
      Alert.alert('Error', 'Something went wrong... Please try again later');
      router.back();
    }
  }, [router, startLiveTraining, workoutID]);

  const handleModalClose = useCallback(
    (opinionValue?: number) => {
      if (opinionValue !== undefined) {
        addOpinion(
          opinionValue,
          trainingItems[currentExerciseIndex - 1].exerciseIndex,
        );
        shouldEnableMoving.current = true;
      }
      setIsModalVisible(false);

      if (currentExerciseIndex >= trainingItems.length) {
        router.navigate('/live-training/summary');
      }
    },
    [addOpinion, currentExerciseIndex, router, trainingItems],
  );

  const shouldShowModal = useCallback(
    (index: number) => {
      const currentExerciseID = trainingItems[index]?.exerciseID;
      const previousExerciseID = trainingItems[index - 1]?.exerciseID;

      if (
        !shouldEnableMoving.current &&
        (index >= trainingItems.length ||
          (currentExerciseID &&
            currentExerciseID >= 0 &&
            previousExerciseID &&
            previousExerciseID >= 0 &&
            currentExerciseID !== previousExerciseID))
      ) {
        return true;
      } else {
        return false;
      }
    },
    [trainingItems],
  );

  const showModal = useCallback(
    (index: number, action?: ActionType) => {
      if (action === 'prev') {
        return;
      }
      if (shouldShowModal(index)) {
        setIsModalVisible(true);
      } else {
        handleModalClose();
      }
    },
    [handleModalClose, shouldShowModal],
  );

  const handleSwipe = useCallback(
    (index: number) => {
      if (shouldShowModal(index - 1)) {
        return;
      }
      shouldEnableMoving.current = false;
      showModal(nextItem());
    },
    [nextItem, shouldShowModal, showModal],
  );

  const handleNextItem = useCallback(() => {
    if (shouldShowModal(currentExerciseIndex)) {
      return;
    }
    shouldEnableMoving.current = false;
    nextItem();
  }, [currentExerciseIndex, nextItem, shouldShowModal]);

  const handlePreviousItem = useCallback(() => {
    peviousItem();
  }, [peviousItem]);

  useEffect(() => {
    handleStartLiveTraining();
  }, [handleStartLiveTraining, workoutID]);

  return (
    <PageWithGoBackHeader
      title="Live Training"
      headerStyle={{ paddingBottom: 5 }}
    >
      <ExerciseOpinionModal
        visible={isModalVisible}
        onClose={handleModalClose}
      />
      <View style={styles.content}>
        <View style={styles.title}>
          <ThemedText size="l" weight="medium">
            Workout name
          </ThemedText>
        </View>
        <View style={styles.player}>
          <CardSwitcher
            data={trainingItems}
            desiredCardIndex={currentExerciseIndex}
            onSwipe={handleSwipe}
            onAutoSwipe={showModal}
          />
          <ExercisePlayer
            onNext={handleNextItem}
            onPrevious={handlePreviousItem}
            progress={interpolate(
              currentExerciseIndex,
              [0, trainingItems.length],
              [0, 100],
              'clamp',
            )}
            ticks={trainingItems.length}
          />
        </View>
      </View>
    </PageWithGoBackHeader>
  );
};

export default LiveTrainingPage;

const styles = StyleSheet.create({
  content: {
    gap: 10,
    flex: 1,
  },
  title: {
    gap: 10,
  },
  player: {
    flex: 1,
    gap: 20,
    paddingBottom: 10,
  },
});
