import { useState, useEffect } from "react";
import { useTimeGeoContext } from "../context/TimeGeoContext";
import getCurrentDayWeekNumber from "../utils/getCurrentWeekNumber";

const useUpdateDayWeek = () => {
  const [currentDayWeek, setCurrentDayWeek] = useState(0);
  const { date } = useTimeGeoContext();

  useEffect(() => {
    const dayWeekUpdate = setInterval(() => {
      setCurrentDayWeek(getCurrentDayWeekNumber(date));
    }, 0);

    return () => clearInterval(dayWeekUpdate);
  }, [date]);

  return { currentDayWeek };
};

export default useUpdateDayWeek;
