import * as SecureStore from 'expo-secure-store';
import SECURE_STORE_KEYS from '../constants/SecureStoreKeys';

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

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
    console.error('[REFRESH TOKEN]:', error);
    throw new Error('Error refreshing token');
  }
}

export { refreshAccessToken };
