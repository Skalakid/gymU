import { StyleSheet, ViewStyle } from 'react-native';
import SelectDropdownInput from '../input/dropdown/SelectDropdownInput';
import SelectDropdownItem from '../input/dropdown/SelectDropdownItem';
import Tile from '../common/Tile';
import { useEffect, useMemo, useState } from 'react';
import RowTextInput from '../input/RowTextInput';
import { useExerciseContext } from '@/contexts/ExerciseContext';

const UNLIMITED_VALUE = 0;
const progressTypes = ['none', 'linear', 'sigmoidal'];

type ExerciseDetailsProgressFormType = {
  config: ProgressConfig;
  exerciseTypeName: string;
  onFormUpdate: (config: ProgressConfig) => void;
  style: ViewStyle;
};

const ExerciseDetailsProgressForm = ({
  config,
  exerciseTypeName,
  onFormUpdate,
  style,
}: ExerciseDetailsProgressFormType) => {
  const [type, setType] = useState<ProgressType>(config.type);
  const [target, setTarget] = useState<ProgressTarget>();
  const [difference, setDifference] = useState<number>(0);
  const [interval, setInterval] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(UNLIMITED_VALUE);
  const [maxOccurences, setMaxOccurences] = useState<number>(UNLIMITED_VALUE);
  const { getExerciseType } = useExerciseContext();

  const progressTargets = useMemo(() => {
    const exerciseType = getExerciseType(exerciseTypeName);

    if (exerciseType === undefined) {
      return [];
    }

    const targets: ProgressTarget[] = [];

    if (exerciseType.hasSets) {
      targets.push('sets');
    }
    if (exerciseType.hasReps) {
      targets.push('reps');
    }
    if (exerciseType.hasWeights) {
      targets.push('weight');
    }
    if (exerciseType.hasTime) {
      targets.push('time');
    }

    if (target === undefined) {
      setTarget(targets[0]);
    }

    return targets;
  }, [exerciseTypeName, target, getExerciseType]);

  useEffect(() => {
    switch (type) {
      case 'none':
        onFormUpdate({ type });
        break;
      case 'linear':
        onFormUpdate({
          type,
          interval,
          difference,
          maxValue: maxValue === UNLIMITED_VALUE ? undefined : maxValue,
          maxOccurences:
            maxOccurences === UNLIMITED_VALUE ? undefined : maxOccurences,
          // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
          target: target!!,
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, interval, difference, maxValue, maxOccurences, target]);

  const linearForm = useMemo(
    () =>
      type === 'linear' ? (
        <>
          <RowTextInput
            value={difference}
            onChageText={(value) => setDifference(value)}
            label="(Δ) difference"
          />
          <RowTextInput
            value={interval}
            onChageText={(value) => setInterval(value)}
            label="(i) interval"
            minValue={1}
          />
          <RowTextInput
            value={maxValue}
            placeholder="unlimited"
            placeholderValue={UNLIMITED_VALUE}
            onChageText={(value) => setMaxValue(value)}
            label="(m) max value"
            minValue={UNLIMITED_VALUE}
          />
          <RowTextInput
            value={maxOccurences}
            placeholder="unlimited"
            placeholderValue={UNLIMITED_VALUE}
            onChageText={(value) => setMaxOccurences(value)}
            label="(o) max occurences"
            minValue={UNLIMITED_VALUE}
          />
        </>
      ) : null,
    [type, difference, interval, maxValue, maxOccurences],
  );

  const progressTargetDropdown = useMemo(
    () =>
      type !== 'none' ? (
        <>
          <SelectDropdownInput
            label="Progress target"
            style={styles.progressType}
            data={progressTargets}
            placeholder="none"
            renderItem={(target) => (
              <>
                <SelectDropdownItem value={target} />
              </>
            )}
            onSelect={(target) => {
              setTarget(target);
            }}
            selectedValue={target}
          />
        </>
      ) : null,
    [progressTargets, type, target],
  );

  return (
    <Tile style={[styles.container, style]}>
      <SelectDropdownInput
        label="Progress type"
        style={styles.progressType}
        data={progressTypes}
        placeholder="none"
        renderItem={(type) => (
          <>
            <SelectDropdownItem value={type} />
          </>
        )}
        onSelect={(type) => {
          setType(type);
        }}
        selectedValue={type}
      />
      {progressTargetDropdown}
      {linearForm}
    </Tile>
  );
};

const styles = StyleSheet.create({ container: { gap: 20 }, progressType: {} });

export default ExerciseDetailsProgressForm;
