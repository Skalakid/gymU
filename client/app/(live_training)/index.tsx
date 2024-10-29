import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ModalBar from '@/components/common/ModalBar';
import useTheme from '@/hooks/useTheme';
import ExercisePlayer from '@/components/live_training/Player/ExercisePlayer';
import { useLiveTrainingContext } from '@/contexts/LiveTrainingContext';
import { useLocalSearchParams, useRouter } from 'expo-router';

const LiveTrainingPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const { workoutID } = useLocalSearchParams();
  const { startLiveTraining } = useLiveTrainingContext();

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
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ModalBar />
      <PageWithGoBackHeader title="Live Training">
        <ThemedText>Live Training Page</ThemedText>
        <ExercisePlayer />
      </PageWithGoBackHeader>
    </SafeAreaView>
  );
};

export default LiveTrainingPage;

const styles = StyleSheet.create({});
