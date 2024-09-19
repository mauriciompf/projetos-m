const getMinutesDiff = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutesInDay = 24 * 60;
  const minutesPassed = hours * 60 + minutes;
  return (minutesPassed / totalMinutesInDay) * 100; // Calculate percentage
};
export default getMinutesDiff;
