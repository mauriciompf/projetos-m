import { useThemeContext } from "../../context/ThemeContext";
import SortByButton from "./SortByButton";
import FilterButton from "./FilterButton";
import SettingsInfo from "./SettingsInfo";
import ResultInfo from "./ResultInfo";

export default function TableSettings() {
  const { theme } = useThemeContext();

  return (
    <div
      className={`${theme === "dark" ? "bg-[#181a1b]" : "bg-columbia"} sticky top-0 z-10 flex flex-col items-center justify-between gap-y-4 px-6 py-4 lg:flex-row min-[1240px]:px-0`}
    >
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <SortByButton />
          <FilterButton />
        </div>

        <SettingsInfo />
      </div>

      <ResultInfo />
    </div>
  );
}
