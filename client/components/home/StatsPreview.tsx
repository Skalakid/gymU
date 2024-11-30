import { StyleSheet, View } from 'react-native';
import React from 'react';
import TileWithTitle from '../common/TileWithTitle';
import ThemedText from '../ThemedText';

const StatsPreview = () => {
  return (
    <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
      <TileWithTitle
        title="Weight progress"
        style={styles.smallStatsTile}
        size="m"
      >
        <View
          style={{
            flexDirection: 'row',
            marginBottom: -15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <ThemedText size="h2" weight="bold">
              +
            </ThemedText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <ThemedText size="x5l" weight="bold">
              12
            </ThemedText>

            <ThemedText size="h2" weight="bold">
              %
            </ThemedText>
          </View>
        </View>
      </TileWithTitle>

      <TileWithTitle
        title="Streak"
        style={styles.smallStatsTile}
        size="m"
      ></TileWithTitle>
    </View>
  );
};

export default StatsPreview;

const styles = StyleSheet.create({
  smallStatsTile: {
    flex: 1,
  },
  weightProgress: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});
