import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from '../common/Icon';
import Icons from '@/constants/Icons';

type AddExerciseItemButtonProps = {
  onPress?: () => void;
  style?: ViewStyle;
};

const AddExerciseItemButton = ({
  onPress,
  style,
}: AddExerciseItemButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.container}>
        <Icon icon={Icons.plus} size={24} />
      </View>
    </TouchableOpacity>
  );
};
export default AddExerciseItemButton;

const styles = StyleSheet.create({
  button: {
    width: 'auto',
    height: 100,
  },
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: 'white',
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
    gap: 5,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
