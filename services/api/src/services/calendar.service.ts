import * as CalendarDB from '../persistance/calendar.db';
import { NewCalendarEvent } from '../types/calendar';

async function getAllEventsInRange(
  userId: number,
  startDate: Date,
  endDate: Date,
) {
  const events = await CalendarDB.getAllEventsInRange(
    userId,
    startDate,
    endDate,
  );

  return events.map((item) => {
    const workout = item.calendar_event_parent.workout_template;
    return {
      eventId: item.event_id,
      parentId: item.parent_id,
      datetime: item.datetime,
      workout: {
        workoutId: workout.workout_id,
        name: workout.name,
        level: workout.workout_level.name,
        tags: workout.workout_tags.map(({ tag }) => tag.name),
      },
    };
  });
}

async function createEvent(userId: number, calendarEvent: NewCalendarEvent) {
  return await CalendarDB.createEvent(userId, calendarEvent);
}
export { getAllEventsInRange, createEvent };
