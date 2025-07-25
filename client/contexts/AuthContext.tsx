import React, { useCallback, useEffect, useState } from 'react';
import fetchApi from '../api/fetch';
import * as SecureStore from 'expo-secure-store';
import SECURE_STORE_KEYS from '../constants/SecureStoreKeys';

type AuthContextProviderProps = { children: React.ReactNode };

type AuthContext = {
  login: (email: string, password: string) => void;
  register: (
    email: string,
    username: string,
    password: string,
    gender: string,
  ) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  isLoaded: boolean;
  updateUserInfo: (
    username: string,
    email: string,
    description: string,
  ) => Promise<User> | null;
};

const AuthContext = React.createContext<AuthContext>({
  login: () => null,
  register: () => null,
  logout: () => null,
  isAuthenticated: false,
  user: null,
  isLoaded: false,
  updateUserInfo: () => null,
});

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
} & User;

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
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

    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.ACCESS_TOKEN,
      data.accessToken,
    );
    await SecureStore.setItemAsync(
      SECURE_STORE_KEYS.REFRESH_TOKEN,
      data.refreshToken,
    );
    setUser({
      userId: data.userId,
      email: data.email,
      username: data.username,
      description: data.description,
    });
    setIsAuthenticated(true);
  }, []);

  const register = useCallback(
    async (
      email: string,
      username: string,
      password: string,
      gender: string,
    ) => {
      if (!email || !username || !password || !gender) {
        throw new Error('Fill in all fields');
      }

      const response = await fetchApi(
        '/signup',
        'POST',
        {},
        {
          email,
          username,
          password,
          gender,
        },
        false,
      );

      if (!response.ok) {
        throw new Error('Something went wrong... Please try signing up later.');
      }
      login(email, password);
    },
    [login],
  );

  const deleteTokens = useCallback(async () => {
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(
        SECURE_STORE_KEYS.REFRESH_TOKEN,
      );
      await fetchApi('/logout', 'DELETE', {}, { refreshToken }, true);
    } catch (error) {
      console.error('Error logging out:', error);
    }

    await deleteTokens();
    setIsAuthenticated(false);
    setUser(null);
  }, [deleteTokens]);

  const updateUserInfo = useCallback(
    async (username: string, email: string, description: string) => {
      try {
        const response = await fetchApi(
          '/user/edit',
          'PUT',
          null,
          {
            username,
            email,
            description,
          },
          true,
        );
        if (!response.ok) {
          throw new Error('Failed to update user info');
        }
        const data = await response.json();
        // Update access token
        await SecureStore.setItemAsync(
          SECURE_STORE_KEYS.ACCESS_TOKEN,
          data.accessToken,
        );

        const newUserData = {
          userId: data.userId,
          email: data.email,
          username: data.username,
          description: data.description,
        };
        setUser(newUserData);
        return newUserData;
      } catch (error) {
        throw new Error('Failed to update user info');
      }
    },
    [],
  );

  useEffect(() => {
    const loadToken = async () => {
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
          userId: data.userId,
          email: data.email,
          username: data.username,
          description: data.description,
        });
        setIsAuthenticated(true);
      } catch (error) {
        await deleteTokens();
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoaded(true);
    };
    loadToken();
  }, [deleteTokens]);

  const value = React.useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoaded,
      login,
      register,
      logout,
      updateUserInfo,
    }),
    [isAuthenticated, user, isLoaded, login, register, logout, updateUserInfo],
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
