import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import ThemedText from '@/components/ThemedText';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import ModalBar from '@/components/common/ModalBar';
import useTheme from '@/hooks/useTheme';

const LiveTrainingPage = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ModalBar />
      <PageWithGoBackHeader title="Live Training">
        <ThemedText>Live Training Page</ThemedText>
      </PageWithGoBackHeader>
    </SafeAreaView>
  );
};

export default LiveTrainingPage;

const styles = StyleSheet.create({});
