const getPastDaysOfYear = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the current year (0 === january)
  // Get difference between today and the january 1st in milliseconds
  const januaryTime = startOfYear.getTime();
  const currentTime = date.getTime();
  const timeDiff = currentTime - januaryTime;
  const pastDays = timeDiff / (1000 * 60 * 60 * 24); // 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day

  return pastDays;
};

export default getPastDaysOfYear;
