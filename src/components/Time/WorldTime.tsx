import { useThemeContext } from "../../context/ThemeContext";
import useWorldTime from "../../customHooks/useWorldTime";

export default function WorldTime() {
  const { worldTime } = useWorldTime();
  const { theme } = useThemeContext();

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {worldTime.map((city) => (
        <div
          className={`${theme === "dark" ? "bg-alt_white" : "bg-slate-300"} grid w-[7.5rem] place-items-center gap-0 rounded-xl p-2 font-bold text-jet lg:w-[8.5rem] lg:text-xl`}
          key={city.id}
        >
          <p>{city.name}</p>
          <p>{city.time}</p>
        </div>
      ))}
    </div>
  );
}
