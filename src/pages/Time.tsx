import WrapOutlet from "../components/WrapOutlet";
import projectList from "../utils/projectList";
import Loading from "../components/Loading";
import Greeting from "../components/Time/Greeting";
import CurrentTime from "../components/Time/CurrentTime";
import CurrentDate from "../components/Time/CurrentDate";
import useLoadingTimer from "../customHooks/useLoadingTimer";

export default function Time() {
  const { isLoading } = useLoadingTimer();

  return (
    <WrapOutlet projectName={projectList[2].label}>
      <section className="grid place-items-center">
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <Greeting />
            <CurrentTime />
            <CurrentDate />
          </>
        )}
      </section>
    </WrapOutlet>
  );
}
