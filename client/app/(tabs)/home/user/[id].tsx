import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import ThemedText from '@/components/ThemedText';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import UserProfile from '@/components/common/userProfile/UserProfile';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import LabeledText from '@/components/common/LabeledText';
import Tile from '@/components/common/Tile';
import Icons from '@/constants/Icons';
import EditableUserProfile from '@/components/common/userProfile/EditableUserProfile';

const UserProfilePage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { id } = useLocalSearchParams();
  const isCurrentUser = useMemo(() => user?.userId === Number(id), [id, user]);

  const handleRightIconPress = () => {
    router.navigate('/home/settings');
  };

  return (
    <PageWithGoBackHeader
      title={isCurrentUser ? 'Your profile' : `User profile`}
      style={styles.container}
      rightIcon={Icons.settings}
      rightIconSize={26}
      rightIconOnPress={handleRightIconPress}
    >
      {isCurrentUser ? (
        <EditableUserProfile onPress={() => {}} size={112} />
      ) : (
        <UserProfile onPress={() => {}} size={112} />
      )}

      <Tile style={styles.tile}>
        <ThemedText size="l" weight="semiBold" style={styles.userInfoTitle}>
          General info
        </ThemedText>
        <View style={styles.userInfoContent}>
          <LabeledText label="Username" text={user?.username ?? '-'} />
          <LabeledText label="Email" text={user?.email ?? '-'} />
        </View>
      </Tile>
    </PageWithGoBackHeader>
  );
};

export default UserProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 20,
    alignItems: 'center',
  },
  tile: { width: '100%' },
  userInfoContent: { gap: 5 },
  userInfoTitle: { marginBottom: 10 },
});
