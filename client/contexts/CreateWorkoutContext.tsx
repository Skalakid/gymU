import React, { useCallback, useMemo, useRef, useState } from 'react';

type CreateWorkoutContextProviderProps = { children: React.ReactNode };

type WorkoutGeneralInfo = {
  name: string;
  description: string;
  dificultyLevel: number;
  isPrivate: boolean;
  tagsIds: number[];
};

type OrderedExerciseItem = DetailedExerciseItem & {
  orderIndex: number;
};

type CreateWorkoutContext = {
  workoutGeneralInfo: WorkoutGeneralInfo | null;
  selectedExercises: OrderedExerciseItem[];
  updateWorkoutGeneralInfo: (generalInfo: WorkoutGeneralInfo | null) => void;
  addExercise: (exercise: DetailedExerciseItem, orderIndex?: number) => void;
  updateExerciseOrderIndex: (exerciseId: number, orderIndex: number) => void;
  removeExercise: (index: number) => void;
  clearExercises: () => void;
  currentExercise: React.MutableRefObject<BasicExercise | null>;
  updateCurrentExercise: (exercise: BasicExercise) => void;
};

const CreateWorkoutContext = React.createContext<CreateWorkoutContext>({
  workoutGeneralInfo: null,
  selectedExercises: [],
  updateWorkoutGeneralInfo: () => null,
  addExercise: () => null,
  updateExerciseOrderIndex: () => null,
  removeExercise: () => null,
  clearExercises: () => null,
  currentExercise: { current: null },
  updateCurrentExercise: () => null,
});

function CreateWorkoutContextProvider({
  children,
}: CreateWorkoutContextProviderProps) {
  const [workoutGeneralInfo, setWorkoutGeneralInfo] =
    useState<WorkoutGeneralInfo | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<
    OrderedExerciseItem[]
  >([]);
  const currentExercise = useRef<BasicExercise | null>(null);

  const updateCurrentExercise = useCallback((exercise: BasicExercise) => {
    currentExercise.current = exercise;
  }, []);

  const updateWorkoutGeneralInfo = useCallback(
    (generalInfo: WorkoutGeneralInfo | null) => {
      setWorkoutGeneralInfo(generalInfo);
    },
    [],
  );

  const addExercise = useCallback(
    (exercise: DetailedExerciseItem, orderIndex?: number) => {
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
      currentExercise,
      updateCurrentExercise,
      updateWorkoutGeneralInfo,
      addExercise,
      updateExerciseOrderIndex,
      removeExercise,
      clearExercises,
    }),
    [
      workoutGeneralInfo,
      selectedExercises,
      updateCurrentExercise,
      updateWorkoutGeneralInfo,
      addExercise,
      updateExerciseOrderIndex,
      removeExercise,
      clearExercises,
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
