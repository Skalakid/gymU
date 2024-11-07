import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { TimeUnit } from '@/types/calendar';
import { Alert } from 'react-native';
import { mergeDateTime } from '@/utils/date.utils';
import fetchApi from '@/api/fetch';

type CreateCalendarEventContextProviderProps = { children: ReactNode };

type CreateCalendarEventContext = {
  selectedWorkout: Workout | null;
  selectedDate: Date | null;
  selectedTime: Date | null;
  selectedRepeatFrequency: number;
  selectedRepeatUnit: TimeUnit;
  selectedRepeatCount: number;

  updateSelectedWorkout: (item: Workout | null) => void;
  updateSeletedDate: (date: Date | null) => void;
  updateSelectedTime: (time: Date | null) => void;
  updateSelectedRepeatFrequency: (repeats: number) => void;
  updateSelectedRepeatUnit: (unit: TimeUnit) => void;
  updateSelectedRepeatCount: (repetitions: number) => void;
  resetContext: () => void;
  saveCalendarEvent: () => Promise<boolean>;
  areAllCalendarFieldsSelected: () => boolean;
};

const CreateCalendarEventContext = createContext<CreateCalendarEventContext>({
  selectedWorkout: null,
  selectedDate: null,
  selectedTime: null,
  selectedRepeatFrequency: 0,
  selectedRepeatUnit: 'day',
  selectedRepeatCount: 0,
  updateSelectedWorkout: (item) => item,
  updateSeletedDate: (date) => date,
  updateSelectedTime: (time) => time,
  updateSelectedRepeatFrequency: (repeats) => repeats,
  updateSelectedRepeatUnit: (unit) => unit,
  updateSelectedRepeatCount: (repetitions: number) => repetitions,

  resetContext: () => {},
  saveCalendarEvent: async () => false,
  areAllCalendarFieldsSelected: () => false,
});

const CreateCalendarEventContextProvider = ({
  children,
}: CreateCalendarEventContextProviderProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [selectedRepeatFrequency, setselectedRepeatFrequency] =
    useState<number>(0);
  const [selectedRepeatUnit, setselectedRepeatUnit] = useState<TimeUnit>('day');

  const [selectedRepeatCount, setselectedRepeatCount] = useState<number>(1);

  const updateSelectedWorkout = useCallback((item: Workout | null) => {
    setSelectedWorkout(item);
  }, []);

  const updateSeletedDate = useCallback(
    (date: Date | null) => setSelectedDate(date),
    [],
  );
  const updateSelectedTime = useCallback(
    (time: Date | null) => setSelectedTime(time),
    [],
  );
  const updateSelectedRepeatFrequency = useCallback(
    (repeats: number) => setselectedRepeatFrequency(repeats),
    [],
  );
  const updateSelectedRepeatUnit = useCallback(
    (unit: TimeUnit) => setselectedRepeatUnit(unit),
    [],
  );
  const updateSelectedRepeatCount = useCallback(
    (repetitions: number) => setselectedRepeatCount(repetitions),
    [],
  );

  const resetContext = useCallback(() => {
    setSelectedWorkout(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setselectedRepeatFrequency(0);
    setselectedRepeatUnit('day');
    setselectedRepeatCount(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const areAllCalendarFieldsSelected = useCallback(() => {
    const emptyFields = [
      selectedDate,
      selectedTime,
      selectedRepeatCount,
      selectedRepeatFrequency,
      selectedRepeatUnit,
      selectedWorkout,
    ].filter((item) => item == null);

    return emptyFields.length === 0;
  }, [
    selectedDate,
    selectedTime,
    selectedRepeatCount,
    selectedRepeatFrequency,
    selectedRepeatUnit,
    selectedWorkout,
  ]);

  const saveCalendarEvent = useCallback(async () => {
    /// TODO: Add better validation

    if (!areAllCalendarFieldsSelected()) {
      Alert.alert('Fill all fields before submitting workout!');
      return;
    }

    const request = {
      datetime: mergeDateTime(selectedDate!, selectedTime!),
      repeatFrequency: selectedRepeatFrequency,
      repeatUnit: selectedRepeatFrequency === 0 ? 'day' : selectedRepeatUnit,
      repeatCount: selectedRepeatFrequency === 0 ? selectedRepeatCount : 0,
      workoutId: selectedWorkout?.workout_id,
    };

    try {
      const response = await fetchApi('/calendar', 'POST', null, request, true);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      resetContext();
      return true;
    } catch (error) {
      Alert.alert(`${error}. Please try again later`);
    }
    return false;
  }, [
    selectedDate,
    selectedTime,
    selectedRepeatCount,
    selectedRepeatFrequency,
    selectedRepeatUnit,
    selectedWorkout,
    resetContext,
    areAllCalendarFieldsSelected,
  ]);

  const value = useMemo(
    () => ({
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeatFrequency,
      selectedRepeatUnit,
      selectedRepeatCount,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeatFrequency,
      updateSelectedRepeatUnit,
      updateSelectedRepeatCount,
      resetContext,
      saveCalendarEvent,
      areAllCalendarFieldsSelected,
    }),
    [
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeatFrequency,
      selectedRepeatUnit,
      selectedRepeatCount,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeatFrequency,
      updateSelectedRepeatUnit,
      updateSelectedRepeatCount,
      resetContext,
      saveCalendarEvent,
      areAllCalendarFieldsSelected,
    ],
  );

  return (
    <CreateCalendarEventContext.Provider value={value}>
      {children}
    </CreateCalendarEventContext.Provider>
  );
};

const useCreateCalendarEventContext = () => {
  const context = useContext(CreateCalendarEventContext);
  if (context === undefined) {
    throw new Error(
      'useCreateCalendarEventContext must be used within a CreateCalendarEventContextProvider',
    );
  }
  return context;
};

export { CreateCalendarEventContextProvider, useCreateCalendarEventContext };
