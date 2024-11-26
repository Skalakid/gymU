import fetchApi from '@/api/fetch';
import PrimaryButton from '@/components/button/PrimaryButton';
import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';
import { useAuthContext } from '@/contexts/AuthContext';
import useThemeColor from '@/hooks/useThemeColor';
import { Mesaurement } from '@/types/measurement';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeOut, SlideInDown } from 'react-native-reanimated';

type MeasurementStatusProps = {
  measurements: Record<Mesaurement, number>;
  startAgainAction: () => void;
};

type MeasurementTileProps = {
  measurement: Mesaurement;
  measurementValue: number;
};

const MeasurementTile = ({
  measurement,
  measurementValue,
}: MeasurementTileProps) => {
  return (
    <View style={[styles.subTile]}>
      <ThemedText size="xl" weight="semiBold" style={styles.subTileText}>
        {measurement}
      </ThemedText>
      <ThemedText size="xl" weight="semiBold" style={styles.subTileText}>
        {measurementValue}
      </ThemedText>
    </View>
  );
};

const MeasurementStatus = ({
  measurements,
  startAgainAction,
}: MeasurementStatusProps) => {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'tile');
  const auth = useAuthContext();

  const handleAddMeasurement = async () => {
    try {
      const data = {
        userId: auth.user?.userId,
        saveDate: new Date(),
        ...measurements,
      };

      const response = await fetchApi(
        '/measurements/create',
        'POST',
        null,
        data,
        true,
      );

      if (response.ok) {
        router.navigate('/statistics/body');
      } else {
        Alert.alert('Something went wrong...');
      }
    } catch {
      Alert.alert('Something went wrong...');
    }
  };

  return (
    <Animated.View
      style={[styles.container, { backgroundColor }]}
      entering={SlideInDown}
      exiting={FadeOut}
    >
      <ThemedText size="xxl" weight="semiBold" style={styles.headerText}>
        Your measurements:
      </ThemedText>

      <View style={styles.subTilesContainer}>
        {Object.entries(measurements).map(
          ([measurement, measurementValue], index) => (
            <MeasurementTile
              key={index}
              measurement={measurement as Mesaurement}
              measurementValue={measurementValue}
            />
          ),
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <PrimaryButton
          value="Save measurements"
          onPress={handleAddMeasurement}
        />
        <SecondaryButton value="Start again" onPress={startAgainAction} />
      </View>
    </Animated.View>
  );
};

export default MeasurementStatus;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '86%',

    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    gap: 20,
    padding: 10,

    position: 'absolute',
    bottom: 0,

    display: 'flex',
    justifyContent: 'space-around',
  },

  headerText: {
    marginTop: '-8%',
  },

  subTilesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',

    width: '80%',

    gap: 5,
  },

  subTile: {
    display: 'flex',
    flexDirection: 'row',
  },

  subTileText: {
    width: '50%',
    textAlign: 'center',
  },

  buttonsContainer: {
    width: '100%',
    gap: 20,
    marginBottom: '-10%',
  },
});
