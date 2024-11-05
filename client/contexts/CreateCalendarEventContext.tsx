import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { TimeUnit } from '@/types/calendar';

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

  const [selectedRepeatCount, setselectedRepeatCount] = useState<number>(0);

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
    setselectedRepeatCount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeatFrequency,
      selectedRepeatUnit,
      selectedRepeatCount,
      resetContext,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeatFrequency,
      updateSelectedRepeatUnit,
      updateSelectedRepeatCount,
    }),
    [
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeatFrequency,
      selectedRepeatUnit,
      selectedRepeatCount,
      resetContext,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeatFrequency,
      updateSelectedRepeatUnit,
      updateSelectedRepeatCount,
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
