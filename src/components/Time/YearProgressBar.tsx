import useYearProgress from "../../customHooks/useYearProgress";

export default function YearProgressBar() {
  const { yearProgress } = useYearProgress();

  return (
    <div className="grid gap-1">
      <p>Progressão do ano</p>
      <div className="h-[40px] w-[200px] rounded-lg bg-columbia">
        <div
          className={`h-full rounded-lg bg-savoy`}
          style={{
            width: `${yearProgress}%`,
          }}
        ></div>
      </div>
      <p>{yearProgress.toFixed(2)}%</p>
    </div>
  );
}
