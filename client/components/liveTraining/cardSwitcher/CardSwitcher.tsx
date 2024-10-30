import { StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import SwipeableCard from './SwipeableCard';

type CardSwitcherProps = {
  data: TrainingItem[];
};

const CardSwitcher = ({ data }: CardSwitcherProps) => {
  const MAX = 2;
  const animatedValue = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleOnSwipe = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item, index) => {
        if (index > currentIndex + MAX || index < currentIndex) return null;
        return (
          <SwipeableCard
            key={`card${index}`}
            index={index}
            trainingItem={item}
            dataLength={data.length}
            currentIndex={currentIndex}
            animatedValue={animatedValue}
            maxVisibleItems={MAX}
            onSwipe={handleOnSwipe}
          />
        );
      })}
    </GestureHandlerRootView>
  );
};

export default CardSwitcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    gap: 10,
    paddingVertical: 0,
    paddingTop: 15,
    paddingBottom: 10,
  },
});
