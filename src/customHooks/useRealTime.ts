import { useTimeGeoContext } from "../context/TimeGeoContext";
import addZeroDigit from "../utils/addZeroDigit";

const useRealTime = () => {
  const { date } = useTimeGeoContext();

  const hour = addZeroDigit(date.getHours());
  const minutes = addZeroDigit(date.getMinutes());
  const seconds = addZeroDigit(date.getSeconds());
  const realTimeText = `${hour}:${minutes}:${seconds}`;
  return { realTimeText };
};

export default useRealTime;
