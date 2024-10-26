import fetchApi from '@/api/fetch';
import React, { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from './AuthContext';

type WorkoutContextProviderProps = { children: React.ReactNode };

type WorkoutContextType = {
  difficulties: Difficulty[];
};

const WorkoutContext = React.createContext<WorkoutContextType>({
  difficulties: [],
});

function WorkoutContextProvider({ children }: WorkoutContextProviderProps) {
  const { isAuthenticated } = useAuthContext();
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  const getWorkoutDifficulties = async () => {
    try {
      const response = await fetchApi('/workout/difficulty/all', 'GET');
      if (!response.ok) {
        throw new Error('Error fetching difficulties');
      }
      const data = await response.json();
      console.log(data);
      setDifficulties(data);
    } catch (error) {
      console.error('Error fetching difficulties', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('WorkoutContext - Fetching initial data');
    getWorkoutDifficulties();
  }, [isAuthenticated]);

  const value = useMemo(() => ({ difficulties }), [difficulties]);
  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

function useWorkoutContext() {
  const context = React.useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error(
      'useWorkoutContext must be used within a WorkoutContextProvider',
    );
  }
  return context;
}

export { WorkoutContextProvider, useWorkoutContext };
