import { useEffect, useState } from "react";
import { useTimeGeoContext } from "../context/TimeGeoContext";
import useFetchGeoUrl from "./useFetchGeoUrl";

const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useFetchGeoUrl();
  const { date, geoData } = useTimeGeoContext(); // geoURL associated with IP address

  useEffect(() => {
    const currentDate = date.toLocaleDateString("pt-BR", {
      timeZone: geoData && geoData.timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    setFormattedDate(currentDate);
  }, [geoData, date]);

  return { formattedDate };
};

export default useFormattedDate;
