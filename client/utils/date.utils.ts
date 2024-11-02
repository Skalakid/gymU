import {
  CalendarCell,
  CalendarEvents,
} from '@/components/calendar/EventCalendar';

const zerofill = (value: number, padding = 2) => {
  return value.toString().padStart(padding, '0');
};

const getFormatedDate = (date: Date) =>
  `${date.getFullYear()}-${zerofill(date.getMonth() + 1)}-${zerofill(date.getDate())}`;

const prepareCalendar = (
  month: number,
  year: number,
  events: CalendarEvents,
  selected?: string,
  current?: string,
) => {
  const firstDay = new Date(year, month - 1, 1, 1);
  const firstWeekDay = firstDay.getDay();
  const firstWeekDate = firstDay.getDate();

  const offset = firstWeekDay === 0 ? -6 : -firstWeekDay + 1;
  firstDay.setDate(firstWeekDate + offset);

  const result: CalendarCell[][] = [];

  for (let i = 0; i < 6; i++) {
    result.push(new Array(7));
  }

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      const currentDate = getFormatedDate(firstDay);

      result[i][j] = {
        date: currentDate,
        events: events[currentDate] ?? [],
        currentMonth: firstDay.getMonth() + 1 === month,
      };

      if (currentDate === selected) {
        result[i][j].selected = true;
      }

      if (currentDate === current) {
        result[i][j].current = true;
      }

      firstDay.setDate(firstDay.getDate() + 1);
    }
  }

  return result;
};

const isProperDateFormat = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g.test;

const dateMap = new Map(
  Object.entries({
    year: 0,
    month: 1,
    day: 2,
  }),
);

type DatePart = 'year' | 'month' | 'day';

const getParsedValue = (date: string, type: DatePart) => {
  const splitted = date.split('-');
  return parseInt(splitted[dateMap.get(type)!]);
};

const areMonthsEqual = (dateA: string, dateB: string) => {
  return dateA.substring(0, 7) === dateB.substring(0, 7);
};

export {
  getFormatedDate,
  prepareCalendar,
  isProperDateFormat,
  areMonthsEqual,
  getParsedValue,
};
