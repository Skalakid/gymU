import React, { useCallback, useMemo, useRef, useState } from 'react';

type CreateWorkoutContextProviderProps = { children: React.ReactNode };

type WorkoutGeneralInfo = {
  name: string;
  description: string;
  dificultyLevel: number;
  isPrivate: boolean;
  tagsIds: number[];
};

type OrderedBasicExercise = BasicExercise & {
  orderIndex: number;
};

type CreateWorkoutContext = {
  workoutGeneralInfo: WorkoutGeneralInfo | null;
  selectedExercises: OrderedBasicExercise[];
  updateWorkoutGeneralInfo: (generalInfo: WorkoutGeneralInfo | null) => void;
  addExercise: (exercise: BasicExercise, orderIndex?: number) => void;
  updateExerciseOrderIndex: (exerciseId: number, orderIndex: number) => void;
  removeExercise: (index: number) => void;
  clearExercises: () => void;
  selectedExercise: React.MutableRefObject<BasicExercise | null>;
  updateSelectedExercise: (exercise: BasicExercise) => void;
};

const CreateWorkoutContext = React.createContext<CreateWorkoutContext>({
  workoutGeneralInfo: null,
  selectedExercises: [],
  updateWorkoutGeneralInfo: () => null,
  addExercise: () => null,
  updateExerciseOrderIndex: () => null,
  removeExercise: () => null,
  clearExercises: () => null,
  selectedExercise: { current: null },
  updateSelectedExercise: () => null,
});

function CreateWorkoutContextProvider({
  children,
}: CreateWorkoutContextProviderProps) {
  const [workoutGeneralInfo, setWorkoutGeneralInfo] =
    useState<WorkoutGeneralInfo | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<
    OrderedBasicExercise[]
  >([]);
  const selectedExercise = useRef<BasicExercise | null>(null);

  const updateSelectedExercise = useCallback((exercise: BasicExercise) => {
    selectedExercise.current = exercise;
  }, []);

  const updateWorkoutGeneralInfo = useCallback(
    (generalInfo: WorkoutGeneralInfo | null) => {
      setWorkoutGeneralInfo(generalInfo);
    },
    [],
  );

  const addExercise = useCallback(
    (exercise: BasicExercise, orderIndex?: number) => {
      setSelectedExercises((prev) => [
        ...prev,
        {
          ...exercise,
          orderIndex: orderIndex ?? prev.length,
        },
      ]);
    },
    [],
  );

  const updateExerciseOrderIndex = useCallback(
    (exerciseId: number, orderIndex: number) => {
      setSelectedExercises((prev) =>
        prev.map((exercise) =>
          exercise.exercise_id === exerciseId
            ? { ...exercise, orderIndex }
            : exercise,
        ),
      );
    },
    [],
  );

  const removeExercise = useCallback((index: number) => {
    setSelectedExercises((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearExercises = useCallback(() => {
    setSelectedExercises([]);
  }, []);

  const value = useMemo(
    () => ({
      workoutGeneralInfo,
      selectedExercises,
      selectedExercise,
      updateSelectedExercise,
      updateWorkoutGeneralInfo,
      addExercise,
      updateExerciseOrderIndex,
      removeExercise,
      clearExercises,
    }),
    [
      addExercise,
      clearExercises,
      removeExercise,
      selectedExercises,
      updateExerciseOrderIndex,
      updateSelectedExercise,
      updateWorkoutGeneralInfo,
      workoutGeneralInfo,
    ],
  );

  return (
    <CreateWorkoutContext.Provider value={value}>
      {children}
    </CreateWorkoutContext.Provider>
  );
}

function useCreateWorkoutContext() {
  const context = React.useContext(CreateWorkoutContext);
  if (context === undefined) {
    throw new Error(
      'useCreateWorkoutContext must be used within a CreateWorkoutContextProvider',
    );
  }
  return context;
}

export { CreateWorkoutContextProvider, useCreateWorkoutContext };
