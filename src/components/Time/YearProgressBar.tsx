import useYearProgress from "../../customHooks/useYearProgress";

export default function YearProgressBar() {
  const { yearProgress } = useYearProgress();

  return (
    <div className="text-center">
      <p>Ano</p>
      <div className="h-[40px] w-[200px] rounded-lg border-4 border-dark_spring bg-columbia">
        <div
          className={`h-full rounded-r-lg bg-savoy`}
          style={{
            width: `${yearProgress}%`,
          }}
        ></div>
      </div>
      <p>{yearProgress.toFixed(2)}%</p>
    </div>
  );
}
