import { ViewStyle } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Image as ExpoImage, ImageSource } from 'expo-image';
import type { ImageProps as ExpoImageProps } from 'expo-image';
import Icons from '@/constants/Icons';
import { getAuthorizationHeaderSync } from '@/api/auth';
import NoImage from './NoImage';

type ImageProps = {
  source:
    | string
    | number
    | ImageSource
    | ImageSource[]
    | string[]
    | null
    | undefined;
  style?: ViewStyle;
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
  const [isError, setIsError] = useState(false);

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

  if (!placeholder && (!source || isError)) {
    return <NoImage style={style} iconSize={100} />;
  }

  return (
    <ExpoImage
      style={style}
      source={imageSource}
      contentFit={contentFit && 'contain'}
      placeholder={placeholder ?? (Icons.image as ImageSource)}
      placeholderContentFit={placeholderContentFit ?? 'contain'}
      onError={() => setIsError(true)}
      {...rest}
    />
  );
};

export default Image;
