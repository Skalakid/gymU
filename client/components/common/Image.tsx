import { StyleProp } from 'react-native';
import React, { useMemo } from 'react';
import { Image as ExpoImage, ImageSource, ImageStyle } from 'expo-image';
import type { ImageProps as ExpoImageProps } from 'expo-image';
import Icons from '@/constants/Icons';
import { getAuthorizationHeaderSync } from '@/api/auth';

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

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

const Image = ({
  source,
  style,
  contentFit,
  placeholder,
  placeholderContentFit,
  ...rest
}: ImageProps) => {
  const imageSource = useMemo(() => {
    if (typeof source !== 'string') {
      return source;
    }

    if (DOMAIN && source.startsWith(DOMAIN)) {
      const authorizationHeader = getAuthorizationHeaderSync() ?? '';
      return {
        uri: source,
        headers: { Authorization: authorizationHeader },
      };
    }
    return { uri: source };
  }, [source]);

  return (
    <ExpoImage
      style={style}
      source={imageSource}
      contentFit={contentFit && 'contain'}
      placeholder={placeholder ?? (Icons.image as ImageSource)}
      placeholderContentFit={placeholderContentFit ?? 'contain'}
      {...rest}
    />
  );
};

export default Image;
