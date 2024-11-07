import { TimeUnit } from '@prisma/client';
import { prisma } from '../config/db.server';
import { NewCalendarEvent } from '../types/calendar';
import { add } from 'date-fns';

type PluralTimeUnit = 'days' | 'weeks' | 'months';

const timeUnitMapper = new Map<TimeUnit, PluralTimeUnit>([
  ['day', 'days'],
  ['week', 'weeks'],
  ['month', 'months'],
]);

const getNextDate = (datetime: Date, frequency: number, unit: TimeUnit) => {
  const mappedUnit: PluralTimeUnit = timeUnitMapper.get(unit)!;
  return add(datetime, { [mappedUnit]: frequency });
};

async function getAllEventsInRange(
  userId: number,
  startDate: Date,
  endDate: Date,
) {
  return await prisma.calendar_event.findMany({
    where: {
      datetime: {
        gte: startDate,
        lte: endDate,
      },
      calendar_event_parent: {
        user_id: userId,
      },
    },
    include: {
      calendar_event_parent: {
        include: {
          workout_template: {
            include: {
              workout_level: true,
              workout_tags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function createEvent(userId: number, calendarEvent: NewCalendarEvent) {
  return await prisma.$transaction(async (tx) => {
    const eventParent = await tx.calendar_event_parent.create({
      data: {
        user_id: userId,
        workout_id: calendarEvent.workoutId,
        repeat_count: calendarEvent.repeatCount,
        repeat_frequency: calendarEvent.repeatFrequency,
        repeat_unit: calendarEvent.repeatUnit,
      },
    });

    const parentId = eventParent.parent_id;
    const events = [];

    let currentDate = calendarEvent.datetime;

    for (let i = 0; i <= calendarEvent.repeatCount; i++) {
      const event = {
        parent_id: parentId,
        datetime: currentDate,
      };

      events.push(event);

      currentDate = getNextDate(
        currentDate,
        calendarEvent.repeatFrequency,
        calendarEvent.repeatUnit,
      );
    }

    await tx.calendar_event.createMany({ data: events });
  });
}

export { getAllEventsInRange, createEvent };
