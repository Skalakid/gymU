import fetchApi from '@/api/fetch';
import { filterNonNull } from '@/utils/object.utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

type CreateWorkoutContextProviderProps = { children: React.ReactNode };

type CreateWorkoutContext = {
  workoutGeneralInfo: WorkoutGeneralInfo | null;
  selectedExercises: OrderedExerciseItem[];
  updateWorkoutGeneralInfo: (generalInfo: WorkoutGeneralInfo | null) => void;
  addExercise: (exercise: DetailedExerciseItem) => void;
  updateExercise: (
    orderIndex: number,
    newExerciseData: DetailedExerciseItem,
  ) => void;
  updateExerciseOrderIndex: (exerciseId: number, orderIndex: number) => void;
  removeExercise: (index: number) => void;
  clearExercises: () => void;
  currentExercise: React.MutableRefObject<OrderedExerciseItem | null>;
  updateCurrentExercise: (exercise: OrderedExerciseItem) => void;
  saveWorkout: () => Promise<boolean>;
};

const CreateWorkoutContext = React.createContext<CreateWorkoutContext>({
  workoutGeneralInfo: null,
  selectedExercises: [],
  updateWorkoutGeneralInfo: () => null,
  addExercise: () => null,
  updateExercise: () => null,
  updateExerciseOrderIndex: () => null,
  removeExercise: () => null,
  clearExercises: () => null,
  currentExercise: { current: null },
  updateCurrentExercise: () => null,
  saveWorkout: async () => false,
});

function CreateWorkoutContextProvider({
  children,
}: CreateWorkoutContextProviderProps) {
  const [workoutGeneralInfo, setWorkoutGeneralInfo] =
    useState<WorkoutGeneralInfo | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<
    OrderedExerciseItem[]
  >([]);
  const currentExercise = useRef<OrderedExerciseItem | null>(null);

  const updateCurrentExercise = useCallback((exercise: OrderedExerciseItem) => {
    currentExercise.current = exercise;
  }, []);

  const updateWorkoutGeneralInfo = useCallback(
    (generalInfo: WorkoutGeneralInfo | null) => {
      setWorkoutGeneralInfo(generalInfo);
    },
    [],
  );

  const addExercise = useCallback((exercise: DetailedExerciseItem) => {
    setSelectedExercises((prev) => [
      ...prev,
      {
        ...exercise,
        orderIndex: prev.length,
      },
    ]);
  }, []);

  const updateExercise = useCallback(
    (orderIndex: number, newExerciseData: DetailedExerciseItem) => {
      const before = selectedExercises.slice(0, orderIndex);
      const after = selectedExercises.slice(orderIndex + 1);
      setSelectedExercises([
        ...before,
        { ...newExerciseData, orderIndex },
        ...after,
      ]);
    },
    [selectedExercises],
  );

  const updateExerciseOrderIndex = useCallback(
    (exerciseId: number, orderIndex: number) => {
      setSelectedExercises((prev) =>
        prev.map((exercise) =>
          exercise.exerciseId === exerciseId
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

  const saveWorkout = useCallback(async () => {
    if (selectedExercises.length === 0) {
      Alert.alert('Please add exercises to your workout');
      return false;
    }

    if (!workoutGeneralInfo) {
      Alert.alert('Please fill the workout general info');
      return false;
    }

    try {
      const reponse = await fetchApi(
        '/workout/create',
        'POST',
        null,
        {
          name: workoutGeneralInfo.name,
          description: workoutGeneralInfo.description,
          isPrivate: workoutGeneralInfo.isPrivate,
          workoutLevelId: workoutGeneralInfo.dificulty.level,
          tagIds: workoutGeneralInfo.tags.map((tag) => tag.tagId),
          exercises: selectedExercises.map((exercise, index) => ({
            exerciseId: exercise.exerciseId,
            value: JSON.stringify(filterNonNull(exercise.value)),
            progress: exercise.progress,
            orderIndex: index,
          })),
        },
        true,
      );
      if (!reponse.ok) {
        Alert.alert('Something went wrong...');
        return false;
      }

      clearExercises();
      updateWorkoutGeneralInfo(null);
      return true;
    } catch (error) {
      Alert.alert('Something went wrong...', 'Please try again later');
      return false;
    }
  }, [
    clearExercises,
    selectedExercises,
    updateWorkoutGeneralInfo,
    workoutGeneralInfo,
  ]);

  const value = useMemo(
    () => ({
      workoutGeneralInfo,
      selectedExercises,
      currentExercise,
      updateCurrentExercise,
      updateWorkoutGeneralInfo,
      addExercise,
      updateExercise,
      updateExerciseOrderIndex,
      removeExercise,
      clearExercises,
      saveWorkout,
    }),
    [
      workoutGeneralInfo,
      selectedExercises,
      updateCurrentExercise,
      updateWorkoutGeneralInfo,
      addExercise,
      updateExercise,
      updateExerciseOrderIndex,
      removeExercise,
      clearExercises,
      saveWorkout,
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
