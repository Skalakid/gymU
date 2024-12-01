import { ViewStyle } from 'react-native';
import React from 'react';
import Tile, { ThemedViewProps } from './Tile';
import ThemedText from '../ThemedText';

type TileWithTitleProps = {
  title: string;
  titleStyle?: ViewStyle;
  size?: 's' | 'm' | 'l';
} & ThemedViewProps;

const TileWithTitle = ({
  title,
  size = 'l',
  titleStyle,
  children,
  ...rest
}: TileWithTitleProps) => {
  return (
    <Tile {...rest}>
      <ThemedText weight="semiBold" size={size} style={titleStyle}>
        {title}
      </ThemedText>

      {children}
    </Tile>
  );
};

export default TileWithTitle;
