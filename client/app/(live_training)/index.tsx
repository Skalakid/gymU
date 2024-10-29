import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ModalBar from '@/components/common/ModalBar';
import useTheme from '@/hooks/useTheme';
import ExercisePlayer from '@/components/liveTraining/exercisePlayer/ExercisePlayer';
import { useLiveTrainingContext } from '@/contexts/LiveTrainingContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CardSwitcher from '@/components/liveTraining/cardSwitcher/CardSwitcher';

const LiveTrainingPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { workoutID } = useLocalSearchParams();
  const { startLiveTraining, trainingItems } = useLiveTrainingContext();

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

  useEffect(() => {
    handleStartLiveTraining();
  }, [handleStartLiveTraining, workoutID]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ModalBar />
      <PageWithGoBackHeader
        title="Live Training"
        headerStyle={{ paddingBottom: 5 }}
      >
        <View style={styles.content}>
          <View style={styles.title}>
            <ThemedText size="l" weight="medium">
              Workout name
            </ThemedText>
          </View>
          <View style={styles.player}>
            <CardSwitcher data={trainingItems} />
            <ExercisePlayer />
          </View>
        </View>
      </PageWithGoBackHeader>
    </SafeAreaView>
  );
};

export default LiveTrainingPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  },
});
