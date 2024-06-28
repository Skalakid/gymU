import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import Icon from '@/components/common/Icon';
import LabeledText from '@/components/common/LabeledText';
import Tile from '@/components/common/Tile';
import Tag from '@/components/common/tag/Tag';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import { capitalize } from '@/utils/text.utils';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const WorkoutDetailsPage = () => {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [workoutDetails, setWorkoutDetails] = useState<Workout | null>(null);

  const getWorkoutDetails = useCallback(async () => {
    try {
      const response = await fetchApi(`/workout/${id}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails = await response.json();
      setWorkoutDetails(workoutDetails);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getWorkoutDetails();
  }, [getWorkoutDetails]);

  return (
    <ScrollView>
      <View style={styles.content}>
        <Tile style={styles.tile}>
          <LabeledText
            label="Created by"
            text={workoutDetails?.author.username || ''}
            color={theme.primary}
            weight="medium"
          />
          <LabeledText label="Name" text={workoutDetails?.name || ''} />
          <LabeledText
            label="Description"
            text={workoutDetails?.description || ''}
            style={{ marginBottom: 10 }}
          />
        </Tile>

        <Tile style={styles.tile}>
          <View style={styles.row}>
            <Icon icon={Icons.flame} size={20} color={theme.text} />
            <ThemedText>{capitalize(workoutDetails?.workout_level)}</ThemedText>
          </View>

          <View style={styles.row}>
            <Icon icon={Icons.hashtag} size={20} color={theme.text} />
            <View style={styles.tagList}>
              {(workoutDetails?.workout_tags || []).map((tag, index) => (
                <Tag key={`tag${index}`} value={capitalize(tag)} size="l" />
              ))}
            </View>
          </View>
        </Tile>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetailsPage;

const styles = StyleSheet.create({
  content: {
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  tagList: {
    flexDirection: 'row',
    gap: 10,
  },
  tile: {
    gap: 15,
  },
});
