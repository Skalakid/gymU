import { StyleSheet, View } from 'react-native';
import ThemedText from '../ThemedText';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';
import { useState } from 'react';
import AddExerciseItemButton from '../exercises/AddExerciseItemButton';

const AddExercisesForm = () => {
  const [time, setTime] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText weight="semiBold" size="l">
          Choose exercises
        </ThemedText>
        <View style={styles.timeCounter}>
          <ThemedText weight="semiBold" size="l">
            {time > 0 ? time : '~ time'}
          </ThemedText>
          <Icon icon={Icons.time} size={24} />
        </View>
      </View>

      <View style={styles.content}>
        <ThemedText size="s" style={styles.infoText}>
          Let's cook the perfect workout plan! 🔥
        </ThemedText>
        <AddExerciseItemButton style={styles.addExerciseItemButton} />
      </View>
    </View>
  );
};

export default AddExercisesForm;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeCounter: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,

    gap: 10,
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  addExerciseItemButton: {
    width: '100%',
  },
});
