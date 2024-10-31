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
  Alert,
} from 'react-native';
import fetchApi from '@/api/fetch';
import { Colors } from '@/constants/Colors';
import Icons from '@/constants/Icons';
import { capitalize } from '@/utils/text.utils';
import PrimaryButton from '../button/PrimaryButton';
import SelectDropdownInput from '@/components/input/dropdown/SelectDropdownInput';
import SelectDropdownItem from '@/components/input/dropdown/SelectDropdownItem';
import { useCreateWorkoutContext } from '@/contexts/CreateWorkoutContext';
import { useWorkoutContext } from '@/contexts/WorkoutContext';

export type DificultiesData = {
  label: string;
  level: number;
};

// TODO: Code duplicate
type WorkoutTagsRespone = {
  workout_tags: WorkoutType[];
};

type WorkoutFormProps = {
  onSubmit: () => void;
};

const WorkoutForm = ({ onSubmit }: WorkoutFormProps) => {
  const { difficulties } = useWorkoutContext();
  const { updateWorkoutGeneralInfo } = useCreateWorkoutContext();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [allTags, setAllTags] = useState<WorkoutType[]>([]);
  const [chosenTags, setChosenTags] = useState<WorkoutType[]>([]);

  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');

  const [pickerData, setPickerData] = useState<DificultiesData[]>([]);
  const [difficulty, setDifficulty] = useState<DificultiesData | null>(null);

  // TODO: Code duplicate
  const getAllWorkoutTags = async () => {
    try {
      const response = await fetchApi('/workout/tag/all', 'GET', null);
      const data: WorkoutTagsRespone = await response.json();
      setAllTags(data.workout_tags);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWorkout = async () => {
    try {
      if (
        workoutName === '' ||
        description === '' ||
        difficulty === null ||
        chosenTags.length === 0
      ) {
        Alert.alert('Please fill in all fields');
        return;
      }

      updateWorkoutGeneralInfo({
        name: workoutName,
        description: description,
        dificulty: difficulty,
        isPrivate: true,
        tags: chosenTags,
      });
      onSubmit();
    } catch (error) {
      Alert.alert('Something went wrong...');
    }
  };

  const renderItem = (value: string) => {
    return (
      <>
        <SelectDropdownItem value={capitalize(value)} />
      </>
    );
  };

  useEffect(() => {
    getAllWorkoutTags();
    setPickerData(
      difficulties.map((difficulty) => ({
        label: capitalize(difficulty.name),
        level: difficulty.level_id,
      })),
    );
  }, [difficulties]);

  return (
    <ThemedView style={[styles.container]}>
      <View style={styles.content}>
        <ThemedText size="xl" weight="semiBold">
          General info
        </ThemedText>
        <View style={styles.textInputs}>
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
        </View>

        <SelectDropdownInput
          data={pickerData}
          onSelect={(value) => setDifficulty(value)}
          renderItem={(item) => renderItem(item.label)}
          placeholder="Select difficulty level..."
          selectedValue={capitalize(difficulty?.label)}
          icon={Icons.flame}
          iconColor={theme.subTile}
        />

        <SelectDropdownInput
          data={allTags}
          onSelect={(value) => {
            if (chosenTags.includes(value)) {
              return;
            }

            setChosenTags((prev) => [...prev, value]);
          }}
          renderItem={(item) => renderItem(item.name)}
          placeholder="Add tags..."
          icon={Icons.hashtag}
          iconColor={theme.subTile}
        />

        <FlatList
          style={styles.list}
          data={chosenTags}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.tag, { backgroundColor: theme.secondary }]}
              onPress={() => {
                const copy = [...chosenTags];
                copy.splice(index, 1);
                setChosenTags(copy);
              }}
            >
              <ThemedText>{item.name}</ThemedText>
            </TouchableOpacity>
          )}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <PrimaryButton onPress={handleAddWorkout} value="Add exercises" />
    </ThemedView>
  );
};

export default WorkoutForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    gap: 10,
  },
  selectItem: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 2,
    margin: 2,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: 'Poppins',
  },
  tag: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    padding: 5,
    borderRadius: 10,
  },
  list: {
    width: '100%',
  },
  textInputs: {
    marginBottom: 20,
    gap: 10,
  },
});
