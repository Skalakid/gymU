import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import useTheme from '@/hooks/useTheme';

type DraggableItemIndicatorProps = {
  lines?: number;
};

const DraggableItemIndicator = ({ lines = 3 }: DraggableItemIndicatorProps) => {
  const theme = useTheme();

  const renderLines = useMemo(
    () =>
      Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.line,
            {
              backgroundColor: theme.text,
              marginBottom: index === lines - 1 ? 0 : 3,
            },
          ]}
        />
      )),
    [lines, theme],
  );

  return <View style={styles.container}>{renderLines}</View>;
};

export default DraggableItemIndicator;

const styles = StyleSheet.create({
  container: {
    width: 20,
  },
  line: {
    width: '100%',
    height: 2,
    borderRadius: 5,
  },
});
