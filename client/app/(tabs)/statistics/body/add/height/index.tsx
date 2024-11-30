import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import Icons from '@/constants/Icons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import MeasurementStep from '../MeasurementStep';
import fetchApi from '@/api/fetch';

const AddHeight = () => {
  const router = useRouter();

  const description = `Looks like your new to our app 👋 Entering your height will allow us to provide more detailed statistics`;

  return (
    <ThemedView style={styles.container}>
      <Header
        leftIcon={Icons.arrowLeft}
        leftIconSize={32}
        leftIconOnPress={() => router.back()}
        title={'Add height'}
      />

      <MeasurementStep
        img={null}
        title={'height'}
        updater={async (_title, measurementValue) => {
          try {
            await fetchApi('/user/height', 'POST', null, {
              height: measurementValue,
            });

            router.navigate('/statistics/body/add');
          } catch (error) {
            router.navigate('/home');
          }
        }}
        description={description}
      />
    </ThemedView>
  );
};

export default AddHeight;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
});
