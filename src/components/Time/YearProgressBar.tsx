import { useThemeContext } from "../../context/ThemeContext";
import useYearProgress from "../../customHooks/useYearProgress";

export default function YearProgressBar() {
  const { yearProgress } = useYearProgress();
  const { theme } = useThemeContext();

  return (
    <div className="grid gap-1">
      <p>Progressão do ano</p>
      <div
        className={`${theme === "dark" ? "bg-alt_white" : "bg-slate-300"} h-[40px] w-[200px] rounded-lg`}
      >
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
