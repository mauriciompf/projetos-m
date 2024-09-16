import { createContext, Dispatch, SetStateAction, useState } from "react";
import useCustomHookContext from "../customHooks/useCustomHookContext";

type TimeGeoContextValues = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  geoUrl: string;
  setGeoUrl: Dispatch<SetStateAction<string>>;
};

const TimeGeoContext = createContext<TimeGeoContextValues | null>(null);

export function TimeGeoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState(new Date());
  const [geoUrl, setGeoUrl] = useState("");
  return (
    <TimeGeoContext.Provider
      value={{
        date,
        setDate,
        geoUrl,
        setGeoUrl,
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
