import fetchApi from '@/api/fetch';
import Icons from '@/constants/Icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { useAuthContext } from './AuthContext';

type ExerciseContextProviderProps = { children: React.ReactNode };

type ExerciseContextType = {
  exerciseTypes: ExerciseType[];
  getExerciseType: (name: string) => ExerciseType | undefined;
  getExerciseTypeIcon: (type: string) => React.FC<SvgProps>;
};

const ExerciseContext = React.createContext<ExerciseContextType>({
  exerciseTypes: [],
  getExerciseType: () => undefined,
  getExerciseTypeIcon: () => Icons.bolt,
});

function ExerciseContextProvider({ children }: ExerciseContextProviderProps) {
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const { isAuthenticated } = useAuthContext();

  const fetchExerciseTypes = async () => {
    const response = await fetchApi('/exercise/types', 'GET', null);
    if (!response.ok) {
      console.error('Failed to fetch exercise types');
      return;
    }
    const data: ExerciseType[] = await response.json();
    setExerciseTypes(data);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('ExerciseContext - Fetching initial data');
    fetchExerciseTypes();
  }, [isAuthenticated]);

  const getExerciseType = useCallback(
    (name: string) => {
      return exerciseTypes.find((type) => type.name === name);
    },
    [exerciseTypes],
  );

  const getExerciseTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'reps':
        return Icons.repeat;
      case 'time':
        return Icons.time;
      case 'break':
        return Icons.battery;
      default:
        return Icons.bolt;
    }
  }, []);

  const value = useMemo(
    () => ({
      exerciseTypes,
      getExerciseType,
      getExerciseTypeIcon,
    }),
    [exerciseTypes, getExerciseType, getExerciseTypeIcon],
  );
  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
}

function useExerciseContext() {
  const context = React.useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error(
      'useExerciseContext must be used within a ExerciseContextProvider',
    );
  }
  return context;
}

export { ExerciseContextProvider, useExerciseContext };
