import React from 'react';
import ThemedText from '../ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import { capitalize } from '@/utils/text.utils';
import Tile from '../common/Tile';
import Tag from '../common/tag/Tag';
import useTheme from '@/hooks/useTheme';

type WorkoutItemProp = {
  id: number;
  name: string;
  level: string;
  tags?: string[];
  onPress?: () => void;
};

const WorkoutItem = ({
  name,
  level,
  tags = [],
  onPress = () => {},
}: WorkoutItemProp) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Tile style={styles.container}>
        <ThemedText size="l" weight="medium">
          {name}
        </ThemedText>

        <View style={styles.info}>
          <View style={styles.row}>
            <Icon icon={Icons.flame} size={16} color={theme.subTile} />
            <ThemedText size="m" color={theme.subTile}>
              {capitalize(level)}
            </ThemedText>
          </View>

          <View style={styles.row}>
            <Icon icon={Icons.hashtag} size={16} color={theme.subTile} />
            <View style={styles.tagList}>
              {tags.map((tag, index) => (
                <Tag key={`${name}${index}`} value={capitalize(tag)} />
              ))}
            </View>
          </View>
        </View>
      </Tile>
    </TouchableOpacity>
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
    alignItems: 'center',
    gap: 5,
  },
});
