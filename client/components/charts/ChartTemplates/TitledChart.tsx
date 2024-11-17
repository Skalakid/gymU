import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import { ReactNode } from 'react';

type TitledChartProps = {
  title: string;
  height: number;
  children: ReactNode;
};

const TitledChart = ({ title, height, children }: TitledChartProps) => {
  return (
    <ThemedView style={[styles.container, { height }]}>
      <ThemedText size="xl" weight="semiBold">
        {title}
      </ThemedText>
      {children}
    </ThemedView>
  );
};

export default TitledChart;

const styles = StyleSheet.create({
  container: {
    width: '95%',

    padding: 5,
    gap: 10,

    borderRadius: 15,
  },
});
