import fetchApi from '@/api/fetch';
import React, { useCallback, useMemo, useState } from 'react';

type LiveTrainingContextProviderProps = { children: React.ReactNode };

type LiveTrainingContext = {
  startLiveTraining: (workoutID: number) => void;
  isLoading: boolean;
  currentWorkout: Workout | null;
  trainingItems: TrainingItem[];
  currentExerciseIndex: number;
};

const LiveTrainingContext = React.createContext<LiveTrainingContext>({
  startLiveTraining: () => null,
  isLoading: false,
  currentWorkout: null,
  trainingItems: [],
  currentExerciseIndex: 0,
});

function LiveTrainingContextProvider({
  children,
}: LiveTrainingContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  const getTrainingItem = useCallback(
    (exercise: DetailedExerciseItem): TrainingItem => {
      return {
        exerciseID: exercise.exercise_id,
        name: exercise.name,
        value: {
          sets: exercise.value.sets || 0,
          reps: exercise.value.reps || 0,
          weight: exercise.value.weight || 0,
          time: exercise.value.time || 0,
          isBreak: exercise.value.isBreak || false,
        },
        type: exercise.exercise_type,
      };
    },
    [],
  );

  const parseExercises = useCallback(
    (exercises: DetailedExerciseItem[]) => {
      const items: TrainingItem[] = [];

      exercises.forEach((exercise) => {
        if (exercise.value.sets) {
          const sets = exercise.value.sets;
          for (let i = 0; i < sets; i++) {
            items.push(
              getTrainingItem({
                ...exercise,
                value: {
                  ...exercise.value,
                  sets: sets - i,
                },
              }),
            );

            if (i < sets - 1) {
              items.push({
                exerciseID: -1,
                name: 'Rest',
                value: {
                  sets: 0,
                  reps: 0,
                  weight: 0,
                  time: 60,
                  isBreak: true,
                },
                type: 'break',
              });
            }
          }
        } else {
          items.push(getTrainingItem(exercise));
        }
      });

      setTrainingItems(items);
    },
    [getTrainingItem],
  );

  const loadWorkout = useCallback(async (workoutID: number) => {
    try {
      setIsLoading(true);
      const response = await fetchApi(`/workout/${workoutID}`, 'GET');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const workoutDetails: Workout = await response.json();
      return workoutDetails;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }, []);

  const resetTraining = useCallback(() => {
    setIsLoading(false);
    setCurrentWorkout(null);
    setTrainingItems([]);
    setCurrentExerciseIndex(0);
  }, []);

  const startLiveTraining = useCallback(
    async (workoutID: number) => {
      try {
        resetTraining();
        const workoutDetails = await loadWorkout(workoutID);
        if (!workoutDetails) {
          throw new Error('Something went wrong...');
        }
        setCurrentWorkout(workoutDetails);
        parseExercises(workoutDetails.exercises);
        setCurrentExerciseIndex(0);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    [resetTraining, loadWorkout, parseExercises],
  );

  const value = useMemo(
    () => ({
      isLoading,
      currentWorkout,
      trainingItems,
      currentExerciseIndex,
      startLiveTraining,
    }),
    [
      currentExerciseIndex,
      currentWorkout,
      isLoading,
      startLiveTraining,
      trainingItems,
    ],
  );

  return (
    <LiveTrainingContext.Provider value={value}>
      {children}
    </LiveTrainingContext.Provider>
  );
}

function useLiveTrainingContext() {
  const context = React.useContext(LiveTrainingContext);
  if (context === undefined) {
    throw new Error(
      'useLiveTrainingContext must be used within a LiveTrainingContextProvider',
    );
  }
  return context;
}

export { LiveTrainingContextProvider, useLiveTrainingContext };
