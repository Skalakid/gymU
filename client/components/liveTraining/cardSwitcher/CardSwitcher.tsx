import { StyleSheet } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import SwipeableCard from './SwipeableCard';

type CardSwitcherProps = {
  data: TrainingItem[];
  desiredCardIndex: number;
  onSwipe: (index: number) => void;
  onAutoSwipe: (index: number, action: ActionType) => void;
};

const CardSwitcher = ({
  data,
  onSwipe,
  desiredCardIndex,
  onAutoSwipe,
}: CardSwitcherProps) => {
  const MAX = 2;
  const animatedValue = useSharedValue(desiredCardIndex);
  const currentCardIndex = useSharedValue(desiredCardIndex);

  const handleOnSwipe = (index: number) => {
    currentCardIndex.value = index;
    onSwipe(index);
  };

  const handleOnAutoSwipe = (index: number, action: ActionType) => {
    currentCardIndex.value = index;
    onAutoSwipe(index, action);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item, index) => {
        if (index > desiredCardIndex + MAX) return null;
        return (
          <SwipeableCard
            key={`card${index}`}
            index={index}
            trainingItem={item}
            dataLength={data.length}
            currentIndex={currentCardIndex}
            nextIndex={desiredCardIndex}
            onAutoSwipe={handleOnAutoSwipe}
            animatedValue={animatedValue}
            maxVisibleItems={MAX}
            onSwipe={handleOnSwipe}
            nextCardName={data[index + 1]?.name}
            isHidden={index < desiredCardIndex - 1}
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
