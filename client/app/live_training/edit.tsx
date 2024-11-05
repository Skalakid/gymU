import { StyleSheet } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';

const EditLiveTrainingPage = () => {
  return (
    <PageWithGoBackHeader
      title="Edit workout"
      headerStyle={{ paddingBottom: 5 }}
    >
      <ThemedText size="l" weight="semiBold">
        Workout name
      </ThemedText>
    </PageWithGoBackHeader>
  );
};

export default EditLiveTrainingPage;

const styles = StyleSheet.create({});
