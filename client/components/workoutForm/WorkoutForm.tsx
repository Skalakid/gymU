import ThemedText from '@/components/ThemedText';
import TextInput from '@/components/input/TextInput';
import ThemedView from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import fetchApi from '@/api/fetch';
import { Colors } from '@/constants/Colors';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import SelectableTag from '../common/tag/SelectableTag';

interface WorkoutFormProps {
  closeForm: () => void;
}

interface DificultiesData {
  label: string;
  level: number;
}

const difficulties = ['beginner', 'easy', 'medium', 'hard', 'hardcore'];
const pickerData: DificultiesData[] = [];

for (let i = 0; i < difficulties.length; ++i) {
  pickerData.push({ label: difficulties[i], level: i });
}

type WorkoutTagsRespone = {
  workout_tags: WorkoutType[];
};

const WorkoutForm = ({ closeForm }: WorkoutFormProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const primaryColor = theme.text;

  const [allTags, setAllTags] = useState<WorkoutType[]>([]);
  const [chosenTags, setChosenTags] = useState<WorkoutType[]>([]);

  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(null);

  const getAllWorkoutTags = async () => {
    try {
      const response = await fetchApi('/workout/tag/all', 'GET', null);
      const data: WorkoutTagsRespone = await response.json();
      setAllTags(data.workout_tags);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllWorkoutTags();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText size="l">General info</ThemedText>
      <TextInput
        label="Workout name"
        placeholder="Enter workout name..."
        onChangeText={(text) => setWorkoutName(text)}
        value={workoutName}
      />
      <TextInput
        label="Description"
        placeholder="Enter workout description..."
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <View style={styles.selectWrapper}>
        <Icon icon={Icons.flame} size={32} color={theme.subTile} />
        <SelectDropdown
          data={pickerData}
          onSelect={(value, _) => setDifficulty(value.level)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <ThemedView
                style={[
                  styles.button,
                  {
                    flex: 1,
                    borderColor: primaryColor,
                  },
                ]}
              >
                <ThemedText>
                  {(selectedItem && selectedItem.label) ||
                    'Choose difficulty...'}
                </ThemedText>
              </ThemedView>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <ThemedView style={{ backgroundColor: theme.background }}>
                <ThemedText style={{ color: primaryColor }}>
                  {item.label}
                </ThemedText>
              </ThemedView>
            );
          }}
        />
      </View>

      <View style={styles.selectWrapper}>
        <Icon icon={Icons.hashtag} size={32} color={theme.subTile} />
        <SelectDropdown
          data={allTags}
          onSelect={(value, _) => setChosenTags((prev) => [...prev, value])}
          renderButton={(selectedItem, isOpened) => {
            return (
              <ThemedView
                style={[
                  styles.button,
                  {
                    flex: 1,
                    borderColor: primaryColor,
                  },
                ]}
              >
                <ThemedText>
                  {(selectedItem && selectedItem.label) || 'Choose tags...'}
                </ThemedText>
              </ThemedView>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <ThemedView style={{ backgroundColor: theme.background }}>
                <ThemedText style={{ color: primaryColor }}>
                  {item.name}
                </ThemedText>
              </ThemedView>
            );
          }}
        />
      </View>

      <FlatList
        style={styles.list}
        data={chosenTags}
        renderItem={({ item, index }) => (
          <SelectableTag
            orderIndex={index}
            value={item.name}
            size="l"
            onSelectionChange={(index) => {
              const copy = [...chosenTags];
              copy.splice(index, 1);
              setChosenTags(copy);
            }}
            isSelected={false}
          />
        )}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        showsHorizontalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={async () => {
          const response = await fetchApi(
            '/workout/create',
            'POST',
            null,
            {
              name: workoutName,
              description: description,
              is_private: true,
              workout_level_id: difficulty,
              tag_ids: chosenTags.map((value) => value.tag_id),
              exercises: [],
            },
            true,
          );

          console.log(response);
          //   closeForm();
        }}
        style={[
          styles.button,
          {
            width: '100%',
            borderColor: primaryColor,
          },
        ]}
      >
        <ThemedText>Add workout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default WorkoutForm;

const styles = StyleSheet.create({
  container: {
    top: '40%',
    height: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  selectWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: 'Poppins',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  list: {
    flex: 1,
  },
});
