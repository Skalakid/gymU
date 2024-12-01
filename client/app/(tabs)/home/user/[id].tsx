import { StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import ThemedText from '@/components/ThemedText';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import LabeledText from '@/components/common/LabeledText';
import Tile from '@/components/common/Tile';
import Icons from '@/constants/Icons';
import UserProfile from '@/components/userProfile/UserProfile';
import EditableUserProfile from '@/components/userProfile/EditableUserProfile';
import fetchApi from '@/api/fetch';

const UserProfilePage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { id } = useLocalSearchParams();
  const isCurrentUser = user?.userId === Number(id);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(
    isCurrentUser ? user : null,
  );

  const getUserDetails = useCallback(async () => {
    try {
      const result = await fetchApi(`/user/${id}`, 'GET');
      if (!result.ok) {
        throw new Error(result.status + '');
      }
      const data: UserDetails = await result.json();
      setUserDetails(data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleRightIconPress = () => {
    router.navigate('/home/settings');
  };

  useEffect(() => {
    if (isCurrentUser) {
      return;
    }
    getUserDetails();
  }, [getUserDetails, isCurrentUser]);

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
        <UserProfile size={112} />
      )}

      <Tile style={styles.tile}>
        <ThemedText size="l" weight="semiBold" style={styles.userInfoTitle}>
          General info
        </ThemedText>
        <View style={styles.userInfoContent}>
          <LabeledText label="Username" text={userDetails?.username ?? '-'} />
          {userDetails?.email && (
            <LabeledText label="Email" text={userDetails?.email ?? '-'} />
          )}

          <LabeledText
            label="Description"
            text={userDetails?.description ?? '-'}
          />
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
