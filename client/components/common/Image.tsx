import { StyleProp } from 'react-native';
import React from 'react';
import { Image as ExpoImage, ImageSource, ImageStyle } from 'expo-image';
import type { ImageProps as ExpoImageProps } from 'expo-image';
import Icons from '@/constants/Icons';

type ImageProps = {
  source:
    | string
    | number
    | ImageSource
    | ImageSource[]
    | string[]
    | null
    | undefined;
  style?: StyleProp<ImageStyle>;
} & ExpoImageProps;

const Image = ({
  source,
  style,
  contentFit,
  placeholder,
  placeholderContentFit,
  ...rest
}: ImageProps) => {
  return (
    <ExpoImage
      style={style}
      source={source}
      contentFit={contentFit && 'contain'}
      placeholder={placeholder ?? (Icons.image as ImageSource)}
      placeholderContentFit={placeholderContentFit ?? 'contain'}
      {...rest}
    />
  );
};

export default Image;
