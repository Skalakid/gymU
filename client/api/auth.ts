import * as SecureStore from 'expo-secure-store';
import SECURE_STORE_KEYS from '../constants/SecureStoreKeys';
import { router } from 'expo-router';
import { Alert } from 'react-native';

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

const showRefreshTokenFailAlert = () => {
  return new Promise((resolve) => {
    Alert.alert(
      'Authentication Error',
      'Your session has expired. Please log in again.',
      [{ text: 'Okay', onPress: () => resolve(true) }],
      { cancelable: false },
    );
  });
};

async function refreshAccessToken() {
  const refreshToken = await SecureStore.getItemAsync(
    SECURE_STORE_KEYS.REFRESH_TOKEN,
  );
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const accessToken = await SecureStore.getItemAsync(
    SECURE_STORE_KEYS.ACCESS_TOKEN,
  );
  if (!accessToken) {
    throw new Error('No access token found');
  }

  try {
    const response = await fetch(`${DOMAIN}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();

    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.ACCESS_TOKEN,
      data.accessToken,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error('[REFRESH TOKEN]:', error.message);
    }
    await showRefreshTokenFailAlert();
    router.replace('/logout');
    throw new Error('Error refreshing token');
  }
}

function getAuthorizationHeaderSync() {
  let accessToken: string | null = null;
  const token = SecureStore.getItem('accessToken');
  if (token !== null) {
    accessToken = 'Bearer ' + token;
  }

  return accessToken;
}

export { refreshAccessToken, getAuthorizationHeaderSync };
