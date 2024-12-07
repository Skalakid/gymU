import * as SecureStore from 'expo-secure-store';
import { refreshAccessToken } from './auth';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const DOMAIN = process.env.EXPO_PUBLIC_API_URL;

export type ApiResponse = {
  error: boolean;
  message: string;
  response: Response | null;
};

export async function fetchApiWithQueryParams(
  endpoint: string,
  params: Record<string, string> | Record<string, object>,
  headers: object | null = null,
  useAccessToken = true,
  retries = 1,
) {
  const stringifiedParams: Record<string, string> = {};

  for (let key in params) {
    stringifiedParams[key] = JSON.stringify(params[key]);
  }

  const preparedParams = new URLSearchParams(stringifiedParams);
  const preparedEndpoint = `${endpoint}?${preparedParams.toString()}`;

  return await fetchApi(
    preparedEndpoint,
    'GET',
    headers,
    null,
    useAccessToken,
    retries,
  );
}

async function fetchApi(
  endpoint: string,
  method: Method,
  headers: object | null = null,
  body: object | null = null,
  useAccessToken = true,
  retries = 1,
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

  if (useAccessToken && response.status === 403 && retries > 0) {
    try {
      await refreshAccessToken();
    } catch (error) {
      return response;
    }
    return fetchApi(endpoint, method, headers, body, useAccessToken, 0);
  }

  return response;
}

export default fetchApi;
