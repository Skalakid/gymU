import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import TileWithTitle from '../common/TileWithTitle';
import ThemedText from '../ThemedText';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';

type StatsPreviewProps = {
  percentageValue: number;
  streak: number;
};

const StatsPreview = ({
  percentageValue = 0,
  streak = 0,
}: StatsPreviewProps) => {
  const theme = useTheme();

  const isNegative = useMemo(() => percentageValue < 0, [percentageValue]);
  const value = Math.abs(percentageValue) * 100;
  const color = isNegative ? theme.lightRed : theme.lightGreen;

  return (
    <View style={styles.container}>
      <TileWithTitle
        title="Weight progress"
        style={styles.smallStatsTile}
        size="m"
      >
        <View style={styles.tile}>
          <View style={{ justifyContent: 'center' }}>
            <ThemedText size="h2" weight="bold" color={color}>
              {isNegative ? '-' : '+'}
            </ThemedText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <ThemedText size="x5l" weight="bold" color={color}>
              {value}
            </ThemedText>

            <ThemedText size="h2" weight="bold" color={color}>
              %
            </ThemedText>
          </View>
        </View>
      </TileWithTitle>

      <TileWithTitle title="Streak" style={styles.smallStatsTile} size="m">
        <View style={[styles.tile, { alignItems: 'baseline' }]}>
          <Icon icon={Icons.flame} size={32} color={theme.primary} />

          <ThemedText size="x5l" weight="bold">
            {streak}
          </ThemedText>
        </View>
      </TileWithTitle>
    </View>
  );
};

export default StatsPreview;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', width: '100%', gap: 10 },
  smallStatsTile: {
    flex: 1,
    paddingBottom: -15,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
