import useDayProgress from "../../customHooks/useDayProgress";

export default function DayProgressBar() {
  const { dayProgress } = useDayProgress();

  return (
    <div className="text-center">
      <p>Dia</p>
      <div className="h-[40px] w-[200px] rounded-lg border-4 border-dark_spring bg-columbia">
        <div
          className={`h-full rounded-r-lg bg-savoy`}
          style={{
            width: `${dayProgress}%`,
          }}
        ></div>
      </div>
      <p>{dayProgress.toFixed(2)}%</p>
    </div>
  );
}
