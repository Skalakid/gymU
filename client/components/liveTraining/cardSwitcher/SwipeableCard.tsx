import { StyleSheet, useWindowDimensions } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Tile from '@/components/common/Tile';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CardContent from './CardContent';

type CardProps = {
  trainingItem: TrainingItem;
  index: number;
  dataLength: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  maxVisibleItems: number;
  onSwipe: (index: number) => void;
  nextCardName: string;
  isHidden: boolean;
  nextIndex: number;
  onAutoSwipe: (index: number) => void;
};

const SwipeableCard = ({
  trainingItem,
  index,
  dataLength,
  currentIndex,
  animatedValue,
  maxVisibleItems,
  onSwipe,
  nextCardName,
  isHidden,
  nextIndex,
  onAutoSwipe,
}: CardProps) => {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const isManuallySwiped = useSharedValue(false);

  const recenterCard = useCallback(() => {
    translateX.value = withTiming(0, { duration: 500 });
    animatedValue.value = withTiming(index, { duration: 500 });
  }, [animatedValue, index, translateX]);

  const moveCard = useCallback(
    (
      newIndex: number,
      swipeDirection: number,
      callback: (i: number) => void,
    ) => {
      direction.value = swipeDirection;
      translateX.value = withTiming(swipeDirection * (width + 100), {}, () => {
        runOnJS(callback)(newIndex);
      });
      animatedValue.value = withTiming(newIndex);
    },
    [animatedValue, direction, translateX, width],
  );

  const pan = Gesture.Pan()
    .onStart(() => {
      isManuallySwiped.value = true;
    })
    .onUpdate((e) => {
      if (currentIndex !== index) {
        return;
      }
      const isSwipeRight = e.translationX > 0;
      direction.value = isSwipeRight ? 1 : -1;
      translateX.value = e.translationX;
      animatedValue.value = interpolate(
        Math.abs(e.translationX),
        [0, width],
        [index, index + 1],
      );
    })
    .onEnd((e) => {
      if (currentIndex !== index) {
        return;
      }

      if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
        runOnJS(moveCard)(currentIndex + 1, direction.value, onSwipe);
      } else {
        runOnJS(recenterCard)();
      }
      isManuallySwiped.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = currentIndex === index;

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-50, 0],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.88, 1],
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1],
    );

    return {
      zIndex: dataLength - index,
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
      transform: [
        {
          scale: currentItem ? 1 : scale,
        },
        { translateY: currentItem ? 0 : translateY },
        { translateX: translateX.value },
        { rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg' },
      ],
    };
  });

  useEffect(() => {
    if (!isManuallySwiped.value) {
      const diff = nextIndex - currentIndex;

      if (diff > 0 && index === nextIndex - 1) {
        moveCard(nextIndex, 1, onAutoSwipe);
      } else if (diff < 0 && index === nextIndex) {
        recenterCard();
        onAutoSwipe(nextIndex);
      }
    }
  }, [
    animatedValue,
    animatedValue.value,
    currentIndex,
    index,
    isHidden,
    isManuallySwiped.value,
    moveCard,
    nextIndex,
    onAutoSwipe,
    recenterCard,
  ]);

  if (isHidden) {
    return null;
  }

  return (
    <GestureDetector gesture={pan}>
      <Tile animated style={[styles.container, animatedStyle]}>
        <CardContent
          trainingItem={trainingItem}
          index={index}
          dataLength={dataLength}
          nextCardName={nextCardName}
        />
      </Tile>
    </GestureDetector>
  );
};

export default SwipeableCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
    paddingTop: 15,
    paddingBottom: 10,
    position: 'absolute',
    height: '100%',
  },
});
