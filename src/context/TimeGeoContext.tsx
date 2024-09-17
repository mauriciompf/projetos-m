import { createContext, Dispatch, SetStateAction, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";
import useFetch from "../customHooks/useFetch";

type TimeGeoContextValues = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  geoUrl: string;
  setGeoUrl: Dispatch<SetStateAction<string>>;
  geoData: { timezone: string; city: string; country: string; region: string };
  geoIsLoading: boolean;
};

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
