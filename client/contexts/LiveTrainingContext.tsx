import fetchApi from '@/api/fetch';
import React, { useCallback, useMemo, useState } from 'react';
import { useCardSwitcherContext } from './CardSwitcherContext';

type LiveTrainingContextProviderProps = { children: React.ReactNode };

type LiveTrainingContext = {
  startLiveTraining: (workoutID: number) => void;
  isLoading: boolean;
  currentWorkout: Workout | null;
  trainingItems: TrainingItem[];
  currentExerciseIndex: number;
  nextItem: () => number;
  peviousItem: () => number;
  getWorkoutExercise: (
    trainingItemIndex: number,
  ) => DetailedExerciseItem | null;
  addOpinion: (value: number, exerciseIndex: number) => void;
  getExerciseOpinion: (trainingItemIndex: number) => Opinion | null;
  saveWorkoutLog: (workoutOpinion: number) => void;
  resetTraining: () => void;
};

const LiveTrainingContext = React.createContext<LiveTrainingContext>({
  startLiveTraining: () => null,
  isLoading: false,
  currentWorkout: null,
  trainingItems: [],
  currentExerciseIndex: 0,
  nextItem: () => 0,
  peviousItem: () => 0,
  getWorkoutExercise: () => null,
  addOpinion: () => null,
  getExerciseOpinion: () => null,
  saveWorkoutLog: () => null,
  resetTraining: () => null,
});

type Opinion = {
  value: number;
  exerciseIndex: number;
};

function LiveTrainingContextProvider({
  children,
}: LiveTrainingContextProviderProps) {
  const { cardData } = useCardSwitcherContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [trainingItems, setTrainingItems] = useState<TrainingItem[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  const getTrainingItem = useCallback(
    (exercise: DetailedExerciseItem, index: number): TrainingItem => {
      return {
        exerciseID: exercise.exerciseId,
        exerciseIndex: index,
        name: exercise.name,
        value: {
          sets: exercise.value.sets || 0,
          reps: exercise.value.reps || 0,
          weight: exercise.value.weight || 0,
          time: exercise.value.time || 0,
          isBreak: exercise.value.isBreak || false,
        },
        type: exercise.exerciseType,
      };
    },
    [],
  );

  const parseExercises = useCallback(
    (exercises: DetailedExerciseItem[]) => {
      const items: TrainingItem[] = [];

      exercises.forEach((exercise, index) => {
        if (exercise.value.sets) {
          const sets = exercise.value.sets;
          for (let i = 0; i < sets; i++) {
            items.push(
              getTrainingItem(
                {
                  ...exercise,
                  value: {
                    ...exercise.value,
                    sets: sets - i,
                  },
                },
                index,
              ),
            );

            if (i < sets - 1) {
              items.push({
                exerciseID: -1,
                exerciseIndex: -1,
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
          items.push(getTrainingItem(exercise, index));
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
    cardData.current = [];
    setIsLoading(false);
    setCurrentWorkout(null);
    setTrainingItems([]);
    setCurrentExerciseIndex(0);
    setOpinions([]);
  }, [cardData]);

  const startLiveTraining = useCallback(
    async (workoutID: number) => {
      if (workoutID === currentWorkout?.workoutId) {
        return;
      }

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
    [currentWorkout, resetTraining, loadWorkout, parseExercises],
  );

  const nextItem = useCallback(() => {
    const nextIndex = Math.min(
      currentExerciseIndex + 1,
      trainingItems.length + 1,
    );
    setCurrentExerciseIndex(nextIndex);
    return nextIndex;
  }, [currentExerciseIndex, trainingItems.length]);

  const peviousItem = useCallback(() => {
    const prevIndex = Math.max(currentExerciseIndex - 1, 0);
    setCurrentExerciseIndex(prevIndex);
    return prevIndex;
  }, [currentExerciseIndex]);

  const getWorkoutExercise = useCallback(
    (trainingItemIndex: number) => {
      const trainingItem = trainingItems[trainingItemIndex];
      if (!trainingItem) {
        return null;
      }

      return currentWorkout?.exercises[trainingItem.exerciseIndex] || null;
    },
    [currentWorkout?.exercises, trainingItems],
  );

  const addOpinion = useCallback(
    (value: number, exerciseIndex: number) => {
      const index = opinions.findIndex(
        (opinion) => opinion.exerciseIndex === exerciseIndex,
      );
      if (index === -1) {
        setOpinions([...opinions, { value, exerciseIndex }]);
      } else {
        const newOpinions = [...opinions];
        newOpinions[index] = { value, exerciseIndex };
        setOpinions(newOpinions);
      }
    },
    [opinions],
  );

  const getExerciseOpinion = useCallback(
    (trainingItemIndex: number) => {
      const trainingItem = trainingItems[trainingItemIndex];
      if (!trainingItem) {
        return null;
      }

      return (
        opinions.find(
          (opinion) => opinion.exerciseIndex === trainingItem.exerciseIndex,
        ) || null
      );
    },
    [opinions, trainingItems],
  );

  const saveWorkoutLog = useCallback(
    async (workoutOpinion: number) => {
      try {
        const response = await fetchApi(
          '/workout/live-training/save',
          'POST',
          null,
          {
            userWorkoutId: currentWorkout?.workoutId,
            opinion: workoutOpinion,
            exercises: currentWorkout?.exercises.map((exercise, index) => ({
              exerciseId: exercise.exerciseId,
              value: exercise.value,
              opinion: opinions[index]?.value || 0,
              orderIndex: index,
            })),
          },
        );
        if (!response.ok) {
          throw new Error('Failed to save workout log');
        }
        const data = await response.json();
        return data;
      } catch (event) {
        if (event instanceof Error) {
          throw new Error(event.message);
        }
      }
    },
    [currentWorkout?.exercises, currentWorkout?.workoutId, opinions],
  );

  const value = useMemo(
    () => ({
      isLoading,
      currentWorkout,
      trainingItems,
      currentExerciseIndex,
      startLiveTraining,
      nextItem,
      peviousItem,
      getWorkoutExercise,
      addOpinion,
      getExerciseOpinion,
      saveWorkoutLog,
      resetTraining,
    }),
    [
      currentExerciseIndex,
      currentWorkout,
      nextItem,
      peviousItem,
      isLoading,
      startLiveTraining,
      trainingItems,
      getWorkoutExercise,
      addOpinion,
      getExerciseOpinion,
      saveWorkoutLog,
      resetTraining,
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
