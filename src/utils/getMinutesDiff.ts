import { useTimeGeoContext } from "../context/TimeGeoContext";

const getMinutesDiff = () => {
  const { geoData } = useTimeGeoContext();

  const now = new Date().toLocaleTimeString("pt-BR", {
    timeZone: geoData && geoData.timezone,
    hour: "2-digit",
    minute: "2-digit",
  });
  const [hours, minutes] = now.split(":").map(Number);
  const totalMinutesInDay = 24 * 60;
  const minutesPassed = hours * 60 + minutes;
  const result = (minutesPassed / totalMinutesInDay) * 100;

  return result.toFixed(2);
};
export default getMinutesDiff;
