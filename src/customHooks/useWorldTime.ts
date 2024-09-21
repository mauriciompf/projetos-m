import { useEffect, useState } from "react";

type WorldDateValues = {
  id: number;
  name: string;
  timeZone: string;
  time: string | null;
};

const useWorldTime = () => {
  const [worldTime, setWorldTime] = useState<WorldDateValues[]>([
    {
      id: 0,
      name: "Nova Iorque",
      timeZone: "America/New_York",
      time: null,
    },
    {
      id: 1,
      name: "São Paulo",
      timeZone: "America/Sao_Paulo",
      time: null,
    },
    {
      id: 2,
      name: "Londres",
      timeZone: "Europe/London",
      time: null,
    },
    {
      id: 3,
      name: "Paris",
      timeZone: "Europe/Paris",
      time: null,
    },
    {
      id: 4,
      name: "Hong Kong",
      timeZone: "Asia/Hong_Kong",
      time: null,
    },
    {
      id: 5,
      name: "Tóquio",
      timeZone: "Asia/Tokyo",
      time: null,
    },
  ]);

  useEffect(() => {
    const updateTime = () => {
      setWorldTime((prev) =>
        prev.map((city) => {
          const currentCityTime = new Date().toLocaleTimeString("pt-BR", {
            timeZone: city.timeZone,
            hour: "numeric",
            minute: "numeric",
          });
          return {
            ...city,
            time: currentCityTime,
          };
        }),
      );
    };

    updateTime();

    const intervalId = setInterval(updateTime, 0);

    return () => clearInterval(intervalId);
  }, []);

  return { worldTime };
};
export default useWorldTime;
