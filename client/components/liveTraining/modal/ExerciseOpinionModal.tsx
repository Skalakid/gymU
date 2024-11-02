import { Modal, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Tile from '@/components/common/Tile';
import OpinionForm from '../opinion/OpinionForm';
import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';

type ExerciseOpinionModalProps = {
  visible: boolean;
  onClose: (value: number) => void;
};

const ExerciseOpinionModal = ({
  visible,
  onClose,
}: ExerciseOpinionModalProps) => {
  const [value, setValue] = useState<number | null>(null);

  const handleSelection = (value: number) => {
    setValue(value);
  };

  const handleClose = () => {
    if (value === null) {
      return;
    }
    const currentValue = value;
    setValue(null);
    onClose(currentValue);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Tile style={styles.tile}>
          <ThemedText size="l" weight="semiBold">
            How was it?
          </ThemedText>
          <OpinionForm onSelection={handleSelection} />

          <SecondaryButton
            value="Skip"
            onPress={handleClose}
            disabled={value === null}
          />
        </Tile>
      </View>
    </Modal>
  );
};

export default ExerciseOpinionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: { width: 350, gap: 10 },
});
