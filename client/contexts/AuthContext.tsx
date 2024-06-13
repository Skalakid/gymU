import React, { useState } from 'react';
import fetchApi from '../services/api';
import * as SecureStore from 'expo-secure-store';

type AuthContextProviderProps = { children: React.ReactNode };

type AuthContext = {
  login: (email: string, password: string) => void;
  register: (email: string, username: string, password: string) => void;
  logout: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContext>({
  login: () => null,
  register: () => null,
  logout: () => null,
  session: null,
  isLoading: false,
});

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false,
  });

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email, username, and password are required');
      }
      const result = await fetchApi<LoginResponse>(
        '/login',
        'POST',
        {},
        {
          email,
          password,
        },
        false,
      )();

      setAuthState({ token: result.accessToken, authenticated: true });
      console.log(SecureStore);

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
  ) => {
    try {
      if (!email || !username || !password) {
        throw new Error('Email, username, and password are required');
      }
      const newUser = await fetchApi<User>(
        '/signup',
        'POST',
        {},
        {
          email,
          username,
          password,
        },
        false,
      )();

      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const logout = () => {};

  const value = React.useMemo(
    () => ({ isLoading, login, register, logout }),
    [isLoading],
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
