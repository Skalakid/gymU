import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import Icons from '@/constants/Icons';
import UserProfile from '@/components/userProfile/UserProfile';
import EditableUserProfile from '@/components/userProfile/EditableUserProfile';
import fetchApi from '@/api/fetch';
import UserDetails from '@/components/userProfile/UserDetails';
import UserDetailsForm from '@/components/userProfile/UserDetailsForm';

const UserProfilePage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { id } = useLocalSearchParams();
  const isCurrentUser = user?.userId === Number(id);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(
    isCurrentUser ? user : null,
  );
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditPress = () => {
    setIsEditing(true);
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
        <EditableUserProfile onEditPress={handleEditPress} size={112} />
      ) : (
        <UserProfile size={112} />
      )}

      {isEditing ? (
        <UserDetailsForm userDetails={userDetails} />
      ) : (
        <UserDetails userDetails={userDetails} />
      )}
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
});
