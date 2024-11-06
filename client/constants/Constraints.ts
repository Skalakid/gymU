const tenYearsInDays = 365 * 10;

const calendarConstraints = {
  repeats: {
    day: { min: 0, max: 365, maxRepetitions: tenYearsInDays },
    week: { min: 0, max: 240, maxRepetitions: Math.ceil(tenYearsInDays / 7) },
    month: {
      min: 0,
      max: 60,
      maxRepetitions: Math.ceil(tenYearsInDays / (7 * 4)),
    },
  },
};

export { calendarConstraints };
