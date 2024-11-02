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
  selectedRepeats: number;
  selectedRepeatsUnit: TimeUnit;

  updateSelectedWorkout: (item: Workout | null) => void;
  updateSeletedDate: (date: Date | null) => void;
  updateSelectedTime: (time: Date | null) => void;
  updateSelectedRepeats: (repeats: number) => void;
  updateSelectedRepeatsUnit: (unit: TimeUnit) => void;
  resetContext: () => void;
};

const CreateCalendarEventContext = createContext<CreateCalendarEventContext>({
  selectedWorkout: null,
  selectedDate: null,
  selectedTime: null,
  selectedRepeats: 0,
  selectedRepeatsUnit: 'day',
  updateSelectedWorkout: (item) => item,
  updateSeletedDate: (date) => date,
  updateSelectedTime: (time) => time,
  updateSelectedRepeats: (repeats) => repeats,
  updateSelectedRepeatsUnit: (unit) => unit,

  resetContext: () => {},
});

const CreateCalendarEventContextProvider = ({
  children,
}: CreateCalendarEventContextProviderProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [selectedRepeats, setSelectedRepeats] = useState<number>(0);
  const [selectedRepeatsUnit, setSelectedRepeatsUnit] =
    useState<TimeUnit>('day');

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
  const updateSelectedRepeats = useCallback(
    (repeats: number) => setSelectedRepeats(repeats),
    [],
  );
  const updateSelectedRepeatsUnit = useCallback(
    (unit: TimeUnit) => setSelectedRepeatsUnit(unit),
    [],
  );

  const resetContext = useCallback(() => {
    setSelectedWorkout(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedRepeats(0);
    setSelectedRepeatsUnit('day');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeats,
      selectedRepeatsUnit,
      resetContext,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeats,
      updateSelectedRepeatsUnit,
    }),
    [
      selectedWorkout,
      selectedDate,
      selectedTime,
      selectedRepeats,
      selectedRepeatsUnit,
      resetContext,
      updateSelectedWorkout,
      updateSeletedDate,
      updateSelectedTime,
      updateSelectedRepeats,
      updateSelectedRepeatsUnit,
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
