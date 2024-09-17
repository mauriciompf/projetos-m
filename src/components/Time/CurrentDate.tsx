import { useTimeGeoContext } from "../../context/TimeGeoContext";
import useFormattedDate from "../../customHooks/useFormattedDate";
import useUpdateDayWeek from "../../customHooks/useUpdateDayWeek";

export default function CurrentDate() {
  const { formattedDate } = useFormattedDate();
  const { currentDayWeek } = useUpdateDayWeek();
  const { geoData } = useTimeGeoContext();

  return (
    geoData && (
      <p className="first-letter:capitalize">
        {`${formattedDate}, ${`semana ${currentDayWeek}`}`}
      </p>
    )
  );
}
