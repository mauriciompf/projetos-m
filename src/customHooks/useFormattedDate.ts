import { useEffect, useState } from "react";
import { useTimeGeoContext } from "../context/TimeGeoContext";
import useFetchGeoUrl from "./useFetchGeoUrl";

const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useFetchGeoUrl();
  const { date, geoData, geoIsLoading } = useTimeGeoContext(); // geoURL associated with IP address

  useEffect(() => {
    if (!geoIsLoading && geoData) {
      setFormattedDate(
        date.toLocaleDateString("pt-BR", {
          timeZone: geoData.timezone,
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        }),
      );
    }
  }, [geoIsLoading, geoData, date]);

  return { formattedDate };
};

export default useFormattedDate;
