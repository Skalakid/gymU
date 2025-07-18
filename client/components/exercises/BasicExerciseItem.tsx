import React from 'react';
import ThemedText from '../ThemedText';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Tile from '../common/Tile';
import useTheme from '@/hooks/useTheme';
import Icon from '../common/Icon';
import Tag from '../common/tag/Tag';
import { capitalize } from '@/utils/text.utils';
import { useExerciseContext } from '@/contexts/ExerciseContext';

type ExerciseItemProp = {
  name: string;
  type: string;
  style?: ViewStyle;
  bodyParts?: string[];
  description: string;
  onPress?: () => void;
  activeOpacity?: number;
};

const BasicExerciseItem = ({
  name,
  type,
  style,
  bodyParts,
  description,
  onPress,
  activeOpacity,
}: ExerciseItemProp) => {
  const { getExerciseTypeIcon } = useExerciseContext();
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Tile style={styles.container}>
        <View style={styles.title}>
          <Icon icon={getExerciseTypeIcon(type)} size={14} color={theme.text} />
          <ThemedText size="l" weight="medium">
            {name}
          </ThemedText>
        </View>

        <View style={styles.info}>
          <View style={styles.tags}>
            {bodyParts?.map((part) => (
              <Tag
                key={`tag${part}`}
                value={capitalize(part.replace('_', ' '))}
                size="s"
                style={{
                  backgroundColor: theme.secondary,
                }}
              />
            ))}
          </View>
          <ThemedText size="s">{description}</ThemedText>
        </View>
      </Tile>
    </TouchableOpacity>
  );
};
export default BasicExerciseItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    minHeight: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 5,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tags: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
});
