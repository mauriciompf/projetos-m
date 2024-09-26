import { createContext, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useFetch from "../customHooks/useFetch";
import { TimeGeoContextValues } from "../utils/types";

const TimeGeoContext = createContext<TimeGeoContextValues | null>(null);

export function TimeGeoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState(new Date());
  const [geoUrl, setGeoUrl] = useState("");

  const { data: geoData, isLoading: geoIsLoading } = useFetch(geoUrl, "geo");

  return (
    <TimeGeoContext.Provider
      value={{
        date,
        setDate,
        geoUrl,
        setGeoUrl,
        geoData,
        geoIsLoading,
      }}
    >
      {children}
    </TimeGeoContext.Provider>
  );
}

export const useTimeGeoContext = () =>
  useCustomHookContext(
    TimeGeoContext,
    "useTimeGeoContext",
    "TimeGeoContextProvider",
  );
