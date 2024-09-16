import { useEffect, useState } from "react";
import { useTimeGeoContext } from "../context/TimeGeoContext";

const useGreetingText = () => {
  const [greetingText, setGreetingText] = useState("");

  const { date } = useTimeGeoContext();

  useEffect(() => {
    const currentHour = date.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreetingText("Bom dia!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetingText("Boa tarde!");
    } else {
      setGreetingText("Boa noite");
    }
  }, [date]);

  return { greetingText };
};

export default useGreetingText;
