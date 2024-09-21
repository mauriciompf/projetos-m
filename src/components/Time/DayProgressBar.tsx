import useDayProgress from "../../customHooks/useDayProgress";

export default function DayProgressBar() {
  const { dayProgress } = useDayProgress();

  return (
    <div className="grid gap-1">
      <p>Progressão do dia</p>
      <div className="h-[40px] w-[200px] rounded-lg bg-columbia">
        <div
          className={`h-full rounded-lg bg-savoy`}
          style={{
            width: `${dayProgress}%`,
          }}
        ></div>
      </div>
      <p>{dayProgress}%</p>
    </div>
  );
}
