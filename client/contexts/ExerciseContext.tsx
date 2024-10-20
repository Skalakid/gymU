import fetchApi from '@/api/fetch';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type ExerciseContextProviderProps = { children: React.ReactNode };

type ExerciseContextType = {
  exerciseTypes: ExerciseType[];
  getExerciseType: (name: string) => ExerciseType | undefined;
};

const ExerciseContext = React.createContext<ExerciseContextType>({
  exerciseTypes: [],
  getExerciseType: () => undefined,
});

function ExerciseContextProvider({ children }: ExerciseContextProviderProps) {
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);

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
    // eslint-disable-next-line no-console
    console.log('ExerciseContext - Fetching initial data');
    fetchExerciseTypes();
  }, []);

  const getExerciseType = useCallback(
    (name: string) => {
      return exerciseTypes.find((type) => type.name === name);
    },
    [exerciseTypes],
  );

  const value = useMemo(
    () => ({
      exerciseTypes,
      getExerciseType,
    }),
    [exerciseTypes, getExerciseType],
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
