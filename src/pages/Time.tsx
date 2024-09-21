import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import Greeting from "../components/Time/Greeting";
import CurrentTime from "../components/Time/CurrentTime";
import CurrentDate from "../components/Time/CurrentDate";
import CurrentLocation from "../components/Time/CurrentLocation";
import { useTimeGeoContext } from "../context/TimeGeoContext";
import Loading from "../components/Loading";
import WorldTime from "../components/Time/WorldTime";
import DayProgressBar from "../components/Time/DayProgressBar";
import YearProgressBar from "../components/Time/YearProgressBar";

export default function Time() {
  const { geoIsLoading } = useTimeGeoContext();

  return (
    <WrapOutlet projectName={projectList[2].label}>
      <section className="mt-10 grid place-items-center px-2 text-center">
        <Greeting />
        <CurrentTime />

        {geoIsLoading ? (
          <Loading />
        ) : (
          <>
            <CurrentDate />
            <CurrentLocation />
          </>
        )}
        <WorldTime />
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xl font-bold">
          {!geoIsLoading && <DayProgressBar />}
          <YearProgressBar />
        </div>
      </section>
    </WrapOutlet>
  );
}
