export type TimeUnit = 'day' | 'week' | 'month';

type EventCalendarData = {
  eventId: number;
  parentId: number;
  datetime: Date;
  workout: SimplifiedWorkout;
};
