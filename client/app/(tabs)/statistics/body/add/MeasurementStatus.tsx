import fetchApi from '@/api/fetch';
import PrimaryButton from '@/components/button/PrimaryButton';
import SecondaryButton from '@/components/button/SecondaryButton';
import ThemedText from '@/components/ThemedText';
import { useAuthContext } from '@/contexts/AuthContext';
import useThemeColor from '@/hooks/useThemeColor';
import { Mesaurements } from '@/types/measurement';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type MeasurementStatusProps = {
  measurements: Record<Mesaurements, number>;
  startAgainAction: () => void;
};

type MeasurementTileProps = {
  measurement: Mesaurements;
  measurementValue: number;
};

const MeasurementTile = ({
  measurement,
  measurementValue,
}: MeasurementTileProps) => {
  return (
    <View style={[styles.subTile]}>
      <ThemedText style={styles.subTileText}> {measurement} </ThemedText>
      <ThemedText style={styles.subTileText}> {measurementValue} </ThemedText>
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
      let data = { user_id: auth.user?.user_id, ...measurements };

      const response = await fetchApi(
        '/measurement/create',
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
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ThemedText size="xl" weight="semiBold">
        Here are your measurements:
      </ThemedText>

      <View style={styles.subTilesContainer}>
        {Object.entries(measurements).map(
          ([measurement, measurementValue], index) => (
            <MeasurementTile
              key={index}
              measurement={measurement as Mesaurements}
              measurementValue={measurementValue}
            />
          ),
        )}
      </View>

      <PrimaryButton value="Save measurements" onPress={handleAddMeasurement} />
      <SecondaryButton value="Start again" onPress={startAgainAction} />
    </Animated.View>
  );
};

export default MeasurementStatus;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',

    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    gap: 10,
    padding: 10,

    position: 'absolute',
    bottom: 0,
  },

  subTilesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',

    width: '80%',

    borderWidth: 2,
    borderRadius: 15,

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
});
