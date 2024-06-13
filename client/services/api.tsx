import * as SecureStore from 'expo-secure-store';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

const throwFetchError = (method: string, endpoint: string, text: string) => {
  throw new Error(`[${method}] ${endpoint}: ${text}`);
};

function fetchApi<T>(
  endpoint: string,
  method: Method,
  headers = {},
  body = {},
  useAccessToken = true,
): () => Promise<T> {
  return async () => {
    try {
      let accessToken: string | null = null;
      if (useAccessToken) {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token !== null) {
          accessToken = 'Bearer ' + token;
        }
      }
      const response = await fetch(`${DOMAIN}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken || '',
          ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      throw new Error(`${response.status} ${response.statusText}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throwFetchError(method, endpoint, error.message);
      }
    }
  };
}

export default fetchApi;
