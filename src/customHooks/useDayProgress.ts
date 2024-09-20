import { useEffect, useState } from "react";
import getMinutesDiff from "../utils/getMinutesDiff";

const useDayProgress = () => {
  const [dayProgress, setDayProgress] = useState(getMinutesDiff());

  useEffect(() => {
    const updateProgress = () => setDayProgress(getMinutesDiff());

    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000;

    // Sync with the start of the next minute
    const timeout = setTimeout(() => {
      updateProgress();
      const interval = setInterval(updateProgress, 1000);

      return () => clearInterval(interval);
    }, millisecondsUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return { dayProgress };
};
export default useDayProgress;
