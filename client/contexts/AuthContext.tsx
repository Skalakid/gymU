import React, { useCallback, useEffect, useState } from 'react';
import fetchApi from '../services/api';
import * as SecureStore from 'expo-secure-store';

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
  isLoaded: false,
});

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const ACCESS_TOKEN_KEY = 'accessToken';

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: false,
  });

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
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
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
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    setAuthState({ token: null, authenticated: false });
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
      }
      setIsLoaded(true);
    };
    loadToken();
  }, []);

  const value = React.useMemo(
    () => ({ authState, isLoaded, login, register, logout }),
    [authState, isLoaded, register],
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
