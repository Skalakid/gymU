import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import Tile from '../common/Tile';
import ThemedText from '../ThemedText';
import Tag from '../common/tag/Tag';
import { useExerciseContext } from '@/contexts/ExerciseContext';
import useTheme from '@/hooks/useTheme';
import Icon from '../common/Icon';
import { capitalize } from '@/utils/text.utils';
import fetchApi from '@/api/fetch';

type ExerciseDetailsInfoProps = {
  exerciseID: number;
  style?: ViewStyle;
};

const ExerciseDetailsInfo = ({
  exerciseID,
  style,
}: ExerciseDetailsInfoProps) => {
  const { getExerciseTypeIcon } = useExerciseContext();
  const theme = useTheme();
  const [exercise, setExercise] = useState<DetailedExercise | null>(null);

  const getExerciseDetails = async (id: number) => {
    try {
      const response = await fetchApi(`/exercise/${id}`, 'GET', null);
      if (!response.ok) {
        console.error('Failed to fetch exercise details');
        return;
      }
      const data: DetailedExercise = await response.json();
      setExercise(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setExercise(null);
    getExerciseDetails(exerciseID);
  }, [exerciseID]);

  if (!exercise) {
    return null;
  }

  return (
    <Tile style={style}>
      <View style={styles.title}>
        <Icon
          icon={getExerciseTypeIcon(exercise.exercise_type)}
          size={14}
          color={theme.text}
        />
        <ThemedText size="l" weight="medium">
          {exercise.name}
        </ThemedText>
      </View>

      <View style={styles.info}>
        <View style={styles.tags}>
          {exercise.body_parts?.map((part) => (
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

        <ThemedText size="s">{exercise.description}</ThemedText>
      </View>
    </Tile>
  );
};

export default ExerciseDetailsInfo;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
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
