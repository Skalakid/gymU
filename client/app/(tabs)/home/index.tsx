import fetchApi from '@/api/fetch';
import ThemedText from '@/components/ThemedText';
import ThemedView from '@/components/ThemedView';
import TileWithTitle from '@/components/common/TileWithTitle';
import ProfileHeader from '@/components/home/ProfileHeader';
import RecentNotifications from '@/components/home/RecentNotifications';
import StatsPreview from '@/components/home/StatsPreview';
import UpcomingWorkout from '@/components/home/UpcomingWorkout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const HomePage = () => {
  const { user } = useAuthContext();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const getStreak = async () => {
      const rawData = await fetchApi('/user/streak', 'GET');
      const data = await rawData.json();

      setStreak(data.streak);
    };

    if (!streak) {
      getStreak();
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <ProfileHeader username={user.username} />

      <TileWithTitle title="Upcoming training:" titleStyle={styles.title}>
        <UpcomingWorkout />
      </TileWithTitle>

      <ThemedText weight="semiBold" size="l">
        Recent progress 💪
      </ThemedText>
      <StatsPreview percentageValue={0.12} streak={streak} />

      <ThemedText weight="semiBold" size="l">
        Feed ✨
      </ThemedText>

      <TileWithTitle style={{ flex: 1 }} title="Recent notifications">
        <RecentNotifications />
      </TileWithTitle>
    </ThemedView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 10,
  },
  title: { marginBottom: 10 },
  smallStatsTile: {
    flex: 1,
  },
  weightProgress: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});
