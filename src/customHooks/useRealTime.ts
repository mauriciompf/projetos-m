import { useTimeGeoContext } from "../context/TimeGeoContext";
import addZeroDigit from "../utils/addZeroDigit";

const useRealTime = () => {
  const { date, geoData } = useTimeGeoContext();
  if (!date || !geoData) {
    return { realTimeText: "..." };
  }

  const dateInTimezone = date.toLocaleTimeString("pt-BR", {
    timeZone: geoData.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [hour, minutes, seconds] = dateInTimezone.split(":");
  const realTimeText = `${addZeroDigit(hour)}:${addZeroDigit(minutes)}:${addZeroDigit(seconds)}`;

  return { realTimeText };
};

export default useRealTime;
