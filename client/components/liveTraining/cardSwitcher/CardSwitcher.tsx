import { StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import SwipeableCard from './SwipeableCard';

type CardSwitcherProps = {
  data: TrainingItem[];
  currentIndex: number;
  onSwipe: (index: number) => void;
};

const CardSwitcher = ({
  data,
  onSwipe,
  currentIndex = 0,
}: CardSwitcherProps) => {
  const MAX = 2;
  const animatedValue = useSharedValue(0);

  const handleOnSwipe = (index: number) => {
    onSwipe(index);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item, index) => {
        if (index > currentIndex + MAX) return null;
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
            nextCardName={data[index + 1]?.name}
            isHidden={index < currentIndex}
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
  },
});
