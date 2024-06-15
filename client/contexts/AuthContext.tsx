import React, { useCallback, useEffect, useState } from 'react';
import fetchApi from '../api/fetch';
import * as SecureStore from 'expo-secure-store';
import SECURE_STORE_KEYS from '../constants/SecureStoreKeys';

type AuthContextProviderProps = { children: React.ReactNode };

type AuthState = {
  token: string | null;
  authenticated: boolean;
};

type AuthContext = {
  login: (email: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
  authState: AuthState;
  user: User | null;
  isLoaded: boolean;
};

const AuthContext = React.createContext<AuthContext>({
  login: () => null,
  register: () => null,
  logout: () => null,
  authState: {
    token: null,
    authenticated: false,
  },
  user: null,
  isLoaded: false,
});

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
} & User;

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: false,
  });
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email, username, and password are required');
    }

    const response = await fetchApi(
      '/login',
      'POST',
      {},
      {
        email,
        password,
      },
      false,
    );

    if (!response.ok) {
      if (response.status.toString()[0] === '4') {
        throw new Error('Invalid email or password!');
      }
      throw new Error('Something went wrong... Please try again later.');
    }

    const data: LoginResponse = await response.json();
    setAuthState({ token: data.accessToken, authenticated: true });
    setUser({
      user_id: data.user_id,
      email: data.email,
      username: data.username,
    });
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.ACCESS_TOKEN,
      data.accessToken,
    );
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.REFRESH_TOKEN,
      data.refreshToken,
    );
  };

  const register = useCallback(
    async (email: string, username: string, password: string) => {
      if (!email || !username || !password) {
        throw new Error('Email, username, and password are required');
      }

      const response = await fetchApi(
        '/signup',
        'POST',
        {},
        {
          email,
          username,
          password,
        },
        false,
      );

      if (!response.ok) {
        throw new Error('Something went wrong... Please try signing up later.');
      }
      login(email, password);
    },
    [],
  );

  const logout = async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    setAuthState({ token: null, authenticated: false });
    setUser(null);
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(
        SECURE_STORE_KEYS.ACCESS_TOKEN,
      );

      try {
        const response = await fetchApi(
          '/user/current',
          'GET',
          null,
          null,
          true,
        );
        if (!response.ok) {
          throw new Error('Invalid token');
        }

        const data = await response.json();
        setUser({
          user_id: data.user_id,
          email: data.email,
          username: data.username,
        });
        setAuthState({ token, authenticated: true });
      } catch (error) {
        setUser(null);
        setAuthState({ token: null, authenticated: false });
      }

      setIsLoaded(true);
    };
    loadToken();
  }, []);

  const value = React.useMemo(
    () => ({ authState, user, isLoaded, login, register, logout }),
    [authState, user, isLoaded, register],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
