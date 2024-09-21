import { useEffect, useState } from "react";
import getMinutesDiff from "../utils/getMinutesDiff";
import { useTimeGeoContext } from "../context/TimeGeoContext";

const useDayProgress = () => {
  const { geoData } = useTimeGeoContext();

  const [dayProgress, setDayProgress] = useState(getMinutesDiff());

  useEffect(() => {
    const updateProgress = () => setDayProgress(getMinutesDiff());

    const now = new Date().toLocaleTimeString("pt-BR", {
      timeZone: geoData && geoData.timezone,
      hour: "2-digit",
      minute: "2-digit",
    });

    const [seconds] = now.split(":").map(Number);
    const millisecondsUntilNextMinute = (60 - seconds) * 1000;

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
