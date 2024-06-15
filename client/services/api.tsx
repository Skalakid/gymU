import * as SecureStore from 'expo-secure-store';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

export type ApiResponse = {
  error: boolean;
  message: string;
  response: Response | null;
};

async function fetchApi(
  endpoint: string,
  method: Method,
  headers = {},
  body = {},
  useAccessToken = true,
): Promise<Response> {
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

  return response;
}

export default fetchApi;
