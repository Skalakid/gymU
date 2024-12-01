import { LayoutChangeEvent, StyleSheet, View, ViewToken } from 'react-native';
import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Image from '../common/Image';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import Dot from './Dot';
import useTheme from '@/hooks/useTheme';

type ImageCarouselProps = {
  imageUrls: string[];
};

const SEPARATOR_WIDTH = 20;

const ImageCarousel = ({ imageUrls }: ImageCarouselProps) => {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const activeIndex = useSharedValue(0);

  const handleOnLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<string>[];
  }) => {
    activeIndex.value = viewableItems[0].index ?? 0;
  };

  const renderImage = (url: string) => {
    return (
      <Image
        source={url}
        style={{
          width,
          height: '100%',
          backgroundColor: theme.background,
          borderRadius: 15,
        }}
        contentFit="cover"
      />
    );
  };

  return (
    <>
      <GestureHandlerRootView
        style={styles.gestureHandler}
        onLayout={handleOnLayout}
      >
        <FlatList
          data={imageUrls}
          renderItem={({ item }) => renderImage(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          snapToOffsets={imageUrls.map(
            (_, index) => (width + SEPARATOR_WIDTH) * index,
          )}
          contentContainerStyle={{ gap: SEPARATOR_WIDTH }}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </GestureHandlerRootView>
      <View style={styles.dotsContainer}>
        {imageUrls.map((_, index) => (
          <Dot key={index} index={index} currentIndex={activeIndex} />
        ))}
      </View>
    </>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  gestureHandler: { width: '100%', height: 210 },
  imageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {},
  dotsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
