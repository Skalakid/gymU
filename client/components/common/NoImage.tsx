import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import Icons from '@/constants/Icons';
import Icon from './Icon';
import useTheme from '@/hooks/useTheme';

type NoImageProps = {
  style?: ViewStyle;
  iconSize?: number;
};

const NoImage = ({ style, iconSize }: NoImageProps) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.imageContainer,
        style,
        { backgroundColor: theme.background },
      ]}
    >
      <Icon icon={Icons.image} size={iconSize} />
    </View>
  );
};

export default NoImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
