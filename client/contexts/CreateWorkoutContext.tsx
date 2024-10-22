import fetchApi from '@/api/fetch';
import { DificultiesData } from '@/components/workoutForm/WorkoutForm';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

type CreateWorkoutContextProviderProps = { children: React.ReactNode };

type WorkoutGeneralInfo = {
  name: string;
  description: string;
  dificulty: DificultiesData;
  isPrivate: boolean;
  tags: WorkoutType[];
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
  saveWorkout: () => Promise<boolean>;
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
  saveWorkout: async () => false,
});

function CreateWorkoutContextProvider({
  children,
}: CreateWorkoutContextProviderProps) {
  const [workoutGeneralInfo, setWorkoutGeneralInfo] =
    useState<WorkoutGeneralInfo | null>({
      description: 'dupa dupa',
      dificulty: { label: 'medium', level: 2 },
      isPrivate: true,
      name: 'Test',
      tags: [
        { name: 'Legs', tag_id: 3 },
        { name: 'Lower body', tag_id: 4 },
        { name: 'Endurance', tag_id: 5 },
        { name: 'Arms', tag_id: 2 },
        { name: 'Back', tag_id: 1 },
      ],
    });
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

  const saveWorkout = useCallback(async () => {
    if (selectedExercises.length === 0) {
      Alert.alert('Please add exercises to your workout');
      return false;
    }

    if (!workoutGeneralInfo) {
      Alert.alert('Please fill the workout general info');
      return false;
    }

    const reponse = await fetchApi(
      '/workout/create',
      'POST',
      null,
      {
        name: workoutGeneralInfo.name,
        description: workoutGeneralInfo.description,
        is_private: workoutGeneralInfo.isPrivate,
        workout_level_id: workoutGeneralInfo.dificulty.level,
        tag_ids: workoutGeneralInfo.tags.map((tag) => tag.tag_id),
        exercises: [],
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
  }, [
    clearExercises,
    selectedExercises.length,
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
