import { useThemeContext } from "../../context/ThemeContext";
import useDayProgress from "../../customHooks/useDayProgress";

export default function DayProgressBar() {
  const { dayProgress } = useDayProgress();
  const { theme } = useThemeContext();

  return (
    <div className="grid gap-1">
      <p>Progressão do dia</p>
      <div
        className={`${theme === "dark" ? "bg-alt_white" : "bg-slate-300"} h-[40px] w-[200px] rounded-lg`}
      >
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
