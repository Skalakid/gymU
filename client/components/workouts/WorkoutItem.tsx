import React from 'react';
import ThemedText from '../ThemedText';
import { StyleSheet, View } from 'react-native';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import { capitalize } from '@/utils/text.utils';
import Tile from '../common/Tile';
import Tag from './Tag';

type WorkoutItemProp = {
  name: string;
  level: string;
  tags?: string[];
};

const WorkoutItem = ({ name, level, tags = [] }: WorkoutItemProp) => {
  return (
    <Tile style={styles.container}>
      <ThemedText size="l" weight="medium">
        {name}
      </ThemedText>

      <View style={styles.info}>
        <View style={styles.row}>
          <Icon icon={Icons.flame} size={16} color="#D9D9D9" />
          <ThemedText size="m" weight="medium" color="#D9D9D9">
            {capitalize(level)}
          </ThemedText>
        </View>

        <View style={styles.row}>
          <Icon icon={Icons.hashtag} size={16} color="#D9D9D9" />
          <View style={styles.tagList}>
            {tags.map((tag) => (
              <Tag value={capitalize(tag)} />
            ))}
          </View>
        </View>
      </View>
    </Tile>
  );
};
export default WorkoutItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    height: 100,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
});
