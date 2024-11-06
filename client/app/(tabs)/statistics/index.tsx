import Header from '@/components/navigation/Header';
import ThemedView from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Images from '@/constants/Images';
import ThemedText from '@/components/ThemedText';
import useThemeColor from '@/hooks/useThemeColor';

const StatisticsPage = () => {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'tile');

  return (
    <ThemedView style={styles.container}>
      <Header title={'Statistics'} />

      <Pressable
        onPress={() => router.navigate('/statistics/body')}
        style={[styles.button, { backgroundColor }]}
      >
        <Image
          source={Images.body}
          style={{ width: 200, height: 200, borderRadius: 15 }}
        />
        <ThemedView style={[styles.buttonTextWrapper, { backgroundColor }]}>
          <ThemedText size="xl" weight="semiBold">
            Your body
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

export default StatisticsPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    width: 230,
    height: 250,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonTextWrapper: {
    width: 200,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
