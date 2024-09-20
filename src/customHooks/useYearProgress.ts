import { useEffect, useState } from "react";
import getPastDaysOfYear from "../utils/getPastDaysOfYear";
import isLeapYear from "../utils/isLeapYear";

const useYearProgress = () => {
  const [today, setToday] = useState(new Date());
  const [totalDaysInYear, setTotalDaysInYear] = useState(365);
  const [yearProgress, setYearProgress] = useState(0);

  useEffect(() => {
    const year = today.getFullYear();
    setTotalDaysInYear(isLeapYear(year) ? 366 : 365);

    const pastDaysOfYear = Math.ceil(getPastDaysOfYear(today));
    setYearProgress((pastDaysOfYear / totalDaysInYear) * 100);

    // Update States every 24 hours
    const interval = setInterval(
      () => {
        const date = new Date();
        setToday(date);
        const updatedPastDays = Math.ceil(getPastDaysOfYear(date));
        setYearProgress((updatedPastDays / totalDaysInYear) * 100);
      },
      60000 * 1000 * 60 * 24,
    );

    return () => clearInterval(interval);
  }, [today, totalDaysInYear]);

  return { yearProgress };
};
export default useYearProgress;
