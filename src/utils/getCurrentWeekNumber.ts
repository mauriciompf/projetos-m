import getPastDaysOfYear from "./getPastDaysOfYear";

const getCurrentDayWeekNumber = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the current year (0 === january)
  const dayOfWeekJanuary = startOfYear.getDay(); // How much of the first week of the year was already "used up" before the first full week begins (sunday is the day that start the week)
  const fullPastDays = getPastDaysOfYear(date) + dayOfWeekJanuary;

  return Math.ceil(fullPastDays / 7); // Round up to the nearest whole number to prevent float number
};
export default getCurrentDayWeekNumber;
