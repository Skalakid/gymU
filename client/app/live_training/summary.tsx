import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ThemedText from '@/components/ThemedText';
import WorkoutOpinionForm from '@/components/liveTraining/workoutOpinionForm/WorkoutOpinionForm';
import PrimaryButton from '@/components/button/PrimaryButton';

const LiveTrainingSummaryPage = () => {
  const [opinionValue, setOpinionValue] = useState<number | null>(null);

  const handleOpinionSelection = (value: number) => {
    setOpinionValue(value);
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
        </View>

        <PrimaryButton value="Finish" onPress={() => console.log('Finish')} />
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
});
