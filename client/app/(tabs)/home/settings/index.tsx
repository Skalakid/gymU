import { Alert } from 'react-native';
import React from 'react';
import PageWithGoBackHeader from '@/components/page/PageWithGoBackHeader';
import PrimaryButton from '@/components/button/PrimaryButton';
import { useAuthContext } from '@/contexts/AuthContext';

const SettingsPage = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign out',
        onPress: logout,
      },
    ]);
  };

  return (
    <PageWithGoBackHeader title="Settings">
      <PrimaryButton value="Sign out" onPress={handleLogout} />
    </PageWithGoBackHeader>
  );
};

export default SettingsPage;
