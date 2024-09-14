import { useEffect, useState } from "react";
import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";

export default function Time() {
  const [date, setDate] = useState(new Date()); // Current date

  let hour: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  // Add one 0 when below 10
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const res = `${hour}:${minutes}:${seconds}`; // display date

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date()); // set the new date every 1 second
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <WrapOutlet projectName={projectList[2].label}>
      <section className="grid place-items-center">
        <div>Bom dia</div>

        <div>{res}</div>
      </section>
    </WrapOutlet>
  );
}
