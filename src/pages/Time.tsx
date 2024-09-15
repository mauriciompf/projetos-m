import { useCallback, useEffect, useMemo, useState } from "react";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import useFetch from "../customHooks/useFetch";
import Loading from "../components/Loading";

export default function Time() {
  const [date, setDate] = useState(new Date()); // Current date
  const [geoUrl, setGeoUrl] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  const { data: ipData, isLoading: ipIsLoading } = useFetch(
    "https://api.ipify.org/?format=json",
    "ip",
  );
  const { data: geoData, isLoading: geoIsLoading } = useFetch(geoUrl, "geo");

  const startOfYear = useMemo(() => new Date(date.getFullYear(), 0, 1), [date]); // January 1st of the current year (0 === january)
  const getPastDaysOfYear = useCallback((date: Date) => {
    // Get difference between today and the january 1st in milliseconds
    const januaryTime = startOfYear.getTime();
    const currentTime = date.getTime();
    const timeDiff = currentTime - januaryTime;
    const pastDays = timeDiff / (1000 * 60 * 60 * 24); // 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day

    return pastDays;
  }, []);

  const getCurrentWeekNumber = useCallback(
    (date: Date) => {
      const dayOfWeekJanuary = startOfYear.getDay(); // How much of the first week of the year was already "used up" before the first full week begins (sunday is the day that start the week)
      const fullPastDays = getPastDaysOfYear(date) + dayOfWeekJanuary;

      return Math.ceil(fullPastDays / 7); // Round up to the nearest whole number to prevent float number
    },
    [getPastDaysOfYear],
  );

  const addZeroDigit = useCallback((digit: number | string) => {
    if (typeof digit === "number" && digit < 10) digit = "0" + digit; // Add 0 when below 10
    return digit;
  }, []);

  const getRealTime = useCallback(() => {
    const hour = addZeroDigit(date.getHours());
    const minutes = addZeroDigit(date.getMinutes());
    const seconds = addZeroDigit(date.getSeconds());
    const time = `${hour}:${minutes}:${seconds}`; // display time

    return time;
  }, [date, addZeroDigit]);

  useEffect(() => {
    const currentHour = date.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Bom dia!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa tarde!");
    } else {
      setGreeting("Boa noite");
    }
  }, [date]);

  useEffect(() => {
    if (!ipIsLoading && ipData) {
      setGeoUrl(`https://get.geojs.io/v1/ip/geo/${ipData.ip}`);
    }

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
  }, [ipIsLoading, ipData, geoIsLoading, geoData, date]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date()); // Update date
      setCurrentWeek(getCurrentWeekNumber(new Date()));
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <WrapOutlet projectName={projectList[2].label}>
      <section className="grid place-items-center">
        <div>{greeting}</div>

        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <div>{getRealTime()}</div>
            <div className="first-letter:capitalize">
              {`${formattedDate}, ${currentWeek && `semana ${currentWeek}`}`}
            </div>
          </>
        )}
      </section>
    </WrapOutlet>
  );
}
