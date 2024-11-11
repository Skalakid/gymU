import ThemedText from '@/components/ThemedText';
import Icon from '@/components/common/Icon';
import LabeledText from '@/components/common/LabeledText';
import Tile from '@/components/common/Tile';
import Tag from '@/components/common/tag/Tag';
import Icons from '@/constants/Icons';
import useTheme from '@/hooks/useTheme';
import { capitalize } from '@/utils/text.utils';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

type WorkoutGeneralInfoProps = {
  workoutDetails: Workout;
};

const WorkoutGeneralInfo = ({ workoutDetails }: WorkoutGeneralInfoProps) => {
  const theme = useTheme();

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
            <ThemedText>{capitalize(workoutDetails?.workoutLevel)}</ThemedText>
          </View>

          <View style={styles.row}>
            <Icon icon={Icons.hashtag} size={20} color={theme.text} />
            <FlatList
              data={workoutDetails?.workoutTags}
              renderItem={({ item, index }) => (
                <Tag key={`tag${index}`} value={capitalize(item)} size="l" />
              )}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              showsHorizontalScrollIndicator={false}
              style={styles.tagList}
            />
          </View>
        </Tile>
      </View>
    </ScrollView>
  );
};

export default WorkoutGeneralInfo;

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
